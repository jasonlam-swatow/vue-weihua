import { getDict } from '@/api/dict'

const dict = {
  state: {
    vehicleTypes: [],
    licensePlateTypes: [],
    statusTypes: [],
    positionTypes: [],
    genderTypes: [
      { code: 'FEMALE', value: '女' },
      { code: 'MALE', value: '男' }
    ]
  },

  mutations: {
    GET_VEHICLE_TYPES: (state, vehicleTypes) => {
      state.vehicleTypes = vehicleTypes
    },
    GET_LICENSE_PLATE_TYPES: (state, licensePlateTypes) => {
      state.licensePlateTypes = licensePlateTypes
    },
    GET_STATUS_TYPES: (state, statusTypes) => {
      state.statusTypes = statusTypes
    },
    GET_POSITION_TYPES: (state, positionTypes) => {
      state.positionTypes = positionTypes
    }
  },

  actions: {
    // 获取车辆定义
    GetVehicleTypes({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('VEHICLE_TYPES').then(response => {
          commit('GET_VEHICLE_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取车牌定义
    GetLicensePlateTypes({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('LICENSE_PLATE_TYPES').then(response => {
          commit('GET_LICENSE_PLATE_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取车牌定义
    GetStatusType({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('STATUS_TYPES').then(response => {
          commit('GET_STATUS_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取车牌定义
    GetPositionType({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('POSITION_TYPES').then(response => {
          commit('GET_POSITION_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
