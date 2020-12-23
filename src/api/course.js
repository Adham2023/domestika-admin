import request from '@/utils/request'

export function getCourse(id) {
  return request({
    url: '/course/' + id,
    method: 'GET'
  })
}

export function downloadFile(f) {
  return request({
    url: '/course/download/' + f,
    method: 'GET',
    responseType: 'arraybuffer'
  })
}
