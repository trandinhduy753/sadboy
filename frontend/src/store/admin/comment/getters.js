export default {
    get_list_comment(state) {
        return state.results
    },
    get_list_comment_by_sort(state) {
        const list_comment = [...state.results];
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'date': (a, b) => (new Date(a.item1) - new Date(b.item1)) * sortDirection,
            'like': (a, b) => (a.item2 -b.item2) * sortDirection,
            'star': (a, b) => (a.item3 -b.item3) * sortDirection,
            'content': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        return list_comment.sort(sortFunctions[state.sortby]);
    },
    get_title_list_comment (state) {
        return state.title_manages
    },
    get_list_detail_comment (state) {
        return state.list_detail_comment
    }
}