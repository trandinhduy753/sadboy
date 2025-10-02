export const list_cart = (user_id, page, count) => {
    //return url
    console.log('Lấy danh sách sản phẩm trong giỏ hàng với user_id:= ', user_id, 'page:= ', page, 'count:= ', count)
    if(page === 1) {
        return {
            data: [
                {
                    id: 1,
                    code: 'sadboy',
                    product: {
                        name: 'Quả dưa hấu',
                        img: '/public/images/img_product/product_img-1.jpg'
                    },
                    price: 40000,
                    count: 4,
                    size: 'M',
                },
                {
                    id: 2,
                    code: 'happy001',
                    product: {
                        name: 'Quả xoài',
                        img: '/public/images/img_product/product_img-2.jpg'
                    },
                    price: 30000,
                    count: 25,
                    size: 'L',
                },
                {
                    id: 3,
                    code: 'fresh002',
                    product: {
                        name: 'Quả táo đỏ',
                        img: '/public/images/img_product/product_img-3.jpg'
                    },
                    price: 25000,
                    count: 18,
                    size: 'S',
                },
                {
                    id: 4,
                    code: 'juicy003',
                    product: {
                        name: 'Quả cam ngọt',
                        img: '/public/images/img_product/product_img-4.jpg'
                    },
                    price: 28000,
                    count: 20,
                    size: 'M',
                },
                {
                    id: 5,
                    code: 'fruit004',
                    product: {
                        name: 'Quả nho tím',
                        img: '/public/images/img_product/product_img-5.jpg'
                    },
                    price: 60000,
                    count: 15,
                    size: 'M',
                },
                {
                    id: 6,
                    code: 'sweet005',
                    product: {
                        name: 'Quả chuối',
                        img: '/public/images/img_product/product_img-6.jpg'
                    },
                    price: 20000,
                    count: 30,
                    size: 'L',
                },
                {
                    id: 7,
                    code: 'tasty006',
                    product: {
                        name: 'Quả ổi',
                        img: '/public/images/img_product/product_img-7.jpg'
                    },
                    price: 22000,
                    count: 10,
                    size: 'S',
                },
                {
                    id: 8,
                    code: 'fresh007',
                    product: {
                        name: 'Quả dứa',
                        img: '/public/images/img_product/product_img-8.jpg'
                    },
                    price: 35000,
                    count: 8,
                    size: 'M',
                },
                {
                    id: 9,
                    code: 'cool008',
                    product: {
                        name: 'Quả bơ',
                        img: '/public/images/img_product/product_img-9.jpg'
                    },
                    price: 50000,
                    count: 22,
                    size: 'L',
                },
                {
                    id: 10,
                    code: 'sweet009',
                    product: {
                        name: 'Quả mít',
                        img: '/public/images/img_product/product_img-10.jpg'
                    },
                    price: 45000,
                    count: 14,
                    size: 'M',
                },
                {
                    id: 11,
                    code: 'fruit010',
                    product: {
                        name: 'Quả lê Hàn Quốc',
                        img: '/public/images/img_product/product_img-11.jpg'
                    },
                    price: 55000,
                    count: 16,
                    size: 'L',
                },
                {
                    id: 12,
                    code: 'fresh011',
                    product: {
                        name: 'Quả mận',
                        img: '/public/images/img_product/product_img-12.jpg'
                    },
                    price: 27000,
                    count: 19,
                    size: 'S',
                },
                {
                    id: 13,
                    code: 'tasty012',
                    product: {
                        name: 'Quả đào',
                        img: '/public/images/img_product/product_img-13.jpg'
                    },
                    price: 40000,
                    count: 17,
                    size: 'M',
                },
                {
                    id: 14,
                    code: 'juicy013',
                    product: {
                        name: 'Quả chanh vàng',
                        img: '/public/images/img_product/product_img-14.jpg'
                    },
                    price: 15000,
                    count: 50,
                    size: 'S',
                },
                {
                    id: 15,
                    code: 'fruit014',
                    product: {
                        name: 'Quả dâu tây',
                        img: '/public/images/img_product/product_img-15.jpg'
                    },
                    price: 70000,
                    count: 9,
                    size: 'M',
                },
                {
                    id: 16,
                    code: 'cool015',
                    product: {
                        name: 'Quả lựu đỏ',
                        img: '/public/images/img_product/product_img-16.jpg'
                    },
                    price: 65000,
                    count: 11,
                    size: 'M',
                },
                {
                    id: 17,
                    code: 'tasty016',
                    product: {
                        name: 'Quả kiwi',
                        img: '/public/images/img_product/product_img-17.jpg'
                    },
                    price: 80000,
                    count: 13,
                    size: 'L',
                },
                {
                    id: 18,
                    code: 'sweet017',
                    product: {
                        name: 'Quả sầu riêng',
                        img: '/public/images/img_product/product_img-18.jpg'
                    },
                    price: 120000,
                    count: 5,
                    size: 'L',
                },
                {
                    id: 19,
                    code: 'fresh018',
                    product: {
                        name: 'Quả bưởi da xanh',
                        img: '/public/images/img_product/product_img-19.jpg'
                    },
                    price: 90000,
                    count: 7,
                    size: 'L',
                },
                {
                    id: 20,
                    code: 'juicy019',
                    product: {
                        name: 'Quả dâu đen',
                        img: '/public/images/img_product/product_img-20.jpg'
                    },
                    price: 95000,
                    count: 6,
                    size: 'S',
                }
            ]        
        }
    }
    return {
        data: [
            {
                id: 1,
                code: 'sadboy',
                product: {
                    name: 'Quả dưa hấu',
                    img: '/public/images/img_product/product_img-1.jpg'
                },
                price: 40000,
                count: 4,
                size: 'M',
            },
            {
                id: 2,
                code: 'happy001',
                product: {
                    name: 'Quả xoài',
                    img: '/public/images/img_product/product_img-2.jpg'
                },
                price: 30000,
                count: 25,
                size: 'L',
            },
            {
                id: 3,
                code: 'fresh002',
                product: {
                    name: 'Quả táo đỏ',
                    img: '/public/images/img_product/product_img-3.jpg'
                },
                price: 25000,
                count: 18,
                size: 'S',
            },
            {
                id: 4,
                code: 'juicy003',
                product: {
                    name: 'Quả cam ngọt',
                    img: '/public/images/img_product/product_img-4.jpg'
                },
                price: 28000,
                count: 20,
                size: 'M',
            },
            {
                id: 5,
                code: 'fruit004',
                product: {
                    name: 'Quả nho tím',
                    img: '/public/images/img_product/product_img-5.jpg'
                },
                price: 60000,
                count: 15,
                size: 'M',
            }
        ]        
    }
}
export const delete_product_in_cart = (user_id, id) => {
    console.log('Xoá sản phẩm trong giỏ hàng ở API của user_id:= ', user_id, 'id:= ', id)
    return {
        data: {
            mess: ""
        }
    }
}
export const add_product_to_cart = (user_id, data) => {
    //return url
    console.log('Đã thêm sản phẩm vào giỏ hàng của người dùng user_id:= ', user_id, 'data:= ', data)
    return {
      data: {
        id: 1,
        code: 'sadboy',
        product: {
            name: 'Quả dưa hấu mới',
            img: '/public/images/img_product/product_img-1.jpg'
        },
        price: 40000,
        count: 4,
        size: 'S',
      }
    }
  }