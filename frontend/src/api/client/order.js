export const add_order = (data) => {
    //return 
    console.log('Đã thêm một đơn hàng mới ở API', data)
    return {
        data: {
            mess: 'Đã thêm thành công'
        }
    }
}
export const get_list_order = (user_id, start, end) => {
    //return
    console.log("lấy danh sách đơn hành của user_id:= ", user_id, ' start:= ', start, end)
    return {
        start: 0, 
        end: 20,
        data: [
          {
            id: 1,
            code: '1234rfghhhh',
            name: 'Đơn hàng dưa hấu, su hào',
            pay: 'QRCODE',
            status: 'PENDING',
            unit_shippng: 'GIAO HÀNG NHANH',
            note: 'Để ở chỗ cầu thang cho tôi',
            address: 'Ngõ 259 Vĩnh Hưng, Hoàng Mai, Hà Nội',
            products: [
              { name: "Dưa hấu",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-1.jpg', count: 5, size: 'M', price: 40000 },
              { name: "Dưa hấu",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-1.jpg', count: 5, size: 'L', price: 50000 },
              { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 4, size: 'S', price: 45000 },
              { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 5, size: 'M', price: 50000 },
              { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 5, size: 'L', price: 50000 }
            ],
            count: 200,
            subtotal: 1200000,
            money_discount: 12000,
            paid: 0,
            money_ship: 35000,
            total: 980000,
          },
          {
            id: 2,
            code: '5678abcd',
            name: 'Đơn hàng xoài cát, cam sành',
            pay: 'HOMEPAY',
            status: 'SHIPPING',
            unit_shippng: 'VIETTEL POST',
            note: 'Gọi trước khi giao',
            address: '123 Láng Hạ, Đống Đa, Hà Nội',
            products: [
              { name: "Xoài cát",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-3.jpg', count: 3, size: 'M', price: 60000 },
              { name: "Cam sành",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-4.jpg', count: 2, size: 'L', price: 55000 }
            ],
            count: 200,
            subtotal: 450000,
            money_discount: 10000,
            money_ship: 25000,
            paid: 0,
            total: 465000,
          },
          {
            id: 3,
            code: '9xyz123',
            name: 'Đơn hàng bưởi da xanh',
            pay: 'HOMEPAY',
            status: 'SHIPPING',
            unit_shippng: 'GHN',
            note: 'Nhà màu xanh cổng sắt',
            address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội',
            products: [
              { name: "Bưởi da xanh",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-5.jpg', count: 2, size: 'XL', price: 120000 }
            ],
            count: 200,
            subtotal: 240000,
            money_discount: 20000,
            money_ship: 20000,
            paid: 0,
            total: 240000,
          },
          {
            id: 4,
            code: 'abcd4444',
            name: 'Đơn hàng khoai tây, cà chua',
            pay: 'QRCODE',
            status: 'SUCCESS',
            unit_shippng: 'J&T EXPRESS',
            note: 'Giao giờ hành chính',
            address: '99 Trần Duy Hưng, Cầu Giấy, Hà Nội',
            products: [
              { name: "Khoai tây",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-6.jpg', count: 10, size: 'M', price: 25000 },
              { name: "Cà chua",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-7.jpg', count: 5, size: 'S', price: 30000 }
            ],
            count: 200,
            subtotal: 400000,
            money_discount: 5000,
            money_ship: 15000,
            total: 410000,
            paid: 0,
          },
          {
            id: 5,
            code: '5555efgh',
            name: 'Đơn hàng nho mỹ',
            pay: 'HOMEPAY',
            status: 'CANCEL',
            unit_shippng: 'NINJA VAN',
            note: 'Không nhận buổi sáng',
            address: '21 Kim Mã, Ba Đình, Hà Nội',
            products: [
              { name: "Nho mỹ",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-8.jpg', count: 2, size: 'M', price: 150000 }
            ],
            count: 200,
            subtotal: 300000,
            paid: 0,
            money_discount: 0,
            money_ship: 30000,
            total: 330000,

          },
          {
            id: 6,
            code: 'xyz0006',
            name: 'Đơn hàng thanh long, măng cụt',
            pay: 'QRCODE',
            status: 'SUCCESS',
            unit_shippng: 'GHTK',
            note: 'Giao buổi tối sau 7h',
            address: '12 Nguyễn Văn Cừ, Long Biên, Hà Nội',
            products: [
              { name: "Thanh long",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-9.jpg', count: 4, size: 'M', price: 40000 },
              { name: "Măng cụt",    id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-10.jpg', count: 3, size: 'S', price: 70000 }
            ],
            count: 200,
            subtotal: 370000,
            paid: 0,
            money_discount: 10000,
            money_ship: 20000,
            total: 380000,
          },
          {
            id: 7,
            code: '7ghi789',
            name: 'Đơn hàng cà rốt, bắp cải',
            pay: 'HOMEPAY',
            status: 'LOCKING',
            unit_shippng: 'VIETTEL POST',
            note: 'Mang lên tầng 2',
            address: '56 Xuân Thủy, Cầu Giấy, Hà Nội',
            products: [
              { name: "Cà rốt",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-11.jpg', count: 5, size: 'M', price: 20000 },
              { name: "Bắp cải",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-12.jpg', count: 2, size: 'L', price: 35000 }
            ],
            count: 200,
            subtotal: 200000,
            paid: 0,
            money_discount: 5000,
            money_ship: 15000,
            total: 210000,
          },
          {
            id: 8,
            code: '888xyza',
            name: 'Đơn hàng mít thái',
            pay: 'HOMEPAY',
            status: 'SUCCESS',
            unit_shippng: 'GHN',
            note: 'Giao nhanh trong ngày',
            address: '78 Lê Văn Lương, Thanh Xuân, Hà Nội',
            products: [
              { name: "Mít thái",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-13.jpg', count: 1, size: 'XL', price: 250000 }
            ],
            count: 200,
            subtotal: 250000,
            paid: 0,
            money_discount: 0,
            money_ship: 25000,
            total: 275000,
          },
          {
            id: 9,
            code: '999pppp',
            name: 'Đơn hàng sầu riêng',
            pay: 'QRCODE',
            status: 'SUCCESS',
            unit_shippng: 'J&T EXPRESS',
            note: 'Cẩn thận tránh dập',
            address: '4 Tràng Thi, Hoàn Kiếm, Hà Nội',
            products: [
              { name: "Sầu riêng",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-14.jpg', count: 1, size: 'XL', price: 500000 }
            ],
            count: 200,
            subtotal: 500000,
            paid: 0,
            money_discount: 20000,
            money_ship: 20000,
            total: 500000,
          },
          {
            id: 10,
            code: 'aaaa1010',
            name: 'Đơn hàng chanh tươi',
            pay: 'HOMEPAY',
            status: 'SUCCESS',
            unit_shippng: 'VIETTEL POST',
            note: 'Giao lúc 9h sáng mai',
            address: '22 Nguyễn Du, Hai Bà Trưng, Hà Nội',
            products: [
              { name: "Chanh tươi",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-15.jpg', count: 20, size: 'S', price: 5000 }
            ],
            count: 200,
            subtotal: 100000,
            paid: 0,
            money_discount: 0,
            money_ship: 10000,
            total: 110000,
          }
        ]
      }
      
}

export const detail_order = (user_id, order_code) => {
  console.log('Lấy thôn tin chi tiết của đơn hàng order:= ', order_code, 'user_id:= ', user_id )
  return {
    data: {
      order_code: 'sahgfyyeuoee',
      status: 'SHIPPING',
      address: 'Nguyễn Trần Cường, 0988870434, ngõ 259 vĩnh hưng, quận hoàng mai, hà nội',
      status_detail: [//đây là một bảng riêng
          {
              time: "2025-07-12 11:19:20",
              status: "Đã giao",
              note: "Giao hàng thành công. Người nhận: Nguyễn Trần Cường",
              active: true
          },
          {
              time: "2025-07-15 11:29:20",
              status: "Đang vận chuyển",
              note: "Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại",
              active: false
          },
          {
              time: "2025-06-12 11:39:20",
              status: "Đã sắp xếp tài xế",
              note: "Tài xế đã nhận đơn và chuẩn bị giao",
              active: false
          },
          {
              time: "2025-04-12 11:05:20",
              status: "Đơn hàng đến trạm",
              note: "Đơn hàng đã đến trạm giao hàng tại Hai Bà Trưng",
              active: false
          },
          {
              time: "2025-07-05 11:20:20",
              status: "Đơn hàng đến trạm",
              note: "Đơn hàng đã đến trạm giao hàng tại Hai Bà Trưng",
              active: false
          },
          {
              time: "2025-07-12 11:19:20",
              status: "Đã giao",
              note: "Giao hàng thành công. Người nhận: Nguyễn Trần Cường",
              active: false
          },
          {
              time: "2025-07-15 11:29:20",
              status: "Đang vận chuyển",
              note: "Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại",
              active: false
          },
          {
              time: "2025-06-12 11:39:20",
              status: "Đã sắp xếp tài xế",
              note: "Tài xế đã nhận đơn và chuẩn bị giao",
              active: false
          },
          {
              time: "2025-04-12 11:05:20",
              status: "Đơn hàng đến trạm",
              note: "Đơn hàng đã đến trạm giao hàng tại Hai Bà Trưng",
              active: false
          },
          {
              time: "2025-07-05 11:20:20",
              status: "Đơn hàng đến trạm",
              note: "Đơn hàng đã đến trạm giao hàng tại Hai Bà Trưng",
              active: false
          }
      ],
      products: [
        {
          name: 'Quả dưa hấu',
          img: '/public/images/img_product/product_img-10C.jpg',
          count: 5,
          size: 'M',
          price: 40000
        },
        {
            name: 'Quả dưa hấu',
            img: '/public/images/img_product/product_img-10C.jpg',
            count: 5,
            size: 'L',
            price: 50000
        }
      ],
      count: 200,
      subtotal: 2785740,
      money_ship: 35000,
      money_discount: 12000,
      paid: 30000,
      total: 980000,//
      pay: 'Thanh toán khi nhận hàng',
    }
  }
}

export const find_order_by_code = (page, user_id, order_code, count) => {
  console.log('Lấy danh sách đơn hàng với', 'page:= ', page, 'order_code:= ', order_code, 'user_id:= ', user_id, 'count:= ', count)
  return {
    start: 0,
    end: 15,
    data: [
      {
        id: 1,
        code: '1234rfghhhh',
        name: 'Đơn hàng dưa hấu, su hào',
        pay: 'QRCODE',
        status: 'PENDING',
        unit_shippng: 'GIAO HÀNG NHANH',
        note: 'Để ở chỗ cầu thang cho tôi',
        address: 'Ngõ 259 Vĩnh Hưng, Hoàng Mai, Hà Nội',
        products: [
          { name: "Dưa hấu",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-1.jpg', count: 5, size: 'M', price: 40000 },
          { name: "Dưa hấu",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-1.jpg', count: 5, size: 'L', price: 50000 },
          { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 4, size: 'S', price: 45000 },
          { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 5, size: 'M', price: 50000 },
          { name: "Su hào",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-2.jpg', count: 5, size: 'L', price: 50000 }
        ],
        subtotal: 1200000,
        money_discount: 12000,
        paid: 0,
        money_ship: 35000,
        total: 980000,
      },
      {
        id: 2,
        code: '5678abcd',
        name: 'Đơn hàng xoài cát, cam sành',
        pay: 'HOMEPAY',
        status: 'SHIPPING',
        unit_shippng: 'VIETTEL POST',
        note: 'Gọi trước khi giao',
        address: '123 Láng Hạ, Đống Đa, Hà Nội',
        products: [
          { name: "Xoài cát",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-3.jpg', count: 3, size: 'M', price: 60000 },
          { name: "Cam sành",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-4.jpg', count: 2, size: 'L', price: 55000 }
        ],
        subtotal: 450000,
        money_discount: 10000,
        money_ship: 25000,
        paid: 0,
        total: 465000,
      },
      {
        id: 3,
        code: '9xyz123',
        name: 'Đơn hàng bưởi da xanh',
        pay: 'HOMEPAY',
        status: 'SHIPPING',
        unit_shippng: 'GHN',
        note: 'Nhà màu xanh cổng sắt',
        address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        products: [
          { name: "Bưởi da xanh",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-5.jpg', count: 2, size: 'XL', price: 120000 }
        ],
        subtotal: 240000,
        money_discount: 20000,
        money_ship: 20000,
        paid: 0,
        total: 240000,
      },
      {
        id: 4,
        code: 'abcd4444',
        name: 'Đơn hàng khoai tây, cà chua',
        pay: 'QRCODE',
        status: 'SUCCESS',
        unit_shippng: 'J&T EXPRESS',
        note: 'Giao giờ hành chính',
        address: '99 Trần Duy Hưng, Cầu Giấy, Hà Nội',
        products: [
          { name: "Khoai tây",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-6.jpg', count: 10, size: 'M', price: 25000 },
          { name: "Cà chua",   id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-7.jpg', count: 5, size: 'S', price: 30000 }
        ],
        subtotal: 400000,
        money_discount: 5000,
        money_ship: 15000,
        total: 410000,
        paid: 0,
      },
      {
        id: 5,
        code: '5555efgh',
        name: 'Đơn hàng nho mỹ',
        pay: 'HOMEPAY',
        status: 'CANCEL',
        unit_shippng: 'NINJA VAN',
        note: 'Không nhận buổi sáng',
        address: '21 Kim Mã, Ba Đình, Hà Nội',
        products: [
          { name: "Nho mỹ",  id: 12, sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.", img: '/public/images/img_product/product_img-8.jpg', count: 2, size: 'M', price: 150000 }
        ],
        subtotal: 300000,
        paid: 0,
        money_discount: 0,
        money_ship: 30000,
        total: 330000,

      }
    ]
  }
}
