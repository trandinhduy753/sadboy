export const find_voucher = (user_id, code) => {
    //return url
    //kiểm tra có mã giảm giá hay không,
    //nếu có thì kiểm tra các điều kiện khác, liên quan đến ngươif dùng
    console.log('Tìm voucher tương ứng để áp dụng cho đơn hàng:= ', code, 'user_id:= ', user_id)
    return {
        data: {
            id: 1,
            code: '#TRANCUONG',
            name: 'Mã giám giá cực số, với những detail hời',
            img: '/public/images/img_discount/img_discount_view-3.webp',
            type: 'percent', //money//freeship
            percent: 10,
            total_user: 1000,
            per_use: 2,
            order_price_smallest: 500000,
            list_user_monoply: [
              {
                id: 1,
                code: "U001",
                name: "Nguyễn Trần Cường"
              },
              {
                id: 2,
                code: 'U002',
                name: 'Trần Đình Duy'
              }
            ],
            user_apply: 'VIP',
            product_apply: 'all',
            date_effect: '2003-10-10 12:12:12',
            date_end: '2004-10-10 04:45:40',
            status: 'ACTIVE',
            max_money: 100000,
            money_discount: 0,
        }
    }
}