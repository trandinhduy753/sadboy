import { chatClient } from '@/constant';
import { get_info_conversation, add_messages } from '@/api/client/chat'
export default {
    async [chatClient.get_info_conversation] ({ commit }, { user_id, page, count }) {
        try {
            const res = await get_info_conversation(user_id, page, count)
            if(page == 1) {
                commit('CHANGE_INFO_CONVERSATION', res.data.data)
            }
            else {
                commit('ADD_CHAT_TO_LIST', res.data.data)
            }
            
            return {
                ok: 'success'
            }
        }
        catch (error){
            console.log(error)
        }
    },
    async [chatClient.add_message] ({commit}, data) {
        try {
            const res = await add_messages(data)
            return {
                ok: 'success'
            }
        }
        catch (error){
            console.log(error)
        }
    }
}