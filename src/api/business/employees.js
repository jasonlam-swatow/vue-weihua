import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/employees/',
    method: 'get',
    params
  })
}

export function getEmployeeInfo(id) {
  return request({
    url: `/employees/${id}`,
    method: 'get'
  })
}

export function deleteEmployee(id) {
  return request({
    url: `/employees/${id}`,
    method: 'delete'
  })
}

export function createEmployee(data) {
  return request({
    url: '/employees/',
    method: 'post',
    data: data
  })
}

export function editEmployee(id, data) {
  return request({
    url: `/employees/${id}`,
    method: 'put',
    data: data
  })
}
