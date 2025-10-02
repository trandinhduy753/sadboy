export const get_list_category = () => {
    //return url
    console.log("lấy danh mục sản phẩm")
    return {
      data: [
        {
          id: 7,
          code: 'all',
          name: 'Tất cả'
        },
        {
          id: 2,
          code: 'Fruit',
          name: 'Trái cây'
        },
        {
          id: 1,
          code: 'Fruit Juicy',
          name: 'Nước ép'
        },
        {
          id: 3,
          code: 'Cake',
          name: 'Bánh ngọt'
        },
        {
          id: 5,
          code: "Vegetable",
          name: "Rau củ"
        },
        {
          id: 6,
          code: "Fast Food",
          name: "Đồ ăn nhanh"
        }
      ]
    }
}

export const get_list_product_by_type = (category, page, per_page) => {
  //return ur;
  console.log('Láy danh sách sản phẩm theo phân trang, category: ', category, 'page:= ', page, per_page)
  return {
    data: {
      current_page: 1,
      last_page: 5,
      per_page: 10,
      total: 50,
      first_page_url: "http://localhost/api/products?page=1",
      last_page_url: "http://localhost/api/products?page=5",
      next_page_url: "http://localhost/api/products?page=2",
      path: "http://localhost/api/products",
      prev_page_url: null,
      products: [
        {
          id: 1,
          code: "#222222",
          name: "Quả dưa hấu",
          slug: "qua-dua-hau",
          img: "/public/images/img_product/product_img-10C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.8,
          place: 'Hà Nội',
          count_sale: 150,
        },
        {
          id: 2,
          code: "#333333",
          name: "Quả xoài",
          slug: "qua-xoài",
          img: "/public/images/img_product/product_img-11A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.7,
          place: 'Đà Nẵng',
          count_sale: 120,
        },
        {
          id: 3,
          code: "#444444",
          name: "Quả táo Mỹ",
          slug: "qua-tao-my",
          img: "/public/images/img_product/product_img-11B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.9,
          place: 'Hồ Chí Minh',
          count_sale: 200,
        },
        {
          id: 4,
          code: "#555555",
          name: "Quả lê Hàn Quốc",
          slug: "qua-le-han-quoc",
          img: "/public/images/img_product/product_img-11C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.6,
          place: 'Hà Nội',
          count_sale: 95,
        },
        {
          id: 5,
          code: "#666666",
          name: "Rau cải xanh",
          slug: "rau-cai-xanh",
          img: "/public/images/img_product/product_img-12A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'no',
          star: 4.3,
          place: 'Huế',
          count_sale: 80,
        },
        {
          id: 6,
          code: "#777777",
          name: "Rau muống",
          slug: "rau-muong",
          img: "/public/images/img_product/product_img-12B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'no',
          star: 4.2,
          place: 'Đồng Nai',
          count_sale: 110,
        },
        {
          id: 7,
          code: "#888888",
          name: "Quả cam",
          slug: "qua-cam",
          img: "/public/images/img_product/product_img-12C.jpg",
            original_price: {
          'S': 40000,
          'M': 50000,
          'L': 70000
        },
        sale_price: {
          'S': 30000,
          'M': 40000,
          'L': 60000
        },
          category: "Fruit",
          gift: 'yes',
          star: 4.7,
          place: 'Bắc Giang',
          count_sale: 130,
        },
        {
          id: 8,
          code: "#999999",
          name: "Quả chuối",
          slug: "qua-chuoi",
          img: "/public/images/img_product/product_img-13A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.5,
          place: 'Tiền Giang',
          count_sale: 140,
        },
        {
          id: 9,
          code: "#AAAAAA",
          name: "Khoai tây",
          slug: "khoai-tay",
          img: "/public/images/img_product/product_img-13B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'no',
          star: 4.4,
          place: 'Lâm Đồng',
          count_sale: 90,
        },
        {
          id: 10,
          code: "#BBBBBB",
          name: "Cà chua bi",
          slug: "ca-chua-bi",
          img: "/public/images/img_product/product_img-13C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'yes',
          star: 4.6,
          place: 'Đà Lạt',
          count_sale: 160,
        },
        {
          id: 11,
          code: "#CCCCCC",
          name: "Bánh kem dâu",
          slug: "banh-kem-dau",
          img: "/public/images/img_product/product_img-14A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Cake",
          gift: 'yes',
          star: 4.9,
          place: 'Hồ Chí Minh',
          count_sale: 75,
        },
        {
          id: 12,
          code: "#DDDDDD",
          name: "Bánh su kem",
          slug: "banh-su-kem",
          img: "/public/images/img_product/product_img-14B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Cake",
          gift: 'yes',
          star: 4.8,
          place: 'Hà Nội',
          count_sale: 60,
        },
        {
          id: 13,
          code: "#EEEEEE",
          name: "Quả bưởi",
          slug: "qua-buoi",
          img: "/public/images/img_product/product_img-14C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.5,
          place: 'Bến Tre',
          count_sale: 100,
        },
        {
          id: 14,
          code: "#FAFAFA",
          name: "Quả mít",
          slug: 'qua-mit',
          img: "/public/images/img_product/product_img-15A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.6,
          place: 'Long An',
          count_sale: 145,
        },
        {
          id: 15,
          code: "#111111",
          name: "Quả nho tím",
          slug: "qua-nho-tim",
          img: "/public/images/img_product/product_img-15B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.9,
          place: 'Ninh Thuận',
          count_sale: 210,
        },
        {
          id: 16,
          code: "#121212",
          name: "Quả mận hậu",
          slug: "qua-man-hau",
          img: "/public/images/img_product/product_img-15C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.4,
          place: 'Sơn La',
          count_sale: 85,
        },
        {
          id: 17,
          code: "#131313",
          name: "Quả dứa",
          slug: "qua-dua",
          img: "/public/images/img_product/product_img-16A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.6,
          place: 'Quảng Nam',
          count_sale: 125,
        },
        {
          id: 18,
          code: "#141414",
          name: "Quả thanh long",
          slug: "qua-thanh-long",
          img: "/public/images/img_product/product_img-16B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.5,
          place: 'Bình Thuận',
          count_sale: 175,
        },
        {
          id: 19,
          code: "#151515",
          name: "Rau xà lách",
          slug: "rau-xa-lach",
          img: "/public/images/img_product/product_img-16C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'no',
          star: 4.3,
          place: 'Đà Lạt',
          count_sale: 90,
        },
        {
          id: 20,
          code: "#161616",
          name: "Quả dâu tây",
          slug: "qua-dau-tay",
          img: "/public/images/img_product/product_img-17A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.9,
          place: 'Đà Lạt',
          count_sale: 220,
        },
        {
          id: 21,
          code: "#171717",
          name: "Quả chanh",
          slug: 'qua-chanh',
          img: "/public/images/img_product/product_img-17B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.2,
          place: 'Tiền Giang',
          count_sale: 140,
        },
        {
          id: 22,
          code: "#181818",
          name: "Quả măng cụt",
          slug: "qua-mang-cut",
          img: "/public/images/img_product/product_img-17C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.8,
          place: 'Cần Thơ',
          count_sale: 195,
        },
        {
          id: 23,
          code: "#191919",
          name: "Quả na",
          slug: "qua-na",
          img: "/public/images/img_product/product_img-18A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.5,
          place: 'Bắc Giang',
          count_sale: 105,
        },
        {
          id: 24,
          code: "#202020",
          name: "Quả đào",
          slug: "qua-dao",
          img: "/public/images/img_product/product_img-18B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.7,
          place: 'Lạng Sơn',
          count_sale: 125,
        },
        {
          id: 25,
          code: "#212121",
          name: "Quả dừa xiêm",
          slug: "qua-dua-xiem",
          img: "/public/images/img_product/product_img-18C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'no',
          star: 4.6,
          place: 'Bến Tre',
          count_sale: 180,
        },
        {
          id: 26,
          code: "#232323",
          name: "Cà rốt",
          slug: "ca-rot",
          img: "/public/images/img_product/product_img-19A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'no',
          star: 4.4,
          place: 'Đà Lạt',
          count_sale: 95,
        },
        {
          id: 27,
          code: "#242424",
          name: "Ớt chuông",
          slug: "ot-chuong",
          img: "/public/images/img_product/product_img-19B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Vegetable",
          gift: 'yes',
          star: 4.6,
          place: 'Đà Lạt',
          count_sale: 140,
        },
        {
          id: 28,
          code: "#252525",
          name: "Quả sầu riêng",
          slug: "qua-sau-rieng",
          img: "/public/images/img_product/product_img-19C.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Fruit",
          gift: 'yes',
          star: 4.9,
          place: 'Đắk Lắk',
          count_sale: 230,
        },
        {
          id: 29,
          code: "#262626",
          name: "Bánh ngọt socola",
          slug: "banh-ngot-socola",
          img: "/public/images/img_product/product_img-20A.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Cake",
          gift: 'yes',
          star: 4.8,
          place: 'Hà Nội',
          count_sale: 85,
        },
        {
          id: 30,
          code: "#272727",
          name: "Bánh quy bơ",
          slug: "banh-quy-bo",
          img: "/public/images/img_product/product_img-20B.jpg",
          original_price: {
            'S': 40000,
            'M': 50000,
            'L': 70000
          },
          sale_price: {
            'S': 30000,
            'M': 40000,
            'L': 60000
          },
          category: "Cake",
          gift: 'no',
          star: 4.7,
          place: 'Hồ Chí Minh',
          count_sale: 70,
        }
      ]        
    }
           
  }
}

