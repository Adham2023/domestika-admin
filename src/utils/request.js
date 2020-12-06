import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import localStorageService from '@/utils/LocalStorageService'
const lcStorage = localStorageService.getService()
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + lcStorage.getAccessToken()
    }
    console.dir(config)
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    let url = error.config.url.split('/')
    url = url[url.length - 1]
    const statusCode = error.response.status
    if (statusCode === 401 && url !== 'refresh-access-token') {
      try {
        const response = await service({
          url: '/admin/refresh-access-token',
          method: 'POST',
          data: {
            refreshToken: lcStorage.getRefreshToken()
          }
        })
        lcStorage.setAccessToken(response.data.accessToken)
        return service(error.config)
      } catch (error) {
        console.log('error 403')
        await store.dispatch('user/resetToken')
        router.push({ path: `/login?redirect=${store.state.app.toPath}` })
      }
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
