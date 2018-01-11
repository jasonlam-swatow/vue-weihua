import request from '@/utils/request'

export function getEnterpriseInfo(data) {
  return request({
    url: '/enterprises/',
    method: 'get',
    params: data
  })
}

