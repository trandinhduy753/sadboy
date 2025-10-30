
export const productClient = {
    get_list_product_by_type: "getListProductByType",
    get_information_dashboard_client: "getInformationDashboardCLient",
    get_product_popular: "getProductPopular",
    get_detail_product: "getDetailProduct",
    add_comment_to_list: 'loadCommentToList',
    get_list_product_by_search: 'getListProductBySearch',
    get_list_product: 'getListProduct',
    add_product_search_to_list: 'addProductSearchToList'
}

export const formClient = {
    client_register: "clientRegister",
    login: "login",
    logout: "logout",
    loginGoogle: 'loginGoogle',
    sendOTP: 'sendOTP',
    verifyOTP: 'verifyOTP',
    resetPassword: 'resetPassword'
}
export const accountClient = {
    get_infor_user: "getInforUser",
    edit_user: "editUser",
    get_list_announce: "getListAnnounce",
    get_list_voucher: "getListVoucher"
}
export const cartClient = {
    get_list_cart: 'GetListCart',
    delete_product_in_cart: 'DeleteProductInCart',
    add_product_to_cart: "addProductToCart",
    check_order_pay: 'checkOrderPay'
}

export const voucherClient = {
    find_voucher: "findVoucher",
}

export const orderClient = {
    add_order: 'addOrder',
    get_list_order: 'getListOrder',
    detail_order: 'detailOrder',
    find_order_by_code: 'findOrderByCode',
    load_add_find_order: 'loadAddFindOrder'
}

export const chatClient = {
    get_info_conversation: 'getInfoConversation',
    get_detail_user_chat: 'getDetailUserChat',
    add_message: 'addMessage'
}

export const commentClient = {
    add_comment: 'addComment'
}