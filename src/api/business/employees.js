import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/v1/employees/',
    method: 'get',
    params
  })
}

export function getEmployeeInfo(id) {
  return request({
    url: `/v1/employees/${id}`,
    method: 'get'
  })
}

export function deleteEmployee(id) {
  return request({
    url: `/v1/employees/${id}`,
    method: 'delete'
  })
}

export function createEmployee(data) {
  return request({
    url: '/v1/employees/',
    method: 'post',
    data
  })
}

export function editEmployee(id, data) {
  return request({
    url: `/v1/employees/${id}`,
    method: 'put',
    data
  })
}

export function reviewEmployee(id, data) {
  return request({
    url: `/v1/employees/${id}/audit`,
    method: 'put',
    data
  })
}
