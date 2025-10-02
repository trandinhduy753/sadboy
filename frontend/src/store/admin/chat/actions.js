import { get_list_user_chat, detail_user_chat } from '@/api/admin/chat.js'
import {chat} from '@/constant'
export default {
    async [chat.get_list_user_chat] ({ commit }, {admin_id, start, end}) {
        try {
            const res = await get_list_user_chat(admin_id, start, end);
            if(start==0) {
                commit('CHANGE_USERS_CHAT', res.data)
            }
            else {
                commit('ADD_USERS_CHAT_TO_LIST', res.data)
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            return error
        }
        
    },
    async [chat.detail_user_chat] ({ commit }, {admin_id, user_id, start, end}) {
        try {
            const res = await detail_user_chat(admin_id, user_id, start, end);
            if(start==0) {
                commit('CHANGE_LIST_DETAIL_USER_CHAT', {id: user_id, data:res.data })
            }
            else {
                commit('LOAD_ADD_MESSAGE_TO_LIST', {id: user_id, data: res.data })
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            return error
        }
        
    },
}