import request from '@/utils/request'

export function getEnterpriseInfo(data) {
  return request({
    url: '/v1/enterprises/',
    method: 'get',
    params: data
  })
}

