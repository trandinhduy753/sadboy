import { get_list_category, get_list_product, get_list_product_by_type, 
    get_product_popular, detail_product, add_comment_to_list, get_list_product_by_search,

} from '@/api/client/product.js'
import {productClient } from '@/constant'
export default {
    async [productClient.get_information_dashboard_client] ({commit}, {category, page, per_page}) {
        
        try {
            const [products, categories, product_popular] = await Promise.all([
                get_list_product_by_type(category='All', page, per_page),
                get_list_category(),
                get_product_popular(3,3)
            ])
            commit('CHANGE_CATEGORIES', categories.data)
            commit('CHANGE_PRODUCTS_PAGINATION', products.data)
            commit('CHANGE_LIST_PRODUCT_POPULAR', product_popular.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [productClient.get_list_product_by_type] ({commit}, {category, page, per_page}) {
        try {
            const res = await get_list_product_by_type(category, page, per_page)
            commit('CHANGE_PRODUCTS_PAGINATION', res.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [productClient.get_detail_product] ({commit}, slug) {
        try {
            const res = await detail_product(slug)
            commit('CHANGE_LIST_DETAIL_PRODUCT', {slug:slug, data:res.data} )
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [productClient.add_comment_to_list] ({commit}, {slug, page}) {
        try {
            const res = await add_comment_to_list(slug, page)
          
            commit('ADD_COMMENT_TO_LIST', {slug: slug, data: res.data} )
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [productClient.get_list_product_by_search] ({commit}, {page, search, count}) {
        try {
            const res = await get_list_product_by_search(page, search, count)
            if(page === 1){
                commit('CHANGE_PRODUCTS_SEARCH', res.data )
                commit('CHANGE_PRODUCTS', res.data )
            }
            else {
                commit('ADD_PRODUCTS_SEARCH_TO_LIST', res.data )
                commit('ADD_PRODUCT_TO_LIST', res.data )
            }
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
    async [productClient.get_list_product] ({commit}, {start, end}) {
        try {
            const res = await get_list_product(start, end)
        
            if(start == 0) {
                commit('CHANGE_PRODUCTS', res.data )
            }
            else {
                commit('ADD_PRODUCT_TO_LIST', res.data )
            }
            return {
                ok: 'success',
            }           
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
}