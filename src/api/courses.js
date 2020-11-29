import request from '@/utils/request'

export function getListOfCourses() {
  return request({
    url: '/course/all-courses',
    method: 'GET'
  })
}

export function createNewCourse(data) {
  return request({
    url: '/course/create-new-course',
    method: 'POST',
    data
  })
}

export function getACourse(params) {
  return request({
    url: '/course/' + params,
    method: 'GET'
  })
}

