import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response
    switch (status) {
      case 204:
        break
      case 401:
      case 405:
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
        break
      default:
        if (data.code !== 'OK') {
          console.log(data.code)
          Message({
            message: `请求错误：${JSON.stringify(data)}`,
            type: 'error',
            duration: 3 * 1000,
            showClose: true
          })
          return Promise.reject('error')
        } else {
          return data
        }
    }
  },
  error => {
    const { status, data } = error.response
    const { code, message } = data
    switch (status) {
      case 401:
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
        break
      default:
        Message({
          message: `${status} ${code}: ${message}`,
          type: 'error',
          duration: 3 * 1000,
          showClose: true
        })
    }
    // console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
