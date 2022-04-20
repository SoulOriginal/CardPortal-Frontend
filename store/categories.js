// state
export const state = () => ({
  categories: [],
  duble_table: false,
  loading: true,
});

// getters
export const getters = {};

// mutations
export const mutations = {
  SET_CATEGORIES(state, data) {
    state.categories = data;
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

  async featchCategories({ commit }) {
    try {
      commit("SET_LOADING", true);
      const { data } = await this.$axios.get("/profile/admin/conf");
      if (!data) {
        return alert("err loading categories");
      }

      commit("SET_CATEGORIES", data);
      commit("SET_LOADING", false);
    } catch (e) {
      alert("Error Loading Orders:Server Error");
      commit("SET_CATEGORIES", []);
    }
  },
};
