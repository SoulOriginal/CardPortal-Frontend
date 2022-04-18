// import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";
// import cookie from "cookie";

// export default ({ store, req }) => {
//   createPersistedState({
//     paths: ["order"],
//     storage: {
//       getItem: (key) => {
//         // See https://nuxtjs.org/guide/plugins/#using-process-flags
//         if (process.server) {
//           const parsedCookies = cookie.parse(req.headers.cookie);
//           return parsedCookies[key];
//         } else {
//           return Cookies.get(key);
//         }
//       },
//       // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
//       setItem: (key, value) =>
//         Cookies.set(key, value, { expires: 365, secure: false }),
//       removeItem: (key) => Cookies.remove(key),
//     },
//   })(store);
// };
// import createPersistedState from "vuex-persistedstate";
// import Cookies from "js-cookie";
// import cookie from "cookie";

// // access the store, http request and environment from the Nuxt context
// // https://nuxtjs.org/api/context/
// export default ({ store, req, isDev }) => {
//   createPersistedState({
//     key: "ska", // choose any name for your cookie
//     paths: [
//       // persist the access_token and refresh_token values from the "auth" store module
//       "order",
//     ],
//     storage: {
//       // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
//       getItem: (key) =>
//         process.client
//           ? Cookies.get(key)
//           : cookie.parse(req.headers.cookie || "")[key],
//       // js-cookie can handle setting both client-side and server-side cookies with one method
//       // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
//       setItem: (key, value) =>
//         Cookies.set(key, value, { expires: 14, secure: !isDev }),
//       // also allow js-cookie to handle removing cookies
//       removeItem: (key) => Cookies.remove(key),
//     },
//   })(store);
// };
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({
  //   encodingType: "des",
  encodingType: "des",
  isCompression: false,
  encryptionSecret: "ja_cto_ebu",
});

export default ({ store }) => {
  createPersistedState({
    paths: ["order"],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(store);
};
