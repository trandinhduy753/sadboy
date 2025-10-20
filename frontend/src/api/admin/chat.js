import axiosInstance from '@/api/axiosAdmin.js';

export const get_list_user_chat = (admin_id, start, end) => {
    console.log('Lấy danh sách user đã trò chuyện với admin_id: ', admin_id, 'start:= ', start, end)
    if(start==0) {
        return {
            data: [
                {
                    id: 1,
                    user_id: 20,
                    img_user: '/public/images/img_product/product_img-11.png',
                    name_user: 'Trần Đình Duy',
                    last_message: 'Nội dung tin nhắn',
                    last_time: '2025-08-23 14:25:35',
                },
                {
                    id: 2,
                    user_id: 21,
                    img_user: '/public/images/img_product/product_img-1.png',
                    name_user: 'Nguyễn Văn An',
                    last_message: 'Anh ơi đơn hàng em sao rồi?',
                    last_time: '2025-08-23 14:30:12',
                },
                {
                    id: 3,
                    user_id: 22,
                    img_user: '/public/images/img_product/product_img-2.png',
                    name_user: 'Lê Thị Hoa',
                    last_message: 'Cảm ơn shop nhiều nhé!',
                    last_time: '2025-08-23 15:02:44',
                },
                {
                    id: 4,
                    user_id: 23,
                    img_user: '/public/images/img_product/product_img-3.png',
                    name_user: 'Phạm Văn Minh',
                    last_message: 'Em muốn đổi size sản phẩm',
                    last_time: '2025-08-23 15:10:08',
                },
                {
                    id: 5,
                    user_id: 24,
                    img_user: '/public/images/img_product/product_img-4.png',
                    name_user: 'Hoàng Thị Mai',
                    last_message: 'Bao giờ giao đến vậy ạ?',
                    last_time: '2025-08-23 15:25:59',
                },
                {
                    id: 6,
                    user_id: 25,
                    img_user: '/public/images/img_product/product_img-5.png',
                    name_user: 'Đỗ Văn Nam',
                    last_message: 'Shop ơi còn màu xanh không?',
                    last_time: '2025-08-23 15:45:00',
                },
                {
                    id: 7,
                    user_id: 26,
                    img_user: '/public/images/img_product/product_img-6.png',
                    name_user: 'Nguyễn Thị Hạnh',
                    last_message: 'Em đã chuyển khoản rồi',
                    last_time: '2025-08-23 16:02:10',
                },
                {
                    id: 8,
                    user_id: 27,
                    img_user: '/public/images/img_product/product_img-7.png',
                    name_user: 'Vũ Văn Hoàng',
                    last_message: 'Shop xác nhận đơn giúp em',
                    last_time: '2025-08-23 16:15:45',
                },
                {
                    id: 9,
                    user_id: 28,
                    img_user: '/public/images/img_product/product_img-8.png',
                    name_user: 'Trần Thị Thu',
                    last_message: 'Hàng về em nhớ báo nhé',
                    last_time: '2025-08-23 16:22:11',
                },
                {
                    id: 10,
                    user_id: 29,
                    img_user: '/public/images/img_product/product_img-9.png',
                    name_user: 'Phạm Văn Kiên',
                    last_message: 'Em muốn hủy đơn hàng',
                    last_time: '2025-08-23 16:40:50',
                },
                {
                    id: 11,
                    user_id: 30,
                    img_user: '/public/images/img_product/product_img-10.png',
                    name_user: 'Ngô Thị Liên',
                    last_message: 'Cho em thêm 1 sản phẩm nữa',
                    last_time: '2025-08-23 17:01:00',
                },
                {
                    id: 12,
                    user_id: 31,
                    img_user: '/public/images/img_product/product_img-12.png',
                    name_user: 'Phạm Văn Cường',
                    last_message: 'Có freeship không shop?',
                    last_time: '2025-08-23 17:15:20',
                },
                {
                    id: 13,
                    user_id: 32,
                    img_user: '/public/images/img_product/product_img-13.png',
                    name_user: 'Nguyễn Thị Tâm',
                    last_message: 'Em nhận được hàng rồi nhé',
                    last_time: '2025-08-23 17:30:45',
                },
                {
                    id: 14,
                    user_id: 33,
                    img_user: '/public/images/img_product/product_img-14.png',
                    name_user: 'Trần Văn Hùng',
                    last_message: 'Đơn em sao chưa giao?',
                    last_time: '2025-08-23 17:45:33',
                },
                {
                    id: 15,
                    user_id: 34,
                    img_user: '/public/images/img_product/product_img-15.png',
                    name_user: 'Hoàng Thị Thu',
                    last_message: 'Shop ơi tư vấn giúp em',
                    last_time: '2025-08-23 18:05:28',
                },
                {
                    id: 16,
                    user_id: 35,
                    img_user: '/public/images/img_product/product_img-16.png',
                    name_user: 'Đinh Văn Thắng',
                    last_message: 'Em đã nhận được rồi',
                    last_time: '2025-08-23 18:22:41',
                },
                {
                    id: 17,
                    user_id: 36,
                    img_user: '/public/images/img_product/product_img-17.png',
                    name_user: 'Nguyễn Thị Quỳnh',
                    last_message: 'Có giảm giá nữa không?',
                    last_time: '2025-08-23 18:35:00',
                },
                {
                    id: 18,
                    user_id: 37,
                    img_user: '/public/images/img_product/product_img-18.png',
                    name_user: 'Trần Văn Lâm',
                    last_message: 'Đổi địa chỉ nhận hàng nhé',
                    last_time: '2025-08-23 18:50:15',
                },
                {
                    id: 19,
                    user_id: 38,
                    img_user: '/public/images/img_product/product_img-19.png',
                    name_user: 'Lưu Thị Hòa',
                    last_message: 'Em muốn đặt thêm sản phẩm',
                    last_time: '2025-08-23 19:05:49',
                },
                {
                    id: 20,
                    user_id: 39,
                    img_user: '/public/images/img_product/product_img-20.png',
                    name_user: 'Phan Văn Tú',
                    last_message: 'Shop gửi nhanh giúp em',
                    last_time: '2025-08-23 19:25:30',
                },
            ]        
        }
    }
    return {
        data: [
            {
                id: 1,
                user_id: 20,
                img_user: '/public/images/img_product/product_img-11.png',
                name_user: 'Trần Đình Duy',
                last_message: 'Nội dung tin nhắn',
                last_time: '2025-08-23 14:25:35',
            },
            {
                id: 2,
                user_id: 21,
                img_user: '/public/images/img_product/product_img-1.png',
                name_user: 'Nguyễn Văn An',
                last_message: 'Anh ơi đơn hàng em sao rồi?',
                last_time: '2025-08-23 14:30:12',
            },
            {
                id: 3,
                user_id: 22,
                img_user: '/public/images/img_product/product_img-2.png',
                name_user: 'Lê Thị Hoa',
                last_message: 'Cảm ơn shop nhiều nhé!',
                last_time: '2025-08-23 15:02:44',
            },
            {
                id: 4,
                user_id: 23,
                img_user: '/public/images/img_product/product_img-3.png',
                name_user: 'Phạm Văn Minh',
                last_message: 'Em muốn đổi size sản phẩm',
                last_time: '2025-08-23 15:10:08',
            },
            {
                id: 5,
                user_id: 24,
                img_user: '/public/images/img_product/product_img-4.png',
                name_user: 'Hoàng Thị Mai',
                last_message: 'Bao giờ giao đến vậy ạ?',
                last_time: '2025-08-23 15:25:59',
            }
        ]        
    }
}