export const get_product_popular = (row, col) => {
  //return url
  console.log('Lây danh sách các sản phẩm thịnh hàng với số hàng: ', row, 'col:= ',col)
  return {
    data: [
      {
        title: "Sản phẩm mới nhất",
        products: [
          [
            {
              id: 1,
              code: "#222222",
              name: "Quả dưa hấu",
              slug: "qua-dua-hau",
              img: "/public/images/img_product/product_img-10C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.8,
              place: 'Hà Nội',
              count_sale: 150,
            },
            {
              id: 1,
              code: "#222222",
              name: "Quả dưa hấu",
              slug: "qua-dua-hau",
              img: "/public/images/img_product/product_img-10C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.8,
              place: 'Hà Nội',
              count_sale: 150,
            },
            {
              id: 2,
              code: "#333333",
              name: "Quả xoài",
              slug: "qua-xoài",
              img: "/public/images/img_product/product_img-11A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.7,
              place: 'Đà Nẵng',
              count_sale: 120,
            },
          ],
          [
            {
              id: 3,
              code: "#444444",
              name: "Quả táo Mỹ",
              slug: "qua-tao-my",
              img: "/public/images/img_product/product_img-11B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.9,
              place: 'Hồ Chí Minh',
              count_sale: 200,
            },
            {
              id: 4,
              code: "#555555",
              name: "Quả lê Hàn Quốc",
              slug: "qua-le-han-quoc",
              img: "/public/images/img_product/product_img-11C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.6,
              place: 'Hà Nội',
              count_sale: 95,
            },
            {
              id: 5,
              code: "#666666",
              name: "Rau cải xanh",
              slug: "rau-cai-xanh",
              img: "/public/images/img_product/product_img-12A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.3,
              place: 'Huế',
              count_sale: 80,
            },
          ],
          [
            {
              id: 6,
              code: "#777777",
              name: "Rau muống",
              slug: "rau-muong",
              img: "/public/images/img_product/product_img-12B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.2,
              place: 'Đồng Nai',
              count_sale: 110,
            },
            {
              id: 7,
              code: "#888888",
              name: "Quả cam",
              slug: "qua-cam",
              img: "/public/images/img_product/product_img-12C.jpg",
                original_price: {
              'S': 40000,
              'M': 50000,
              'L': 70000
            },
            sale_price: {
              'S': 30000,
              'M': 40000,
              'L': 60000
            },
              category: "Fruit",
              gift: 'yes',
              star: 4.7,
              place: 'Bắc Giang',
              count_sale: 130,
            },
            {
              id: 8,
              code: "#999999",
              name: "Quả chuối",
              slug: "qua-chuoi",
              img: "/public/images/img_product/product_img-13A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.5,
              place: 'Tiền Giang',
              count_sale: 140,
            }
          ]
        ]
      },
      {
        title: 'Sản phẩm bán chạy nhất',
        products: [
          [
            {
              id: 9,
              code: "#AAAAAA",
              name: "Khoai tây",
              slug: "khoai-tay",
              img: "/public/images/img_product/product_img-13B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.4,
              place: 'Lâm Đồng',
              count_sale: 90,
            },
            {
              id: 10,
              code: "#BBBBBB",
              name: "Cà chua bi",
              slug: "ca-chua-bi",
              img: "/public/images/img_product/product_img-13C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'yes',
              star: 4.6,
              place: 'Đà Lạt',
              count_sale: 160,
            },
            {
              id: 11,
              code: "#CCCCCC",
              name: "Bánh kem dâu",
              slug: "banh-kem-dau",
              img: "/public/images/img_product/product_img-14A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Cake",
              gift: 'yes',
              star: 4.9,
              place: 'Hồ Chí Minh',
              count_sale: 75,
            }
          ],
          [
            {
              id: 15,
              code: "#111111",
              name: "Quả nho tím",
              slug: "qua-nho-tim",
              img: "/public/images/img_product/product_img-15B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.9,
              place: 'Ninh Thuận',
              count_sale: 210,
            },
            {
              id: 16,
              code: "#121212",
              name: "Quả mận hậu",
              slug: "qua-man-hau",
              img: "/public/images/img_product/product_img-15C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.4,
              place: 'Sơn La',
              count_sale: 85,
            },
            {
              id: 17,
              code: "#131313",
              name: "Quả dứa",
              slug: "qua-dua",
              img: "/public/images/img_product/product_img-16A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.6,
              place: 'Quảng Nam',
              count_sale: 125,
            }
          ],
          [
            {
              id: 25,
              code: "#212121",
              name: "Quả dừa xiêm",
              slug: "qua-dua-xiem",
              img: "/public/images/img_product/product_img-18C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.6,
              place: 'Bến Tre',
              count_sale: 180,
            },
            {
              id: 26,
              code: "#232323",
              name: "Cà rốt",
              slug: "ca-rot",
              img: "/public/images/img_product/product_img-19A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.4,
              place: 'Đà Lạt',
              count_sale: 95,
            },
            {
              id: 27,
              code: "#242424",
              name: "Ớt chuông",
              slug: "ot-chuong",
              img: "/public/images/img_product/product_img-19B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'yes',
              star: 4.6,
              place: 'Đà Lạt',
              count_sale: 140,
            }
          ]
        ]
      },
      {
        title: 'Sản phẩm được quan tâm nhất',
        products: [
          [
            {
              id: 28,
              code: "#252525",
              name: "Quả sầu riêng",
              slug: "qua-sau-rieng",
              img: "/public/images/img_product/product_img-19C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.9,
              place: 'Đắk Lắk',
              count_sale: 230,
            },
            {
              id: 29,
              code: "#262626",
              name: "Bánh ngọt socola",
              slug: "banh-ngot-socola",
              img: "/public/images/img_product/product_img-20A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Cake",
              gift: 'yes',
              star: 4.8,
              place: 'Hà Nội',
              count_sale: 85,
            },
            {
              id: 30,
              code: "#272727",
              name: "Bánh quy bơ",
              slug: "banh-quy-bo",
              img: "/public/images/img_product/product_img-20B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Cake",
              gift: 'no',
              star: 4.7,
              place: 'Hồ Chí Minh',
              count_sale: 70,
            }
          ],
          [
            {
              id: 26,
              code: "#232323",
              name: "Cà rốt",
              slug: "ca-rot",
              img: "/public/images/img_product/product_img-19A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.4,
              place: 'Đà Lạt',
              count_sale: 95,
            },
            {
              id: 27,
              code: "#242424",
              name: "Ớt chuông",
              slug: "ot-chuong",
              img: "/public/images/img_product/product_img-19B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'yes',
              star: 4.6,
              place: 'Đà Lạt',
              count_sale: 140,
            },
            {
              id: 28,
              code: "#252525",
              name: "Quả sầu riêng",
              slug: "qua-sau-rieng",
              img: "/public/images/img_product/product_img-19C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.9,
              place: 'Đắk Lắk',
              count_sale: 230,
            }
          ],
          [
            {
              id: 24,
              code: "#202020",
              name: "Quả đào",
              slug: "qua-dao",
              img: "/public/images/img_product/product_img-18B.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'yes',
              star: 4.7,
              place: 'Lạng Sơn',
              count_sale: 125,
            },
            {
              id: 25,
              code: "#212121",
              name: "Quả dừa xiêm",
              slug: "qua-dua-xiem",
              img: "/public/images/img_product/product_img-18C.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Fruit",
              gift: 'no',
              star: 4.6,
              place: 'Bến Tre',
              count_sale: 180,
            },
            {
              id: 26,
              code: "#232323",
              name: "Cà rốt",
              slug: "ca-rot",
              img: "/public/images/img_product/product_img-19A.jpg",
              original_price: {
                'S': 40000,
                'M': 50000,
                'L': 70000
              },
              sale_price: {
                'S': 30000,
                'M': 40000,
                'L': 60000
              },
              category: "Vegetable",
              gift: 'no',
              star: 4.4,
              place: 'Đà Lạt',
              count_sale: 95,
            }
          ]
        ]
      }
    ]
  }
}
  
