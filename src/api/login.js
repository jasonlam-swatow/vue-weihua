import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/v1/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/v1/profile/',
    method: 'get'
  })
}

export function logout(username, password) {
  return request({
    url: '/v1/logout',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getMenus() {
  return request({
    url: '/v1/menus/mine',
    method: 'get'
  })
}
