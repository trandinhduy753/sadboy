export default {
    add_opt: {
        title: "Thêm nhân viên mới",
        description: "Danh sách nhân viên",
        router: 'admin_sadboizz.employee.add',
        type: 'employee',
        delete_sort: 'Danh sách nhân viên đã xoá'
    },
    list_detail_employee: {

    },
    checked: false,
    selected_employee_ids: [],
    sortby: '',
    sort_opt: '', 
    positions: [
        
    ],
    grants: [
        
    ],
    contrasts: [
        
    ],
    departments: [
        
    ],
    work_shifts: [
        
    ],
    diplomas: {
        'DAIHOC': 'Đại học',
        'THPT': 'Trung học phổ thông',
        'THCS': 'Trung học cơ sở',
        'CAODANG': 'Cao đẳng',
    },
    status: {
        'KETHON': 'Đã kết hôn',
        'DOCTHAN': 'Độc thân',
        'LYTHAN': 'Đang ly thân',
        'THAISAN': 'Đang nghỉ thai sản',
        'NGHIVIEC': 'Đã nghỉ viêc'
    },
    genders: [
       
    ],
    performs: [
        
    ],
    title_table_employee: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "ID nhân viên",
            col: "col-span-2",
            sort:''
        },
        {
            title: "Họ và tên",
            col: "col-span-4",
            sort: "↑↓"
        },
        {
            title: "Ảnh thẻ",
            col: "col-span-2",
            sort: ''
        },
        {
            title: "SĐT",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Chức vụ",
            col: "col-span-3",
            sort: "↑↓"
        },
        {
            title: "Chức năng",
            col: "col-span-3"
        }
    ],
    employees: [
        
    ],
    employees_delete: [],
    employee: {},
    show_list_employee_delete: false,
    start_find: 0,
    end_find: 0,
}