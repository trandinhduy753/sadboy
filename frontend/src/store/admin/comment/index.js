import state from '@/store/admin/comment/state.js';
import getters from '@/store/admin/comment/getters.js';
import mutations from '@/store/admin/comment/mutations.js';
import actions from '@/store/admin/comment/actions.js';

export default {
    namespaced: true,
    state, 
    getters,
    mutations, 
    actions
}