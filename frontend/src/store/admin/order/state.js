export default {
    add_opt: {
        title: "",
        description: "Danh sách đơn đặt hàng",
        router: '',
        type: 'order',
        delete_sort: 'Danh sách đơn hàng đã xoá'
    },
    order_status:{
        'SUCCESS': {
            title: 'Đã giao hàng',
            bg: 'bg-green-500 dark:bg-green-700 dark:text-gray-300 '
        },
        'LOCKING': {
            title: "Đang đóng hàng",
            bg: "bg-yellow-400 dark:bg-yellow-700 dark:text-gray-300"
        },
        'SHIPPING': {
            title: "Đang vận chuyển",
            bg: 'bg-green-500 dark:bg-green-700 dark:text-gray-300'
        },
        'CANCEL': {
            title: "Đã bị huỷ",
            bg: 'bg-red-500 dark:bg-red-700 dark:text-gray-300'
        },
        'PENDING': {
            title: "Chờ xác nhận",
            bg: "bg-blue-500 dark:bg-blue-700 dark:text-gray-300"
        }, 
        "RETURN": {
            title: "Trả hàng",
            bg: "bg-red-500 dark:bg-red-700 dark:text-gray-300"
        }, 
        "PAID": {
            title: "Đã thanh toán",
            bg: 'bg-green-500 dark:bg-green-700 dark:text-gray-300 '
        }
    },
    checked: false,
    selected_order_ids: [],
    sortby: '',
    sort_opt: '', 
    sort_status: '',
    title_manages: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "ID đơn hàng",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Địa chỉ",
            col: "col-span-5",
            sort: ""
        },
        {
            title: "Ngày đặt",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Tổng tiền",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Trạng thái",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Chức năng",
            col: "col-span-3"
        }
    ],
    detail_order: {

    },
    list_detail_order: {
        
    },
    pays: [
        {
            opt: "MON",
            title: "Thanh toán khi nhận hàng"
        },
        {
            opt: "ACC",
            title: "Đã thanh toán từ tiền trong tài khoản"
        }
    ],
    results: [
        
    ],
    orders: [],
    start_find: 0,
    end_find: 0,
    show_list_order_delete: false,
    orders_delete: []
}