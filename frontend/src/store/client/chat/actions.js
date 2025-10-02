import { chatClient } from '@/constant';
import { get_info_conversation } from '@/api/client/chat'
export default {
    async [chatClient.get_info_conversation] ({ commit }, { user_id, start, end }) {
        try {
            const res = await get_info_conversation(user_id, start, end)
            if(start == 0) {
                commit('CHANGE_INFO_CONVERSATION', res.data)
            }
            else {
                commit('ADD_CHAT_TO_LIST', res.data)
            }
            
            
            return {
                ok: 'success'
            }
        }
        catch (error){
            console.log(error)
        }
    },
    
}