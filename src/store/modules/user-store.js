export default {
  namespaced: true, // !!!
  state: {
    account: null,
    // account: {
    //   seq: 2341,
    //   userId: "hello",
    //   email: "hello@gmail.com",
    //   role: "manager",
    // },
  },
  getters: {
    mail: (state) => {
      return state.account.email;
    },
  },
  /**
   * state 를 변경할때 이곳에서 메소드를 만든 후 외부에서 호출함!!
   */
  mutations: {
    setUser(state, userInfo) {
      console.log("[setUser]");
      state.account = userInfo;
    },
  },
};
// },
/**
 * action: 서버로 요청을 보낼때 이곳에서 다 몰아넣음
 */
// actions: {
// doLogin(ctx, param) {
/**
 * api.user.login(param).then(res => {})
 */
// }
//   updateValue({ commit }, payload) {
//     commit("updateValue", payload);
//   },
// };
