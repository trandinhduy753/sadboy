import state from '@/store/client/cart/state.js';
import getters from '@/store/client/cart/getters.js'
import mutations from '@/store/client/cart/mutations.js'
import actions from '@/store/client/cart/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}