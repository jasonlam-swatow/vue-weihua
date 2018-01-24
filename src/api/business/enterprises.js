import request from '@/utils/request'

export function getEnterpriseList(params) {
  return request({
    url: '/v1/enterprises/',
    method: 'get',
    params
  })
}

export function deleteEnterprise(id) {
  return request({
    url: `/v1/enterprises/${id}`,
    method: 'delete'
  })
}
