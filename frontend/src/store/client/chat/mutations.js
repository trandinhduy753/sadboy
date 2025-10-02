export default {
    CHANGE_INFO_CONVERSATION (state, data) {
        state.infoConversation = data
    },
    ADD_CHAT_TO_LIST (state, data) {
        state.infoConversation.messages= [...state.infoConversation.messages, ...data]
    }
}