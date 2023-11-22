import request from '@/utils/request'

export function createRestaurant(data) {
    return request({
        url: '/restaurant/restaurant/create-restaurant',
        method: 'post',
        data,
    })
}

export function updateRestaurant(data) {
    return request({
        url: '/restaurant/restaurant/update-restaurant',
        method: 'post',
        data,
    })
}

export function pageRestaurants(data) {
    return request({
        url: '/restaurant/restaurant/page-restaurants',
        method: 'post',
        data,
    })
}

export function findRestaurant(id) {
    return request({
        url: '/restaurant/restaurant/find-restaurant',
        method: 'post',
        data: {
            'id': id,
        },
    })
}

export function deleteRestaurant(id) {
    return request({
        url: '/restaurant/restaurant/delete-restaurant',
        method: 'post',
        data: {
            'id': id,
        },
    })
}

export function setSpec(id, status) {
    return request({
        url: '/restaurant/restaurant/set-spec',
        method: 'post',
        data: {
            id: id,
            status: status,
        },
    })
}

export function enableWatermark(id, status) {
    return request({
        url: '/restaurant/restaurant/enable-watermark',
        method: 'post',
        data: {
            id: id,
            status: status,
        },
    })
}

export function setVerified(id, status) {
    return request({
        url: '/restaurant/restaurant/set-verified',
        method: 'post',
        data: {
            id: id,
            status: status,
        },
    })
}
