import axiosInstance from '@/api/axios.js';

export const admin_login = (data) => {
    return axiosInstance.post('/admin/auth/login', data)
}

export const get_info_admin = () => {
    return axiosInstance.get('/admin/auth/me')
}

export const refresh_token = () => {
    return axiosInstance.post('http://localhost:8000/api/admin/auth/refresh', {
        withCredentials: true
    })
}

export const admin_logout = () => {
    return axiosInstance.post('/admin/auth/logout')
}