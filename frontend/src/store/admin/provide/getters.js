export default {
    get_list_provide(state) {
        return state.results
    },
    get_list_provide_by_sort(state) {
        var list_provide = state.results;
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'name': (a, b) => a.item1.localeCompare(b.item1) * sortDirection,
            'address': (a, b) => a.item4.localeCompare(b.item3) * sortDirection,
            'email': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        return list_provide.sort(sortFunctions[state.sortby]);
    },
    get_title_list_provide (state) {
        return state.title_manages
    },
    get_list_detail_provide (state) {
        return state.list_detail_provide
    },
    get_list_order_by_sort: (state) => (id) => {
        var list_order = state.list_order[id];
        if (!Array.isArray(list_order)) return [];
        const sortDirection = state.sort_opt_order === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'date': (a, b) => (new Date(a.created_at) - new Date(b.created_at)) * sortDirection,
            'stock': (a, b) => a.stock.localeCompare(b.stock) * sortDirection,
            'count': (a, b) => (a.count - b.count) * sortDirection,
            'total': (a, b) => (a.total - b.total)  * sortDirection,
        };
        const sortFn = sortFunctions[state.sort_by_order] || (() => 0);
        if(state.sort_status_order) {
            list_order=list_order.filter(order => order.type === state.sort_status_order);
        }
        return [...list_order].sort(sortFn);
    },
    get_list_provide_root (state) {
        var provides=state.provides;
        var sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'name': (a, b) => a.name.localeCompare(b.name) * sortDirection,
            'money_total': (a, b) => (a.initial_debt -b.initial_debt) * sortDirection,
            'arises': (a, b) => (a.debt_arises -b.debt_arises) * sortDirection,
            'paid': (a, b) => (a.debt_paid - b.debt_paid) * sortDirection,
            'money_still': (a, b) => (a.debt_final - b.debt_final) * sortDirection,
        };
        provides = provides.sort(sortFunctions[state.sortby]);
        return provides;
    }
    
}