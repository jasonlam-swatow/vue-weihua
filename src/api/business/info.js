import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/business/info',
    method: 'get'
  })
}
