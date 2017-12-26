import request from '@/utils/request'

export function getBasicInfo() {
  return request({
    url: '/business/info/basic',
    method: 'get'
  })
}

export function getCertInfo() {
  return request({
    url: '/business/info/cert',
    method: 'get'
  })
}
