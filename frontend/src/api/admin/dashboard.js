import axiosInstance from '@/api/axios.js';
export const get_info_dashboard = async () => {
    return axiosInstance.get('/admin/dashboards');
    return {
        data: {
            total_user: 150,
            total_employee: 200,
            total_provide: 350,
            total_product: 750,
            total_order: 150,
            total_voucher: 40,
            orders: [
                {
                    id: 1,
                    code: "sad123",
                    name_user: 'Nguyễn Trần Cường',
                    total: 19800000,
                    status: 'PENDING'
                },
                {
                    id: 2,
                    code: "sad123",
                    name_user: 'Trần Đình Duy',
                    total: 19800000,
                    status: 'SUCCESS'
                },
                {
                    id: 3,
                    code: "sad123",
                    name_user: 'Bùi Văn An',
                    total: 19800000,
                    status: 'SHIPPING'
                },
                {
                    id: 4,
                    code: "sad123",
                    name_user: 'Nguyễn Hữu Huân',
                    total: 19800000,
                    status: 'PENDING'
                },
                {
                    id: 5,
                    code: "sad123",
                    name_user: 'Nguyễn Quý Nhất',
                    total: 19800000,
                    status: 'PENDING'
                }
            ],
            
            debts: [
                12000000, 12500000, 32000000, 15000000, 62000000,84000000, 21000000, 92000000, 65000000, 73000000, 56000000, 97000000 
            ],
            users: [
                {
                    id: 1,
                    code: "#U0001",
                    name: "Nguyễn Văn An",
                    img: "/public/images/img_user/img_user.jpg",
                    email: "an.nguyen1@example.com",
                    type: "VIP",
                    phone: '0988870434',
                    date: '22-10-2003'
                },
                {
                    id: 2,
                    code: "#U0002",
                    name: "Trần Thị Bình",
                    img: "/public/images/img_user/img_user.jpg",
                    email: "binh.tran2@example.com",
                    type: "VIP",
                    phone: '0988870434',
                    date: '22-10-2003'
                },
                {
                    id: 3,
                    code: "#U0003",
                    name: "Lê Quốc Cường",
                    img: "/public/images/img_user/img_user.jpg",
                    email: "cuong.le3@example.com",
                    type: "GOLD",
                    phone: '0988870434',
                    date: '22-10-2003'
                },
                {
                    id: 4,
                    code: "#U0004",
                    name: "Phạm Minh Đức",
                    img: "/public/images/img_user/img_user.jpg",
                    email: "duc.pham4@example.com",
                    type: "SILK",
                    phone: '0988870434',
                    date: '22-10-2003'
                },
                {
                    id: 5,
                    code: "#U0005",
                    name: "Hoàng Thu Giang",
                    img: "/public/images/img_user/img_user.jpg",
                    email: "giang.hoang5@example.com",
                    type: "DIAMOND",
                    phone: '0988870434',
                    date: '22-10-2003'
                }
            ],
            profits: [100000001, 2300000, 45000000, 50000000, 5600000, 6600000, 55550000, 10000000, 2300000, 45000000, 50000000, 5600000],
            order_import_export: {
                order_import: [45, 52, 38, 24, 80, 90, 45, 52, 38, 24, 80, 90],
                order_export: [35, 41, 62, 42, 13, 65, 45, 52, 88, 74, 50, 120]
            },
            product_sale: [
                [
                    {
                        id: 1,
                        code: "#222222",
                        name: "Quả dưa hấu",
                        img: "/public/images/img_product/product_img-10C.jpg",
                        price: 500000,
                        category: "Fruit",
                    },
                    {
                        id: 2,
                        code: "#333333",
                        name: "Măng cụt Thái",
                        img: "/public/images/img_product/product_img-11.png",
                        price: 320000,
                        category: "Fruit Juicy",
                    },
                    {
                        id: 3,
                        code: "#444444",
                        name: "Xoài cát Hòa Lộc",
                        img: "/public/images/img_product/product_img-3.png",
                        price: 150000,
                        category: "Fruit Juicy",
                    },
                ],
                [
                    {
                        id: 4,
                        code: "#555555",
                        name: "Bánh kem socola",
                        img: "/public/images/img_product/product_img-4.png",
                        price: 250.000,
                        category: "Cake",
                    },
                    {
                        id: 5,
                        code: "#666666",
                        name: "Bánh mì Pháp",
                        img: "/public/images/img_product/product_img-5.png",
                        price: 30000,
                        category: "Cake",
                    },
                    {
                        id: 6,
                        code: "#777777",
                        name: "Bánh tart trứng",
                        img: "/public/images/img_product/product_img-6.png",
                        price: 50000,
                        category: "Cake",
                    },
                ],
                [
                    {
                        id: 7,
                        code: "#888888",
                        name: "Cà rốt Đà Lạt",
                        img: "/public/images/img_product/product_img-7.png",
                        price: 25000,
                        category: "Vegetable",
                    },
                    {
                        id: 8,
                        code: "#999999",
                        name: "Bí đỏ",
                        img: "/public/images/img_product/product_img-8.png",
                        price: 18000,
                        category: "Vegetable",
                    },
                    {
                        id: 9,
                        code: "#AAAAAA",
                        name: "Cải bó xôi",
                        img: "/public/images/img_product/product_img-9.png",
                        price: 35000,
                        category: "Vegetable",
                    },
                ]
                
            ]
        }
    }
}