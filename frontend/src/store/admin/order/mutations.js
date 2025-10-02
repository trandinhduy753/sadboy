export default {
    CHANGE_LIST_ORDER (state, list_order) {
        var data=[];
        state.orders=list_order
        list_order.forEach(order => {
            var exp =  {
                id: order.id, 
                code: order.code,
                item1: order.address,
                item2: order.created_at,
                item3: order.total,
                item4: order.status,
                type: 'order'
            }
            data.push(exp)
        });
        state.results = data;
    },
    CHANGE_SORT_BY (state, { sortby, sort_status}) {
        state.sortby=sortby;
        state.sort_status=sort_status
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    ADD_ORDER_TO_LIST (state, orders){
        if(orders.length === 1) 
        {
            var data =  {
                id: orders[0].id, 
                code: orders[0].code,
                item1: orders[0].address,
                item2: orders[0].created_at,
                item3: orders[0].total,
                item4: orders[0].status,
                type: 'order'
            }
            state.orders=orders[0]
            state.results.unshift(data)
        }
        else 
        {
            state.orders=[...state.orders, ...orders]
            var data=[];
            orders.forEach(order => {
                var exp =  {
                    id: order.id, 
                    code: order.code,
                    item1: order.address,
                    item2: order.created_at,
                    item3: order.total,
                    item4: order.status,
                    type: 'order'
                }
                data.push(exp)
            });
            state.results= [...state.results, ...data];
            
        }
        
    },
    CHANGE_CHECKED_ORDER(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_order_ids.includes(ids)) {
                state.selected_order_ids = state.selected_order_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_order_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_order_ids=[];
            }
            else if (ids.length>0){
                state.selected_order_ids=[...new Set([...state.selected_order_ids, ...ids])];
            }
        }
        
    },
    DELETE_ORDER (state, ids){
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
            state.selected_order_ids=[];
            state.checked=false
        }
        
    },
    CHANGE_STATUS_ORDER (state, status){
        state.results =  state.results.map(order => order.item4 == status ? { ...order, item4: "LOCKING" } : order)
    }, 
    CHANGE_LIST_DETAIL_ORDER (state, {id, data}){
        state.list_detail_order[id]=data;
       
    },

    CHANGE_LIST_ORDER_DELETE(state, data) {
        state.orders_delete = data
    },
    ADD_ORDER_DELETE_TO_LIST(state, orders) {
        state.orders_delete= [...state.orders_delete, ...orders];
    },
    SHOW_LIST_ORDER_DELETE(state, data) {
        state.show_list_order_delete = data
    },
    DELETE_ORDER_DELETE_AT(state, id) {
        const index = state.orders_delete.findIndex(emp => emp.id === id);
        if (index !== -1) {
            state.orders_delete.splice(index, 1);
        }
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}