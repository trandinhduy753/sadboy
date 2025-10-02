export default {
    CHANGE_USERS_CHAT(state, data) {
        state.users_chat = data;
    },
    ADD_USERS_CHAT_TO_LIST(state, data) {
        state.users_chat=[...state.users_chat, ...data]
    },
    CHANGE_LIST_DETAIL_USER_CHAT(state, {id, data}) {
        state.list_detail_user_chat[id] = data;
    },
    LOAD_ADD_MESSAGE_TO_LIST(state, {id, data }) {
        
        state.list_detail_user_chat[id].messages=[...state.list_detail_user_chat[id].messages, ...data]
        console.log(state.list_detail_user_chat[id])
    }
}