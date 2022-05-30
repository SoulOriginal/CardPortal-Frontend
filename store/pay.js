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
  UPDATE_BY_ID(state, { uuid, data }) {
    const index = state.historyPayment.findIndex(
      (item) => item.invoice_id === uuid
    );

    const update = state.historyPayment
      .filter((order) => order.invoice_id === uuid)
      .map((val) => {
        return { ...val, ...data };
      })[0];
    state.historyPayment.splice(index, 1, update);
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
      alert("Error Loading pay History:Server Error");
      commit("SET_ORDERS", []);
    }
  },
  async featchUpdateById({ commit }, uuid) {
    try {
      const { data } = await this.$axios.get(`/pay/status?uuid=${uuid}`);
      console.log(data);
      commit("UPDATE_BY_ID", {
        uuid,
        data,
      });
    } catch (e) {
      alert("Error Loading Pay Status:Server Error");
    }
  },
};