//đầu tiền từ admin_id và user_id lấy ra conversation_id trong bảng conversation
//sau đố ms lấy các tin nhắn trong bảng message thuộc conversation nào
//mỗi admin với user là một conversation riêng biêt, có thể đánh chỉ mục để truy vấn nhanh
export const detail_user_chat =(admin_id, user_id, start, end) => {
    console.log('Lấy danh sách cuộc trò chuyện của admin_id:=', admin_id, 'user_id:=', user_id, 'start:=', start, 'end:=', end)
    if(start==0) {
        return {
            data: {
                conversation_id: 1,
                name_user: 'nguyễn trần cường',
                img_user: '/public/images/img_product/product_img-1C.webp',
                messages: [
                    {
                        id: 1,
                        sender_id: 25,
                        conversation_id: 1,
                        sender_type: 'user',
                        content: 'Nội dung của tin nhắn',
                        type: 'text',
                        file_path: null,
                        meta_data: null,
                        date: '2025-09-01 11:34:56 '
                    },
                    {
                        id: 2,
                        sender_id: 25,
                        conversation_id: 1,
                        sender_type: 'user',
                        content: null,
                        type: 'order',
                        file_path: null,
                        meta_data: {
                            order_code:'sadboy123',
                            count: 400,
                            total: 9877661,
                            products: [
                                {
                                    name_product: 'Quả dưa hấu',
                                    img_product: '/public/images/img_product/product_img-11A.jpg',
                                    price: 20000,
                                    size: 'M'
                                },
                                {
                                    name_product: 'Quả nam',
                                    img_product: '/public/images/img_product/product_img-11B.jpg',
                                    price: 20000,
                                    size: 'S'
                                },
                                {
                                    name_product: 'Quả nam',
                                    img_product: '/public/images/img_product/product_img-11C.jpg',
                                    price: 20000,
                                    size: 'L'
                                },
                                
                            ]
                        },
                        date: '2025-09-01 11:34:58'
                    },
                    {
                        id: 3,
                        sender_id: 14,
                        conversation_id: 1,
                        sender_type: 'admin',
                        content: null,
                        type: 'product',
                        file_path: null,
                        meta_data: {
                            img_product: '/public/images/img_product/product_img-10E.jpg',
                            name_product: 'Quả lê',
                            price: 45000
                        },
                        date: '2025-09-01 11:35:56'
                    },
                    {
                        id: 4,
                        sender_id: 25,
                        conversation_id: 1,
                        sender_type: 'user',
                        content: null,
                        type: 'image',
                        file_path: '/public/images/img_product/product_img-11C.jpg',
                        meta_data: null,
                        date: '2025-09-01 11:33:56'
                    },
                    {
                        id: 5,
                        sender_id: 25,
                        conversation_id: 1,
                        sender_type: 'user',
                        content: null,
                        type: 'image',
                        file_path: '/public/images/img_product/product_img-11A.jpg',
                        meta_data: null,
                        date: '2025-09-01 11:34:36'
                    },
                    {
                        id: 6,
                        sender_id: 25,
                        conversation_id: 1,
                        sender_type: 'user',
                        content: null,
                        type: 'image',
                        file_path: '/public/images/img_product/product_img-11C.jpg',
                        meta_data: null,
                        date: '2025-09-01 11:38:46'
                    },
                    {
                        id: 7,
                        sender_id: 14,
                        conversation_id: 1,
                        sender_type: 'admin',
                        content: null,
                        type: 'video',
                        file_path: '/public/images/copy_97F9EFBE-E138-4B84-B1E9-DB964B763B8F.mov',
                        meta_data: null,
                        date: '2025-09-01 11:34:48'
                    },
                    {
                        id: 8,
                        sender_id: 14,
                        conversation_id: 1,
                        sender_type: 'admin',
                        content: null,
                        type: 'video',
                        file_path: '/public/images/copy_97F9EFBE-E138-4B84-B1E9-DB964B763B8F.mov',
                        meta_data: null,
                        date: '2025-09-01 11:34:50'
                    }
                ]
            }
        }
    }
    return {
        data: [ 
            {
                id: 1,
                sender_id: 25,
                conversation_id: 1,
                sender_type: 'user',
                content: 'Nội dung của tin nhắn',
                type: 'text',
                file_path: null,
                meta_data: null,
                date: '2025-09-01 11:34:56 '
            },
            {
                id: 2,
                sender_id: 25,
                conversation_id: 1,
                sender_type: 'user',
                content: null,
                type: 'order',
                file_path: null,
                meta_data: {
                    order_code:'sadboy123',
                    count: 400,
                    total: 9877661,
                    products: [
                        {
                            name_product: 'Quả dưa hấu',
                            img_product: '/public/images/img_product/product_img-11A.jpg',
                            price: 20000,
                            size: 'M'
                        },
                        {
                            name_product: 'Quả nam',
                            img_product: '/public/images/img_product/product_img-11B.jpg',
                            price: 20000,
                            size: 'M'
                        },
                        {
                            name_product: 'Quả nam',
                            img_product: '/public/images/img_product/product_img-11C.jpg',
                            price: 20000,
                            size: 'M'
                        },
                        
                    ]
                },
                date: '2025-09-01 11:34:58'
            },
            {
                id: 3,
                sender_id: 14,
                conversation_id: 1,
                sender_type: 'admin',
                content: null,
                type: 'product',
                file_path: null,
                meta_data: {
                    img_product: '/public/images/img_product/product_img-10E.jpg',
                    name_product: 'Quả lê',
                    price: 45000
                },
                date: '2025-09-01 11:35:56'
            },
            {
                id: 4,
                sender_id: 25,
                conversation_id: 1,
                sender_type: 'user',
                content: null,
                type: 'image',
                file_path: '/public/images/img_product/product_img-11C.jpg',
                meta_data: null,
                date: '2025-09-01 11:33:56'
            },
            {
                id: 5,
                sender_id: 25,
                conversation_id: 1,
                sender_type: 'user',
                content: null,
                type: 'image',
                file_path: '/public/images/img_product/product_img-11A.jpg',
                meta_data: null,
                date: '2025-09-01 11:34:36'
            },
            {
                id: 6,
                sender_id: 25,
                conversation_id: 1,
                sender_type: 'user',
                content: null,
                type: 'image',
                file_path: '/public/images/img_product/product_img-11C.jpg',
                meta_data: null,
                date: '2025-09-01 11:34:46'
            },
            {
                id: 7,
                sender_id: 14,
                conversation_id: 1,
                sender_type: 'admin',
                content: null,
                type: 'video',
                file_path: '/public/images/copy_97F9EFBE-E138-4B84-B1E9-DB964B763B8F.mov',
                meta_data: null,
                date: '2025-09-01 11:34:48'
            },
            {
                id: 8,
                sender_id: 14,
                conversation_id: 1,
                sender_type: 'admin',
                content: null,
                type: 'video',
                file_path: '/public/images/copy_97F9EFBE-E138-4B84-B1E9-DB964B763B8F.mov',
                meta_data: null,
                date: '2025-09-01 11:34:50'
            }   
        ]
    }
    
}

export const addMessage = (data) => {
    console.log('Đã thêm một tin nhắn thành công')
}