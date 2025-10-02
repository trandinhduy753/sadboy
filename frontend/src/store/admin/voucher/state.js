export default {
    add_opt: {
        title: "Thêm mã giảm giá mới",
        description: "Danh sách mã giảm giá",
        router: 'admin_sadboizz.voucher.add',
        type: 'voucher',
        delete_sort: 'Danh sách mã giảm giá đã xoá'
    },
    title_manages: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "ID voucher",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Ngày tạo",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Ảnh",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Số % giảm | Số tiền giảm",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Trạng thái",
            col: "col-span-4",
            sort: ""
        },
        {
            title: "Chức năng",
            col: "col-span-3",
    
        }
    ],
    checked: false,
    selected_voucher_ids: [],
    sortby: '',
    sort_opt: '',
    sort_status: '',
    voucher_status: {
        'ACTIVE': {
            title: 'Còn hiệu lực',
            bg: 'bg-green-400 dark:bg-green-700'
        },
        'DELETE': {
            title: 'Hết hiệu lực',
            bg: 'bg-red-400 dark:bg-red-700'
        },
        "EXPIRE": {
            title: 'Sắp có hiệu lực',
            bg: 'bg-yellow-400 dark:bg-yellow-700'
        }
    },
    types_user: [],
    types_product: [],
    list_detail_voucher: {

    },
    list_user: [

    ],
    results: [
        
    ],
    show_list_voucher_delete: false,
    vouchers_delete: [],
    start_find: 0,
    end_find: 0,
}