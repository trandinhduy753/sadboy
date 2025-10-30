import {  infor_user, edit_user, get_list_announce, get_list_voucher  } from '@/api/client/user.js';
import { refresh_token } from '@/api/client/form.js'
import { accountClient } from '@/constant'
export default {
    async [accountClient.get_infor_user] ({commit}) {
        try {
            const res = await infor_user()
            if(res.status === 200 ) {
                commit('CHANGE_USER', res.data.data)
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            var statusCode = error.response.status;
            if(statusCode == 401) {
                try {
                    await refresh_token()
                    const res = await await infor_user()
                    commit('CHANGE_USER', res.data.data)
                    return { ok: "success" }
                }
                catch (error) {
                    return {
                        ok: error
                    }
                }
            }
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [accountClient.edit_user] ({ commit }, {user_id, data}) {
        try {
            const res = await edit_user(user_id, data)
            if(res.status === 200) {
                commit('CHANGE_USER', res.data.data)
            }
            
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
            if(res.status === 200) {
                if(start == 0) {
                    commit('CHANGE_ANNOUNCES', res.data)
                }
                else {
                    commit('ADD_ANNOUNCES_TO_LIST', res.data)
                }
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [accountClient.get_list_voucher] ({ commit }, {user_id, page, count}) {
        try {
            const res = await get_list_voucher(user_id, page, count)
            if(res.status === 200) {
                if(page === 1) {
                    commit('CHANGE_VOUCHERS', res.data.data)
                }
                else {
                    commit('ADD_VOUCHERS_TO_LIST', res.data.data)
                }
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