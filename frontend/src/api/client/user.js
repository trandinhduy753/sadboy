import  axiosInstance from '@/api/axiosClient.js';
export const infor_user = () => {
   
    return axiosInstance.get('/auth/me');
}
export const edit_user = (user_id, data) => {
    data.append("_method", "PATCH"); 
    return axiosInstance.post('/user/edit', data)
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

export const get_list_voucher = (user_id, page, count) => {
    return axiosInstance.get('/user/vouchers', {
        params: {
            page,
            count
        }
    })
}