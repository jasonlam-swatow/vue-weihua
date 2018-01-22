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

export function createRole(data) {
  return request({
    url: '/v1/roles/',
    method: 'post',
    data
  })
}

export function updateRoleInfo(data) {
  const action = data.isEnabled ? 'enable' : 'disable'
  return request({
    url: `/v1/roles/${data.id}?action=${action}`,
    method: 'put',
    data
  })
}

export function linkUsersToRole(users, id) {
  return request({
    url: `/v1/roles/${id}/users`,
    method: 'post',
    data: users
  })
}

export function deleteRole(id) {
  return request({
    url: `/v1/roles/${id}`,
    method: 'delete'
  })
}
