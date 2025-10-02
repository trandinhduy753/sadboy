export default {
    CHANGE_DETAIL_ORDER (state, data){
        state.detail_order = data;
    },
    CHANGE_LIST_ORDER (state, data) {
        state.list_order = data;
    },
    CHANGE_FILTER_STATUS (state, data){
        state.filter_status = data;
    },
    ADD_ORDER_TO_LIST (state, data) {
        state.list_order = [...state.list_order, ...data]
    },
    CHANGE_LIST_ORDER_DETAIL(state, {order_code, data} ) {
        state.list_order_detail[order_code] = data;
    },
    CHANGE_FIND_ORDER(state, {start, end}) {
        state.start_find = start;
        state.end_find = end;
    }
}