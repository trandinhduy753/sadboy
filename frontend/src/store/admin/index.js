import state from '@/store/admin/state.js'
import getters from '@/store/admin/getters.js'
import mutations from '@/store/admin/mutations.js'
import actions from '@/store/admin/actions.js'
import employee from '@/store/admin/employee/index.js'
import user from '@/store/admin/user/index.js'
import order from '@/store/admin/order/index.js'
import product from '@/store/admin/product/index.js'
import comment from '@/store/admin/comment/index.js'
import voucher from '@/store/admin/voucher/index.js'
import provide from '@/store/admin/provide/index.js'
import cash_book from '@/store/admin/cash_book/index.js'
import chat from '@/store/admin/chat/index.js'
import account from '@/store/admin/account/index.js'
import authorization from '@/store/admin/authorization/index.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        employee,
        user,
        order,
        product,
        comment,
        voucher,
        provide,
        cash_book,
        chat,
        account,
        authorization
    }
}