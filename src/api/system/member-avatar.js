import request from '@/utils/request'

export function listMemberAvatar() {
  return request({
    url: '/system/member-avatar/list-member-avatar',
    method: 'get',
  })
}

export function createMemberAvatar(data) {
  return request({
    url: '/system/member-avatar/create-member-avatar',
    method: 'post',
    data,
  })
}

export function updateMemberAvatar(data) {
  return request({
    url: '/system/member-avatar/update-member-avatar',
    method: 'post',
    data,
  })
}

export function deleteMemberAvatar(data) {
  return request({
    url: '/system/member-avatar/delete-member-avatar',
    method: 'post',
    data,
  })
}