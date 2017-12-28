import request from '@/utils/request'

export function getVehiclesList() {
  return request({
    url: '/business/vehicles',
    method: 'get'
  })
}
