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
