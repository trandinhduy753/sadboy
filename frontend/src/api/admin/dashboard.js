import axiosInstance from '@/api/axiosAdmin.js';
export const get_info_dashboard = async () => {
    return axiosInstance.get('/admin/dashboards');
}