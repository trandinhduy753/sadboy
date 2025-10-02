import state from '@/store/client/blog/state.js';
import getters from '@/store/client/blog/getters.js'
import mutations from '@/store/client/blog/mutations.js'
import actions from '@/store/client/blog/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}