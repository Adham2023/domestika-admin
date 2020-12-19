import request from '@/utils/request'

export function getVideoCredentials(videoId) {
  return request({
    url: 'course/vide-credentials/' + videoId,
    method: 'GET'
  })
}
