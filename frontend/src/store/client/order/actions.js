import { orderClient } from '@/constant';
import { add_order, get_list_order, detail_order, find_order_by_code } from '@/api/client/order.js';

export default {
    async [orderClient.add_order] ({commit}, data) {
        try {
            const res = await add_order(data)
            if(res.status === 201) {
                commit('ADD_ORDER_TO_LIST', [res.data.data])
                commit('CHANGE_LIST_ORDER_DETAIL', {order_code: res.data.data.code, data: res.data.data})
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [orderClient.get_list_order] ({commit}, {user_id, page, count }) {
        try {
            const res = await get_list_order(user_id, page, count)
            //commit('CHANGE_FIND_ORDER', {start: res.start, end: res.end })
            if(res.status === 200 ) {
                if(page === 1) {
                    commit('CHANGE_LIST_ORDER', res.data.data)
                }
                else {
                    commit('ADD_ORDER_TO_LIST', res.data.data)
                }
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [orderClient.detail_order] ({commit}, { user_id, order_code }) {
        try {
            const res = await detail_order(user_id, order_code)
            if(res.status === 200) {
                commit('CHANGE_LIST_ORDER_DETAIL', {order_code: order_code, data: res.data.data})
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [orderClient.find_order_by_code] ({commit}, { page, user_id, order_code, count }) {
        try {
            const res = await find_order_by_code(page, user_id, order_code, count)
            if(res.status === 200) {
                if(page === 1) {
                    commit('CHANGE_LIST_ORDER', res.data.data)
                }
                else {
                    commit('ADD_ORDER_TO_LIST', res.data.data)
                }
            }
            
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    }
}