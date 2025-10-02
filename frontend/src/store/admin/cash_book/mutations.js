export default {
    CHANGE_COMP_DEBT(state, opt_debt) {
        state.show_debt=opt_debt;
    },
    CHANGE_COMP_SPEND(state, opt_spend) {
        state.show_spend=opt_spend;
    },
    CHANGE_LIST_GOODS_RECEIPT (state, data) {
        state.list_goods_receipt = data;
    },
    ADD_TO_LIST_GOODS_RECEIPT (state, data) {
        if(data.length ==1) {
            state.list_goods_receipt.unshift(data[0])
        }
        else {
            state.list_goods_receipt =  [...state.list_goods_receipt, ...data]
        }
        
    },
    CHANGE_SORT_BY (state, { sortby, sort_status}) {
        state.sortby=sortby;
        state.sort_status=sort_status
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },

    CHANGE_LIST_DETAIL_GOODS_RECEIPT (state, {id, data}){
        state.list_detail_goods_receipt[id]=data;
    },
    CHANGE_DEBT_PROVIDE_INFO (state, data){
        state.debt_provide_info = data;
    },
    CHANGE_LIST_PROVIDE_DEBT (state, data) {
        state.list_provide_debt = data;
    },
    ADD_PROVIDE_DEBT_TO_LIST(state, data) {
        state.list_provide_debt = [...state.list_provide_debt, ...data]
    },
    CHANGE_LIST_VOTES (state, data) {
        state.list_votes = data;
    },
    ADD_VOTES_TO_LIST (state, data) {
        state.list_votes = [...state.list_votes, ...data];
    },
    CHANGE_LIST_ORDER (state, data) {
        state.list_order = data;
    },
    ADD_ORDERS_TO_LIST (state, data) {
        state.list_order = [...state.list_order, ...data]
    },
    CHANGE_BILL_COLLECT_SPEND (state, data) {
        state.bill_collect_spend = data
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    },
    CHANGE_CALL_API_DEBT_PROVIDE(state, data) {
        state.isCallApiDebt=data;
    }
}