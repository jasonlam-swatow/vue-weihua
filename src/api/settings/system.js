import request from '@/utils/request'

export function getSystemSettingList() {
  return request({
    url: '/v1/settings/',
    method: 'get'
  })
}

export function saveSystemSettings(data, id) {
  return request({
    url: `/v1/settings/${id}`,
    method: 'put',
    data
  })
}
