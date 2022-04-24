import Cookies from "js-cookie";
import { cookieFromRequest } from "~/utils";
// import { state } from "./auth";
import { actions as AuthActions } from "./auth";
export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // await OrderActions.featchOrders();
    // console.log(
    //   "🚀 ~ file: index.js ~ line 22 ~ nuxtClientInit ~ await OrderActions.featchOrders()",
    //   await OrderActions.featchOrders()
    // );
    // const { data } = await this.$axios.get("/profile/user/orders");
    // console.log(data);
    // commit("order/SET_ORDERS", data);
    const token = cookieFromRequest(req, "token");
    console.log(token);
    if (token) {
      commit("auth/SET_TOKEN", token);
    }

    const locale = cookieFromRequest(req, "locale");
    if (locale) {
      commit("lang/SET_LOCALE", { locale });
    }
    // await OrderActions.featchOrders();
  },

  async nuxtClientInit({ commit }) {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      commit("auth/SET_TOKEN", token);
    }

    const locale = Cookies.get("locale");
    if (locale) {
      commit("lang/SET_LOCALE", { locale });
    }
  },
};
export const getters = {
  cleanObj: () => {
    return (propObJ) => {
      let boolDefault = false;
      let stringDefault = "";
      let numberDefault = 0;
      let new_wal = {};
      for (let [key, value] of Object.entries(propObJ)) {
        let propType = typeof propObJ[key];

        // console.log(key, value, propType);

        switch (propType) {
          case "number":
            new_wal[key] = numberDefault;
            break;

          case "string":
            new_wal[key] = stringDefault;
            break;

          case "boolean":
            new_wal[key] = boolDefault;
            break;

          case "undefined":
            new_wal[key] = undefined;
            break;

          default:
            if (value === null) {
              continue;
            }
            break;
        }
      }
      return new_wal;
    };
  },
  cardNumberToCardType: () => {
    return (_propsCardNum) => {
      let number = _propsCardNum;
      console.log(number);
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp("^9792");
      if (number.match(re) != null) return "troy";

      return "visa"; // default type
    };
  },
};
