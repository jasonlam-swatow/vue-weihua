import request from '@/utils/request'

export function getEmployeesList() {
  return request({
    url: '/business/employees',
    method: 'get'
  })
}

export function getEmployeeInfo(id) {
  return request({
    url: '/business/employees/info',
    method: 'get'
    // data: { 'userId': id }
  })
}