export const detail_product= (slug) => {
  //return
  console.log('Lấy thông tin ch tiết của sản phẩm với slug:= ', slug)
  return {
    data: {
        id: 1,
        code: 'sadboy',
        name: 'Quả dưa hấu',
        slug: 'qua-dua-hau',
        imgs: [
          '/images/img_product/product_img-5B.png',
          '/images/img_product/product_img-5A.jpg',
          '/images/img_product/product_img-5.png',
          '/images/img_product/product_img-5C.jpg',
          '/images/img_product/product_img-5D.jpg',
          '/images/img_product/product_img-5E.jpg'
        ],
        sort_description: "Quả dưa hấu là một loại trái cây ngọt, mọng nước, thường có vỏ xanh và ruột đỏ, rất giàu vitamin và khoáng chất. Loại quả này không chỉ có hương vị thơm ngon.",
        long_description: '<p class="text-red-500">Hiện tại chưa có</p>',
        category: 'Fruit Juicy',

        gift: 'no',
        place: 'Hà Nội',
        star: 4.8,
        count_comment: '45',
        original_price: {
          'S': 40000,
          'M': 50000,
          'L': 70000
        },
        sale_price: {
          'S': 30000,
          'M': 40000,
          'L': 60000
        },
        count_stock: 500,
        count_sale: 150,
        comments: [
          {
            id: 1,
            name: "nguyễn trần cường12",
            img: '/public/images/img_product/product_img-10B.jpg',
            email: 'nguyentrancuog58@gmail.com',
            star: 4,
            created_at: '2003-12-12 12-12-12',
            content: 'Nội dung của bình luận',
            imgs: [
                '/public/images/img_product/product_img-11A.jpg',
                '/public/images/img_product/product_img-11B.jpg',
                '/public/images/img_product/product_img-11C.jpg',
                '/public/images/img_product/product_img-13.png',
                
            ],
            likes: 123,
            dislikes: 345,
            feedbacks: [
                {
                    id: 2,
                    img: '/public/images/img_user/img_user.jpg',
                    name: 'trandinhduy123',
                    email: 'trandinhduy@gmail.com',
                    likes: 13,
                    dislikes: 1,
                    created_at: '2025-12-25 12:25:55',
                    content: 'Phản hồi của người dùng khác',
                    imgs: [
                        '/public/images/img_product/product_img-11A.jpg',
                        '/public/images/img_product/product_img-11B.jpg',
                        '/public/images/img_product/product_img-13.png',
                        
                    ],
                },
                {
                  id: 3,
                  img: '/public/images/img_user/img_user.jpg',
                  name: 'trandinhduy',
                  email: 'trandinhduy@gmail.com',
                  likes: 13,
                  dislikes: 1,
                  created_at: '2025-12-25 12:25:55',
                  content: 'Phản hồi của người dùng khác',
                  imgs: [
                      '/public/images/img_product/product_img-11A.jpg',
                      '/public/images/img_product/product_img-11B.jpg',
                      '/public/images/img_product/product_img-13.png',
                      
                  ],
              },
            ]
          },
          {
            id: 4,  
            name: "nguyễn trần cường34",
            img: '/public/images/img_product/product_img-10B.jpg',
            email: 'nguyentrancuog58@gmail.com',
            star: 5,
            created_at: '2003-12-12 12-12-12',
            content: 'Nội dung của bình luận',
            imgs: [
                '/public/images/img_product/product_img-11A.jpg',
                '/public/images/img_product/product_img-11B.jpg',
                '/public/images/img_product/product_img-11C.jpg',
                '/public/images/img_product/product_img-13.png',
                
            ],
            likes: 123,
            dislikes: 345,
            feedbacks: [
                {
                    id: 5,
                    img: '/public/images/img_user/img_user.jpg',
                    name: 'trandinhduy',
                    email: 'trandinhduy@gmail.com',
                    likes: 13,
                    dislikes: 1,
                    created_at: '2025-12-25 12:25:55',
                    content: 'Phản hồi của người dùng khác',
                    imgs: [
                        '/public/images/img_product/product_img-11A.jpg',
                        '/public/images/img_product/product_img-11B.jpg',
                        '/public/images/img_product/product_img-13.png',
                        
                    ],
                },
                {
                  id: 6,
                  img: '/public/images/img_user/img_user.jpg',
                  name: 'trandinhduy',
                  email: 'trandinhduy@gmail.com',
                  likes: 13,
                  dislikes: 1,
                  created_at: '2025-12-25 12:25:55',
                  content: 'Phản hồi của người dùng khác',
                  imgs: [
                      '/public/images/img_product/product_img-11A.jpg',
                      '/public/images/img_product/product_img-11B.jpg',
                      '/public/images/img_product/product_img-13.png',
                      
                  ],
              },
            ]
          }
        ]
    }
  }
}

