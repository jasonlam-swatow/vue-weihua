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

export function createEnterprise(data) {
  return request({
    url: '/v1/enterprises/',
    method: 'post',
    data: data
  })
}

export function editEnterprise(id, data) {
  return request({
    url: `/v1/enterprise/${id}`,
    method: 'put',
    data: data
  })
}