export default {
    CHANGE_LIST_PROVIDE(state, list_provide) {
        var data=[];
        state.provides = list_provide
        list_provide.forEach(product => {
            var emp =  {
                id: product.id, 
                code: product.code,
                item1: product.name,
                item2: product.phone,
                item3: product.address,
                item4: product.email,
                type: 'provide'
            }
            data.push(emp)
        });
        
        state.results =  data;
    },
    ADD_PROVIDE_TO_LIST(state, provides) {
        if(provides.length == 1){
            const data =  {
                id: provides[0].id, 
                code: provides[0].code,
                item1: provides[0].name,
                item2: provides[0].phone,
                item3: provides[0].address,
                item4: provides[0].email,
                type: 'provide'
            }
            state.provides.unshift(provides[0])
            state.results.unshift(data)
        }
        else {
            var data=[];
            provides.forEach(provide => {
                var emp =  {
                    id: provide.id, 
                    code: provide.code,
                    item1: provide.name,
                    item2: provide.phone,
                    item3: provide.address,
                    item4: provide.email,
                    type: 'provide'
                }
                data.push(emp)
            });
            state.provides = [...state.provides, ...provides]
            state.results = [...state.results, ...data];
        }
    },
    CHANGE_SORT_BY (state, sortby) {
        console.log(222)
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    DELETE_PROVIDE (state, ids){
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
            state.selected_provide_ids=[];
            state.checked=false
           
        }
        
    },
    CHANGE_CHECKED_PROVIDE(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_provide_ids.includes(ids)) {
                state.selected_provide_ids = state.selected_provide_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_provide_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_provide_ids=[];
            }
            else if (ids.length>0){
                state.selected_provide_ids=[...new Set([...state.selected_provide_ids, ...ids])];
            }
        }
    },
    CHANGE_LIST_DETAIL_PROVIDE (state, {id, data} ){
        state.list_detail_provide[id]=data;
        state.list_order[id] = state.list_detail_provide[id].orders
    },
    CHANGE_LIST_ORDER(state, {id, data}) {
        state.list_order[id] = [...state.list_order[id], ...data]
    },
    CHANGE_SORT_BY_ORDER (state, {sortby, sortstatus}) {
        state.sort_by_order=sortby;
        state.sort_status_order = sortstatus;
        state.sort_opt_order= state.sort_opt_order == "ASC" ? "DESC" : "ASC"; 
    },

    CHANGE_LIST_PROVIDE_DELETE(state, data) {
        state.provides_delete = data
    },
    ADD_PROVIDE_DELETE_TO_LIST(state, provides) {
        state.provides_delete= [...state.provides_delete, ...provides];
    },
    SHOW_LIST_PROVIDE_DELETE(state, data) {
        state.show_list_provide_delete = data
    },
    DELETE_PROVIDE_DELETE_AT(state, id) {
        const index = state.provides_delete.findIndex(pro => pro.id === id);
        if (index !== -1) {
            state.provides_delete.splice(index, 1);
        }
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    },
    CHANGE_CALL_API_PROVIDE(state, isCall){
        state.isCallApiProvide = isCall;
    }

}