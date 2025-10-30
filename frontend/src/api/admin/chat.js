

import axiosInstance from '@/api/axiosAdmin.js';

export const get_list_user_chat = (admin_id, page, count) => {
    return axiosInstance.get('/admin/messages_user', {
        params: {
            page,
            count
        }
    });
}

export const detail_user_chat =(admin_id, user_id, page, count) => {
    return axiosInstance.get('/admin/messages', {
        params: {
            user_id,
            page,
            count
        }
    });
}

export const addMessage = (data) => {
    return axiosInstance.post('/admin/message', data);

}
