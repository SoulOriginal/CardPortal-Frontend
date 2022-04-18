// state
export const state = () => ({
  simpleLocation: false,
  openPointOnTheMap: null,
  goToMyGeoLocation: false,
  points: null,
  mapPoints: null,
  modalLoading: false,
  filterOptions: null,
});

// getters
export const getters = {
  simpleLocation: (state) => state.simpleLocation,
  goToMyGeoLocation: (state) => state.goToMyGeoLocation,
  points: (state) => state.points,
  mapPoints: (state) => state.mapPoints,
  modalLoading: (state) => state.modalLoading,
  openPointOnTheMap: (state) => state.openPointOnTheMap,
  filterOptions: (state) => state.filterOptions,
};

// mutations
export const mutations = {
  SET_SimpleLocation(state, value) {
    state.simpleLocation = value;
  },
  SET_openPointOnTheMap(state, value) {
    state.openPointOnTheMap = value;
  },
  SET_Points(state, value) {
    state.points = value;
  },
  SET_MapPoints(state, value) {
    state.mapPoints = value;
  },
  SET_modalLoading(state, value) {
    state.modalLoading = value;
    console.log("modal_loading", value);
  },
  SET_MyGeoLocation(state, value) {
    state.goToMyGeoLocation = value;
  },
  SET_filterOptions(state, value) {
    state.filterOptions = value;
  },
};

// actions
export const actions = {
  UpdateSimpleLocation({ commit }, { value }) {
    commit("SET_SimpleLocation", value);
  },
  SetPointOnTheMap({ commit }, value) {
    commit("SET_openPointOnTheMap", value);
  },
  goToMyGeoLocation({ commit }, value) {
    commit("SET_MyGeoLocation", value);
  },
  IsModalLoading({ commit }, value) {
    commit("SET_modalLoading", value);
  },
  updatePoints({ commit }, value) {
    commit("SET_Points", value);
  },
  setFilterOptions({ commit }, value) {
    commit("SET_filterOptions", { ...value });
  },
  async fetchPoints({ commit }, value) {
    try {
      console.log("store", value);
      await commit("SET_modalLoading", true);
      const { data } = await this.$axios.get(
        `/profile/B2B${value ? "?getAllPoints=true" : ""}`
      );
      await commit("SET_Points", data);
      await commit("SET_modalLoading", false);
    } catch (e) {
      commit("SET_Points", null);
      commit("SET_modalLoading", false);
    }
  },
  async fetchPointsByID({ commit }, value) {
    try {
      console.log("store", value);
      await commit("SET_modalLoading", true);
      const { data } = await this.$axios.get(
        `/profile/B2B${value ? "?userID=" + value : ""}`
      );
      await commit("SET_Points", data);
      await commit("SET_modalLoading", false);
    } catch (e) {
      commit("SET_Points", null);
      commit("SET_modalLoading", false);
    }
  },
  async fetchMapPoints({ commit }) {
    try {
      const { data } = await this.$axios.get(`/profile/B2C/map/points`);
      await commit("SET_MapPoints", data);
    } catch (e) {
      commit("SET_Points", null);
    }
  },
};
