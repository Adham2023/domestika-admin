
const state = {
  videoPreviewDialog: false
}

const mutations = {
  SET_DIALOG(state, status) {
    state.videoPreviewDialog = status
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

