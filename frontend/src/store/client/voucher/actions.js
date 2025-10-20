import { find_voucher } from '@/api/client/voucher.js'
import { voucherClient } from '@/constant'
export default {
    async [voucherClient.find_voucher] ({commit}, {user_id, code}) {
        try {
            const res = await find_voucher(user_id, code)
            commit('CHANGE_DETAIL_VOUCHER', res.data.data)
            return {
                ok: 'success',
            }
            
        } 
        catch (error) {
            console.error('Lỗi khi gọi API:', error)
        }
    },
}