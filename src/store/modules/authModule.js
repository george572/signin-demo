import { SigninUser } from "../../api/authEndpoints";

export default {
  namespaced: true,
  state() {
    return {
      userAuthenticated: false,
      userData: {},
      loginError: "",
      
    };
  },
  getters: {
    userAuthenticated(state) {
      return state.userAuthenticated;
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      let expires = "";
      if (payload.days) {
        const date = new Date();
        date.setTime(date.getTime() + payload.days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      const secureFlag = "; Secure";
      document.cookie = `${payload.name}=${payload.value}${expires}; path=/${secureFlag}`;
    },

    SET_USER_DATA(state, data) {
      state.userData = data.user;
      state.userAuthenticated = true;
    },

    SET_LOGIN_ERROR(state, data) {
      state.loginError = data.message;
    },
  },

  actions: {
    async userAuth({ commit }, payload) {
      const response = await SigninUser(payload);
      if (response.status === 200) {
        commit("SET_TOKEN", { name: "jwt", value: response.jwt, days: 1 });
        commit("SET_USER_DATA", response.data);
      }
    },
  },
};
