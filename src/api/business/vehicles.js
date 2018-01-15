import request from '@/utils/request'

export function getVehicleList(params) {
  return request({
    url: `/trailers/`,
    method: 'get',
    params
  })
}

export function deleteVehicle(id) {
  return request({
    url: `/trailers/${id}`,
    method: 'delete'
  })
}
