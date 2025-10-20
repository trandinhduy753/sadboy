import  axiosInstance from '@/api/axiosClient.js';
export const find_voucher = (user_id, code) => {
  return axiosInstance.get('/voucher', {
    params: {
      code
    }
  })
}