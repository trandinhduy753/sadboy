import axiosInstance from '@/api/axiosAdmin.js';

export const delete_employee = (ids) =>{
	return axiosInstance.delete('/admin/employee', { 
		params: { ids } 
	});
}

export const delete_employee_deleted_at = (id) => {
	return axiosInstance.delete(`/admin/employee/force/${id}`);
} 

export const get_list_employee = (start=0, end=20) => {
	return axiosInstance.get('/admin/employees', {
			params: { 
				start: start, 
				end: end 
			}
		}
	)
}

export const get_list_employee_deleted = (start, end) => {
	return axiosInstance.get('/admin/employees/force', {	
		params: {	
			start: start,		
			end: end
		}	
	});
}

export const recover_delete_employee = (id) => {
	return axiosInstance.patch(`/admin/employee/restore/${id}`)
}

export const upload_employee_file_excel = (fileContent) => {
  console.log('Đã lấy ở API EMPLOYEE EXCEL')
	//console.log(fileContent);
	// return axiosInstance.post('/api/upload-excel-data', {
	// 	data: fileContent
	// });
	//trả về danh sách các dữ liệu mới thêm
	return {
		data: [
			{
				id: 1,
				code: "11111",
				name: "Trần Đình Duy",
				img: '/public/images/img_user/img_user.jpg',
				phone: "0988870434",
				position: "Nhân viên",
				
			},
			{
				id: 2,
				code: "22222",
				name: "Trần Thị Lan Lan Lan",
				img: '/public/images/img_user/img_user.jpg',
				phone: "0901234567",
				position: "Trưởng phòng",
				
			}
		]
	}
} 
export const add_employee = (formData) => {
	return axiosInstance.post('/admin/employee', formData);
}
export const detail_employee = (id) => {
	return axiosInstance.get(`/admin/employee/${id}`);
}

export const edit_employee = (id, formdata) => {
	formdata.append("_method", "PATCH"); 
	return axiosInstance.post(`/admin/employee/${id}`, formdata);
} 

export const find_employee_by_name = (page, find, count) => {
	return axiosInstance.get('/admin/employees_name', {
		params: {
			page: page,
			find: find,
			count: count
		}
	})
}

export const get_positions_employee = () => {
	return axiosInstance.get('/admin/positions');
}

export const get_grants_employee = () => {
	return axiosInstance.get('/admin/grants');
}
export const get_contrasts_employee = () => { 
    return axiosInstance.get('/admin/contrasts');
}
export const get_departments_employee = () => {
	return axiosInstance.get('/admin/departments');
}
export const get_work_shifts_employee = () => {
	return axiosInstance.get('/admin/work_shifts');
}