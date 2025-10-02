export default {
    get_user_chat(state) {
        var users = state.users_chat
        return users
    },
    get_detail_user_chat(state) {
        var messages= state.list_detail_user_chat;
        return messages;
    }
}