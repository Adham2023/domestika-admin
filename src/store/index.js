import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import video from './modules/video'
import course from './modules/course'
import edits from './modules/edits'
import newCourse from './modules/newCourse'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    course,
    video,
    edits,
    newCourse
  },
  getters
})

export default store