export const add_comment_to_list = (slug, page=2) => {//lấy băst đầu từ chỗ detail nữa
  //return
  console.log("Load thêm bình luận về sản phẩm với slug:= ", slug, 'page:= ', page);
  return {
    data: [
      {
        id: 1,
        name: "nguyễn trần cường12",
        img: '/public/images/img_product/product_img-10B.jpg',
        email: 'nguyentrancuog58@gmail.com',
        star: 4,
        created_at: '2003-12-12 12-12-12',
        content: 'Nội dung của bình luận',
        imgs: [
            '/public/images/img_product/product_img-11A.jpg',
            '/public/images/img_product/product_img-11B.jpg',
            '/public/images/img_product/product_img-11C.jpg',
            '/public/images/img_product/product_img-13.png',
            
        ],
        likes: 123,
        dislikes: 345,
        feedbacks: [
            {
                id: 2,
                img: '/public/images/img_user/img_user.jpg',
                name: 'trandinhduy123',
                email: 'trandinhduy@gmail.com',
                likes: 13,
                dislikes: 1,
                created_at: '2025-12-25 12:25:55',
                content: 'Phản hồi của người dùng khác',
                imgs: [
                    '/public/images/img_product/product_img-11A.jpg',
                    '/public/images/img_product/product_img-11B.jpg',
                    '/public/images/img_product/product_img-13.png',
                    
                ],
            },
            {
              id: 3,
              img: '/public/images/img_user/img_user.jpg',
              name: 'trandinhduy',
              email: 'trandinhduy@gmail.com',
              likes: 13,
              dislikes: 1,
              created_at: '2025-12-25 12:25:55',
              content: 'Phản hồi của người dùng khác',
              imgs: [
                  '/public/images/img_product/product_img-11A.jpg',
                  '/public/images/img_product/product_img-11B.jpg',
                  '/public/images/img_product/product_img-13.png',
                  
              ],
          },
        ]
      },
      {
        id: 4,  
        name: "nguyễn trần cường34",
        img: '/public/images/img_product/product_img-10B.jpg',
        email: 'nguyentrancuog58@gmail.com',
        star: 5,
        created_at: '2003-12-12 12-12-12',
        content: 'Nội dung của bình luận',
        imgs: [
            '/public/images/img_product/product_img-11A.jpg',
            '/public/images/img_product/product_img-11B.jpg',
            '/public/images/img_product/product_img-11C.jpg',
            '/public/images/img_product/product_img-13.png',
            
        ],
        likes: 123,
        dislikes: 345,
        feedbacks: [
            {
                id: 5,
                img: '/public/images/img_user/img_user.jpg',
                name: 'trandinhduy',
                email: 'trandinhduy@gmail.com',
                likes: 13,
                dislikes: 1,
                created_at: '2025-12-25 12:25:55',
                content: 'Phản hồi của người dùng khác',
                imgs: [
                    '/public/images/img_product/product_img-11A.jpg',
                    '/public/images/img_product/product_img-11B.jpg',
                    '/public/images/img_product/product_img-13.png',
                    
                ],
            },
            {
              id: 6,
              img: '/public/images/img_user/img_user.jpg',
              name: 'trandinhduy',
              email: 'trandinhduy@gmail.com',
              likes: 13,
              dislikes: 1,
              created_at: '2025-12-25 12:25:55',
              content: 'Phản hồi của người dùng khác',
              imgs: [
                  '/public/images/img_product/product_img-11A.jpg',
                  '/public/images/img_product/product_img-11B.jpg',
                  '/public/images/img_product/product_img-13.png',
                  
              ],
          },
        ]
      }
    ]
  }

}

