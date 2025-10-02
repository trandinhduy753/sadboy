export default {
    show_debt: 'debt_provide',
    show_spend: 'Cash_books',
    list_goods_receipt: [],
    status_goods_receipt: {
        "SUCCESS": {
            title: 'Đã giao hàng',
            bg: 'text-green-500 dark:text-green-400 bg-green-200 dark:bg-green-900'
        },
        "PENDING": {
            title: 'Chờ xác nhận',
            bg: 'text-yellow-500 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-900'
        },
        "CANCEL": {
            title: 'Đã bị huỷ',
            bg: 'text-red-500 dark:text-red-400 bg-red-200 dark:bg-red-900'
        },
        'SHIPPING': {
            title: 'Đang giao hàng',
            bg: 'text-blue-500 dark:text-blue-400 bg-blue-200 dark:bg-blue-900'
        },
        'BANKING': {
            title: 'Đã thanh toán',
            bg: 'text-green-500 dark:text-green-400 bg-green-200 dark:bg-green-900'
        }
    },
    sortby: '',
    sort_opt: '',
    sort_status: '',
    debt_provide_info: {},
    list_provide_debt: [],
    list_detail_goods_receipt: {

    },
    bill_collect_spend: {},
    list_votes: [],
    list_order: [],
    isCallApiDebt: true,
    start_find: 0,
    end_find: 0,
}
