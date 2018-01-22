<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane label="角色配置">        
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="20">
            <el-date-picker
              v-model="searchQueries.gmtCreateBegin"
              type="date" size="medium" placeholder="创建开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <el-date-picker v-model="searchQueries.gmtCreateEnd" type="date" size="medium" placeholder="创建结束时间"></el-date-picker>
            <el-input style="width:200px" placeholder="角色名称" v-model="searchQueries.name"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button class="fr" size="medium" icon="el-icon-plus" type="primary" @click="onAddRole">新增角色</el-button>
          </el-col>
        </el-row>

        <el-table :data="roleList" border stripe v-loading="loading">
          <el-table-column label="角色">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <el-tooltip placement="right" :content="scope.row.descr">
                <i class="el-icon-info text-info"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate/1000 | moment('YYYY/MM/DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="麾下用户">
            <template slot-scope="scope">
              <span
                v-for="user in scope.row.users"
                :key="user.id">{{user.username}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.isEnabled !== null"
                :type="scope.row.isEnabled ? 'success' : 'danger'">
                {{ scope.row.isEnabled ? '已启用' : '已禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="配置" placement="top">
                <el-button type="text" icon="el-icon-setting" @click="onEditRole(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="onDeleteRole(scope.row.id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div class="fr" style="margin-top:12px">
      <el-pagination
        @current-change="fetchData"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="tempRow.name" width="30%" :visible.sync="dialogVisible">
      <el-form :model="tempRow" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="tempRow.name"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="tempRow.code"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tempRow.descr" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="麾下用户">
          <el-select
            v-model="tempUserIds" multiple
            placeholder="请选择用户">
            <el-option
              v-for="user in unpaginatedUserList"
              :key="user.id"
              :value="user.id"
              :label="user.username || 'null'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="tempRow.isEnabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已启用"
            inactive-text="已禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="tempRow.id" type="primary" icon="el-icon-check" @click="onUpdateRole">确认修改</el-button>
        <el-button v-else type="primary" icon="el-icon-check" @click="onUpdateRole(false)">确认新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getRoleInfo,
  createRole,
  updateRoleInfo,
  linkUsersToRole,
  deleteRole } from '@/api/settings/roles'
import getUsersAndRolesMixin from '@/mixins/_getUsersAndRoles'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'

export default {
  mixins: [getUsersAndRolesMixin],
  data() {
    return {
      loading: true,
      roleList: [],
      unpaginatedUserList: [],
      currentPage: 1,
      total: 0,
      searchQueries: {
        name: '',
        gmtCreateBegin: '',
        gmtCreateEnd: ''
      },
      tempRow: {
        name: '新群组',
        descr: '',
        code: '',
        isEnabled: false
      },
      tempUserIds: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
    this.fetchUsersOrRoles('users').then(res => {
      this.unpaginatedUserList = res.data.list
    })
  },
  methods: {
    onSearch() {
      this.fetchData()
    },
    fetchData(pageNum = 1) {
      this.loading = true
      this.currentPage = pageNum
      const queries = {
        pageNum,
        pageSize: 10,
        ...omitBy(this.searchQueries, isEmpty)
      }
      console.log(this.searchQueries)
      console.log(omitBy(this.searchQueries, isEmpty))
      getRoleList(queries).then(res => {
        this.roleList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    onDeleteRole(id) {
      this.$confirm('此操作将永久删除该角色，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(() => {
          this.$message.success('已删除角色！')
          this.fetchData(this.currentPage)
        })
      })
    },
    _resetTempRow() {
      this.tempRow = {
        name: '新群组',
        descr: '',
        code: '',
        isEnabled: false
      }
    },
    onAddRole() {
      this._resetTempRow()
      this.dialogVisible = true
    },
    onEditRole(id) {
      getRoleInfo(id).then(res => {
        this.tempRow = pick(res.data, ['id', 'name', 'code', 'descr', 'isEnabled'])
        this.tempUserIds = this.$_.map(res.data.users, u => u.id) || []
        this.dialogVisible = true
      })
    },
    onUpdateRole(isEdit = true) {
      if (isEdit) {
        updateRoleInfo(this.tempRow).then(res => {
          linkUsersToRole(this.tempUserIds, this.tempRow.id).then(res => {
            this.$message.success('已修改！')
            _done()
          })
        })
      } else {
        const params = omit(this.tempRow, 'id')
        createRole(params).then(res => {
          this.$message.success('已新增！')
          _done()
        })
      }
      const _this = this
      function _done() {
        _this.dialogVisible = false
        _this._resetTempRow()
        _this.fetchData()
        _this.fetchUsersOrRoles('users')
      }
    }
  }
}
</script>