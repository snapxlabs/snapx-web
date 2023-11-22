import request from '@/utils/request'

export function pageFilmMember(parameter) {
  return request({
    url: '/film-member/page',
    method: 'get',
    params: parameter,
  })
}

export function pageFileMemberDetail(parameter) {
  return request({
    url: '/film-member/detail/page',
    method: 'get',
    params: parameter,
  })
}

export function adjustQuantity(data) {
  return request({
    url: '/film-member/adjust-quantity',
    method: 'post',
    data
  })
}