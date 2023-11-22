import request from '@/utils/request'

export function getMemberStatistics(parameter) {
  return request({
    url: '/member/get-member-statistics',
    method: 'get',
    params: parameter,
  })
}

export function pageContentInformation(parameter) {
  return request({
    url: '/system/content-information/page-content-information',
    method: 'get',
    params: parameter,
  })
}

export function findContentInformation(id) {
  return request({
    url: `/system/content-information/find-content-information/${id}`,
    method: 'get',
  })
}

export function createContentInformation(data) {
  return request({
    url: '/system/content-information/create-content-information',
    method: 'post',
    data,
  })
}

export function updateContentInformationPublish(id, publish) {
  return request({
    url: `/system/content-information/update-content-information-publish/${id}`,
    method: 'post',
    params: {
      publish
    },
  })
}

export function updateContentInformation(id, data) {
  return request({
    url: `/system/content-information/update-content-information/${id}`,
    method: 'post',
    data,
  })
}

export function deleteContentInformation(id) {
  return request({
    url: `/system/content-information/delete-content-information/${id}`,
    method: 'post',
  })
}
