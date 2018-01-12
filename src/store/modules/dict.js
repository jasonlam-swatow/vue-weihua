import { getDict } from '@/api/dict'

const dict = {
  state: {
    vehicleTypes: []
  },

  mutations: {
    GET_VEHICLE_TYPES: (state, vehicleTypes) => {
      state.vehicleTypes = vehicleTypes
    }
  },

  actions: {
    // 获取车辆定义
    GetVehicleTypes({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('VT').then(response => {
          commit('GET_VEHICLE_TYPES', response.data[0].children)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
