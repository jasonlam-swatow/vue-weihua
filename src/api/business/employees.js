import request from '@/utils/request'

export function getEmployeesList() {
  return request({
    url: '/business/employees',
    method: 'get'
  })
}

