import request from '@/utils/request'

export function getMemberStatistics(parameter) {
  return request({
    url: '/member/get-member-statistics',
    method: 'get',
    params: parameter,
  })
}

export function pageMember(parameter) {
  return request({
    url: '/member/page-member',
    method: 'get',
    params: parameter,
  })
}

export function pageInviteeMember(parameter) {
  return request({
    url: '/member/page-invitee-member',
    method: 'get',
    params: parameter,
  })
}

export function pageInviterCommission(parameter) {
  return request({
    url: '/member/page-inviter-commission',
    method: 'get',
    params: parameter,
  })
}

export function findMember(id) {
  return request({
    url: `/member/find-member/${id}`,
    method: 'get',
  })
}

export function updateMemberFreeze(id, data) {
  return request({
    url: `/member/update-member-freeze/${id}`,
    method: 'post',
    data,
  })
}

export function pageEventPerMonth(parameter) {
  return request({
    url: '/member/page-event-per-month',
    method: 'get',
    params: parameter,
  })
}

export function pageEventPerDay(parameter) {
  return request({
    url: '/member/page-event-per-day',
    method: 'get',
    params: parameter,
  })
}

export function pageEventPerHour(parameter) {
  return request({
    url: '/member/page-event-per-hour',
    method: 'get',
    params: parameter,
  })
}

export function createMember(data) {
  return request({
    url: '/member/create-member',
    method: 'post',
    data,
  })
}

export function updateMember(id, data) {
  return request({
    url: `/member/update-member/${id}`,
    method: 'post',
    data,
  })
}
