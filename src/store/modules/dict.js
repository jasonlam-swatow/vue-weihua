import { getDict } from '@/api/dict'

const dict = {
  state: {
    vehicleTypes: [],
    licensePlateTypes: [],
    statusTypes: [],
    positionTypes: [],
    tankerTypes: [],
    enterpriseStatusTypes: [
      { code: 'RESIDUAL', value: '存续' },
      { code: 'CANCELLATION', value: '注销' },
      { code: 'MIGRATION', value: '迁出' },
      { code: 'RECOVATION', value: '吊销' }
    ],
    enterpriseTypes: [],
    certificationStatusTypes: [
      { code: 'NORMAL', value: '正常' },
      { code: 'WILL_ABNORMAL', value: '将到期' },
      { code: 'ABNORMAL', value: '到期' }
    ],
    businessTypes: [
      { code: 'TRANSPORT', value: '运输企业' },
      { code: 'PRODUCTION', value: '生产企业' },
      { code: 'STORAGE', value: '仓储企业' }
    ],
    genderTypes: [
      { code: 'FEMALE', value: '女' },
      { code: 'MALE', value: '男' }
    ],
    vehicleBusinessTypes: [{
      id: 1,
      label: '爆炸品',
      children: [{
        id: 10,
        label: '具有整体爆炸危险的物质和物品'
      }, {
        id: 11,
        label: '有迸射危险，但无整体爆炸危险的物质和物品'
      }, {
        id: 12,
        label: '具有燃烧危险并有局部爆炸危险或局部迸射危险或者两种危险都有，但无整体爆炸危险的物质和物品'
      }, {
        id: 13,
        label: '不呈现重大危险的物质和物品'
      }, {
        id: 14,
        label: '有整体爆炸危险的非常不敏感物质'
      }, {
        id: 15,
        label: '无整体爆炸危险的极端不敏感物质'
      }]
    }, {
      id: 2,
      label: '气体',
      children: [{
        id: 16,
        label: '易燃气体'
      }, {
        id: 17,
        label: '非易燃无毒气体'
      }, {
        id: 18,
        label: '毒性气体'
      }]
    }, {
      id: 3,
      label: '易燃液体',
      children: []
    }, {
      id: 4,
      label: '易燃固体、易于自燃的物质、遇水放出易燃气体的物质',
      children: [{
        id: 19,
        label: '易燃固体、自反应物质和固态退敏爆炸品'
      }, {
        id: 20,
        label: '易于自燃的物质'
      }, {
        id: 21,
        label: '遇水放出易燃气体的物质'
      }]
    }, {
      id: 5,
      label: '氧化性物质和有机过氧化物',
      children: [{
        id: 22,
        label: '氧化性物质'
      }, {
        id: 23,
        label: '有机过氧化物'
      }]
    }, {
      id: 6,
      label: '毒性物质和感染性物质',
      children: [{
        id: 24,
        label: '毒性物质'
      }, {
        id: 25,
        label: '感染性物质'
      }]
    }, {
      id: 7,
      label: '放射性物质',
      children: []
    }, {
      id: 8,
      label: '腐蚀性物质',
      children: []
    }, {
      id: 9,
      label: '腐杂项危险物质和物品，包括危害环境物质',
      children: []
    }]
  },

  mutations: {
    GET_ENTERPRISE_TYPES: (state, enterpriseTypes) => {
      state.enterpriseTypes = enterpriseTypes
    },
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
    },
    GET_TANKER_TYPES: (state, tankerTypes) => {
      state.tankerTypes = tankerTypes
    }
  },

  actions: {
    // 获取企业类型定义
    GetEnterpriseTypes({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('ENTERPRISE_TYPE').then(response => {
          commit('GET_ENTERPRISE_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取车辆定义
    GetVehicleTypes({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('VEHICLE_TYPE').then(response => {
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
        getDict('LICENSE_PLATE_TYPE').then(response => {
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
        getDict('STATUS').then(response => {
          commit('GET_STATUS_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取状态定义
    GetPositionType({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('POSITION').then(response => {
          commit('GET_POSITION_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取罐体定义
    GetTankerType({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict('TANKERTYPE').then(response => {
          commit('GET_TANKER_TYPES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
