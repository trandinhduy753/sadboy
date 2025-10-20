import  axiosInstance from '@/api/axiosClient.js';
export const get_list_category = () => {
  return axiosInstance.get('/categories')
}

export const get_list_product_by_type = (category, page, per_page) => {
   return axiosInstance.get('/productsType', {
    params: {
      category,
      page,
      per_page
    }
   })
}

export const get_product_popular = (row, col) => {
  return axiosInstance.get('/productPopular' , {
    params: {
      row,
      col
    }
  })
}
  
export const detail_product= (slug) => {
  return axiosInstance.get('/product' , {
    params: {
      slug
    }
  })
}

export const add_comment_to_list = (slug, page=2) => {
  return axiosInstance.get('/add_comment_product', {
    params: {
      slug,
      page
    }
  })
}

export const get_list_product_by_search = (page, search, count) => {
  return axiosInstance.get('/product_search', {
    params: {
     page,
     search,
     count
    }
  })
}

export const get_list_product = (start, end) => {
  return axiosInstance.get('/products', {
    params: {
     start, 
     end
    }
  })
}
