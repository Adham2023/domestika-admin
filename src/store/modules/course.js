import { getCourse } from '@/api/course'
const state = {
  course: {}

}
const mutations = {
  SET_CHAPTER_UNIT(state, param) {
    state.currentChapter = param.currentChapter
    state.currentUnit = param.currentUnit
  },
  SET_COURSE(state, course) {
    state.course = course
  }

}

const actions = {
  GET_COURSE({ commit }, id) {
    return new Promise((resolve, reject) => {
      getCourse(id).then(res => {
        commit('SET_COURSE', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

