import state from '@/store/client/chat/state.js';
import getters from '@/store/client/chat/getters.js'
import mutations from '@/store/client/chat/mutations.js'
import actions from '@/store/client/chat/actions.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}