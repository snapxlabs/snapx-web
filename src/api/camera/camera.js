import request from '@/utils/request'

export function pageCamera(parameter) {
  return request({
    url: '/camera/page',
    method: 'get',
    params: parameter,
  })
}

export function createCamera(data) {
  return request({
    url: '/camera/create',
    method: 'post',
    data,
  })
}

export function editCamera(id, data) {
  return request({
    url: `/camera/edit/${id}`,
    method: 'post',
    data,
  })
}

export function deleteCamera(id) {
  return request({
    url: `/camera/delete/${id}`,
    method: 'post',
  })
}

export function getCamera(id) {
  return request({
    url: `/camera/get/${id}`,
    method: 'get',
  })
}