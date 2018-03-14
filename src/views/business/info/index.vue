<template>
  <div class="app-container">
    <el-row>
      <el-col v-if="enterpriseId && !dialogSelectVisible" :span="24">
        <header class="info-header">
          <h4>{{companyName}}</h4>
          <el-button type="text" @click="onEditBusiness">
            <svg-icon icon-class="building"></svg-icon>修改企业信息</el-button>
          <!-- <el-button type="text" @click="dialogFormVisible = true">
            <svg-icon icon-class="user-o"></svg-icon>仅修改紧急联系人信息</el-button> -->
        </header>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="cubes"></svg-icon>
              基本信息
            </span>
            <el-form :inline="true" label-width="130px" class="strange-input view-form">
              <el-form-item label="企业名称">{{enterpriseData.name}}</el-form-item>
              <el-form-item label="统一社会信用代码">{{enterpriseData.registrationNo}}</el-form-item>
              <el-form-item label="状态">
                {{$_.find(statusTypes, ['code', enterpriseData.status]) &&
                  $_.find(statusTypes, ['code', enterpriseData.status]).value}}
              </el-form-item>
              <el-form-item label="公司类型">
                {{$_.find(enterpriseTypes, ['code', enterpriseData.enterpriseType]) &&
                  $_.find(enterpriseTypes, ['code', enterpriseData.enterpriseType]).value}}
              </el-form-item>
              <el-form-item label="成立日期">{{enterpriseData.fundationDate/1000 | moment('YYYY-MM-DD')}}</el-form-item>
              <el-form-item label="法定代表人">{{enterpriseData.legalPerson}}</el-form-item>
              <el-form-item label="注册资本">{{enterpriseData.registeredCapital}}</el-form-item>
              <el-form-item label="注册地">{{enterpriseData.registrationAuthority}}</el-form-item>
              <el-form-item label="经营状态">
                {{$_.find(enterpriseStatusTypes, ['code', enterpriseData.registrationStatus]) &&
                  $_.find(enterpriseStatusTypes, ['code', enterpriseData.registrationStatus]).value}}
              </el-form-item>
              <!-- <el-form-item label="操作范围">{{enterpriseData.operationScope}}</el-form-item> -->
              <el-form-item label="企业业务类型">
                {{$_.find(businessTypes, ['code', enterpriseData.businessType]) &&
                  $_.find(businessTypes, ['code', enterpriseData.businessType]).value}}
              </el-form-item>
              <el-form-item label="紧急联系人">{{enterpriseData.contactName}}</el-form-item>
              <el-form-item label="企业地址">{{enterpriseData.address}}</el-form-item>
              <el-form-item label="紧急联系电话">{{enterpriseData.contactMobile}}</el-form-item>
              <el-form-item label="经营类型" class="full-width">
                <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
                  <el-tree
                    :data="tempVehicleBusinessTypes"
                    :default-expand-all="true"
                    ></el-tree>
                  <!-- <el-tree
                    ref="tree"
                    :data="vehicleBusinessTypes"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="true"
                    :default-checked-keys="enterpriseData.businessTerm"></el-tree> -->
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业营业执照
            </span>
             <el-form :inline="true" label-width="130px" class="strange-input view-form">
              <el-form-item
                v-if="$_.find(enterpriseData.certifications, ['title', '企业营业执照'])"
                label="企业营业执照"
                class="full-width">
                <figure v-if="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'A' })">
                  <img :src="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'A' }).path">
                  <figcaption>企业营业执照</figcaption>
                </figure>
                <figure v-if="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'B' })">
                  <img :src="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'B' }).path">
                  <figcaption>企业组织机构代码证</figcaption>
                </figure>
                <figure v-if="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'C' })">
                  <img :src="$_.find(enterpriseData.certifications, { title: '企业营业执照', type: 'C' }).path">
                  <figcaption>企业税务登记证</figcaption>
                </figure>
              </el-form-item>
             </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="approve"></svg-icon>
              企业道路运输经营许可证
            </span>
             <el-form :inline="true" label-width="170px" class="strange-input view-form">
              <el-form-item
                v-if="$_.find(enterpriseData.certifications, ['title', '企业道路运输经营许可证'])"
                label="企业道路运输经营许可证"
                class="full-width">
                <figure v-if="$_.find(enterpriseData.certifications, { title: '企业道路运输经营许可证', type: 'A' })">
                  <img :src="$_.find(enterpriseData.certifications, { title: '企业道路运输经营许可证', type: 'A' }).path">
                  <figcaption>企业道路运输经营许可证</figcaption>
                </figure>
                <h5 class="sub-title">
                  <span>有效期: {{($_.find(enterpriseData.certifications, { title: '企业道路运输经营许可证', type: 'A' }).expireDate)/1000 | moment('YYYY-MM-DD')}}</span>
                </h5>
              </el-form-item>
              <el-form-item
                v-if="$_.find(enterpriseData.certifications, ['title', '企业安全责任承诺书'])"
                label="企业安全责任承诺书"
                class="full-width">
                <figure v-if="$_.find(enterpriseData.certifications, { title: '企业安全责任承诺书', type: 'A' })">
                  <img :src="$_.find(enterpriseData.certifications, { title: '企业安全责任承诺书', type: 'A' }).path">
                  <figcaption>企业安全责任承诺书</figcaption>
                </figure>
              </el-form-item>
             </el-form>
          </el-tab-pane>
        </el-tabs>

        <div class="button_area"v-if="enterpriseData.status !== 'AUDITED'">
          <el-button
            type="success"
            @click="reviewEnterprise(enterpriseData.id, true)">审核通过</el-button>
          <el-button
            type="danger"
            @click="reviewEnterprise(enterpriseData.id, false)">审核不通过</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- <el-dialog title="修改紧急救援联系人信息" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" :rules="contactFormRules">
        <el-form-item label="联系人姓名" prop="name">
          <el-input v-model="contact.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="contact.tel"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="contact.code"></el-input>
        </el-form-item>
        <el-form-item label=" ">
         <el-button type="primary">获取短信验证码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="请选择企业" width="33%" :visible.sync="dialogSelectVisible">
      <el-select v-model="enterpriseId">
        <el-option
          v-for="ent in enterpriseList"
          :key="ent.id"
          :value="ent.id"
          :label="ent.name"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button
          @click="dialogSelectVisible = false; $router.go(-1)">返回</el-button> -->
        <el-button
          type="primary"
          @click="fetchData(enterpriseId)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEnterpriseList,
  getEnterpriseInfo,
  reviewEnterprise
} from '@/api/business/enterprises'
import { mapGetters } from 'vuex'
// import reduce from 'lodash/reduce'
export default {
  data() {
    return {
      tempInfo: {},
      loading: true,
      companyName: '',
      businessInfo: null,
      activeTab: 'first',
      tempVehicleBusinessTypes: [],
      enterpriseId: '',
      enterpriseList: [],
      enterpriseData: {},
      dialogSelectVisible: true
    }
  },
  created() {
    if (this.isView) {
      this.dialogSelectVisible = false
      this.enterpriseId = this.$route.query.id
      this.fetchData(this.enterpriseId)
    } else {
      getEnterpriseList({ pageNum: 1, pageSize: 250 }).then(res => {
        this.enterpriseList = res.data.list
      })
    }
    // this.fetchData()
  },
  computed: {
    ...mapGetters([
      'enterpriseStatusTypes',
      'vehicleBusinessTypes',
      'enterpriseTypes',
      'businessTypes',
      'basicInfo',
      'statusTypes'
    ]),
    isView() {
      return !!this.$route.query.view
    }
  },
  methods: {
    fetchData(id) {
      this.dialogSelectVisible = false
      getEnterpriseInfo(id).then(res => {
        this.enterpriseData = res.data
        this.loading = false
        // this.$refs.tree.setCheckedKeys(this.enterpriseData.businessTerm)
        this.tempVehicleBusinessTypes = this.$_.filter(this.$_.map(this.vehicleBusinessTypes, item => {
          const children = this.$_.filter(item.children, child => this.enterpriseData.businessTerm.includes(child.id))
          return Object.assign({}, item, { children })
        }), elem => elem.children.length > 0)
      })
    },
    onEditBusiness() {
      this.$confirm('修改后需要重新审核，确定需要修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '放弃修改',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/business/info/edit', query: { id: this.enterpriseId }})
      }).catch(() => {
        this.$message.info('已放弃修改')
      })
    },
    reviewEnterprise(id, passedOrNot) {
      if (passedOrNot) {
        this.$confirm('确定审核通过此企业？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviewEnterprise(id, { status: 'AUDITED' }).then(res => {
            this.$message.success('已审核通过！')
            this.dialogVisible = false
            this.fetchData(this.enterpriseData.id)
          })
        })
      } else {
        this.$prompt('请表明审核不通过理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(({ value }) => {
          reviewEnterprise(id, { status: 'UNAUDITED', comment: value }).then(res => {
            this.$message.info('已审核不通过！')
            this.dialogVisible = false
            // console.log(this.enterpriseData.id)
            this.fetchData(this.enterpriseData.id)
          })
        })
      }
    }
  }
}
</script>