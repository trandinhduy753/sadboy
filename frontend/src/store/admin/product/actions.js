import { product } from '@/constant'
import { get_list_product, upload_product_file_excel, delete_product, get_list_category, add_product, 
    detail_product, edit_product, import_order, find_product_import_order, add_goods_receipt,
    get_list_product_deleted, delete_product_deleted_at, recover_delete_product, 
    find_product_by_name
} from '@/api/admin/product.js'
import { delete_comment } from '@/api/admin/comment.js'
import { get_list_provide } from '@/api/admin/provide.js'
import { list_stock} from '@/api/admin/stock.js'
export default {
    async [product.get_list_product] ({commit}, {start=0 , end=20})  {
        try {
            const res = await get_list_product(start, end);
            if(res.status === 200 ) {
                if(start == 0) {
                    commit('CHANGE_LIST_PRODUCT', res.data.data);
                }
                else {
                    commit('ADD_PRODUCT_TO_LIST', res.data.data);
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
    async [product.add_product_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_product_file_excel (fileContent);
            commit('ADD_PRODUCT_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [product.delete_product] ({commit}, ids) {
        try {
            const res= await delete_product(ids)
            if(res.status === 204) {
                commit('DELETE_PRODUCT', ids)
            }
            
            return {
                data: res.data,
                ok: "success"
            }
        } 
        catch (error) {
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [product.get_list_category] ({commit}){
        try {
            const res = await  get_list_category();
            if(res.status === 200) {
                commit('CHANGE_LIST_CATEGORY', res.data.data);
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
    async [product.add_product] ({commit}, data){
        try {
            const res = await add_product(data);
            if(res.status === 201 ) {
                commit('ADD_PRODUCT_TO_LIST', [res.data.data]);
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            if(error.status === 403) {
                let message = error.response.data.message;
                return {
                    ok: 'error',
                    message: message,
                    status: error.status
                }
            }
            else if (error.status === 422) {
                return {
                    ok: 'error',
                    message: error.response.data.errors,
                    status: error.status
                }
            }
        }
    },
    async [product.detail_product] ({commit}, {id, page }) {
        try {
            const res = await detail_product(id, page);
            if(res.status === 200) {
                if(page === 1) {
                    commit('CHANGE_LIST_DETAIL_PRODUCT', {id: id, data: res.data.data});
                }
                else {
                    commit('ADD_COMMENT_TO_DETAIL', {id: id, data: res.data.data} )
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
    async [product.edit_product] ({commit}, {id, data}){
        try {
            const res = await edit_product(id, data);
            if(res.status === 200) {
                commit('CHANGE_LIST_DETAIL_PRODUCT', {id: id, data: res.data.data});
            }
            return {
                ok: "success"
            }
        }
        catch(error){
            if(error.status === 403) {
                let message = error.response.data.message;
                return {
                    ok: 'error',
                    message: message,
                    status: error.status
                }
            }
            else if (error.status === 422) {
                return {
                    ok: 'error',
                    message: error.response.data.errors,
                    status: error.status
                }
            }
        }
    },
    async [product.delete_comment] ({commit}, {product_id, comment_id}){
        try {
            const res = await delete_comment(comment_id);
            
            commit('DELETE_COMMENT_FROM_DETAIL', {product_id, comment_id});
            // if(res.status === 204) {
            //     commit('DELETE_COMMENT_FROM_DETAIL', {product_id, comment_id});
            // } 
            
            return {
                ok: "success"
            }
        }
        catch(error){
            return {
                ok: error
            }
        }
    },
    async [product.import_order] ({commit}, {provide_id, start, end}){
        try {
            const res = await import_order(provide_id, start, end);
            if(res.status === 200 ) {
                if(start == 0) {
                    commit('CHANGE_LIST_PRODUCT_IMPORT_ORDER', res.data.data);
                }
                else {
                    commit('CHANGE_ADD_LIST_PRODUCT_IMPORT_ORDER', res.data.data)
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
    async [product.get_info_stock] ({commit}){
        try {
            const res = await list_stock()
            if(res.status === 200 ) {
                commit('CHANGE_LIST_STOCK', res.data.data)
            }
            
            return {
                ok: 'success',
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
    
    async [product.find_product_import_order] ({commit}, {provide_id, find, page}){
        try {
            const res = await find_product_import_order(provide_id, find, page);
            if(res.status === 200 ) {
                if(page === 1) {
                    commit('CHANGE_LIST_PRODUCT_IMPORT_ORDER', res.data.data);
                }
                else {
                    commit('CHANGE_ADD_LIST_PRODUCT_IMPORT_ORDER', res.data.data)
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

    async [product.add_goods_receipt] ({commit}, data){
        try {
            const res = await add_goods_receipt(data)
            if(res.status === 201 ) {
                commit('admin/cash_book/ADD_TO_LIST_GOODS_RECEIPT', [ res.data.data ], { root: true });
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
    async [product.get_list_product_delete] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_product_deleted(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_PRODUCT_DELETE', res.data.data)
                }
                else {
                    commit('ADD_PRODUCT_DELETE_TO_LIST', res.data.data)
                }
            }
            return {
                
                ok: "success"
            }
        } catch (error) {
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    },
    async [product.delete_product_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_product_deleted_at(id);
            if(res.status === 204) {
                commit('DELETE_PRODUCT_DELETE_AT', id)
            }
            return {
                ok: "success"
            }
            
        } catch (error) {
             let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
            
        }
    },
    async [product.recover_delete_product] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_product(id);
            if(res.status === 200 ) {
                commit('ADD_PRODUCT_TO_LIST', [res.data.data])
                commit('DELETE_PRODUCT_DELETE_AT', id)
            }   
            
            return {
                ok: "success"
            }
            
        } catch (error) {
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
            
        }
    },
    async [product.find_product_by_name] ({commit, dispatch}, {page, name, count}){
        try {
            const res = await find_product_by_name(page, name, count);
            if(res.status === 200 ) {
                if(page === 1) {
                    commit('CHANGE_LIST_PRODUCT', res.data.data);
                }
                else {
                    commit('ADD_PRODUCT_TO_LIST', res.data.data)
                }
            }
            return {
                ok: "success"
            }
            
        } catch (error) {
            let message = error.response.data.message;
            return {
                ok: 'error',
                message: message
            }
        }
    }
}