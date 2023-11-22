import request from '@/utils/request'

export function pageActivityMember(parameter) {
  return request({
    url: '/member-activity/page',
    method: 'get',
    params: parameter,
  })
}
