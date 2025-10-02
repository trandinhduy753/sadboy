export default {
    //detail_order: { "address": "111", "note": "1111", "pay": "HOMEPAY", "code": "Y9drfX0JZGYyG1v", "name": "Quả xoài, Quả táo đỏ, Quả cam ngọt ", "date_delivery": "2025-08-31", "subtotal": 1760000, "money_discount": 0, "money_ship": 0, "total": 1760000, "product_id": [ 2, 3, 4 ], "user_id": 18, "unit_shipping": "Giao hàng nhanh", "products": [ { "id": 2, "code": "happy001", "product": { "name": "Quả xoài", "img": "/public/images/img_product/product_img-2.jpg" }, "price": 30000, "count": 25, "size": "L" }, { "id": 3, "code": "fresh002", "product": { "name": "Quả táo đỏ", "img": "/public/images/img_product/product_img-3.jpg" }, "price": 25000, "count": 18, "size": "S" }, { "id": 4, "code": "juicy003", "product": { "name": "Quả cam ngọt", "img": "/public/images/img_product/product_img-4.jpg" }, "price": 28000, "count": 20, "size": "M" } ] }
    detail_order: {},
    list_order: [],
    order_status:{
        'SUCCESS': {
            title: 'Đã giao hàng',
            bg: 'bg-green-500 dark:bg-green-700 dark:text-gray-300 '
        },
        'LOCKING': {
            title: "Đang chuẩn bị hàng",
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
        }
    },
    filter_status: '',
    list_order_detail: {
        
    },
    start_find: 0,
    end_find: 0
}