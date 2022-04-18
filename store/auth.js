import axios from "axios";
import Cookies from "js-cookie";

// state
export const state = () => ({
  user: null,
  balance: 0,
  balance_сurrency: "USD",
  email: null,
  token: null,
  role: null,
});

// getters
export const getters = {
  user: (state) => state.user,
  email: (state) => state.email,
  role: (state) => state.role,
  token: (state) => state.token,
  balance: (state) => state.balance,
  balance_сurrency: (state) => state.balance_сurrency,
  check: (state) => state.user !== null,
};

// mutations
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_BALANCE(state, somebalance) {
    state.balance = somebalance;
  },
  SET_BALANCE_CUR(state, somebalancecur) {
    state.balance_сurrency = somebalancecur;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_ROLE(state, role) {
    state.role = role;
  },

  FETCH_USER_SUCCESS(state, user) {
    state.user = user;
  },

  FETCH_USER_FAILURE(state) {
    state.token = null;
  },

  LOGOUT(state) {
    state.user = null;
    state.token = null;
    state.email = null;
    state.role = null;
    state.check = false;
  },

  UPDATE_USER(state, { user }) {
    state.user = user;
  },
};

// actions
export const actions = {
  saveToken({ commit, dispatch }, { token, remember, role }) {
    commit("SET_TOKEN", token);
    commit("SET_ROLE", role);

    Cookies.set("token", token, { expires: remember ? 365 : null });
  },
  saveEmail({ commit }, payload) {
    commit("SET_EMAIL", payload);
  },
  async fetchUser({ commit }) {
    try {
      const { data } = await this.$axios.get("/user/me");
      commit("FETCH_USER_SUCCESS", data);
      commit("SET_ROLE", data.role);
      commit("SET_BALANCE", data.balance);
      commit("SET_BALANCE_CUR", data.balance_сurrency);
    } catch (e) {
      Cookies.remove("token");

      commit("FETCH_USER_FAILURE");
    }
  },

  updateUser({ commit }, payload) {
    commit("UPDATE_USER", payload);
  },

  async logout({ commit }) {
    try {
      await axios.post("api/user/signout");
    } catch (e) {}

    Cookies.remove("token");
    commit("FETCH_USER_SUCCESS", null);
    commit("LOGOUT");
  },

  async fetchOauthUrl(ctx, { provider }) {
    const { data } = await axios.post(`/oauth/${provider}`);

    return data.url;
  },
};
