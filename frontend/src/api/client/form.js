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

export const sendOtp = (email) => {
    return axiosInstance.post('/user/forgot-password/send-otp', {
        email: email
    })
}

export const verifyOtp = (email, otp) => {
    console.log('verify:= ', email, otp)
    return axiosInstance.post('/user/forgot-password/verify-otp', {
        email: email,
        otp: otp
    })
}

export const resetPassword = (email, password, password_confirmation) => {
    return axiosInstance.post('/user/forgot-password/reset', {
        email: email,
        password: password,
        password_confirmation: password_confirmation
    })
}