export default {
    get_categories (state) {
        return state.categories;
    },
    get_products_pagination (state) {
        return state.products_pagination;
    },
    get_product_popular (state) {
        return state.list_product_popular
    },
    get_detail_product (state) {
        return state.list_detail_product
    },
    get_products_search (state) {
        var products_search = state.products_search;
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'constant': (a, b) => (a.id - b.id) * sortDirection,
            'newest': (a, b) => (new Date(a.created_at) - new Date(b.created_at)) * sortDirection,
            'sale': (a, b) => (a.count_sale - b.count_sale) * sortDirection,
            'price_desc': (a, b) => {
                if(a.sale_price['S']){
                    return (a.sale_price['S'] - b.sale_price['S']);
                }
                else {
                    return (a.original_price['S'] - b.original_price['S'])
                }
            },
            'price_asc': (a, b) => { 
                if(a.sale_price['S']){
                    return (b.sale_price['S'] - a.sale_price['S']);
                }
                else {
                    return (b.original_price['S'] - a.original_price['S'])
                }
            },
        };
        if(state.start_price != 0 && state.end_price != 0 ){
            products_search = products_search.filter((product) => {
                // Ưu tiên giá khuyến mãi (sale_price), nếu không có thì lấy giá gốc
                const price = product.sale_price?.S ?? product.original_price?.S;
                
                // Trả về true nếu trong khoảng
                return price >= state.start_price && price <= state.end_price;
            });
        }
        

        return products_search.sort(sortFunctions[state.sortby]);

    }
}