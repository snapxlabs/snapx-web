import request from '@/utils/request'

export function pageNotification(parameter) {
  return request({
    url: '/infra/notification/page-notification',
    method: 'get',
    params: parameter,
  })
}

export function findNotification(id) {
  return request({
    url: `/infra/notification/find-notification/${id}`,
    method: 'get',
  })
}

export function createNotification(data) {
  return request({
    url: '/infra/notification/create-notification',
    method: 'post',
    data,
  })
}

export function updateNotification(id, data) {
  return request({
    url: `/infra/notification/update-notification/${id}`,
    method: 'post',
    data,
  })
}

export function deleteNotification(id) {
  return request({
    url: `/infra/notification/delete-notification/${id}`,
    method: 'post',
  })
}

export function sendNotification(id) {
  return request({
    url: `/infra/notification/send-notification/${id}`,
    method: 'post',
  })
}
