import request from '@/utils/request'

export function getVideoCredentials(videoId) {
  return request({
    url: 'course/video-credentials/' + videoId,
    method: 'GET'
  })
}
