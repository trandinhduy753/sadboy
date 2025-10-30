import { get_list_user_chat, detail_user_chat, addMessage } from '@/api/admin/chat.js'
import {chat} from '@/constant'
export default {
    async [chat.get_list_user_chat] ({ commit }, {admin_id, page, count}) {
        try {
            const res = await get_list_user_chat(admin_id, page, count);
            if(page === 1) {
                commit('CHANGE_USERS_CHAT', res.data.data)
            }
            else {
                commit('ADD_USERS_CHAT_TO_LIST', res.data.data)
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            console.log(error)
            return error
        }
        
    },
    async [chat.detail_user_chat] ({ commit }, {admin_id, user_id, page, count}) {
        try {
            
            const res = await detail_user_chat(admin_id, user_id, page, count);
          
            if(page == 1) {
                commit('CHANGE_LIST_DETAIL_USER_CHAT', {id: user_id, data:res.data.data })
            }
            else {
                commit('LOAD_ADD_MESSAGE_TO_LIST', {id: user_id, data: res.data.data })
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            return error
        }
        
    },

    async [chat.add_message] ({commit}, data) {
        try {
            const res = await addMessage(data);
            
            return {
                ok: "success"
            }
        }
        catch(error){
            console.log(error)
        }
    }
}