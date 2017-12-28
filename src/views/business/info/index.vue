<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <header class="info-header">
          <h4>{{companyName}}</h4>
          <el-button type="text" @click="onEditBusiness">
            <svg-icon icon-class="building-o"></svg-icon>修改企业信息</el-button>
          <el-button type="text" @click="dialogFormVisible = true">
            <svg-icon icon-class="user-o"></svg-icon>仅修改紧急联系人信息</el-button>
        </header>

        <business-info :business-info="businessInfo" :loading="dataLoading.basic"></business-info>

        <el-tabs v-model="activeTab" type="card" class="customized" v-loading="dataLoading.cert">
          <el-tab-pane
            v-for="tab in certTabList"
            :key="tab.name"
            :name="tab.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tab.icon"></svg-icon>
              {{tab.label}}
            </span>
            <el-card
              v-for="(item, key) in tab.content"
              :key="key"
              class="box-card mgb12">
              <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
              </div>
              <div>
                <el-row type="flex" justify="space-around">
                  <el-col :span="16">
                    <el-form class="readonly-form">
                      <template v-if="key === 'business_permit'">
                        <el-form-item label="道路运输经营许可证">
                          <span>{{item.permit_num}}</span>
                        </el-form-item>
                        <el-form-item label="有效期">
                          <span>{{item.validity}}</span>
                        </el-form-item>
                      </template>
                      <template v-if="key === 'safety_commitment'">
                        <el-form-item label="要求">
                          <span class="sub-text">下载→填写→盖公章→彩色件扫描上传</span>
                        </el-form-item>
                        <el-form-item label="下载证件">
                          <el-button type="text" icon="el-icon-tickets">{{item.file_name}}</el-button>
                        </el-form-item>
                      </template>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <div style="width: 200px; height: 180px; border: 1px solid red"></div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
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
// import { getInfo } from '@/api/business/info'
import businessInfo from '@/components/businessInfo'

export default {
  data() {
    return {
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

  methods: {
    fetchData() {
      this.dataLoading.basic = true
      this.$store.dispatch('GetBasicInfo').then(res => {
        this.companyName = res.data.name
        this.businessInfo = res.data.info
        this.dataLoading.basic = false
      })

      this.dataLoading.cert = true
      this.$store.dispatch('GetCertInfo').then(res => {
        console.log(res.data.info)
        this.certTabList[0].content = res.data.info
        this.dataLoading.cert = false
      })
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
  },

  components: { businessInfo }
}
</script>