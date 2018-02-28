import request from '@/utils/request'

export function getStatistics(id) {
  return request({
    url: `/v1/enterprises/${id}/statistics/`,
    method: 'get'
  })
}
