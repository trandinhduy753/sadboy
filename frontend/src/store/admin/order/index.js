import state from '@/store/admin/order/state.js';
import getters from '@/store/admin/order/getters.js'
import mutations from '@/store/admin/order/mutations.js'
import actions from '@/store/admin/order/actions.js'

export default {
    namespaced: true,
    state, 
    getters,
    mutations,
    actions
}