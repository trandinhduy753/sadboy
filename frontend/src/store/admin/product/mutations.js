export default {
    CHANGE_LIST_PRODUCT (state, products) {
        var data=[];
        state.products = products
        products.forEach(product => {
            var emp =  {
                id: product.id, 
                code: product.code,
                item1: product.name,
                item2: product.img,
                item3: product.import_price,
                item4: product.category,
                type: 'product'
            }
            data.push(emp)
        });
        
        state.results =  data;
    },
    CHANGE_SORT_BY (state, sortby) {
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    ADD_PRODUCT_TO_LIST (state, products){
        if(products.length == 1){
            const data =  {
                id: products[0].id, 
                code: products[0].code,
                item1: products[0].name,
                item2: products[0].img,
                item3: products[0].import_price,
                item4: products[0].category,
                type: 'product'
            }
            state.products[0] = products
            state.results.unshift(data)
        }
        else {
            var data=[];

            products.forEach(product => {
                var emp =  {
                    id: product.id, 
                    code: product.code,
                    item1: product.name,
                    item2: product.img,
                    item3: product.import_price,
                    item4: product.category,
                    type: 'product'
                }
                data.push(emp)
            });
            state.products = [...state.products, ...products]
            state.results= [...state.results, ...data];
        }
       
    },
    DELETE_PRODUCT (state, ids){
        if((typeof ids) == 'number') {
            const index = state.results.findIndex(emp => emp.id === ids);
            if (index !== -1) {
                state.results.splice(index, 1);
            }
        }
        else {
            state.results = state.results.filter((emp, index) => {
                return !(ids.find(id => id == emp.id))
            });
            state.selected_product_ids=[];
            state.checked=false
        }
        
    },
    CHANGE_CHECKED_PRODUCT(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_product_ids.includes(ids)) {
                state.selected_product_ids = state.selected_product_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_product_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_product_ids=[];
            }
            else if (ids.length>0){
                state.selected_product_ids=[...new Set([...state.selected_product_ids, ...ids])];
            }
        }
        
    },
    CHANGE_LIST_CATEGORY (state, categories) {
        state.list_category = categories
    },
    CHANGE_LIST_DETAIL_PRODUCT (state, {id, data}){
        state.list_detail_product[id]=data;
       
    },
    ADD_COMMENT_TO_DETAIL (state, {id, data}) {
        state.list_detail_product[id].comments=[...state.list_detail_product[id].comments, ...data];
    },
    DELETE_COMMENT_FROM_DETAIL (state, {product_id, comment_id}) {
        state.list_detail_product[product_id].comments.some((comment, index) => {
            var check=false;
            if(comment.id == comment_id) {
                state.list_detail_product[product_id].comments.splice(index, 1);
                return true;
            } 
            else {
                comment.feedbacks.some((feedback, i) => {
                    if(feedback.id == comment_id) {
                        state.list_detail_product[product_id].comments[index].feedbacks.splice(i, 1);
                        check=true;
                        return true;
                    } 
                })
            }
            if(check){
                return true;
            }
        });
      
    },
    CHANGE_LIST_PRODUCT_IMPORT_ORDER (state, data) {
        state.list_product_order_import = data;
    },
    CHANGE_ADD_LIST_PRODUCT_IMPORT_ORDER (state, data) {
        state.list_product_order_import = [...state.list_product_order_import, ...data]
    },
    CHANGE_LIST_PROVIDE(state, data) {
        state.provides = data;
    },
    CHANGE_LIST_STOCK(state, data) {
        state.stocks = data;
    },
    CHANGE_LIST_PRODUCT_ORDER (state, data) {
        state.list_product_order = data;
    },
    DELETE_LIST_PRODUCT_ORDER (state, index){
        state.list_product_order.splice(index, 1)
    },
    CHANGE_INFOR_GOODS_RECEIPT (state, data) {
        state.infor_goods_receipt = data;
    },
    
    CHANGE_LIST_PRODUCT_DELETE(state, data) {
        state.products_delete = data
    },
    ADD_PRODUCT_DELETE_TO_LIST(state, products) {//
        state.products_delete= [...state.products_delete, ...products];
    },
    SHOW_LIST_PRODUCT_DELETE(state, data) {
        state.show_list_product_delete = data
    },
    DELETE_PRODUCT_DELETE_AT(state, id) {
        const index = state.products_delete.findIndex(pro => pro.id === id);
        if (index !== -1) {
            state.products_delete.splice(index, 1);
        }
    },
    CHANGE_LIST_PRODUCT_SALEST (state, products) {
        state.products_salest = products
    },
    LOAD_ADD_PRODUCT_SALEST (state, products) {
        state.products_salest = [...state.products_salest, ...products]
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}