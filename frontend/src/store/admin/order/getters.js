export default {
    get_list_order(state) {
        return state.results
    },
    get_title_list_order (state) {
        return state.title_manages
    },
    get_list_order_by_sort(state) {
        var list_order = [...state.results];
        var sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'name': (a, b) => a.item1.localeCompare(b.item1) * sortDirection,
            'date': (a, b) => (new Date(a.item2) - new Date(b.item2)) * sortDirection
        };
        list_order = list_order.sort(sortFunctions[state.sortby]);
        if(state.sort_status) {
            list_order=list_order.filter(item => item.item4 === state.sort_status);
        }
        return list_order;
    },
    get_list_detail_order(state ){
        return state.list_detail_order
    },
}