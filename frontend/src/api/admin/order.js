import axiosInstance from '@/api/axiosAdmin.js';
export const get_list_order = (start=0, end=0) => {
    return axiosInstance.get('/admin/orders', { 
        params: {
            start: start,
            end: end
        }   
    });
}

export const upload_order_file_excel = (start = 0, end = 0) => {
    // return axiosInstance.post('/api/upload-excel-data', {
	// 	data: fileContent
	// });
    console.log('đã thêm ở API ORDER')
    return {
        data: [
            {
                id: 1,
                code: "#444444",
                address: "0988870434, ngõ 259 vĩnh hưng",
                created_at: "2025-04-19",
                list_product: "Quả dưa hấu, măng cụt, bánh mỳ",
                status: "SUCCESS"
            },
            {
                id: 2,
                code: "#A1B2C3",
                address: "0912345678, 12 Láng Hạ",
                created_at: "2025-05-01",
                list_product: "Cà phê, bánh ngọt",
                status: "LOCKING"
            }
        ]
        
    }
}
export const delete_order= (ids) => {
    return axiosInstance.delete('/admin/order',  {  
        params: { ids }
    });
}
export const confirm_all_order =  (status='PENDING') => {
    return axiosInstance.patch('/admin/order/confirm');
   
}
export const detail_order = (id) => {
    return axiosInstance.get(`/admin/order/${id}`);
}

export const edit_order= (id, data) => {
    return axiosInstance.patch(`/admin/order/${id}`, data)
}

export const get_list_order_deleted = (start=0, end=0) => {
    return axiosInstance.get('/admin/orders/force', { 
        params: {
            start: start,
            end: end
        }   
    });
}

export const delete_order_deleted_at = (id) => {
    return axiosInstance.delete(`/admin/order/force/${id}`);
} 
export const recover_delete_order = (id) => {
	return axiosInstance.patch(`/admin/order/restore/${id}`);
}
export const find_order = (page, find, count) => {
    return axiosInstance.get('/admin/orders_code', {
        params: {
            page: page,
            find: find,
            count: count
        }
    });
}


