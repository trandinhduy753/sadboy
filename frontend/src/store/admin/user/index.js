import state from '@/store/admin/user/state.js';
import mutations from '@/store/admin/user/mutations.js';
import getters from '@/store/admin/user/getters.js';
import actions from '@/store/admin/user/actions.js';
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}