import axiosInstance from "@/axios/axios";
import { employee } from "@/constant";
import { get_list_employee,  delete_employee, edit_employee, detail_employee, get_contrasts_employee, get_departments_employee, 
    get_grants_employee, get_work_shifts_employee, get_positions_employee, add_employee, upload_employee_file_excel, find_employee_by_name, 
    get_list_employee_deleted, delete_employee_deleted_at, recover_delete_employee } 
from '@/api/admin/employee.js';
//console.log(error.response.data)
export default {
    
    async [employee.delete_employee] ({commit, dispatch}, ids="123"){
        try {
            const res = await delete_employee(ids);
            commit('DELETE_EMPLOYEE', ids)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [employee.delete_employee_deleted_at] ({commit, dispatch}, id){
        try {
            const res = await delete_employee_deleted_at(id);
            commit('DELETE_EMPLOYEE_DELETE_AT', id)
            return {
                ok: "success"
            }
            
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [employee.recover_delete_employee] ({commit, dispatch}, id){
        try {
            const res = await recover_delete_employee(id);
            commit('ADD_EMPLOYEE_TO_LIST', [res.data.data])
            commit('DELETE_EMPLOYEE_DELETE_AT', id)
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
    async [employee.find_employee_by_name] ({commit}, {page, find, count }){
        try {
            const res = await find_employee_by_name(page, find, count);
            if(page === 1) {
                commit('CHANGE_LIST_EMPLOYEE', res.data.data)
            }
            else {
                commit('ADD_EMPLOYEE_TO_LIST', res.data.data)
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
    
    async [employee.add_employee_file_excel] ({commit}, fileContent) {
        try {
            const res = await upload_employee_file_excel (fileContent);
            commit('ADD_EMPLOYEE_TO_LIST', res.data)
            return {
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
            
        }
    },
    async [employee.get_list_employee] ({ commit, state }, {start=0 , end=20} ){
        try {
            const res = await get_list_employee(start, end);
            if(start==0){
                commit('CHANGE_LIST_EMPLOYEE', res.data.data)
            }
            else {
                commit('ADD_EMPLOYEE_TO_LIST', res.data.data)
            }
            return {
                ok: 'success'
            }
        } catch (error) {
        }
    },
    async [employee.get_list_employee_delete] ({ commit, state }, {start=0 , end=20} ){
        try {
            const res = await get_list_employee_deleted(start, end);
            if(start==0){
                commit('CHANGE_LIST_EMPLOYEE_DELETE', res.data.data)
            }
            else {
                commit('ADD_EMPLOYEE_DELETE_TO_LIST', res.data)
            }
            return {
                ok: 'success'
            }
        } catch (error) {
        }
    },

    async [employee.add_employee]({ commit, dispatch }, data_employee_add) {
        try {
            const res = await add_employee(data_employee_add );
            commit('ADD_EMPLOYEE_TO_LIST', [res.data.data])
            const id = res.data.data.id;
            commit('CHANGE_LIST_DETAIL_EMPLOYEE', {id:id, data: res.data.data})
            return {
                ok: "success"
            }
        } catch (error) {
            console.log(error)
            
        }
    },
    async [employee.edit_employee] ({commit, dispatch},  {id , data}) {
        try {
            const res = await edit_employee(id, data);
            commit('CHANGE_LIST_DETAIL_EMPLOYEE', {id:id, data: res.data.data})
            return {
               
                ok: "true"
            }
        }
        catch (error) {
            console.log(error)
            return {
                ok: false,
                error,
            }
        }
    },
    async [employee.get_detail_employee] ({commit}, id){
        try {
            const res = await detail_employee(id)
            commit('CHANGE_LIST_DETAIL_EMPLOYEE', {id:id, data: res.data.data})
            return {
                ok: "success",
            }
            
        } catch (error) {
            return {
              ok: false,
              error,
            }
        }
    },
    async [employee.get_infor_work]  ({commit}) {
        try {
            const [contrasts, departments, grants, work_shifts, positions] = await Promise.all([
                get_contrasts_employee(), 
                get_departments_employee(), 
                get_grants_employee(), 
                get_work_shifts_employee(), 
                get_positions_employee()
            ])

            commit('CHANGE_POSITIONS', positions.data.data)
            commit('CHANGE_CONTRASTS', contrasts.data.data)
            commit('CHANGE_GRANTS', grants.data.data)
            commit('CHANGE_DEPARTMENTS', departments.data.data)
            commit('CHANGE_WORK_SHIFTS', work_shifts.data.data)
            return {
                ok: 'success',
            }
            
        } catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    }


   
}