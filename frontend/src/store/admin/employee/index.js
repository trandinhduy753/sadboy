import state from '@/store/admin/employee/state.js';
import getters from '@/store/admin/employee/getters.js';
import mutations from '@/store/admin/employee/mutations.js';
import actions from '@/store/admin/employee/actions.js';


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}