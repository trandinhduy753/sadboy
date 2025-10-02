import state from '@/store/admin/voucher/state.js';
import mutations from '@/store/admin/voucher/mutations.js';
import actions from '@/store/admin/voucher/actions.js';
import getters from '@/store/admin/voucher/getters.js';

export default {
    namespaced: true,
    state,
    getters,
    mutations, 
    actions
}