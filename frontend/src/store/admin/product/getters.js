export default {
    get_list_product (state) {
        return state.results
    },
    get_list_product_by_sort (state) {
        var list_product = [...state.results];
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'name': (a, b) => a.item1.localeCompare(b.item1) * sortDirection,
            'price': (a, b) => (a.item3 -b.item3) * sortDirection,
            'category': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        return list_product.sort(sortFunctions[state.sortby]);
    },
    get_list_detail_product (state) {
        return state.list_detail_product;
    },
    get_title_list_product (state) {
        return state.title_manages
    },
    get_list_product_order_import(state) {
        return state.list_product_order_import
    },
    get_list_provide(state) {
        return state.provides
    },
    get_list_stock(state) {
        return state.stocks
    },
    get_list_product_order(state) {
        return state.list_product_order;
    },
    get_list_product_salest(state) {
        return state.products_salest
    }
}