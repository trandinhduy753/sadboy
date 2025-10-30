import { authorization } from '@/constant/index.js'
import { get_authorization, save_authorization } from '@/api/admin/authorization.js';
export default {
    async [authorization.get_authorization] ({commit}, employee_id) {
        try {
            const res= await get_authorization(employee_id)
            if(res.status === 200 ) {
                commit('CHANGE_PERMISSIONS', res.data.data)
            }
            
            return {
                ok: "success"
            }
        } 
        catch (error) {
            commit('CHANGE_PERMISSIONS', {})
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [authorization.save_authorization] ({commit}, {employee_id, permissions}) {
        try {
            const res= await save_authorization(employee_id, permissions)
            commit('CHANGE_PERMISSIONS', res.data.data)
            return {
                ok: "success"
            }
        } 
        catch (error) {
            console.log('error login', error)
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    }
}