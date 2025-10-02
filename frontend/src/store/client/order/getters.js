export default {
    get_list_order(state) {
        var list_order = state.list_order; 
        if(state.filter_status) {
            list_order=list_order.filter(order => order.status === state.filter_status);
        }
        return list_order;
    },
    get_list_order_detail(state) {
        return state.list_order_detail
    }
}