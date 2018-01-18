import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/v1/roles/',
    method: 'get',
    params
  })
}

export function getRoleInfo(id) {
  return request({
    url: `/v1/roles/${id}`,
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/v1/roles/${id}`,
    method: 'delete'
  })
}
