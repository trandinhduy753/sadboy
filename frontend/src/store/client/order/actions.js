import { orderClient } from '@/constant';
import { add_order, get_list_order, detail_order, find_order_by_code } from '@/api/client/order.js';

export default {
    async [orderClient.add_order] ({commit}, data) {
        try {
            const res = await add_order(data)
            
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [orderClient.get_list_order] ({commit}, {user_id, start, end }) {
        try {
            const res = await get_list_order(user_id, start, end)
            commit('CHANGE_FIND_ORDER', {start: res.start, end: res.end })
            if(start == 0) {
                commit('CHANGE_LIST_ORDER', res.data)
            }
            else {
                commit('ADD_ORDER_TO_LIST', res.data)
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
            commit('CHANGE_LIST_ORDER_DETAIL', {order_code: order_code, data: res.data})
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
            if(page === 1) {
                commit('CHANGE_LIST_ORDER', res.data)
            }
            else {
                commit('ADD_ORDER_TO_LIST', res.data)
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