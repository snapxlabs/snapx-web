import request from '@/utils/request'

export function pageVersion(parameter) {
  return request({
    url: '/system/version/page',
    method: 'get',
    params: parameter,
  })
}

export function createVersion(data) {
  return request({
    url: '/system/version/create',
    method: 'post',
    data,
  })
}

export function editVersion(id, data) {
  return request({
    url: `/system/version/edit/${id}`,
    method: 'post',
    data,
  })
}

export function deleteVersion(id) {
  return request({
    url: `/system/version/delete/${id}`,
    method: 'post',
  })
}

export function getVersion(id) {
  return request({
    url: `/system/version/${id}`,
    method: 'get',
  })
}

