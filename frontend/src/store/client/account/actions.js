import {  infor_user, edit_user, get_list_announce, get_list_voucher  } from '@/api/client/user.js';
import { accountClient } from '@/constant'
export default {
    async [accountClient.get_infor_user] ({commit}) {
        try {
            const res = await infor_user()
            console.log(res)
            commit('CHANGE_USER', res.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [accountClient.edit_user] ({ commit }, {user_id, data}) {
        try {
            const res = await edit_user(user_id, data)
            commit('CHANGE_USER', res.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [accountClient.get_list_announce] ({ commit }, {user_id, start, end}) {
        try {
            const res = await get_list_announce(user_id, start, end)
            if(start == 0) {
                commit('CHANGE_ANNOUNCES', res.data)
            }
            else {
                commit('ADD_ANNOUNCES_TO_LIST', res.data)
            }
           
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [accountClient.get_list_voucher] ({ commit }, {user_id, start, end}) {
        try {
            const res = await get_list_voucher(user_id, start, end)
            if(start == 0) {
                commit('CHANGE_VOUCHERS', res.data)
            }
            else {
                commit('ADD_VOUCHERS_TO_LIST', res.data)
            }
           
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    }
}