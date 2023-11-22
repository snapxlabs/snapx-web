import request from '@/utils/request'

export function listLocalities() {
    return request({
        url: '/infra/locality/list-localities',
        method: 'get',
    })
}

export function listMultilevelLocalities() {
    return request({
        url: '/infra/locality/list-multilevel-localities',
        method: 'get',
    })
}

export function mergeLocalities(sourceId, targetId) {
    return request({
        url: '/infra/locality/merge-localities',
        method: 'post',
        data: {
            sourceId: sourceId,
            targetId: targetId,
        },
    })
}
