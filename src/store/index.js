import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
const state={
  isLogin:false,
  historyId:'',
  time:'',
};
const mutations = {
  changeLogin(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.isLogin = true;
  },
  deleteLogin(state) {  //同上
    state.isLogin = false;
  },
  changeHistoryId(state,params) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.historyId = params;
  },
  changeTime(state,params) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.time = params;
  },
};
const store = new Vuex.Store({
  state,
  mutations,
  plugins:[createPersistedState()]
});
export default store;
