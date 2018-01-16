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
