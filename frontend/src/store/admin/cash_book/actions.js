import { cash_book } from '@/constant';
import { get_list_goods_receipt, find_goods_receipt, detail_goods_receipt, return_goods_receipt, debt_provide, 
    bill_collect_spend,  add_order_to_list, find_bill_collect_spend, add_bill_collect, add_bill_spend ,
} from '@/api/admin/cash_book.js'

import { get_list_provide } from '@/api/admin/provide.js'
    export default {
    change_comp_debt ({commit}, opt_comp)
    {
        commit('CHANGE_COMP_DEBT', opt_comp);
    },
    change_comp_spend ({commit}, opt_comp)
    {
        commit('CHANGE_COMP_SPEND', opt_comp);
    },
    async [cash_book.get_debt_provide] ({ commit }, date) {
        try {
            const res = await debt_provide(date);
            if(res.status === 200 ) {
                commit('CHANGE_DEBT_PROVIDE_INFO', res.data.data);
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
        
    },
    async [cash_book.get_list_goods_receipt] ({ commit }, {start, end}) {
        try {
            const res = await get_list_goods_receipt(start, end);
            if(res.status === 200 ) {
                if(start==0) {
                    commit('CHANGE_LIST_GOODS_RECEIPT', res.data.data);
                }
                else {
                    commit('ADD_TO_LIST_GOODS_RECEIPT', res.data.data)
                }
            }
            
           
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.find_goods_receipt] ({ commit }, {page, code, count}) {
        try {
            const res = await find_goods_receipt(page, code, count);
            if(res.status === 200 ) {
                if(page === 1) {
                    commit('CHANGE_LIST_GOODS_RECEIPT', res.data.data);
                }
                else {
                    commit('ADD_TO_LIST_GOODS_RECEIPT', res.data.data)
                }
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.detail_goods_receipt] ({ commit }, id) {
        try {
            const res = await detail_goods_receipt(id);
            if(res.status === 200) {
                commit('CHANGE_LIST_DETAIL_GOODS_RECEIPT', {id: id, data: res.data.data });
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.return_goods_receipt] ({ commit }, {id, data}) {
        try {
            const res = await return_goods_receipt(id, data);
            if(res.status === 200 ) {
                commit('CHANGE_LIST_DETAIL_GOODS_RECEIPT', {id: id, data: res.data.data });
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.get_list_votes] ({ commit }, { date, page }) {
        try {
            const res = await bill_collect_spend(date, page);
            if(res.status === 200 ) {
                commit('CHANGE_LIST_VOTES', res.data.data.votes)
                commit('CHANGE_LIST_ORDER', res.data.data.orders)
                commit('CHANGE_BILL_COLLECT_SPEND', res.data.data)
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.load_add_order] ({ commit }, {date, start, end }) {
        try {
            const res = await add_order_to_list(date, start, end);
            if(res.status === 200) {
                commit('ADD_ORDERS_TO_LIST', res.data.data)
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [cash_book.find_bill_collect_spend] ({ commit }, {page, date, code, count}) {
        try {
            const res = await find_bill_collect_spend(page, date, code, count);
            if(res.status === 200) {
                if(page === 1){
                    commit('CHANGE_LIST_VOTES', res.data.data)
                } 
                else {
                    commit('ADD_VOTES_TO_LIST', res.data.data)
                }
            }
            
            return {
                ok: "success"
            }
        }
        catch(error){
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
   
    async [cash_book.add_bill_collect] ({ commit }, data) {
        try {
            const res = await add_bill_collect(data);
            
            //commit('ADD_VOTES_TO_LIST', res.data)
            console.log(res)
            return {
                ok: "success"
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },
    async [cash_book.add_bill_spend] ({ commit }, data) {
        try {
            const res = await add_bill_spend(data);
            console.log(res)
            return {
                ok: "success"
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    }


}