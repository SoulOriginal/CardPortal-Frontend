// state
export const state = () => ({
  historyPayment: [],
});

// getters
// mutations
export const mutations = {
  SET_HISTORY_PAYMENT(state, history) {
    state.historyPayment = history;
  },
};

// actions
export const actions = {
  async featchPaymentHistory({ commit }) {
    try {
      const { data } = await this.$axios.get("/pay/history");
      if (!data) {
        return alert("err loading orders");
      }
      commit("SET_HISTORY_PAYMENT", data);
    } catch (e) {
      alert("Error Loading Orders:Server Error");
      commit("SET_ORDERS", []);
    }
  },
};
