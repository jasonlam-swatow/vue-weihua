import request from '@/utils/request'

export function getTankList(page) {
  return request({
    url: `/v1/tankers/?pageNum=${page}`,
    method: 'get'
  })
}

export function deleteTank(id) {
  return request({
    url: `/v1/tankers/${id}`,
    method: 'delete'
  })
}
