import state from '@/store/admin/authorization/state.js';
import getters from '@/store/admin/authorization/getters.js';
import mutations from '@/store/admin/authorization/mutations.js';
import actions from '@/store/admin/authorization/actions.js';

export default {
    namespaced: true,
    state, 
    getters,
    mutations, 
    actions
}