import request from '@/utils/request'

const lisenceMap = {
  '企业证照': 'business',
  '员工证照': 'employee',
  '车辆证照': 'vehicle',
  '罐体证照': 'tank'
}

export function getLisence(lisenceType) {
  return request({
    url: `/settings/system/${lisenceMap[lisenceType]}`,
    method: 'get'
  })
}
