import axiosInstance from '@/api/axiosAdmin.js';
export const get_list_comment = async (start, end) => {
    return axiosInstance.get('/admin/comments', {    
        params: {	
            start: start,   
            end: end
        }
    });
}
export const find_comment_by_code = async (page, code, count) => {
    return axiosInstance.get('/admin/comments_code', {
        params: {
            page: page,
            code: code,
            count: count
        }
    }); 
}

export const upload_comment_file_excel = async (fileContent) => {
    console.log('Đã lấy ở API COMMENT EXCEL')
      //console.log(fileContent);
      // return axiosInstance.post('/api/upload-excel-data', {
      // 	data: fileContent
      // });
      //trả về danh sách các dữ liệu mới thêm
      return {
          data: [
            {
                id: 1,
                code: "#666666",
                created_at: "2025-04-29 12:12:12",
                like: 470,
                star: 4.9,
                content: "Quả dưa hấu, măng cụt, bánh mỳ",
                type: 'comment'
            },
            {
                id: 2,
                code: "#FF5733",
                created_at: "2025-05-01 08:30:45",
                like: 325,
                star: 3.8,
                content: "Táo, lê, nước cam",
                type: 'comment'
            },
        ]
      }
}

export const delete_comment = async (id) =>{
    return axiosInstance.delete('/admin/comments',  { 
        params: { ids: id } 
    });
}
export const detail_comment = async (id, page) => {
    return axiosInstance.get(`/admin/comment/${id}`, {
        params: {
            page: page,
        }
    });
}

export const get_list_comment_delete = async (start, end) => {
    return axiosInstance.get('/admin/comments/force', {    
        params: {	
            start: start,   
            end: end
        }
    });
}

export const delete_comment_deleted_at = (id) => {
    return axiosInstance.delete(`/admin/comment/force/${id}`);
} 
export const recover_delete_comment = (id) => {
	return axiosInstance.patch(`/admin/comment/restore/${id}`);
	
}