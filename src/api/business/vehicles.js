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
    url: `/trailers/${id}`,
    method: 'get'
  })
}

export function createTrailer(data) {
  return request({
    url: '/trailers/',
    method: 'get',
    data: data
  })
}

export function editTrailer(id, data) {
  return request({
    url: `/trailers/${id}`,
    method: 'put',
    data: data
  })
}
