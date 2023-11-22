import request from '@/utils/request'

export function listCurrencies() {
  return request({
    url: '/infra/currency/list-currencies',
    method: 'post',
  })
}
