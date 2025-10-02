import { client_register, login } from '@/api/client/form.js';
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
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
}