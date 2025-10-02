import { get_info_dashboard} from '@/api/admin/dashboard.js'
export default {
    async get_dashboard_information ({commit}) {
        try {
            const res= await get_info_dashboard()
            commit('CHANGE_DASHBOARD', res.data.data)
            return {
                
                ok: "success"
            }
        } catch (error) {
            return {
                ok: error
            }
        }
    }
}