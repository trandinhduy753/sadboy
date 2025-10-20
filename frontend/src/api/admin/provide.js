import axiosInstance from '@/api/axiosAdmin.js';
export const get_list_provide = async (start=0, end=20) => {
    return axiosInstance.get('/admin/provides', { 
        params: {
            start: start,
            end: end
        }
    });
} 

export const upload_provide_file_excel = async (fileContent) => {
	//console.log(fileContent);
	// return axiosInstance.post('/api/upload-excel-data', {
	// 	data: fileContent
	// });
	//trả về danh sách các dữ liệu mới thêm
    console.log('Đã lấy thêm từ API PROVIDE, excel')
	return {
		data: [
			{
                id: 1,
                code: "#777777",
                name: "TNHH Sadboy",
                phone: "0988870434",
                address: "Ngõ 259 Vĩnh Hưng, Hoàng Mai, Hà Nội",
                email: "nguyentrancuong58@gmail.com",
                type: "provide"
            },
            {
                id: 2,
                code: "#FF5733",
                name: "Công ty TNHH Minh Quân",
                phone: "0912345678",
                address: "12 Nguyễn Trãi, Thanh Xuân, Hà Nội",
                email: "contact@minhquan.vn",
                type: "provide"
            },
		]
	}
}
export const find_provide_by_name = async (page, name, count) => {
    return axiosInstance.get('/admin/provides_name', {
        params: {
            page: page,
            name: name,
            count: count
        }
    }); 
}

export const delete_provide = async (ids) => {
    return axiosInstance.delete('/admin/provide', {
        params: {
            ids: ids
        }
    })
}

export const add_provide = async (data) => {
    return axiosInstance.post('/admin/provide', data)
}

export const detail_provide = (id, page) => {
    return axiosInstance.get(`/admin/provide/${id}`, {
        params: {
            page: page
        }
    })
}

export const load_add_order = (provide_id, page) => {
    return axiosInstance.get(`/admin/provide/${provide_id}/orders`, {
        params: {
            page: page
        }
    })
}

export const edit_provide = (id, data) => {
    data.append("_method", "PATCH"); 
    return axiosInstance.post(`/admin/provide/${id}`, data)
}

export const get_list_provide_deleted = async (start=0, end=20) => {
    return axiosInstance.get('/admin/provides/force', { 
        params: {
            start: start,
            end: end
        }
    });
}

export const delete_provide_deleted_at = (id) => {
    return axiosInstance.delete(`/admin/provide/force/${id}`)
} 

export const recover_delete_provide = (id) => {
    return axiosInstance.patch(`/admin/provide/restore/${id}`);
}