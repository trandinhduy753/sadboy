import  axiosInstance from '@/api/axiosClient.js';

export const client_register = async (data) => {
    
    return axiosInstance.post('/user/register', data)
}

export const login = (data) => {
    return axiosInstance.post('/auth/login', data)
    
}

export const logout = () => {
    return axiosInstance.post('/auth/logout')
}

export const refresh_token = () => {
    return axiosInstance.post('/auth/refresh')
}

export const loginGoogle = () => {
    window.location.href = 'http://localhost:8000/auth/google/redirect'
    
}