import axios from 'axios'
import { refresh_token } from '@/api/client/form.js'
import store from '@/store'
import router from '@/router'

let isRefreshing = false
let subscribers = []

function onRefreshed(token) {
  subscribers.forEach(callback => callback(token))
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
    Accept: 'application/json',
  },
})

// ========== RESPONSE INTERCEPTOR ==========
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Nếu 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        // Đợi token mới được refresh xong
        return new Promise((resolve) => {
          addSubscriber((token) => {
            resolve(axiosInstance(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        // Gọi API refresh token
        const res = await refresh_token()

        // Cập nhật token mới nếu backend trả về (nếu dùng cookie thì không cần)
        const newToken = res?.data?.access_token
        if (newToken) {
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`
        }

        isRefreshing = false
        onRefreshed(newToken)

        // Thử lại request ban đầu
        return axiosInstance(originalRequest)
      } catch (err) {
        console.error('Refresh token failed:', err)
        isRefreshing = false
        store.commit('client/account/CHANGE_USER', {}) // clear user
        router.push({ name: 'form', query: { opt: 'login' } })
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
