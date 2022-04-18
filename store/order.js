import Cookies from "js-cookie";

// state
export const state = () => ({
  locale: "ru",
  locales: {
    en: "EN",
    ru: "RU",
  },
});

// getters
export const getters = {
  locale: (state) => state.locale,
  locales: (state) => state.locales,
};

// mutations
export const mutations = {
  SET_LOCALE(state, { locale }) {
    state.locale = locale;
  },
};

// actions
export const actions = {
  setLocale({ commit }, { locale }) {
    commit("SET_LOCALE", { locale });

    Cookies.set("locale", locale, { expires: 365 });
  },
};
