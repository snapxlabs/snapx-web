import request from '@/utils/request'

export function pageAccounts(parameter) {
  return request({
    url: '/trade/points-accounts/page-accounts',
    method: 'get',
    params: parameter,
  })
}

export function pageAccountsDetails(parameter) {
  return request({
    url: '/trade/points-accounts/page-accounts-details',
    method: 'get',
    params: parameter,
  })
}

export function updateAccounts(data) {
  return request({
    url: '/trade/points-accounts/update-accounts',
    method: 'post',
    data,
  })
}
