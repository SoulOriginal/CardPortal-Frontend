import axios from "axios";

// state
export const state = () => ({
  categoriesConfig: [],
  gds: [],
});

// getters
export const getters = {
  categoriesConfig: (state) => state.categoriesConfig,
  gds: (state) => state.gds,
};

// mutations
export const mutations = {
  SET_CATEGORIES(state, someData) {
    state.categoriesConfig = someData;
  },
  SET_GDS(state, someData) {
    state.gds = someData;
  },
};

// actions
export const actions = {
  async fetchCategories({ commit }) {
    try {
      const { data } = await this.$axios.get("/profile/admin/conf");
      commit("SET_CATEGORIES", data);
    } catch (e) {
      console.log("Err Load fetchCategories");
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      await this.$axios.delete(`/profile/admin/conf/${id}`);
    } catch (e) {
      console.log("Err Load DeleteCategorie");
    }
  },
  async setCategoryActive({ commit }, { someActiveStatus, _id }) {
    try {
      await this.$axios.put(`/profile/admin/conf/active/`, {
        _id,
        active: someActiveStatus,
      });
      commit("SET_CATEGORIES", data);
    } catch (e) {
      console.log("Err Load DeleteCategorie");
    }
  },

  async fetchGds({ commit }) {
    try {
      const { data } = await this.$axios.get("/profile/admin/gds");
      commit("SET_GDS", data);
    } catch (e) {
      console.log("Err Load fetchGds");
    }
  },
};
