import { getInfo } from '@/api/business/info'

const business = {
  state: {
    info: null
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 获取企业信息
    GetBusinessInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const { data } = response
          commit('SET_INFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default business
