import { getBasicInfo, getCertInfo } from '@/api/business/info'

const business = {
  state: {
    basicInfo: null,
    certInfo: null
  },

  mutations: {
    SET_BUSINESS_BASIC: (state, basicInfo) => {
      state.basicInfo = basicInfo
    },
    SET_BUSINESS_CERT: (state, certInfo) => {
      state.certInfo = certInfo
    }
  },

  actions: {
    // 获取基本信息
    GetBasicInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getBasicInfo().then(response => {
          const { data } = response
          commit('SET_BUSINESS_BASIC', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取认证信息
    GetCertInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getCertInfo().then(response => {
          const { data } = response
          commit('SET_BUSINESS_CERT', data.info)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default business
