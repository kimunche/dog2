import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/user-store";
import picturStore from "./modules/picture-store";
// 데이터 저장할때
Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   account: {
  //     seq: 2341,
  //     userId: "hello",
  //     email: "hello@gmail.com",
  //     role: "manager",
  //   },
  // },
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    user: userStore,
    picture: picturStore,
  },
});
