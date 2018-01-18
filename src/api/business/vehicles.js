import request from '@/utils/request'

export function getVehicleList(params) {
  return request({
    url: `/v1/trailers/`,
    method: 'get',
    params
  })
}

export function deleteVehicle(id) {
  return request({
    url: `/v1/trailers/${id}`,
    method: 'delete'
  })
}

export function getTrailerInfo(id) {
  return request({
    url: `/v1/trailers/${id}`,
    method: 'get'
  })
}

export function createTrailer(data) {
  return request({
    url: '/v1/trailers/',
    method: 'post',
    data: data
  })
}

export function editTrailer(id, data) {
  return request({
    url: `/v1/trailers/${id}`,
    method: 'put',
    data: data
  })
}
