export default {
    get_list_goods_receipt (state) {
        var list_goods = state.list_goods_receipt;
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'date': (a, b) => (new Date(a.created_at) - new Date(b.created_at)) * sortDirection,
            'provide': (a, b) => a.provide_name.localeCompare(b.provide_name) * sortDirection,
            'stock': (a, b) => a.stock_name.localeCompare(b.stock_name) * sortDirection,
            'status': (a, b) => a.status.localeCompare(b.status) * sortDirection,
            'money': (a, b) => (a.total -b.total) * sortDirection,
            
        };
        list_goods = list_goods.sort(sortFunctions[state.sortby]);
        if(state.sort_status) {
            list_goods=list_goods.filter(item => item.status === state.sort_status);
        }
        return list_goods;
        
    },
    get_list_detail_goods_receipt(state) {
        return state.list_detail_goods_receipt
    },
    get_debt_provide_info (state) {
        return state.debt_provide_info;
    },
    get_list_provide_debt (state) {
        var list_provide_debt = [...state.list_provide_debt];
        var sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'name': (a, b) => a.name.localeCompare(b.name) * sortDirection,
            'money_total': (a, b) => (a.initial_debt -b.initial_debt) * sortDirection,
            'arises': (a, b) => (a.debt_arises -b.debt_arises) * sortDirection,
            'paid': (a, b) => (a.debt_paid - b.debt_paid) * sortDirection,
            'money_still': (a, b) => (a.debt_final - b.debt_final) * sortDirection,
        };
        list_provide_debt = list_provide_debt.sort(sortFunctions[state.sortby]);
       
        return list_provide_debt;
    },
    get_list_votes (state) {
        var list_vote = Array.isArray(state.list_votes) ? [...state.list_votes] : []; ;
        var sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'type': (a, b) => a.type.localeCompare(b.type) * sortDirection,
            'date': (a, b) => (new Date(a.created_at) - new Date(b.created_at)) * sortDirection,
            'money': (a, b) => (a.money - b.money) * sortDirection,
        };
      
        list_vote = list_vote.sort(sortFunctions[state.sortby]);
        return list_vote;
    },
    get_list_order (state) {
        var list_order = state.list_order;
        return list_order
    },
    get_bill_collect_spend (state) {
        return state.bill_collect_spend;
    }
}

