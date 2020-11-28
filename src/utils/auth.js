import Cookies from 'js-cookie'

export function getAccessToken() {
  return Cookies.get('accessToken')
}
export function getRefreshToken() {
  return Cookies.get('refreshToken')
}

export function setAccessToken(token) {
  return Cookies.set('accessToken', token)
}
export function setRefreshToken(token) {
  return Cookies.set('refreshToken', token)
}
export function removeAccessToken() {
  return Cookies.remove('accessToken')
}
export function removeRefreshToken() {
  return Cookies.remove('refreshToken')
}

