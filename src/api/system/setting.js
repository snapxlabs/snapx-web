import request from '@/utils/request'

export function getSetting() {
  return request({
    url: '/system/setting/get',
    method: 'get',
  })
}

export function editSetting(data) {
  return request({
    url: '/system/setting/edit',
    method: 'post',
    data,
  })
}