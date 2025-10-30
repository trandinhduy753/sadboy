import { cartClient } from '@/constant';
import { list_cart, delete_product_in_cart, add_product_to_cart, check_order_pay } from '@/api/client/cart'
export default {
    async [cartClient.get_list_cart] ({ commit }, {user_id, page, count } ) {
        try {
            const res = await list_cart(user_id, page, count)
            if(res.status === 200) {
                if(page === 1) {
                    commit('CHANGE_CARTS', res.data.data)
                }
                else {
                    commit('ADD_CARTS_TO_LIST', res.data.data)
                }
            }
            
            return {
                ok: 'success'
            }
        }
        catch (error){
            console.log(error)
        }
    },
    async [cartClient.delete_product_in_cart] ({ commit }, {user_id, id} ) {
        try {
            const res = await delete_product_in_cart(user_id, id )
            if(res.status === 204) {
                commit('DELETE_PRODUCT_IN_CART', id)
            }
           
            return {
                ok: 'success'
            }
        }
        catch (error){
            console.log(error)
        }
    },
    async [cartClient.add_product_to_cart] ({commit}, {user_id, data}) {
        try {
            const res = await add_product_to_cart(user_id, data)
            if(res.status === 201) {
                commit('ADD_PRODUCT_TO_CART', res.data.data)
            }
            return {
                ok: 'success',
            }
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [cartClient.check_order_pay] ({commit}, {code}) {
        try {
            const res =  await check_order_pay(code)
            if(res.data.status === 'success') {
                commit('CHANGE_IS_ORDER_PENDING', true);
            }
            
        }
        catch (error) {
            return {
                ok: 'error',
            }
        }
    } 
}