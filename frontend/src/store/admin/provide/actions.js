import {provide} from '@/constant'
import { get_list_provide, upload_provide_file_excel, find_provide_by_name, delete_provide, add_provide, detail_provide, 
    load_add_order, edit_provide, get_list_provide_deleted, delete_provide_deleted_at, recover_delete_provide } from '@/api/admin/provide.js'
    
export default {
    async [provide.get_list_provide] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_provide(start, end)
            if(start==0){
                commit('CHANGE_LIST_PROVIDE', res.data.data)
            }
            else {
                commit('ADD_PROVIDE_TO_LIST', res.data.data)
            }
            
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
    async [provide.add_provide_file_excel] ({commit}, fileContent) {
        try {
        
            const res = await upload_provide_file_excel (fileContent);
            commit('ADD_PROVIDE_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [provide.find_provide] ({commit}, {page, name, count}){
        try {
            const res = await find_provide_by_name(page, name, count);
            if(page === 1){
                commit('CHANGE_LIST_PROVIDE', res.data.data)
            }
            else {
                commit('ADD_PROVIDE_TO_LIST', res.data.data)
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
    async [provide.delete_provide] ({commit, dispatch}, ids="123"){
        try {
            const res = await delete_provide(ids);
            commit('DELETE_PROVIDE', ids)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [provide.add_provide]({ commit, dispatch }, data) {
        try {
            const res = await add_provide(data);
            console.log(res)
            commit('ADD_PROVIDE_TO_LIST', [res.data.data])
            return {
                ok: "success"
            }
        } catch (error) {
            console.log(error)
            return {
                ok: "error"
            }
            
        }
    },
    async [provide.get_detail_provide] ({commit, dispatch}, {id, page}){
        try {
            const res = await detail_provide(id, page);
            commit('CHANGE_LIST_DETAIL_PROVIDE', {id:id, data: res.data.data})
            
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [provide.load_add_order_provide] ({commit }, {provide_id, page}){
        try {
            const res = await load_add_order(provide_id, page);
            const id = provide_id;
            commit('CHANGE_LIST_ORDER', {id: id, data: res.data.data})
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [provide.edit_provide] ({commit }, {id, data}){
        try {
            const res = await edit_provide(id, data);
            commit('CHANGE_LIST_DETAIL_PROVIDE', {id:id, data: res.data.data})
            return {
                ok: "success"
            }
        } catch (error) {
            console.log(error)
            return {
                ok: error
            }
            
        }
    },

    async [provide.get_list_provide_delete] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_provide_deleted(start, end)
            if(start==0){
                commit('CHANGE_LIST_PROVIDE_DELETE', res.data.data)
            }
            else {
                commit('ADD_PROVIDE_DELETE_TO_LIST', res.data.data)
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
    async [provide.delete_provide_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_provide_deleted_at(id);
            commit('DELETE_PROVIDE_DELETE_AT', id)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [provide.recover_delete_provide] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_provide(id);
            commit('ADD_PROVIDE_TO_LIST', [res.data.data])
            commit('DELETE_PROVIDE_DELETE_AT', id)
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