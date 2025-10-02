import state from '@/store/admin/product/state.js';
import getters from '@/store/admin/product/getters.js';
import mutations from '@/store/admin/product/mutations.js';
import actions from '@/store/admin/product/actions.js';

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}