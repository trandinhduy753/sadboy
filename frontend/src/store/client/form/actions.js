import { client_register, login, logout, loginGoogle, sendOtp, verifyOtp, resetPassword } from '@/api/client/form.js';
import { formClient } from '@/constant'
export default {
    async [formClient.client_register] ({commit}, data) {
        try {
            const res = await client_register(data)
            
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [formClient.login] ({commit}, data) {
        try {
            const res = await login(data);
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            return {
                ok: 'error',
            }
            
            
        }
    },

    async [formClient.logout] ({commit}) {
        try {
            const res = await logout();
            
            commit('client/account/CHANGE_USER', {}, { root: true })
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },

    async [formClient.loginGoogle] ({commit}) {
        try {
            const res = await loginGoogle();
            //commit('client/account/CHANGE_USER', {}, { root: true })
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            
        }
    },
    async [formClient.sendOTP] ({commit}, email) {
        try {
            const res = await sendOtp(email);
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            return {
                ok: 'error',
            }
            
            
        }
    },
    async [formClient.verifyOTP] ({commit}, {email, otp}) {
        try {
            const res = await verifyOtp(email, otp);
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            return {
                ok: 'error',
            }
            
            
        }
    },
    async [formClient.resetPassword] ({commit}, {email, password, password_confirmation}) {
        try {
            const res = await resetPassword(email, password, password_confirmation);
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            return {
                ok: 'error',
            }
            
            
        }
    },
}