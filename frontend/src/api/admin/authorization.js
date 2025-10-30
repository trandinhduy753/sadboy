import axiosInstance from '@/api/axiosAdmin.js';
export const get_authorization=async (employee_id) => {
    return axiosInstance.get(`/admin/employee/authorization/${employee_id}`)
}

export const save_authorization = (employee_id, permissions) => {  
    return axiosInstance.put(`/admin/employee/authorization/${employee_id}`, {
        permissions: permissions
    })
}
