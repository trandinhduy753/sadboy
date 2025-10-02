import state from '@/store/admin/account/state.js';
import getters from '@/store/admin/account/getters.js';
import mutations from '@/store/admin/account/mutations.js';
import actions from '@/store/admin/account/actions.js';

export default {
    namespaced: true,
    state, 
    getters,
    mutations, 
    actions
}