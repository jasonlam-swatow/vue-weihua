<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <header class="info-header">
          <h4>{{companyName}}</h4>
          <el-button type="text" @click="onEditBusiness">
            <svg-icon icon-class="building"></svg-icon>修改企业信息</el-button>
          <el-button type="text" @click="dialogFormVisible = true">
            <svg-icon icon-class="user-o"></svg-icon>仅修改紧急联系人信息</el-button>
        </header>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            :key="tabData.name"
            :name="tabData.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tabData.icon"></svg-icon>
              {{tabData.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="企业名称" class="full-width">
                {{tempInfo.content.name}}
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                {{tempInfo.content.registrationNo}}
              </el-form-item>
              <el-form-item label="状态">
                {{$_.find(enterpriseStatusTypes, ['code', tempInfo.content.type]) &&
            $_.find(enterpriseStatusTypes, ['code', tempInfo.content.type]).value}}
              </el-form-item>
               <el-form-item label="公司类型">
                {{$_.find(enterpriseTypes, ['code', tempInfo.content.enterpriseType]) &&
            $_.find(enterpriseStatusTypes, ['code', tempInfo.content.enterpriseType]).value}}
              </el-form-item>
               <el-form-item label="成立日期">
                 {{tempInfo.content.fundationDate/1000 | moment('YYYY/MM/DD')}}
              </el-form-item>
              <el-form-item label="法定代表人">
                 {{tempInfo.content.legalPerson}}
              </el-form-item>
              <el-form-item label="注册资本">
                 {{tempInfo.content.registeredCapital}}
              </el-form-item>
              <el-form-item label="注册地">
                 {{tempInfo.content.registrationAuthority}}
              </el-form-item>
              <el-form-item label="注册状态">
                 {{$_.find(enterpriseStatusTypes, ['code', tempInfo.content.status]) &&
            $_.find(enterpriseStatusTypes, ['code', tempInfo.content.status]).value}}
              </el-form-item>
              <el-form-item label="操作范围" >
                 {{tempInfo.content.operationScope}}
              </el-form-item>
              <el-form-item label="企业业务类型">
                 {{$_.find(businessTypes, ['code', tempInfo.content.businessType]) &&
            $_.find(businessTypes, ['code', tempInfo.content.businessType]).value}}
              </el-form-item>
              <el-form-item label="紧急联系人">
                 {{tempInfo.content.contactName}}               
              </el-form-item>
              <el-form-item label="企业地址">
                 {{tempInfo.content.address}}
              </el-form-item>
              <el-form-item label="紧急联系电话">
                 {{tempInfo.content.contactMobile}}
              </el-form-item>
              <el-form-item label="经营类型" class="full-width">
                <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
                  <el-tree
                    :data="vehicleBusinessTypes"
                    show-checkbox
                    node-key="id"
                    @check-change="onTreeCheck"
                    :default-expand-all="true"
                    :default-expanded-checked-keys="tabData.content.businessTerm"></el-tree>
                </div>
              </el-form-item>
              <el-form-item
                v-if="$_.find(tabData.content.certifications, ['title', '企业营业执照'])"
                label="企业营业执照"
                class="full-width">
                <figure v-if="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'A' })">
                  <img :src="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'A' }).path">
                </figure>
                <figure v-if="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'B' })">
                  <img :src="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'B' }).path">
                </figure>
                <figure v-if="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'C' })">
                  <img :src="$_.find(tempInfo.content.certifications, { title: '企业营业执照', type: 'C' }).path">
                </figure>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业道路运输经营许可证
            </span>
             <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                v-if="$_.find(tempInfo.content.certifications, ['title', '企业道路运输经营许可证'])"
                label="企业道路运输经营许可证"
                class="full-width">
                <!-- <el-form-item label="关联挂车号">{{tempInfo.content.plateNo}}</el-form-item> -->
                <figure v-if="$_.find(tempInfo.content.certifications, { title: '企业道路运输经营许可证', type: 'A' })">
                  <img :src="$_.find(tempInfo.content.certifications, { title: '企业道路运输经营许可证', type: 'A' }).path">
                </figure>
                <h5 class="sub-title">
                     <span>道路运输经营许可证号: {{$_.find(tempInfo.content.certifications, { title: '企业道路运输经营许可证', type: 'A' }).licenseNo}}</span>
                    <span>有效期: {{$_.find(tempInfo.content.certifications, { title: '企业道路运输经营许可证', type: 'A' }).expireDate}}</span>
                  </h5>
              </el-form-item>
             </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业安全责任承诺书
            </span>
             <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                v-if="$_.find(tempTankInfo.certifications, ['title', '企业安全责任承诺书'])"
                label="企业安全责任承诺书"
                class="full-width">
                <!-- <el-form-item label="关联挂车号">{{tempTankInfo.plateNo}}</el-form-item> -->
                <figure v-if="$_.find(tempTankInfo.certifications, { title: '企业安全责任承诺书', type: 'A' })">
                  <img :src="$_.find(tempTankInfo.certifications, { title: '企业安全责任承诺书', type: 'A' }).path">
                </figure>
                <h5 class="sub-title">
                    <p>要求：下载->填写->盖公章->彩色件扫描上传</p>
                    <div><a href="">点击此处下载</a> 道路危险货物运输企业安全承诺书.pdf</div>
                  </h5>
              </el-form-item>
             </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="修改紧急救援联系人信息" :visible.sync="dialogFormVisible">
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
    </el-dialog>
  </div>
</template>

<script>
import { getEnterpriseInfo } from '@/api/business/enterprises'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tempInfo: {},
      dataLoading: {
        basic: true,
        cert: true
      },
      companyName: '',
      businessInfo: null,
      activeTab: 'first',
      certTabList: [{
        name: 'first',
        label: '其他认证信息',
        icon: 'approve',
        content: null
      }],
      dialogFormVisible: false,
      contact: {
        name: '',
        tel: '',
        code: ''
      },
      contactFormRules: {
        name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, message: '联系人姓名应不少于二个字', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'enterpriseStatusTypes',
      'enterpriseTypes',
      'businessTypes',
      'basicInfo'
    ])
  },
  methods: {
    fetchData() {
      this.dataLoading.basic = true
      getEnterpriseInfo()
    },

    onEditBusiness() {
      this.$confirm('修改后需要重新审核，确定需要修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '放弃修改',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/business/info/edit' })
      }).catch(() => {
        this.$message.info('已放弃修改')
      })
    }
  }
}
</script>