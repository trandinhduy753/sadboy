import axiosInstance from "@/api/axios.js"
export const get_list_goods_receipt= (start, end) => {
    return axiosInstance.get('/admin/goodsReceipts', {
        params: {
            start: start,
            end: end
        }
    })
}

export const find_goods_receipt = (page, code, count) => {
    return axiosInstance.get('/admin/goodsReceipts_code', {
        params: {
            page: page,
            code: code,
            count: count
        }
    })
}
 

export const detail_goods_receipt = (id) => {
    return axiosInstance.get('/admin/goodsReceipt/' + id)
}

export const return_goods_receipt = (id, data) => {
    return axiosInstance.patch('/admin/goodsReceipt/' + id, data)
}

export const debt_provide= (date) => {
    return axiosInstance.get('/admin/debt_provide', {
        params: {
            date: date,
        }
    })
   
};


export const bill_collect_spend = (date, page) => {
    console.log(date)
    return axiosInstance.get('/admin/income_spend', {
        params: {
            date: date,
            page: page
        }
    })
}


export const find_bill_collect_spend = (page, date, code='', count) => {
    return axiosInstance.get('/admin/findIncomeSpend', {
        params: {
            page: page,
            date: date,
            code: code,
            count: count
        }
    })
}

export const add_order_to_list = (date, start, end) => {
    return axiosInstance.get('/admin/order_success', {
        params: {
            start: start,
            end: end
        }
    })
}

export const add_bill_collect = (data) => {
    //return url
    return axiosInstance.post('/admin/addBill', data)
    
}
export const add_bill_spend = (data) => {
    return axiosInstance.post('/admin/addBill', data)
    
}