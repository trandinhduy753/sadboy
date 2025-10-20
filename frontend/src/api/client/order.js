import axiosInstance from '@/api/axiosClient.js';
export const add_order = (data) => {
  return axiosInstance.post('/order', data);
}
export const get_list_order = (user_id, page, count) => {
    return axiosInstance.get('/orders', {
      params: {
        page,
        count
      }
    }) 
}

export const detail_order = (user_id, order_code) => {
  return  axiosInstance.get('/order/' + order_code)
}

export const find_order_by_code = (page, user_id, order_code, count) => {
  return axiosInstance.get('order_find', {
    params: {
      page,
      code: order_code,
      count
    }
  })
}
