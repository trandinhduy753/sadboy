import axiosInstance from '@/api/axiosClient.js';
export const add_comment = (data) => {
    return axiosInstance.post('/comment', data);
}