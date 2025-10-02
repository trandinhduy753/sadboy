import { createStore } from 'vuex';
import state from '@/store/state.js';
import getters from '@/store/getters.js';
import mutations from '@/store/mutations.js';
import actions from '@/store/actions.js';

import admin from '@/store/admin/index.js';
import client from '@/store/client/index.js'
const store = createStore({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    admin,
    client
  }
});

export default store;

