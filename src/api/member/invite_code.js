import request from '@/utils/request'

export function pageInviteCode(parameter) {
  return request({
    url: '/system/invite-code/page-invite-code',
    method: 'get',
    params: parameter,
  })
}

export function bathCreateInviteCode(params) {
  return request({
    url: '/system/invite-code/bath-create-invite-code',
    method: 'post',
    params,
  })
}
