import request from '@/utils/request'

export function getEnterpriseInfo() {
  return request({
    url: '/enterprises/',
    method: 'get'
  })
}

