
import { user } from '@/constant'
import { get_list_user, upload_user_file_excel, delete_user, detail_user, edit_user, find_user_by_name, get_list_user_deleted, 
    delete_user_deleted_at, recover_delete_user
} from '@/api/admin/user.js'
export default {
    async [user.get_list_user] ({commit}, {start, end}) {
        try {
            const res= await get_list_user(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_USER', res.data.data)
                }
                else {
                    commit('ADD_USER_TO_LIST', res.data.data)
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
    async [user.find_user] ({commit}, {page, name, count}){
        try {
            const res = await find_user_by_name(page, name, count);
            if(res.status === 200 ) {
                if(page ===1 ){
                    commit('CHANGE_LIST_USER', res.data.data)
                }
                else {
                    commit('ADD_USER_TO_LIST', res.data.data)
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

    async [user.add_user_file_excel] ({commit}, fileContent) {
        try {
        
            const res = await upload_user_file_excel (fileContent);
            commit('ADD_USER_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [user.delete_user] ({commit, dispatch}, ids="123"){
        try {
            const res = await delete_user(ids);
            if(res.status === 204 ) {
                commit('DELETE_USER', ids)
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
    async [user.get_detail_user] ({commit, dispatch}, id=-1){
        try {
            const res = await detail_user(id);
            if(res.status === 200) {
                commit('CHANGE_LIST_DETAIL_USER', {id:id, data: res.data.data})
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
    async [user.edit_user] ({commit, dispatch}, {id, data}) {
        try {
            const res = await edit_user(id, data);
            if(res.status === 200 ) {
                commit('CHANGE_LIST_DETAIL_USER', { id: id, data: res.data.data })
            }
            return {
                ok: "success"
            }
        } catch (error) {
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
    async [user.get_list_user_deleted] ({commit}, {start= 0, end= 20}) {
        try {
            const res= await get_list_user_deleted(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_USER_DELETE', res.data.data)
                }
                else {
                    commit('ADD_USER_DELETE_TO_LIST', res.data.data)
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
    async [user.delete_user_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_user_deleted_at(id);
            if(res.status === 204) {
                commit('DELETE_USER_DELETE_AT', id)
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
    async [user.recover_delete_user] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_user(id);
            if(res.status === 200 ) {
                commit('ADD_USER_TO_LIST', [res.data.data])
                commit('DELETE_USER_DELETE_AT', id)
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