import state from '@/store/client/product/state.js';
import getters from '@/store/client/product/getters.js'
import mutations from '@/store/client/product/mutations.js'
import actions from '@/store/client/product/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}