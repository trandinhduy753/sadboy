import { account } from '@/constant'
import { admin_login, get_info_admin, refresh_token,  admin_logout} from '@/api/admin/account.js'
export default {
    async [account.admin_login] ({commit}, data) {
        try {
            
            const res= await admin_login(data)
            commit('CHANGE_EMPLOYEE', res.data.data)
            return {
                ok: "success"
            }
        } 
        catch (error) {
            console.log('error login', error)
            return {
                ok: error
            }
        }
    },
    async [account.get_info_admin] ({commit}) {
        try {
            const res= await get_info_admin()
            commit('CHANGE_EMPLOYEE', res.data.data)
            return {
                ok: "success"
            }
        } 
        catch (error) {
            // var statusCode = error.response.status;
            // if(statusCode == 401) {
            //     const res = await refresh_token()
            //     try {
            //         const res = await get_info_admin()
            //         commit('CHANGE_EMPLOYEE', res.data.data)
            //         return { ok: "success" }
            //     }
            //     catch (error) {
            //         return {
            //             ok: error
            //         }
            //     }
            // }
            return {
                ok: error
            }
        }
    },
    async [account.admin_logout] ({commit}) {
        try {
            const res = await admin_logout()
            commit('CHANGE_EMPLOYEE', {})
            return {
                ok: "success"
            }
        } 
        catch (error) {
            console.log('error logout', error)
            return {
                ok: error
            }
        }
    }
}