export default {
    CHANGE_INFO_CONVERSATION (state, data) {
        state.infoConversation = data
    },
    ADD_CHAT_TO_LIST (state, data) {
        state.infoConversation.messages= [...data.messages, ...state.infoConversation.messages]
    },
    ADD_MESSAGE(state, data) {
        state.infoConversation.messages= [...state.infoConversation.messages, ...data]
    }
}