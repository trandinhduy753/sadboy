import { client_register, login, logout, loginGoogle } from '@/api/client/form.js';
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
            console.log(res)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.log(error)
            console.error('❌ Lỗi khi gọi API:', error)
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
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
}