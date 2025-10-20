import axiosInstance from "@/axios/axios"
import { comment } from '@/constant';
import {get_list_comment, delete_comment, detail_comment, find_comment_by_code, upload_comment_file_excel,
    get_list_comment_delete, recover_delete_comment, delete_comment_deleted_at
} from '@/api/admin/comment'
export default {
    async [comment.get_list_comment] ({commit}, {start=0 , end=20}) {
        try {
            const res= await get_list_comment(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_COMMENT', res.data.data)
                }
                else {
                    commit('ADD_COMMENT_TO_LIST', res.data.data)
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
    async [comment.find_comment_by_code] ({commit}, {page, code, count}){
        try {
            const res = await find_comment_by_code(page, code, count);
            if(res.status === 200 ) {
                if(page === 1 ) {
                    commit('CHANGE_LIST_COMMENT', res.data.data)
                }
                else {
                    commit('ADD_COMMENT_TO_LIST', res.data.data)
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
    async [comment.add_comment_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_comment_file_excel(fileContent);
            commit('ADD_COMMENT_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [comment.delete_comment] ({commit, dispatch}, ids){
        try {
            const res= await delete_comment(ids)
            if(res.status === 204 ) {
                commit('DELETE_COMMENT', ids)
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

    async [comment.get_detail_comment]({commit}, {id, page}) {
        try {
            const res= await detail_comment(id, page)
            if(res.status === 200 ) {
                if( page === 1 )  {
                    commit('CHANGE_LIST_DETAIL_COMMENT', {id:id, data: res.data.data })
                }
                else {
                    commit('ADD_COMMENT_TO_DETAIL', {id:id, data: res.data.data })
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
    async [comment.get_list_comment_delete] ({commit}, {start, end}) {
        try {
            const res= await  get_list_comment_delete(start, end)
            if(res.status === 200 ) {
                if(start==0){
                    commit('CHANGE_LIST_COMMENT_DELETE', res.data.data)
                }
                else {
                    commit('ADD_COMMENT_DELETE_TO_LIST', res.data.data)
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
    async [comment.delete_comment_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_comment_deleted_at(id);
            if(res.status === 204) {
                commit('DELETE_COMMENT_DELETE_AT', id)
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
    async [comment.recover_delete_comment] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_comment(id);
            if(res.status === 200) {
                commit('ADD_COMMENT_TO_LIST', [res.data.data])
                commit('DELETE_COMMENT_DELETE_AT', id)
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