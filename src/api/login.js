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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getMenus() {
  return request({
    url: '/v1/menus/mine',
    method: 'get'
  })
}
