import { add_comment } from '@/api/client/comment.js'
import { commentClient } from '@/constant'
export default {
    async [commentClient.add_comment] ({commit}, data) {
        try {
            const res = await add_comment(data)
            return {
                ok: 'success',
            }
        } 
        catch (error) {
            console.error('❌ Lỗi khi gọi API:', error)
        }
    },
}