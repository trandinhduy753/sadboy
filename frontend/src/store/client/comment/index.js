import state from '@/store/client/comment/state.js';
import getters from '@/store/client/comment/getters.js'
import mutations from '@/store/client/comment/mutations.js'
import actions from '@/store/client/comment/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}