export const get_list_product_by_search = (page, search, count) => {
  console.log("Lấy danh sách sản phẩm với page:= ", page, "search:= ", search, 'count:= ', count)
  return {
    start: 0, 
    end: 30,
    data: [
      {
        id: 1,
        code: "#222222",
        name: "Quả dưa hấu",
        slug: "qua-dua-hau",
        img: "/public/images/img_product/product_img-10C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.8,
        place: 'Hà Nội',
        count_sale: 150,
        created_at: '2025-01-05 10:15:20',
      },
      {
        id: 2,
        code: "#333333",
        name: "Quả xoài",
        slug: "qua-xoai",
        img: "/public/images/img_product/product_img-11A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 20000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.7,
        place: 'Đà Nẵng',
        count_sale: 120,
        created_at: '2025-01-15 09:30:44',
      },
      {
        id: 3,
        code: "#444444",
        name: "Quả táo Mỹ",
        slug: "qua-tao-my",
        img: "/public/images/img_product/product_img-11B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 50000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.9,
        place: 'Hồ Chí Minh',
        count_sale: 200,
        created_at: '2025-01-22 14:50:33',
      },
      {
        id: 4,
        code: "#555555",
        name: "Quả lê Hàn Quốc",
        slug: "qua-le-han-quoc",
        img: "/public/images/img_product/product_img-11C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.6,
        place: 'Hà Nội',
        count_sale: 95,
        created_at: '2025-02-02 18:40:12',
      },
      {
        id: 5,
        code: "#666666",
        name: "Rau cải xanh",
        slug: "rau-cai-xanh",
        img: "/public/images/img_product/product_img-12A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.3,
        place: 'Huế',
        count_sale: 80,
        created_at: '2025-02-10 08:22:01',
      },
      {
        id: 6,
        code: "#777777",
        name: "Rau muống",
        slug: "rau-muong",
        img: "/public/images/img_product/product_img-12B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.2,
        place: 'Đồng Nai',
        count_sale: 110,
        created_at: '2025-02-18 12:10:22',
      },
      {
        id: 7,
        code: "#888888",
        name: "Quả cam",
        slug: "qua-cam",
        img: "/public/images/img_product/product_img-12C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.7,
        place: 'Bắc Giang',
        count_sale: 130,
        created_at: '2025-03-01 07:32:40',
      },
      {
        id: 8,
        code: "#999999",
        name: "Quả chuối",
        slug: "qua-chuoi",
        img: "/public/images/img_product/product_img-13A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.5,
        place: 'Tiền Giang',
        count_sale: 140,
        created_at: '2025-03-15 17:45:33',
      },
      {
        id: 9,
        code: "#AAAAAA",
        name: "Khoai tây",
        slug: "khoai-tay",
        img: "/public/images/img_product/product_img-13B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.4,
        place: 'Lâm Đồng',
        count_sale: 90,
        created_at: '2025-04-02 11:10:55',
      },
      {
        id: 10,
        code: "#BBBBBB",
        name: "Cà chua bi",
        slug: "ca-chua-bi",
        img: "/public/images/img_product/product_img-13C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'yes',
        star: 4.6,
        place: 'Đà Lạt',
        count_sale: 160,
        created_at: '2025-04-10 15:20:44',
      },
      {
        id: 11,
        code: "#CCCCCC",
        name: "Bánh kem dâu",
        slug: "banh-kem-dau",
        img: "/public/images/img_product/product_img-14A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.9,
        place: 'Hồ Chí Minh',
        count_sale: 75,
        created_at: '2025-05-01 08:30:12',
      },
      {
        id: 12,
        code: "#DDDDDD",
        name: "Bánh su kem",
        slug: "banh-su-kem",
        img: "/public/images/img_product/product_img-14B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.8,
        place: 'Hà Nội',
        count_sale: 60,
        created_at: '2025-05-18 20:55:11',
      },
      {
        id: 13,
        code: "#EEEEEE",
        name: "Quả bưởi",
        slug: "qua-buoi",
        img: "/public/images/img_product/product_img-14C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.5,
        place: 'Bến Tre',
        count_sale: 100,
        created_at: '2025-06-07 07:42:29',
      },
      {
        id: 14,
        code: "#FAFAFA",
        name: "Quả mít",
        slug: "qua-mit",
        img: "/public/images/img_product/product_img-15A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.6,
        place: 'Long An',
        count_sale: 145,
        created_at: '2025-06-25 13:18:39',
      },
      {
        id: 15,
        code: "#111111",
        name: "Quả nho tím",
        slug: "qua-nho-tim",
        img: "/public/images/img_product/product_img-15B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.9,
        place: 'Ninh Thuận',
        count_sale: 210,
        created_at: '2025-07-04 15:10:21',
      },
      {
        id: 16,
        code: "#121212",
        name: "Bánh bông lan",
        slug: "banh-bong-lan",
        img: "/public/images/img_product/product_img-15C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'no',
        star: 4.4,
        place: 'Hà Nội',
        count_sale: 85,
        created_at: '2025-07-15 19:25:50',
      },
      {
        id: 17,
        code: "#131313",
        name: "Quả dứa",
        slug: "qua-dua",
        img: "/public/images/img_product/product_img-16A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.3,
        place: 'Quảng Bình',
        count_sale: 115,
        created_at: '2025-07-20 14:15:33',
      },
      {
        id: 18,
        code: "#141414",
        name: "Rau ngót",
        slug: "rau-ngot",
        img: "/public/images/img_product/product_img-16B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.1,
        place: 'Thanh Hóa',
        count_sale: 70,
        created_at: '2025-08-02 08:50:10',
      },
      {
        id: 19,
        code: "#151515",
        name: "Bánh mì ngọt",
        slug: "banh-mi-ngot",
        img: "/public/images/img_product/product_img-16C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.6,
        place: 'Hồ Chí Minh',
        count_sale: 95,
        created_at: '2025-08-18 09:25:55',
      },
      {
        id: 20,
        code: "#161616",
        name: "Quả mận",
        slug: "qua-man",
        img: "/public/images/img_product/product_img-17A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.2,
        place: 'Lào Cai',
        count_sale: 140,
        created_at: '2025-08-30 16:45:22',
      },
      {
        id: 21,
        code: "#171717",
        name: "Rau xà lách",
        slug: "rau-xa-lach",
        img: "/public/images/img_product/product_img-17B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'yes',
        star: 4.5,
        place: 'Đà Lạt',
        count_sale: 170,
        created_at: '2025-09-05 07:12:33',
      },
      {
        id: 22,
        code: "#181818",
        name: "Quả dâu tây",
        slug: "qua-dau-tay",
        img: "/public/images/img_product/product_img-17C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.9,
        place: 'Đà Lạt',
        count_sale: 250,
        created_at: '2025-09-12 10:30:40',
      },
      {
        id: 23,
        code: "#191919",
        name: "Bánh cupcake",
        slug: "banh-cupcake",
        img: "/public/images/img_product/product_img-18A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.8,
        place: 'Hồ Chí Minh',
        count_sale: 125,
        created_at: '2025-09-28 15:18:05',
      },
      {
        id: 24,
        code: "#202020",
        name: "Quả na",
        slug: "qua-na",
        img: "/public/images/img_product/product_img-18B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.3,
        place: 'Bắc Giang',
        count_sale: 105,
        created_at: '2025-10-03 12:22:44',
      },
      {
        id: 25,
        code: "#212121",
        name: "Quả thanh long",
        slug: "qua-thanh-long",
        img: "/public/images/img_product/product_img-18C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.6,
        place: 'Bình Thuận',
        count_sale: 190,
        created_at: '2025-10-15 17:10:11',
      },
      {
        id: 26,
        code: "#232323",
        name: "Bánh mousse",
        slug: "banh-mousse",
        img: "/public/images/img_product/product_img-19A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.7,
        place: 'Hà Nội',
        count_sale: 85,
        created_at: '2025-10-28 08:44:00',
      },
      {
        id: 27,
        code: "#242424",
        name: "Rau dền",
        slug: "rau-den",
        img: "/public/images/img_product/product_img-19B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.0,
        place: 'Nam Định',
        count_sale: 65,
        created_at: '2025-11-05 09:40:50',
      },
      {
        id: 28,
        code: "#252525",
        name: "Quả ổi",
        slug: "qua-oi",
        img: "/public/images/img_product/product_img-19C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.2,
        place: 'Hưng Yên',
        count_sale: 135,
        created_at: '2025-11-12 16:18:30',
      },
      {
        id: 29,
        code: "#262626",
        name: "Quả măng cụt",
        slug: "qua-mang-cut",
        img: "/public/images/img_product/product_img-20A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.9,
        place: 'Tiền Giang',
        count_sale: 175,
        created_at: '2025-11-20 18:55:44',
      },
      {
        id: 30,
        code: "#272727",
        name: "Bánh tiramisu",
        slug: "banh-tiramisu",
        img: "/public/images/img_product/product_img-20B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Cake",
        gift: 'yes',
        star: 4.8,
        place: 'Hồ Chí Minh',
        count_sale: 150,
        created_at: '2025-12-01 11:35:20',
      },
    ]
  }
}

