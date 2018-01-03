import request from '@/utils/request'

export function getEmployeeList(page) {
  return request({
    url: `/employees/?pageNum=${page}`,
    method: 'get'
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
