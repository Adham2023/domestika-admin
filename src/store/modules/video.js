import { getVideoCredentials } from '@/api/video'
const state = {
  videoPreviewDialog: false,
  otp: '',
  playbackInfo: '',
  Title: '',
  current: {
    chapterTitle: '',
    unitTitle: '',
    videoId: '',
    chapterDescription: '',
    unitDescription: ''
  }
}

const mutations = {
  SET_CURRENT_OBJECTS(state, obj) {
    state.current.chapterTitle = obj.chapterTitle
    state.current.unitTitle = obj.unitTitle
    state.current.videoId = obj.videoId
    state.current.unitDescription = obj.unitDescription
    state.current.chapterDescription = obj.chapterDescription
  },
  SET_VIDEO_TITLE(state, title) {
    state.Title = title
  },
  SET_DIALOG(state, status) {
    state.videoPreviewDialog = status
  },
  SET_VIDEO_CREDENTIALS(state, credentials) {
    state.otp = credentials.otp
    state.playbackInfo = credentials.playbackInfo
  }
}

const actions = {
  getVideoCredentials({ commit }, videoId) {
    return new Promise((resolve, reject) => {
      commit('SET_VIDEO_CREDENTIALS', { otp: '', playbackInfo: '' })
      getVideoCredentials(videoId).then(res => {
        console.log('video credentials: ', res.data)
        commit('SET_VIDEO_CREDENTIALS', res.data)
        resolve()
      }).catch(err => {
        commit('SET_VIDEO_CREDENTIALS', { otp: '', playbackInfo: '' })
        console.error(err)
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

