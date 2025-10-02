import  axiosInstance from '@/api/axios';
export const client_register = (data) => {
    //return url
    // khi đăng ký thì tiến hành đăng nhập luôn
    console.log('Người dùng đã đăng ký tài khoản thành công', data)
    return {
        data: {
            mess: 'Đăng ký tài khoản thành công'
        }
    }
}

export const login = (data) => {
    // //return url
    // return axiosInstance.post('http://localhost:8000/api/admin/auth/login', data, {
    //     withCredentials: true
    // })
    console.log('Đăng nhập thành công data:= ', data)
    return {
        data: {
            mess: 'Đăng nhập thành công'
        }
    }
}