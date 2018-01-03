import request from '@/utils/request'

export function getTankList(page) {
  return request({
    url: `/tankers/?pageNum=${page}`,
    method: 'get'
  })
}

export function deleteTank(id) {
  return request({
    url: `/tankers/${id}`,
    method: 'delete'
  })
}
