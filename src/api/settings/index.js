import request from '@/utils/request'

export function getSettingList() {
  return request({
    url: '/settings/',
    method: 'get'
  })
}

export function saveSettings(data, id) {
  return request({
    url: `/settings/${id}`,
    method: 'put',
    data
  })
}
