import request from '@/utils/request'

export function getDict(type) {
  return request({
    url: `/v1/dictionarys/?ct=${type}`,
    method: 'get'
  })
}
