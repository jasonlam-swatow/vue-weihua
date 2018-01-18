import request from '@/utils/request'

export function getTankList(params) {
  return request({
    url: `/v1/tankers/`,
    method: 'get',
    params
  })
}

export function deleteTank(id) {
  return request({
    url: `/v1/tankers/${id}`,
    method: 'delete'
  })
}
