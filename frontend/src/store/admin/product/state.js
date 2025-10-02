export default {
    add_opt: {
        title: "Thêm sản phẩm mới",
        description: "Danh sách sản phẩm",
        router: 'admin_sadboizz.product.add',
        type: "product",
        delete_sort: 'Danh sách sản phẩm đã xoá'
    },
    title_manages: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "Mã sản phẩm",
            col: "col-span-3"
        },
        {
            title: "Tên sản phẩm",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Ảnh",
            col: "col-span-2"
        },
        {
            title: "Giá tiền",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Danh mục",
            col: "col-span-3",
            sort: ""
        },
        {
            title: "Chức năng",
            col: "col-span-3"
        }
    ],
    status: {
        'INSTOCK': {
            title: 'Còn hàng',
            bg: "bg-green-400 dark:bg-green-600"
        },
        'OUTSTOCK': {
            title: 'Hết hàng',
            bg: "bg-red-400 dark:bg-red-600"
        },
        'IMPORTING': {
            title: 'Đang nhập hàng',
            bg: "bg-yellow-400 dark:bg-yellow-600"
        }
    },
    checked: false,
    selected_product_ids: [],
    sortby: '',
    sort_opt: '',
    list_category: [],
    list_detail_product: {

    },
    results: [
       
    ],
    products: [],
    provides: [],
    stocks: [],
    list_product_order_import: [],
    list_product_order: [],
    show_list_product_delete: false,
    products_delete: [],
    products_salest: [],
    start_find: 0,
    end_find: 0,
}