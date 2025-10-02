import axiosInstance from "@/axios/axios"
import { get_list_order, upload_order_file_excel, delete_order, detail_order, edit_order, 
    confirm_all_order, find_order, get_list_order_deleted, delete_order_deleted_at, recover_delete_order
 } from '@/api/admin/order.js';
import { order } from '@/constant'
export default {
    async [order.get_list_order] ({commit}, {start=0 , end=20}) {
        try {
            const res = await get_list_order(start, end)
            if(start == 0){
                commit('CHANGE_LIST_ORDER', res.data.data)
            }
            else {
                commit('ADD_ORDER_TO_LIST', res.data.data)
            }
            
            return {
                ok: "succcess"
            }
        } 
        catch (error) {
            return {
                ok: "error"
            }
        }
    },
    async [order.find_order] ({commit}, {page, find, count}){
        try {
            const res = await find_order(page, find, count);
            if(page === 1) {
                commit('CHANGE_LIST_ORDER', res.data.data)
            }
            else {
                commit('ADD_ORDER_TO_LIST', res.data.data)
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
    async [order.add_order_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_order_file_excel (fileContent);
            commit('ADD_ORDER_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [order.delete_order] ({commit, dispatch}, ids="") {
        try {
            const res= await delete_order(ids)
            commit('DELETE_ORDER', ids)
            return {
                data: res.data,
                ok: "success"
            }
        } 
        catch (error) {
            return {
                ok: error
            }
        }
       
    },
    async [order.confirm_all_order] ({commit}, status) {
        try {
            const res = confirm_all_order(status)
            commit('CHANGE_STATUS_ORDER' , status)
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

    async [order.get_detail_order] ({commit}, id) {
        try {
            const res= await detail_order(id)
            commit('CHANGE_LIST_DETAIL_ORDER', {id: id, data: res.data.data})
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


    async [order.edit_order] ({commit}, {id, data} ){
        try {
       
            const res= await edit_order(id, data)
            commit('CHANGE_LIST_DETAIL_ORDER', {id: id, data: res.data.data})
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
    async [order.get_list_order_deleted] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_order_deleted(start, end)
            if(start==0){
                commit('CHANGE_LIST_ORDER_DELETE', res.data.data)
            }
            else {
                commit('ADD_ORDER_DELETE_TO_LIST', res.data.data)
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
    async [order.delete_order_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_order_deleted_at(id);
            commit('DELETE_ORDER_DELETE_AT', id)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [order.recover_delete_order] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_order(id);
            commit('ADD_ORDER_TO_LIST', [res.data.data])
            commit('DELETE_ORDER_DELETE_AT', id)
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