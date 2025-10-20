import axiosInstance from '@/api/axiosAdmin.js';
export const get_list_voucher = async (start=0, end=0) => {
  return await axiosInstance.get(`/admin/vouchers`, {
    params: {
      start: start,
      end: end
    }
  })
    
}
export const upload_voucher_file_excel = async (fileContent) => {
	//console.log(fileContent);
	// return axiosInstance.post('/api/upload-excel-data', {
	// 	data: fileContent
	// });
	//trả về danh sách các dữ liệu mới thêm
  console.log('Đã lấy thêm từ API VOUCHER, excel')
	return {
		data: [
			{
        id: 1,
        code: "#55555",
        created_at: "2025-04-19 10:15:30",
        img: "/public/images/img_discount/img_discount_view-1.webp",
        percent: 10,
        status: "ACTIVE",
      },
      {
        id: 2,
        code: "#A1B2C3",
        created_at: "2025-04-20 08:45:10",
        img: "/public/images/img_discount/img_discount_view-2.webp",
        percent: 15,
        status: "ACTIVE",
      },
		]
	}
}
export const delete_voucher = async (ids) => {
  return axiosInstance.delete(`/admin/voucher`,  { 
    params: { ids } 
  });
   
}
export const add_voucher = async (formdata) => {
  return axiosInstance.post(`/admin/voucher`, formdata)

}
export const find_voucher_by_code = async (page, code, count) => {
  return axiosInstance.get('/admin/vouchers_code', {
      params: {
          page: page,
          code: code,
          count: count
      }
  });
}

export const get_type_user = async () => {
  console.log('Trả về các kiểu ngươif dùng ở API VOUCHER')
  //return axiosInstance.get(`/employee/detail_employee.php/${id}`);
  return {
    data: [
        {
          id: 1,
          code: "VIP",
        },
        {
          id: 2,
          code: "GOLD",
        },
        {
          id: 3,
          code: "SILK",
        },
        {
          id: 4,
          code: "DIAMOND",
        },
        {
          id: 4,
          code: "NEW",
        },
      ]
    }
}

export const  get_type_product = async () => {
  return axiosInstance.get('/admin/categories');
  
}

export const detail_voucher = async (id) => {
  return axiosInstance.get(`/admin/voucher/${id}`);
}
export const edit_voucher = async (id, data) => {
    data.append("_method", "PATCH");
    return axiosInstance.post(`/admin/voucher/${id}`, data)
}
export const get_list_voucher_deleted = async (start=0, end=0) => {
  return axiosInstance.get('/admin/vouchers/force', {    
      params: {	
          start: start,   
          end: end
      }
  });
  
}
  
export const delete_voucher_deleted_at = (id) => {
  return axiosInstance.delete(`/admin/voucher/force/${id}`);
} 
export const recover_delete_voucher = (id) => {
	return axiosInstance.patch(`/admin/voucher/restore/${id}`);
}



