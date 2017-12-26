import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/orders/collaborators',
    method: 'get'
  })
}
