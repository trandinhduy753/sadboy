import axios from 'axios'
import { refresh_token } from '@/api/client/form.js'
import store from '@/store' // để commit mutation trong Vuex

let isRefreshing = false
let subscribers = []

function onRefreshed(token) {
  subscribers.map(callback => callback(token))
  subscribers = []
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
})

// =================== RESPONSE INTERCEPTOR ===================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Nếu là lỗi 401
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, chờ token mới
        return new Promise((resolve) => {
          addSubscriber(() => {
            resolve(axiosInstance(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Gọi API refresh token
        await refresh_token()
        isRefreshing = false
        onRefreshed()
        return axiosInstance(originalRequest)
      } catch (err) {
        isRefreshing = false
        store.commit('client/account/CHANGE_USER', {})// clear user
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
