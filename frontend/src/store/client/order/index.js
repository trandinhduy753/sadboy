import state from '@/store/client/order/state.js';
import getters from '@/store/client/order/getters.js'
import mutations from '@/store/client/order/mutations.js'
import actions from '@/store/client/order/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}