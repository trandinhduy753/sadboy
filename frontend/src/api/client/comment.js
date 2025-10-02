export const add_comment = (data) => {
    console.log("Thêm một bình luận thành công", data)
    return {
        data: {
            id: 1,
            code: "CMT001",
            product_id: 'PRO001',
            user_id: 'USER001',
            name_user: "nguyễn trần cường",
            img_user: '/public/images/img_product/product_img-10B.jpg',
            email_user: 'nguyentrancuog58@gmail.com',
            created_at: '2003-12-12 12-12-12',
            content: 'Nội dung của bình luận',
            star: 4.8,
            imgs: [
                '/public/images/img_product/product_img-11A.jpg',
                '/public/images/img_product/product_img-11B.jpg',
                '/public/images/img_product/product_img-11C.jpg',
                '/public/images/img_product/product_img-13.png',
                
            ],
            likes: 123,
            dislikes: 345,

        }
    }
}