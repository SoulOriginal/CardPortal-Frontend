// state
export const state = () => ({
  orders: [],
  history: [],
  duble_table: false,
  loading: true,
});

// getters
export const getters = {
  sortedDataByDubleTable: (state) => (prop_status_table) => {
    if (!state.duble_table) return state.orders;
    return state.orders.filter((order) => order.status === prop_status_table);
  },
};

// mutations
export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  SET_HISTORY(state, history) {
    state.history = history;
  },
  UPDATE_BY_ID(state, { _id, data }) {
    const index = state.orders.findIndex((item) => item._id === _id);

    const update = state.orders
      .filter((order) => order._id === _id)
      .map((val) => {
        return { ...val, ...data };
      })[0];

    state.orders.splice(index, 1, update);
  },
  SET_DUBLE_TABLE(state, val) {
    state.duble_table = val;
  },
  SET_LOADING(state, some_loading) {
    state.loading = some_loading;
  },
};

// actions
export const actions = {
  setDubleTable({ commit }, IsTrueOrFalse) {
    commit("SET_DUBLE_TABLE", IsTrueOrFalse);
  },

  async featchOrders({ commit }) {
    try {
      console.log(1234);

      commit("SET_LOADING", true);
      const { data } = await this.$axios.get("/profile/user/orders");
      if (!data) {
        return alert("err loading orders");
      }

      commit("SET_ORDERS", data);
      commit("SET_LOADING", false);
    } catch (e) {
      alert("Error Loading Orders:Server Error");
      commit("SET_ORDERS", []);
    }
  },
  async featchOrdersHistory({ commit }) {
    try {
      commit("SET_LOADING", true);
      const { data } = await this.$axios.get("/profile/user/orders/history");
      if (!data) {
        return alert("err loading orders history");
      }
      commit("SET_HISTORY", data);
      commit("SET_LOADING", false);
    } catch (e) {
      alert("Error Loading Orders History:Server Error");
      commit("SET_HISTORY", []);
    }
  },
  async updateOrder({ commit }, data) {
    try {
      commit("SET_LOADING", true);
      await this.$axios.put("/profile/user/orders/edit", {
        ...data,
      });
      commit("UPDATE_BY_ID", { _id: data.gds_id, data });

      commit("SET_LOADING", false);
    } catch (e) {
      alert("Error Update Orders:Server Error");
    }
  },
  async updateOrderStatus({ commit }, data) {
    try {
      commit("SET_LOADING", true);
      await this.$axios.put("/profile/user/orders/active", {
        gds_id: data.gds_id,
        active: data.active,
      });
      commit("UPDATE_BY_ID", {
        _id: data.gds_id,
        data: { status: data.active },
      });

      commit("SET_LOADING", false);
    } catch (e) {
      alert("Error Update Orders:Server Error");
    }
  },
};
