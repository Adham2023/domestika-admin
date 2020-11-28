import { login, getInfo } from '@/api/user'
import localStorageService from '@/utils/LocalStorageService'
import { resetRouter } from '@/router'
const lcStorage = localStorageService.getService()
console.log('ls: ', lcStorage)
const getDefaultState = () => {
  return {
    token: lcStorage.getAccessToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ACCEESS_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log('data from action: ', data)
        commit('SET_ACCEESS_TOKEN', data.accessToken)
        lcStorage.setToken({ access_token: data.accessToken, refresh_token: data.refreshToken })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log('from get info response: ', response)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { userName, avatar } = data[0]
        console.log('name: ', userName, ' avatar: ', avatar)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', process.env.VUE_APP_BASE_API + '/' + avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      lcStorage.clearToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      lcStorage.clearToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

