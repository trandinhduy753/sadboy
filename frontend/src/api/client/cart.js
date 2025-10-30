import axiosInstance from '@/api/axiosClient.js';
export const list_cart = (user_id, page, count) => {
    return axiosInstance.get('/carts', {
        params: {
            page: page
        }
    })
   
}
export const delete_product_in_cart = (user_id, id) => {
    return axiosInstance.delete('/cart', {
        params: {
            id: id
        }
    })
}
export const add_product_to_cart = (user_id, data) => {
    return axiosInstance.post('/cart', data)
}

export const check_order_pay = (order_code) => {
    return axiosInstance.get('/order_check_pay/' + order_code)
}