export const get_list_product = (start, end) => {
  console.log('Lấy danh sách sản phẩm với start:= ', start, end)
  return {
    data: [
      {
        id: 1,
        code: "#222222",
        name: "Quả dưa hấu",
        slug: "qua-dua-hau",
        img: "/public/images/img_product/product_img-10C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.8,
        place: 'Hà Nội',
        count_sale: 150,
        created_at: '2025-01-05 10:15:20',
      },
      {
        id: 2,
        code: "#333333",
        name: "Quả xoài",
        slug: "qua-xoai",
        img: "/public/images/img_product/product_img-11A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 20000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.7,
        place: 'Đà Nẵng',
        count_sale: 120,
        created_at: '2025-01-15 09:30:44',
      },
      {
        id: 3,
        code: "#444444",
        name: "Quả táo Mỹ",
        slug: "qua-tao-my",
        img: "/public/images/img_product/product_img-11B.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 50000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'yes',
        star: 4.9,
        place: 'Hồ Chí Minh',
        count_sale: 200,
        created_at: '2025-01-22 14:50:33',
      },
      {
        id: 4,
        code: "#555555",
        name: "Quả lê Hàn Quốc",
        slug: "qua-le-han-quoc",
        img: "/public/images/img_product/product_img-11C.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Fruit",
        gift: 'no',
        star: 4.6,
        place: 'Hà Nội',
        count_sale: 95,
        created_at: '2025-02-02 18:40:12',
      },
      {
        id: 5,
        code: "#666666",
        name: "Rau cải xanh",
        slug: "rau-cai-xanh",
        img: "/public/images/img_product/product_img-12A.jpg",
        original_price: { 'S': 40000, 'M': 50000, 'L': 70000 },
        sale_price: { 'S': 30000, 'M': 40000, 'L': 60000 },
        category: "Vegetable",
        gift: 'no',
        star: 4.3,
        place: 'Huế',
        count_sale: 80,
        created_at: '2025-02-10 08:22:01',
      }
    ]
  }
}
