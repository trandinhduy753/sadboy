export default {
    CHANGE_USER (state, data) {
        state.user= data;
    },
    CHANGE_ANNOUNCES (state, data) {
        state.announces = data;
    },
    ADD_ANNOUNCES_TO_LIST (state, data) {
        state.announces = [...state.announces, ...data]
    },
    CHANGE_VOUCHERS(state, data) {
        state.vouchers=data;
    },
    ADD_VOUCHERS_TO_LIST (state, data) {
        state.vouchers = [...state.vouchers, ...data]
    },
    CHANGE_CALL_API_ORDER(state, data) {
        state.isCallApiOrder = data
    },
    
}