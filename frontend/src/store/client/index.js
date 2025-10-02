import state from '@/store/client/state.js';
import getters from '@/store/client/getters.js';
import mutations from '@/store/client/mutations.js';
import actions from '@/store/client/actions.js';

import product from '@/store/client/product/index.js';
import account from '@/store/client/account/index.js';
import blog from '@/store/client/blog/index.js';
import cart from '@/store/client/cart/index.js';
import form from '@/store/client/form/index.js';
import voucher from '@/store/client/voucher/index.js';
import order from '@/store/client/order/index.js';
import chat from '@/store/client/chat/index.js';
import comment from '@/store/client/comment/index.js'
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        product,
        account,
        blog,
        cart,
        form,
        voucher,
        order,
        chat,
        comment
    }
}