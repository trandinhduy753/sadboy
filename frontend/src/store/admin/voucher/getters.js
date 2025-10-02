export default {
    get_voucher_status(state) {
        return state.voucher_status;
    },
    get_list_detail_voucher (state) {
        return state.list_detail_voucher
    },
    get_list_voucher (state) {
        return state.results
    },
    get_list_voucher_by_sort (state) {
        var list_voucher = state.results;
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'date': (a, b) => (new Date(a.item1) - new Date(b.item1)) * sortDirection,
            'percent': (a, b) => (a.item3 -b.item3) * sortDirection,
            'status': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        list_voucher = list_voucher.sort(sortFunctions[state.sortby]);
        if(state.sort_status) {
            list_voucher=list_voucher.filter(item => item.item4 === state.sort_status);
        }
        return list_voucher;
    },
    get_title_list_voucher (state) {
        return state.title_manages
    }
}