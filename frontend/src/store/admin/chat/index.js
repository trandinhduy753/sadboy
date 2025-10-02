import state from '@/store/admin/chat/state.js';
import getters from '@/store/admin/chat/getters.js';
import mutations from '@/store/admin/chat/mutations.js';
import actions from '@/store/admin/chat/actions.js';

export default {
    namespaced: true,
    state, 
    getters,
    mutations, 
    actions
}