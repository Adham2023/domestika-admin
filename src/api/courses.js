import request from '@/utils/request'
import store from '@/store/index'
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

export function uploadResource(params) {
  return request({
    cancelToken: params.cancelTokenSource.token,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progress => {
      console.log('progress: ', Math.floor((progress.loaded / progress.total) * 100) + ' %')
      store.commit('newCourse/set_precentage', Math.floor((progress.loaded / progress.total) * 100))
    },
    url: '/course/uploadResource',
    method: 'POST',
    data: params.formData,
    timeout: 10 * 60 * 1000
  })
}

export function deleteResource(fileName) {
  return request({
    url: '/course/deleteResource',
    data: {
      fileName
    },
    method: 'DELETE'
  })
}
