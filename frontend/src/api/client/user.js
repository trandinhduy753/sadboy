export const infor_user = () => {
    // tự động kèm theo cookie khi gửi request
    //return http://localhost:8000/api/auth/me
    console.log("Lấy thông tin người dùng thành công")
    return {
        data: {
            id: 18,
            code: 'sadboy12',
            name: 'Nguyễn Trần Cường',
            img: '/public/images/img_product/product_img-10C.jpg',
            email: 'nguyentrancuong58@gmail.com',
            phone: '0988870434',
            gender: 'nam',
            date_birth: '2025-12-25'
        }
    }
}
export const edit_user = (user_id, data) => {
    //return
    console.log('Đã sửa thông tin người dùng ở API user_id: ',user_id, data)
    return {
        data: {
            id: 18,
            code: 'sadboy12',
            name: 'Nguyễn Trần Cường mới',
            img: '/public/images/img_product/product_img-10C.jpg',
            email: 'nguyentrancuong58@gmail.com mới',
            phone: '0988870434 mới',
            gender: 'nam',
            date_birth: '2025-12-25'
        }
    }
}
export const get_list_announce = (user_id, start, end) => {
    //return
    console.log('Lấy danh sách thông báo của user_id:= ', user_id, 'start:= ', start, end)
    if(start==0) {
        return {
            data: [
                {
                    id: 1,
                    code: 'Sadboy',
                    name: 'Đơn hàng giao thành công',
                    img: '/public/images/img_product/product_img-1.jpg',
                    content: 'Mã đơn hàng ahcggdufyf đã được giao đến bạn',
                    created_at: '2025-12-12 12:35:54'
                },
                {
                    id: 2,
                    code: 'Happy01',
                    name: 'Đơn hàng chờ xác nhận',
                    img: '/public/images/img_product/product_img-2.jpg',
                    content: 'Mã đơn hàng 2uhgfy123 đang chờ xác nhận từ cửa hàng',
                    created_at: '2025-12-13 09:15:21'
                },
                {
                    id: 3,
                    code: 'Fast02',
                    name: 'Đơn hàng đang chuẩn bị',
                    img: '/public/images/img_product/product_img-3.jpg',
                    content: 'Mã đơn hàng ysh1234 đã được tiếp nhận và đang chuẩn bị',
                    created_at: '2025-12-13 10:05:11'
                },
                {
                    id: 4,
                    code: 'Quick03',
                    name: 'Đơn hàng đang vận chuyển',
                    img: '/public/images/img_product/product_img-4.jpg',
                    content: 'Đơn hàng 4hj23ah đang được giao bởi Giao Hàng Nhanh',
                    created_at: '2025-12-14 08:44:05'
                },
                {
                    id: 5,
                    code: 'Cool04',
                    name: 'Đơn hàng giao thất bại',
                    img: '/public/images/img_product/product_img-5.jpg',
                    content: 'Đơn hàng ajshd56 chưa giao thành công, vui lòng liên hệ CSKH',
                    created_at: '2025-12-14 17:20:44'
                },
                {
                    id: 6,
                    code: 'Nice05',
                    name: 'Đơn hàng đang xử lý',
                    img: '/public/images/img_product/product_img-6.jpg',
                    content: 'Mã đơn 67ahfj đang được xử lý tại kho trung tâm',
                    created_at: '2025-12-15 07:15:00'
                },
                {
                    id: 7,
                    code: 'Fresh06',
                    name: 'Đơn hàng đã hủy',
                    img: '/public/images/img_product/product_img-7.jpg',
                    content: 'Đơn hàng 9ahd23 bị hủy theo yêu cầu khách hàng',
                    created_at: '2025-12-15 09:32:40'
                },
                {
                    id: 8,
                    code: 'Super07',
                    name: 'Đơn hàng chờ giao',
                    img: '/public/images/img_product/product_img-8.jpg',
                    content: 'Đơn hàng 23jkdsa sẽ được giao trong hôm nay',
                    created_at: '2025-12-16 11:11:11'
                },
                {
                    id: 9,
                    code: 'Lucky08',
                    name: 'Đơn hàng đang giao',
                    img: '/public/images/img_product/product_img-9.jpg',
                    content: 'Đơn hàng kj234h đang được shipper giao đến bạn',
                    created_at: '2025-12-16 14:22:12'
                },
                {
                    id: 10,
                    code: 'Smart09',
                    name: 'Đơn hàng chờ xác nhận',
                    img: '/public/images/img_product/product_img-10.jpg',
                    content: 'Đơn hàng 234sad đang chờ shop xác nhận',
                    created_at: '2025-12-17 08:08:08'
                },
                {
                    id: 11,
                    code: 'Best10',
                    name: 'Đơn hàng đã đóng gói',
                    img: '/public/images/img_product/product_img-11.jpg',
                    content: 'Đơn hàng 789gfs đã được đóng gói tại kho',
                    created_at: '2025-12-17 13:00:30'
                },
                {
                    id: 12,
                    code: 'Pro11',
                    name: 'Đơn hàng đang chuyển kho',
                    img: '/public/images/img_product/product_img-12.jpg',
                    content: 'Đơn hàng 234kjh đang được vận chuyển đến kho gần bạn',
                    created_at: '2025-12-18 16:45:59'
                },
                {
                    id: 13,
                    code: 'Go12',
                    name: 'Đơn hàng chờ thanh toán',
                    img: '/public/images/img_product/product_img-13.jpg',
                    content: 'Đơn hàng 23jkd cần được thanh toán để tiếp tục xử lý',
                    created_at: '2025-12-19 09:09:09'
                },
                {
                    id: 14,
                    code: 'Run13',
                    name: 'Đơn hàng giao thành công',
                    img: '/public/images/img_product/product_img-14.jpg',
                    content: 'Đơn hàng kjh782 đã giao thành công',
                    created_at: '2025-12-19 18:18:18'
                },
                {
                    id: 15,
                    code: 'Star14',
                    name: 'Đơn hàng chờ xác nhận',
                    img: '/public/images/img_product/product_img-15.jpg',
                    content: 'Đơn hàng 983hsd đang chờ shop xác nhận',
                    created_at: '2025-12-20 07:33:33'
                },
                {
                    id: 16,
                    code: 'Light15',
                    name: 'Đơn hàng đang đóng gói',
                    img: '/public/images/img_product/product_img-16.jpg',
                    content: 'Đơn hàng kj234h đang được nhân viên đóng gói',
                    created_at: '2025-12-20 15:15:15'
                },
                {
                    id: 17,
                    code: 'Moon16',
                    name: 'Đơn hàng đang giao',
                    img: '/public/images/img_product/product_img-17.jpg',
                    content: 'Đơn hàng hj234 được shipper mang đi',
                    created_at: '2025-12-21 10:00:00'
                },
                {
                    id: 18,
                    code: 'Sun17',
                    name: 'Đơn hàng giao thất bại',
                    img: '/public/images/img_product/product_img-18.jpg',
                    content: 'Đơn hàng 78asj bị giao thất bại do người nhận vắng mặt',
                    created_at: '2025-12-21 20:20:20'
                },
                {
                    id: 19,
                    code: 'Sky18',
                    name: 'Đơn hàng đã hủy',
                    img: '/public/images/img_product/product_img-19.jpg',
                    content: 'Đơn hàng 789sda đã bị hủy',
                    created_at: '2025-12-22 12:12:12'
                },
                {
                    id: 20,
                    code: 'Wind19',
                    name: 'Đơn hàng giao thành công',
                    img: '/public/images/img_product/product_img-20.jpg',
                    content: 'Đơn hàng kjs876 đã giao thành công đến bạn',
                    created_at: '2025-12-23 09:45:00'
                },
                {
                    id: 21,
                    code: 'Fire20',
                    name: 'Đơn hàng chờ xác nhận',
                    img: '/public/images/img_product/product_img-21.jpg',
                    content: 'Đơn hàng kjd783 đang chờ xác nhận',
                    created_at: '2025-12-23 19:19:19'
                }
            ]
            
        }
    }
    return {
        data: [
            {
                id: 1,
                code: 'Sadboy',
                name: 'Đơn hàng giao thành công',
                img: '/public/images/img_product/product_img-1.jpg',
                content: 'Mã đơn hàng ahcggdufyf đã được giao đến bạn',
                created_at: '2025-12-12 12:35:54'
            },
            {
                id: 2,
                code: 'Happy01',
                name: 'Đơn hàng chờ xác nhận',
                img: '/public/images/img_product/product_img-2.jpg',
                content: 'Mã đơn hàng 2uhgfy123 đang chờ xác nhận từ cửa hàng',
                created_at: '2025-12-13 09:15:21'
            },
            {
                id: 3,
                code: 'Fast02',
                name: 'Đơn hàng đang chuẩn bị',
                img: '/public/images/img_product/product_img-3.jpg',
                content: 'Mã đơn hàng ysh1234 đã được tiếp nhận và đang chuẩn bị',
                created_at: '2025-12-13 10:05:11'
            },
            {
                id: 4,
                code: 'Quick03',
                name: 'Đơn hàng đang vận chuyển',
                img: '/public/images/img_product/product_img-4.jpg',
                content: 'Đơn hàng 4hj23ah đang được giao bởi Giao Hàng Nhanh',
                created_at: '2025-12-14 08:44:05'
            },
            {
                id: 5,
                code: 'Cool04',
                name: 'Đơn hàng giao thất bại',
                img: '/public/images/img_product/product_img-5.jpg',
                content: 'Đơn hàng ajshd56 chưa giao thành công, vui lòng liên hệ CSKH',
                created_at: '2025-12-14 17:20:44'
            }
        ]
        
    }
} 

