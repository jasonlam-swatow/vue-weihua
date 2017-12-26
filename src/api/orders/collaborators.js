import request from '@/utils/request'

export function getCollaborators() {
  return request({
    url: '/orders/collaborators',
    method: 'get'
  })
}
