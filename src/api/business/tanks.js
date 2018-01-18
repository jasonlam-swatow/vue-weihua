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

export function getTankInfo(id) {
  return request({
    url: `/v1/tankers/${id}`,
    method: 'get'
  })
}

export function createTank(data) {
  return request({
    url: '/v1/tankers/',
    method: 'post',
    data: data
  })
}

export function editTank(id, data) {
  return request({
    url: `/v1/tankers/${id}`,
    method: 'put',
    data: data
  })
}
