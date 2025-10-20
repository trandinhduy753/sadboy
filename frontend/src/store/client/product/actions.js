import { get_list_category, get_list_product, get_list_product_by_type, 
    get_product_popular, detail_product, add_comment_to_list, get_list_product_by_search,

} from '@/api/client/product.js'
import {productClient } from '@/constant'
export default {
    async [productClient.get_information_dashboard_client] ({commit}, {category, page, per_page}) {
        
        try {
            const [products, categories, product_popular] = await Promise.all([
                get_list_product_by_type(category=1, page, per_page),
                get_list_category(),
                get_product_popular(3,3)
            ])
            if(products.status === 200) {
                commit('CHANGE_PRODUCTS_PAGINATION', products.data.data)
            }
            if(categories.status === 200) {
                commit('CHANGE_CATEGORIES', categories.data.data)
            }
            if(product_popular.status === 200) {
                commit('CHANGE_LIST_PRODUCT_POPULAR', product_popular.data.data)
            }
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
            if(res.status === 200) {
                commit('CHANGE_PRODUCTS_PAGINATION', res.data.data)   
            }
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
            if(res.status === 200) {
                commit('CHANGE_LIST_DETAIL_PRODUCT', {slug:slug, data:res.data.data} )
            }
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
            if(res.status === 200){
                commit('ADD_COMMENT_TO_LIST', {slug: slug, data: res.data.data} )
            }
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
            if(res.status === 200) {
                if(page === 1){
                    commit('CHANGE_PRODUCTS_SEARCH', res.data.data )
                    commit('CHANGE_PRODUCTS', res.data.data )
                }
                else {
                    commit('ADD_PRODUCTS_SEARCH_TO_LIST', res.data.data )
                    commit('ADD_PRODUCT_TO_LIST', res.data.data )
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
    async [productClient.get_list_product] ({commit}, {start, end}) {
        try {
            const res = await get_list_product(start, end)
            if(res.data) {
                if(start == 0) {
                    commit('CHANGE_PRODUCTS', res.data.data )
                }
                else {
                    commit('ADD_PRODUCT_TO_LIST', res.data.data )
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
}