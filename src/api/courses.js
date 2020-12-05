import request from '@/utils/request'
// import store from '@/store/index'
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

export function uploadResource(fromData) {
  return request({
    'Content-Type': 'multipart/form-data',
    onUploadProgress: (progress) => {
      // store.commit('newCourse/SET_UPLOAD_PROGRESS', progress)
      console.log('on progress', progress)
    },
    url: '/course/uploadResource',
    method: 'POST',
    fromData
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
