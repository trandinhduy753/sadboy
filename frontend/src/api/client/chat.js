import  axiosInstance from '@/api/axiosClient.js';

export const  get_info_conversation = (user_id, page, count) => {
    return axiosInstance.get('/messages', {
        params: {
            page,
            count
        }
    }) 
    
}

export const add_messages = (data) => {
    return axiosInstance.post('/message', data)
}