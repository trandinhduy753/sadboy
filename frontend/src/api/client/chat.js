export const  get_info_conversation = (user_id, start, end) => {
    console.log('Lấy thông tin cảu admin với thông tin conversation user_id:= ', user_id, 'start:= ', start, 'end:= ', end)
    if(start == 0) {
        return {
            data: {
                conversation_id: 12,
                employee: { 
                    id: 1,
                    code: 'sad',
                    name: 'Nguyễn Trần Cường',
                    email: 'nguyentrancuong58@gmail.com',
                    img: '/public/images/img_product/product_img-1A.jpg'
                },
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
                        file_path: '/public/images/img_product/product_img-31C.jpg',
                        meta_data: null,
                        date: '2025-09-01 11:39:46'
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
                    },
                    {
                        id: 9,
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