export const get_list_voucher = (user_id, start, end) => {
    //return
    console.log('Lấy danh sách mã gỉam giá user_id:= ', user_id, 'start:= ', start, end)
    if(start == 0) {
        return {
            data: [
                {
                    id: 1,
                    code: "NGUOIMOI",
                    name: "Giảm 10% cho giá trị đơn hàng của bạn",
                    count: 4,
                    date_end: "2004-10-10 04:45:40",
                    img: "/public/images/img_product/product_img-1.jpg"
                },
                {
                    id: 2,
                    code: "SALE10",
                    name: "Giảm 10% cho đơn hàng trên 200k",
                    count: 5,
                    date_end: "2025-09-30 23:59:59",
                    img: "/public/images/img_product/product_img-2.jpg"
                },
                {
                    id: 3,
                    code: "FREESHIP",
                    name: "Miễn phí vận chuyển cho đơn từ 300k",
                    count: 10,
                    date_end: "2025-10-15 23:59:59",
                    img: "/public/images/img_product/product_img-3.jpg"
                },
                {
                    id: 4,
                    code: "SALE20",
                    name: "Giảm 20% cho đơn hàng đầu tiên",
                    count: 3,
                    date_end: "2025-11-01 23:59:59",
                    img: "/public/images/img_product/product_img-4.jpg"
                },
                {
                    id: 5,
                    code: "XINCHAO",
                    name: "Giảm 15% khi đăng ký thành viên mới",
                    count: 6,
                    date_end: "2025-09-10 23:59:59",
                    img: "/public/images/img_product/product_img-5.jpg"
                },
                {
                    id: 6,
                    code: "GIANGSINH",
                    name: "Giảm 25% cho đơn hàng mùa Giáng Sinh",
                    count: 8,
                    date_end: "2025-12-24 23:59:59",
                    img: "/public/images/img_product/product_img-6.jpg"
                },
                {
                    id: 7,
                    code: "TET2025",
                    name: "Giảm 30% cho đơn hàng dịp Tết",
                    count: 12,
                    date_end: "2025-01-31 23:59:59",
                    img: "/public/images/img_product/product_img-7.jpg"
                },
                {
                    id: 8,
                    code: "SALE50",
                    name: "Giảm 50% sản phẩm thứ 2",
                    count: 20,
                    date_end: "2025-09-20 23:59:59",
                    img: "/public/images/img_product/product_img-8.jpg"
                },
                {
                    id: 9,
                    code: "FLASHSALE",
                    name: "Giảm 40% trong khung giờ vàng",
                    count: 15,
                    date_end: "2025-09-05 23:59:59",
                    img: "/public/images/img_product/product_img-9.jpg"
                },
                {
                    id: 10,
                    code: "VIP20",
                    name: "Giảm 20% cho khách hàng VIP",
                    count: 7,
                    date_end: "2025-10-01 23:59:59",
                    img: "/public/images/img_product/product_img-10.jpg"
                },
                {
                    id: 11,
                    code: "WEEKEND",
                    name: "Giảm 15% đơn hàng cuối tuần",
                    count: 9,
                    date_end: "2025-09-07 23:59:59",
                    img: "/public/images/img_product/product_img-11.jpg"
                },
                {
                    id: 12,
                    code: "NEWYEAR",
                    name: "Giảm 25% chào đón năm mới",
                    count: 10,
                    date_end: "2026-01-01 23:59:59",
                    img: "/public/images/img_product/product_img-12.jpg"
                },
                {
                    id: 13,
                    code: "BUY1GET1",
                    name: "Mua 1 tặng 1 sản phẩm bất kỳ",
                    count: 50,
                    date_end: "2025-09-15 23:59:59",
                    img: "/public/images/img_product/product_img-13.jpg"
                },
                {
                    id: 14,
                    code: "SALE70",
                    name: "Giảm 70% cho sản phẩm xả kho",
                    count: 25,
                    date_end: "2025-09-25 23:59:59",
                    img: "/public/images/img_product/product_img-14.jpg"
                },
                {
                    id: 15,
                    code: "BLACKFRIDAY",
                    name: "Giảm 60% toàn bộ sản phẩm",
                    count: 40,
                    date_end: "2025-11-29 23:59:59",
                    img: "/public/images/img_product/product_img-15.jpg"
                },
                {
                    id: 16,
                    code: "CYBERMONDAY",
                    name: "Giảm 55% đơn online",
                    count: 30,
                    date_end: "2025-12-01 23:59:59",
                    img: "/public/images/img_product/product_img-16.jpg"
                },
                {
                    id: 17,
                    code: "BACK2SCHOOL",
                    name: "Giảm 20% đồ dùng học tập",
                    count: 18,
                    date_end: "2025-09-10 23:59:59",
                    img: "/public/images/img_product/product_img-17.jpg"
                },
                {
                    id: 18,
                    code: "SUMMER25",
                    name: "Giảm 25% cho sản phẩm mùa hè",
                    count: 22,
                    date_end: "2025-08-31 23:59:59",
                    img: "/public/images/img_product/product_img-18.jpg"
                },
                {
                    id: 19,
                    code: "WINTER30",
                    name: "Giảm 30% sản phẩm mùa đông",
                    count: 16,
                    date_end: "2025-12-30 23:59:59",
                    img: "/public/images/img_product/product_img-19.jpg"
                },
                {
                    id: 20,
                    code: "SPRING20",
                    name: "Giảm 20% cho đơn mùa xuân",
                    count: 14,
                    date_end: "2026-03-01 23:59:59",
                    img: "/public/images/img_product/product_img-20.jpg"
                },
                {
                    id: 21,
                    code: "AUTUMN15",
                    name: "Giảm 15% cho đơn mùa thu",
                    count: 12,
                    date_end: "2025-10-10 23:59:59",
                    img: "/public/images/img_product/product_img-21.jpg"
                }
            ]
            
        }
    }
    return {
        data: [
            {
                id: 1,
                code: "NGUOIMOI",
                name: "Giảm 10% cho giá trị đơn hàng của bạn",
                count: 4,
                date_end: "2004-10-10 04:45:40",
                img: "/public/images/img_product/product_img-1.jpg"
            },
            {
                id: 2,
                code: "SALE10",
                name: "Giảm 10% cho đơn hàng trên 200k",
                count: 5,
                date_end: "2025-09-30 23:59:59",
                img: "/public/images/img_product/product_img-2.jpg"
            },
            {
                id: 3,
                code: "FREESHIP",
                name: "Miễn phí vận chuyển cho đơn từ 300k",
                count: 10,
                date_end: "2025-10-15 23:59:59",
                img: "/public/images/img_product/product_img-3.jpg"
            },
            {
                id: 4,
                code: "SALE20",
                name: "Giảm 20% cho đơn hàng đầu tiên",
                count: 3,
                date_end: "2025-11-01 23:59:59",
                img: "/public/images/img_product/product_img-4.jpg"
            },
            {
                id: 5,
                code: "XINCHAO",
                name: "Giảm 15% khi đăng ký thành viên mới",
                count: 6,
                date_end: "2025-09-10 23:59:59",
                img: "/public/images/img_product/product_img-5.jpg"
            }
        ]
        
    }
}