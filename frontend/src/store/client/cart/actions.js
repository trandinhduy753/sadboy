import { cartClient } from '@/constant';
import { list_cart, delete_product_in_cart, add_product_to_cart } from '@/api/client/cart'
export default {
    async [cartClient.get_list_cart] ({ commit }, {user_id, page, count } ) {
        try {
            const res = await list_cart(user_id, page, count)
            if(page === 1) {
                commit('CHANGE_CARTS', res.data)
            }
            else {
                commit('ADD_CARTS_TO_LIST', res.data)
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
            commit('DELETE_PRODUCT_IN_CART', id)
            
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
            commit('ADD_PRODUCT_TO_CART', res.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
}