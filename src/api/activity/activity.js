import request from '@/utils/request'

export function pageActivity(parameter) {
  return request({
    url: '/system/activity/page',
    method: 'get',
    params: parameter,
  })
}

export function createActivity(data) {
  return request({
    url: '/system/activity/create',
    method: 'post',
    data,
  })
}

export function editActivity(id, data) {
  return request({
    url: `/system/activity/edit/${id}`,
    method: 'post',
    data,
  })
}

export function deleteActivity(id) {
  return request({
    url: `/system/activity/delete/${id}`,
    method: 'post',
  })
}

export function getActivity(id) {
  return request({
    url: `/system/activity/${id}`,
    method: 'get',
  })
}

export function getActivitySvg(id) {
  return request({
    url: `/system/activity/svg/${id}`,
    method: 'get',
  })
}