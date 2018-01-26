import request from '@/utils/request'

export function getBasicInfo() {
  return request({
    url: '/v1/business/info/basic/',
    method: 'get'
  })
}

export function getCertInfo() {
  return request({
    url: '/v1/business/info/cert/',
    method: 'get'
  })
}

