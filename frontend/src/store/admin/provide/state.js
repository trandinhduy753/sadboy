export default {
    add_opt: {
        title: "Thêm nhà cung cấp mới",
        description: "Danh sách nhà cung cấp",
        router: 'admin_sadboizz.provide.add',
        type: 'provide',
        delete_sort: 'Danh sách nhà cung cấp đã xoá'
    },
    title_manages: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "ID provide",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Tên nhà cung cấp",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Điện thoại",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Địa chỉ",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Email",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Chức năng",
            col: "col-span-4",
    
        }
    ],
    checked: false,
    selected_provide_ids: [],
    sortby: '',
    sort_opt: '',
    sort_by_order: '',
    sort_opt_order: '',
    sort_status_order: '',
    results: [],
    provides: [],
    list_detail_provide: {
        
    },
    status_provide: {
        "ACTIVE": {
            title: 'Đang hoạt động',
            bg: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
        },
        "DEACTIVE" : {
            title: 'Đã ngừng hoạt động',
            bg: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
        }
    },
    status_order: {
        "PENDING": {
            title: 'Chờ nhập',
            bg: 'text-yellow-500'
        },
        "SUCCESS": {
            title: 'Hoàn thành',
            bg: 'text-green-500'
        },
        "CANCEL": {
            title: 'Bị huỷ',
            bg: 'text-red-500'
        }
    },
    list_order: {

    },
    show_list_provide_delete: false,
    provides_delete: [],
    start_find: 0,
    end_find: 0,
    isCallApiProvide: true
}