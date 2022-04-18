import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";

const socketInstance = io("http://localhost:4500", {
  rejectUnauthorized: false,
  path: "/ws/tt",
  // path: window.location.pathname + "/ws",
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 15,
});
export default ({ store }) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: socketInstance,
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  );
};

// import Vue from "vue";
// import VueSocketIO from "vue-socket.io";
// const socketInstance = io("/api/ws", {
//   rejectUnauthorized: false,
//   reconnection: true,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   reconnectionAttempts: 15,
// });
// export default function ({ store }) {
//   Vue.use(
//     new VueSocketIO({
//       debug: false,
//       connection: socketInstance,
//       vuex: {
//         store,
//         actionPrefix: "SOCKET_",
//         mutationPrefix: "SOCKET_",
//       },
//     })
//   );
// }
