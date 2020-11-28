import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getAccessToken, getRefreshToken} from '@/utils/auth'
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
    console.log('has token', store.getters.token)
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + lcStorage.getAccessToken()
    }
    console.log('befire sending: ')
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
    // const res = response.data
    console.dir(response)
    return response
  },
  error => {
    const originalRequest = error.config;
    console.log('from interseptor error config: ' ) // for debug
    let url = error.config.url.split('/');
    url = url[url.length - 1];
    console.log('url: ', url);
    let statusCode = error.response.status
    console.log('statusCode: ', statusCode)
    console.log(`statusCode === 401 && url !== 'refresh-access-token'`, statusCode === 401 && url !== 'refresh-access-token')
    if (statusCode === 401 && url !== 'refresh-access-token') {
      console.log('refreshing...')
      return service({
        url: '/admin/refresh-access-token',
        method: "POST",
        data: {
          refreshToken: lcStorage.getRefreshToken()
        }
      }).then(response =>  {
        console.log('response after refresh')
        console.log(response.data.accessToken)
        lcStorage.setAccessToken(response.data.accessToken)
        service.defaults.headers.common['Authorization'] ='Bearer ' + response.data.accessToken;
        console.log('sending again:')
        console.dir(service);
        return service(originalRequest)
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
