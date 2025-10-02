import {voucher } from '@/constant'
export default {
    CHANGE_LIST_VOUCHER (state, list_voucher) {
        var data=[];
        list_voucher.forEach(voucher => {
            var emp =  {
                id: voucher.id, 
                code: voucher.code,
                item1: voucher.created_at,
                item2: voucher.img,
                item3: voucher.type == 'percent' ? `${voucher.percent}%` : `${voucher.money_discount} VNĐ`,
                item4: voucher.status,
                type: 'voucher'
            }
            data.push(emp)
        });
        state.results= data;
    },
    CHANGE_SORT_BY (state, { sortby, sort_status}) {
        state.sortby=sortby;
        state.sort_status=sort_status
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    ADD_VOUCHER_TO_LIST (state, vouchers){
        if(vouchers.length == 1){
            const data =  {
                id: vouchers[0].id, 
                code: vouchers[0].code,
                item1: vouchers[0].created_at,
                item2: vouchers[0].img,
                item3: vouchers[0].type == 'percent' ? `${vouchers[0].percent}%` : `${vouchers[0].money_discount} VNĐ`,
                item4: vouchers[0].status,
                type: 'voucher'
            }
            state.results.unshift(data)
        }
        else {
            var data=[];
            vouchers.forEach(voucher => {
                var emp =  {
                    id: voucher.id, 
                    code: voucher.code,
                    item1: voucher.created_at,
                    item2: voucher.img,
                    item3: voucher.type == 'percent' ? `${voucher.percent}%` : `${voucher.money_discount} VNĐ`,
                    item4: voucher.status,
                    type: 'voucher'
                }
                data.push(emp)
            });
            state.results = [...state.results, ...data];
        }
        
    },
    DELETE_VOUCHER (state, ids){
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
            state.selected_voucher_ids=[];
            state.checked=false
           
        }
        
    },
    CHANGE_CHECKED_VOUCHER(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_voucher_ids.includes(ids)) {
                state.selected_voucher_ids = state.selected_voucher_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_voucher_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_voucher_ids=[];
            }
            else if (ids.length>0){
                state.selected_voucher_ids=[...new Set([...state.selected_voucher_ids, ...ids])];
            }
        }
    },
    CHANGE_DETAIL_VOUCHER (state, detail_voucher) {
        state.detail_voucher=detail_voucher;
    },
    CHANGE_TYPE_USER (state, list_type) {
        state.types_user=list_type
    },
    CHANGE_TYPE_PRODUCT (state, list_type) {
        state.types_product = list_type
    },
    CHANGE_LIST_DETAIL_VOUCHER (state, {id, data}){
        state.list_detail_voucher[id]=data;
    },

    CHANGE_LIST_VOUCHER_DELETE(state, data) {
        state.vouchers_delete = data
    },
    ADD_VOUCHER_DELETE_TO_LIST(state, vouchers) {//
        state.vouchers_delete= [...state.vouchers_delete, ...vouchers];
    },
    SHOW_LIST_VOUCHER_DELETE(state, data) {
        state.show_list_voucher_delete = data
    },
    DELETE_VOUCHER_DELETE_AT(state, id) {
        const index = state.vouchers_delete.findIndex(vou => vou.id === id);
        if (index !== -1) {
            state.vouchers_delete.splice(index, 1);
        }
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}