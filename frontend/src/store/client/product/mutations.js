export default {
    CHANGE_CATEGORIES (state, data) {
        state.categories=data;
    },
    CHANGE_CATEGORY (state, data) {
        state.category = data;
    },
    CHANGE_PRODUCTS_PAGINATION (state, data) {
        state.products_pagination=data;
    },
    CHANGE_LIST_PRODUCT_POPULAR(state, data) {
        state.list_product_popular = data;
    },
    CHANGE_LIST_DETAIL_PRODUCT (state, {slug, data} ) {
        state.list_detail_product[slug]= data;
    },
    ADD_COMMENT_TO_LIST(state, {slug, data}){
        state.list_detail_product[slug].comments=[...state.list_detail_product[slug].comments, ...data]
    },
    CHANGE_PRODUCTS_SEARCH (state, data) {
        state.products_search = data;
    },
    ADD_PRODUCTS_SEARCH_TO_LIST(state, data) {
        state.products_search= [...state.products_search, ...data];
    },
    CHANGE_FILTER_SEARCH(state, filter) {
        state.filter_search = filter;
    },
    CHANGE_SORT_BY (state, sortby) {
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    CHANGE_RANGE_PRICE(state, {start_price, end_price} ) {
        state.start_price = start_price
        state.end_price = end_price
    },
    CHANGE_PRODUCTS(state, data) {
        state.products = data
    },
    ADD_PRODUCT_TO_LIST(state, data) {
        state.products = [...state.products, ...data]
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    } 
    
}