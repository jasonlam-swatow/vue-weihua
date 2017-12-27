import request from '@/utils/request'

const typeMap = {
  '在册车辆': 'vehicles',
  '在册罐体': 'tanks',
  '在册员工': 'employees'
}


export function getStatistics(type) {
  return request({
    url: `/dashboard/${typeMap[type]}`,
    method: 'get'
  })
}
