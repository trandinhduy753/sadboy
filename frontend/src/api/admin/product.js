import axiosInstance from "@/api/axios.js";

export const get_list_product = (start=0, end=0) => {
    return axiosInstance.get('/admin/products', {   
        params: {
            start: start,
            end: end
        } 
    });
}

export const upload_product_file_excel = () => {
   //return url api
   console.log('LOAD PRODUCT TỪ FILE EXCEL')
   return {
    data: [
      {
        id: 1,
        code: "#222222",
        name: "Quả dưa hấu",
        img: "/public/images/img_product/product_img-10C.jpg",
        import_price: { S: 20000, M: 25000, L: 30000 },
        category: "Fruit Juicy"
      },
      {
        id: 2,
        code: "#333333",
        name: "Măng cụt Thái",
        img: "/public/images/img_product/product_img-11.png",
        import_price: { S: 20000, M: 25000, L: 30000 },
        category: "Fruit Juicy"
      }
    ]
  }
}

export const delete_product= async (ids) => {
  return axiosInstance.delete('/admin/product',  {  
    params: { ids }
  });
}

export const find_product_by_name = (page, name, count) => {
  return axiosInstance.get('/admin/products_name', {  
    params: {
      page: page,
      name: name,
      count: count
    }
  });
}

export const get_list_category = () => {
  return axiosInstance.get('/admin/categories');
}

export const add_product = (data) => {
  return axiosInstance.post('/admin/product', data)
}

export const detail_product = (id, page) => {
  console.log('Lấy thông tin chi tiết sản phẩm ở id:= ', id, 'page: =', page)
  return axiosInstance.get(`/admin/product/${id}`, {
    params: {
      page: page
    }
  })
  
}

export const edit_product = (id, data) => {
  data.append("_method", "PATCH"); 
  return axiosInstance.post('/admin/product/' + id, data)
}
export const import_order = (provide_id, start, end) => {
  return axiosInstance.get('/admin/list_product_supply', {
    params: {
      provide_id: provide_id,
      start: start,
      end: end
    }
  })
}

export const find_product_import_order = (provide_id, find, page) => {
  return axiosInstance.get('/admin/product_supply_name', {
    params: {
      provide_id: provide_id,
      find: find,
      page: page
    }
  })
}

export const add_goods_receipt = (data) => {
  return axiosInstance.post('/admin/goodsReceipt', data)
}

export const get_list_product_deleted = (start, end) => {
  //return url api
  return axiosInstance.get('/admin/products/force', {    
    params: {	
        start: start,   
        end: end
    }
  });
  
}

export const delete_product_deleted_at = (id) => {
  return axiosInstance.delete(`/admin/product/force/${id}`);
} 

export const recover_delete_product = (id) => {
  return axiosInstance.patch(`/admin/product/restore/${id}`);
}

