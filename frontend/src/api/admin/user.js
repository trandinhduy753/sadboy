import axiosInstance from "@/api/axios.js";
export const get_list_user = (start, end) => {
    return axiosInstance.get('/admin/users', {    
        params: {	
            start: start,   
            end: end
        }
    });
}

export const upload_user_file_excel = (fileContent) => {
	//console.log(fileContent);
	// return axiosInstance.post('/api/upload-excel-data', {
	// 	data: fileContent
	// });
	//trả về danh sách các dữ liệu mới thêm
    console.log('Đã lấy thêm từ API USER, excel')
	return {
		data: [
			{
                id: 1,
                code: "#U0001",
                name: "Nguyễn Văn An",
                img: "/public/images/img_user/img_user.jpg",
                email: "an.nguyen1@example.com",
                type: "VIP"
            },
            {
                id: 2,
                code: "#U0002",
                name: "Trần Thị Bình",
                img: "/public/images/img_user/img_user.jpg",
                email: "binh.tran2@example.com",
                type: "VIP"
            }
		]
	}
} 
export const delete_user = (ids) => {
    return axiosInstance.delete('/admin/user',  { 
		params: { ids } 
	});
}
export const detail_user = (id) => {
    return axiosInstance.get(`/admin/user/${id}`);
}

export const edit_user = (id, formdata) => {
    formdata.append("_method", "PATCH"); 
    return axiosInstance.post(`/admin/user/${id}`, formdata)
    
}

export const find_user_by_name = (page, name, count) => {
    return axiosInstance.get('/admin/users_name', {
        params: {
            page: page,
            find: name,
            count: count
        }
    });
}

export const get_list_user_deleted = (start, end) => {
    return axiosInstance.get('/admin/users/force', {    
        params: {	
            start: start,   
            end: end
        }
    });
    
}

export const delete_user_deleted_at = (id) => {
    return axiosInstance.delete(`/admin/user/force/${id}`);
} 
export const recover_delete_user = (id) => {
	return axiosInstance.patch(`/admin/user/restore/${id}`);
}
