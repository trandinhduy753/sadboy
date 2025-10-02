import state from '@/store/client/account/state.js';
import getters from '@/store/client/account/getters.js'
import mutations from '@/store/client/account/mutations.js'
import actions from '@/store/client/account/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}