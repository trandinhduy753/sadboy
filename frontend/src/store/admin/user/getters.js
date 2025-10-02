export default {
    get_list_user (state) {
        return state.results
    },
    get_title_list_user (state) {
        return state.title_manages
    },
    get_list_user_by_sort(state) {
        const list_user = state.results;
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'name': (a, b) => a.item1.localeCompare(b.item1) * sortDirection,
            'type': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        return list_user.sort(sortFunctions[state.sortby]);
    },
    get_list_detail_user (state) {
        return state.list_detail_user
    }
}