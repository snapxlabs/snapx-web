import request from '@/utils/request'

export function pageCameraMember(parameter) {
  return request({
    url: '/camera-member/page',
    method: 'get',
    params: parameter,
  })
}
