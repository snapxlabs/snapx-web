import request from '@/utils/request'

export function listCountries() {
  return request({
    url: '/infra/country/list-countries',
    method: 'get',
  })
}
