import request from '@/utils/request'
import qs from 'qs'

export function login(username, password) {
  return request({
    url: '/system/auth/login',
    method: 'post',
    data: qs.stringify({ username, password }),
  })
}

export function findCurrentUserInfo() {
  return request({
    url: '/system/auth/find-current-user-info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/system/auth/logout',
    method: 'post',
  })
}
