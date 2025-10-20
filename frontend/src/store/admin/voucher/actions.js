import { voucher, user } from '@/constant';
import { get_list_voucher, delete_voucher, detail_voucher, edit_voucher, add_voucher, upload_voucher_file_excel, find_voucher_by_code, 
    get_type_user, get_type_product, get_list_voucher_deleted, delete_voucher_deleted_at, recover_delete_voucher
} from "@/api/admin/voucher.js";
import  { get_list_user } from '@/api/admin/user.js'
import { get_list_product_deleted } from '@/api/admin/product';
export default {
    async [voucher.get_list_voucher] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_voucher(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_VOUCHER', res.data.data)
                }
                else {
                    commit('ADD_VOUCHER_TO_LIST', res.data.data)
                }
            }
            return {
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
    async [voucher.add_voucher_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_voucher_file_excel (fileContent);
            if(res.status === 201 ) {
                commit('ADD_VOUCHER_TO_LIST', res.data)
            }
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [voucher.delete_voucher] ({commit, dispatch}, ids) {
        try {
            const res = await delete_voucher(ids)
            if(res.status === 204 ) {
                commit('DELETE_VOUCHER', ids)
            }
            return {
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
    async [voucher.find_voucher] ({commit}, {page, code, count}){
        try {
            const res = await find_voucher_by_code(page, code, count);
            if(res.status === 200 ) {
                if(page === 1) {
                    commit('CHANGE_LIST_VOUCHER', res.data.data)
                }
                else {
                    commit('ADD_VOUCHER_TO_LIST', res.data.data)
                }
            }
            return {
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
    async [voucher.get_type_user] ({commit}, ) {
        try {
            const res= await get_type_user()
            commit('CHANGE_TYPE_USER', res.data)
            
            return {
             
                ok: "success"
            }
        } 
        catch (error) {
            return {
                ok: error
            }
        }
    },
    async [voucher.get_type_product] ({commit}) {
        try {
            const res= await get_type_product()
            if(res.status === 200 ) {
                commit('CHANGE_TYPE_PRODUCT', res.data.data)
            }
            return {
             
                ok: "success"
            }
        } 
        catch (error) {
            return {
                ok: error
            }
        }
    },
    async [voucher.add_voucher] ({commit, dispatch}, formdata) {
        try {
            const res = await add_voucher(formdata);
            if(res.status === 201) {
                commit('ADD_VOUCHER_TO_LIST', [res.data.data])
            }
            
            return {
               ok: 'success'
            }
        }
        catch (error) {
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
    async [voucher.get_detail_voucher] ({commit, dispatch}, id ) {
        try {
            const res= await detail_voucher(id)
            if(res.status === 200 ) {
                commit('CHANGE_LIST_DETAIL_VOUCHER', {id: id, data: res.data.data})
            }
            return {
                ok: 'success'
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
    async [voucher.edit_voucher] ({commit, dispatch}, {id , data}) {
        try {
            const res= await edit_voucher(id, data)
            if(res.status ===200) {
                commit('CHANGE_LIST_DETAIL_VOUCHER', {id: id, data: res.data.data})
            }
            return {
                ok: 'success'
            }
        } 
        catch (error) {
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

    async [voucher.get_list_voucher_delete] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_voucher_deleted(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_VOUCHER_DELETE', res.data.data)
                }
                else {
                    commit('ADD_VOUCHER_DELETE_TO_LIST', res.data.data)
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
    async [voucher.delete_voucher_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_voucher_deleted_at(id);
            if(res.status === 204 ) {
                commit('DELETE_VOUCHER_DELETE_AT', id)
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
    async [voucher.recover_delete_voucher] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_voucher(id);
            if(res.status === 200 ) {
                commit('ADD_VOUCHER_TO_LIST', [res.data.data])
                commit('DELETE_VOUCHER_DELETE_AT', id)
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
}