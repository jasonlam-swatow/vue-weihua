import request from '@/utils/request'

export function getDict(type) {
  return request({
    url: `/dictionarys/?ct=${type}`,
    method: 'get'
  })
}
