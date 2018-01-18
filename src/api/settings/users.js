import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/v1/users/',
    method: 'get',
    params
  })
}

export function getUserInfo(id) {
  return request({
    url: `/v1/users/${id}`,
    method: 'get'
  })
}

export function deleteUser(id) {
  return request({
    url: `/v1/users/${id}`,
    method: 'delete'
  })
}
