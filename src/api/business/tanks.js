import request from '@/utils/request'

export function getTanksList() {
  return request({
    url: '/business/tanks',
    method: 'get'
  })
}
