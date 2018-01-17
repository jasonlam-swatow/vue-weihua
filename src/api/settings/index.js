import request from '@/utils/request'

export function getSettingList() {
  return request({
    url: '/v1/settings/',
    method: 'get'
  })
}

export function saveSettings(data, id) {
  return request({
    url: `/v1/settings/${id}`,
    method: 'put',
    data
  })
}
