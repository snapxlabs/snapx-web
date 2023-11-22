import request from '@/utils/request'

export function pageAdminUser(parameter) {
  return request({
    url: '/system/admin-user/page-admin-user',
    method: 'get',
    params: parameter,
  })
}

export function createAdminUser(data) {
  return request({
    url: '/system/admin-user/create-admin-user',
    method: 'post',
    data,
  })
}

export function updateAdminUser(id, data) {
  return request({
    url: `/system/admin-user/update-admin-user/${id}`,
    method: 'post',
    data,
  })
}

export function deleteAdminUser(id) {
  return request({
    url: `/system/admin-user/delete-admin-user/${id}`,
    method: 'post',
  })
}

export function findAdminUser(id) {
  return request({
    url: `/system/admin-user/find-admin-user/${id}`,
    method: 'get',
  })
}
