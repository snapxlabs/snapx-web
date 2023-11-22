import request from '@/utils/request'

export function pageReviews(data) {
  return request({
    url: '/restaurant/review/page-reviews',
    method: 'post',
    data,
  })
}

export function findReview(id) {
  return request({
    url: '/restaurant/review/find-review',
    method: 'post',
    data: {
      'id': id,
    },
  })
}

export function createReview(data) {
  return request({
    url: '/restaurant/review/create-review',
    method: 'post',
    data,
  })
}

export function updateReview(data) {
  return request({
    url: '/restaurant/review/update-review',
    method: 'post',
    data,
  })
}

export function deleteReview(id) {
  return request({
    url: '/restaurant/review/delete-review',
    method: 'post',
    data: {
      id: id,
    },
  })
}

export function updateEarned(id, earned) {
  return request({
    url: '/restaurant/review/update-earned',
    method: 'post',
    data: {
      id: id,
      earned: earned,
    },
  })
}

export function pageRestaurantCommentes(parameter) {
  return request({
    url: '/restaurant/review-comments/page',
    method: 'get',
    params: parameter,
  })
}

export function deleteRestaurantCommentes(id) {
  return request({
    url: `/restaurant/review-comments/delete/${id}`,
    method: 'post'
  })
}
