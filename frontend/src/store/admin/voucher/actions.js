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
            if(start==0){
                commit('CHANGE_LIST_VOUCHER', res.data.data)
            }
            else {
                commit('ADD_VOUCHER_TO_LIST', res.data.data)
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
    async [voucher.add_voucher_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_voucher_file_excel (fileContent);
            commit('ADD_VOUCHER_TO_LIST', res.data)
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
            const voucher_c= await delete_voucher(ids)
            commit('DELETE_VOUCHER', ids)

            return {
                ok: "success"
            }
        } 
        catch (error) {
            return {
                ok: "error"
            }
        }
    },  
    async [voucher.find_voucher] ({commit}, {page, code, count}){
        try {
            const res = await find_voucher_by_code(page, code, count);
            if(page === 1) {
                commit('CHANGE_LIST_VOUCHER', res.data.data)
            }
            else {
                commit('ADD_VOUCHER_TO_LIST', res.data.data)
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
            commit('CHANGE_TYPE_PRODUCT', res.data.data)
            
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
            console.log(res)
            commit('ADD_VOUCHER_TO_LIST', [res.data.data])
            return {
               ok: 'success'
            }
        }
        catch (error) {
            console.log(error)
            return {
                ok: error
            }
        }
    },
    async [voucher.get_detail_voucher] ({commit, dispatch}, id ) {
        try {
            const res= await detail_voucher(id)
            commit('CHANGE_LIST_DETAIL_VOUCHER', {id: id, data: res.data.data})
            return {
                ok: 'success'
            }
        } 
        catch (error) {
            return {
                ok: "error"
            }
        }
    },
    async [voucher.edit_voucher] ({commit, dispatch}, {id , data}) {
        try {
            const res= await edit_voucher(id, data)
            commit('CHANGE_LIST_DETAIL_VOUCHER', {id: id, data: res.data.data})
            return {
                ok: 'success'
            }
        } 
        catch (error) {
            console.log(error)
            return {
                ok: error
            }
        }
    },

    async [voucher.get_list_voucher_delete] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_voucher_deleted(start, end)
            if(start==0){
                commit('CHANGE_LIST_VOUCHER_DELETE', res.data.data)
            }
            else {
                commit('ADD_VOUCHER_DELETE_TO_LIST', res.data.data)
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
    async [voucher.delete_voucher_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_voucher_deleted_at(id);
            commit('DELETE_VOUCHER_DELETE_AT', id)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [voucher.recover_delete_voucher] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_voucher(id);
            commit('ADD_VOUCHER_TO_LIST', [res.data.data])
            commit('DELETE_VOUCHER_DELETE_AT', id)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
}