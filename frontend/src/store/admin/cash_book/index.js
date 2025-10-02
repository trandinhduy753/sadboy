import state from '@/store/admin/cash_book/state.js';
import getters from '@/store/admin/cash_book/getters.js';
import mutations from '@/store/admin/cash_book/mutations.js';
import actions from '@/store/admin/cash_book/actions.js';
export default {
    namespaced: true,
    state, 
    getters,
    mutations,
    actions
}