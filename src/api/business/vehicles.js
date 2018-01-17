import request from '@/utils/request'

export function getVehicleList(page) {
  return request({
    url: `/trailers/?pageNum=${page}`,
    method: 'get'
  })
}

export function deleteVehicle(id) {
  return request({
    url: `/trailers/${id}`,
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
