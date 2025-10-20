import axiosInstance from '@/api/axiosAdmin.js';
export const list_stock = async (start=0, end=20) => {
    return axiosInstance.get('/admin/stocks', { 
        params: {
            start: start,
            end: end
        }
    });
}