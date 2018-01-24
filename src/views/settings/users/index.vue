<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane label="用户配置">        
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="20">
            <el-date-picker
              v-model="searchQueries.gmtCreateBegin"
              type="date" size="medium" placeholder="创建开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <el-date-picker v-model="searchQueries.gmtCreateEnd" type="date" size="medium" placeholder="创建结束时间"></el-date-picker>
            <el-input style="width:200px" placeholder="用户名称" v-model="searchQueries.name"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button class="fr" size="medium" icon="el-icon-plus" type="primary" @click="onAddUser">新增用户</el-button>
          </el-col>
        </el-row>

        <el-table :data="userList" border stripe v-loading="loading">
          <el-table-column label="用户" prop="username"></el-table-column>
          <el-table-column label="电子邮箱" prop="email"></el-table-column>>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="注册 IP">
            <template slot-scope="scope">
              <code>{{scope.row.registerIp}}</code>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.gmtCreate/1000 | moment('YYYY/MM/DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-setting" @click="onEditUser(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="onDeleteUser(scope.row.id)"></el-button>
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
        <el-form-item label="用户名称">
          <el-input v-model="tempRow.username"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="tempRow.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="tempRow.mobile" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="tempRow.status"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="tempRow.id" type="primary" icon="el-icon-check" @click="onUpdateUser">确认修改</el-button>
        <el-button v-else type="primary" icon="el-icon-check" @click="onUpdateUser(false)">确认新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  getUserInfo,
  createUser,
  updateUserInfo,
  deleteUser } from '@/api/settings/users'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'

export default {
  data() {
    return {
      loading: true,
      userList: [],
      currentPage: 1,
      total: 0,
      searchQueries: {
        name: '',
        gmtCreateBegin: '',
        gmtCreateEnd: ''
      },
      tempRow: {
        name: '新用户',
        email: '',
        mobile: '',
        status: 1
      },
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
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
      getUserList(queries).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    onDeleteUser(id) {
      this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(() => {
          this.$message.success('已删除用户！')
          this.fetchData(this.currentPage)
        })
      })
    },
    _resetTempUser() {
      this.tempRow = {
        name: '新用户',
        email: '',
        mobile: '',
        status: 1
      }
    },
    onAddUser() {
      this._resetTempUser()
      this.dialogVisible = true
    },
    onEditUser(id) {
      getUserInfo(id).then(res => {
        this.tempRow = pick(res.data, ['id', 'username', 'email', 'mobile', 'status'])
        this.dialogVisible = true
      })
    },
    onUpdateUser(isEdit = true) {
      if (isEdit) {
        updateUserInfo(this.tempRow).then(res => {
          this.$message.success('已修改！')
          _done()
        })
      } else {
        const params = omit(this.tempRow, 'id')
        createUser(params).then(res => {
          this.$message.success('已新增！')
          _done()
        })
      }
      const _this = this
      function _done() {
        _this.dialogVisible = false
        _this._resetTempRow()
        _this.fetchData()
      }
    }
  }
}
</script>