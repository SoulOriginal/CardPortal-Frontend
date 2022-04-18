export const state = () => ({
  user: {},
  messages: [],
  users: [],
});

export const getters = {
  typingUsers: ({ users, user }) =>
    users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    console.log("MsG", msg);
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  SOCKET_updateMassages(state, massages) {
    state.messages.push(...massages);
  },
  SOCKET_uploadMassages(state, massages) {
    state.messages.push(...massages);
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status;
  },
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createMessage({ dispatch, state }, { msg, userID, postID }) {
    const { user } = state;
    console.log(msg, userID, postID);
    const payload = {
      msg,
      userID,
      postID,
      id: user.id,
    };

    dispatch("socketEmit", {
      action: "createMessage",
      payload,
    });
  },
  uploadMassages({ dispatch, state }, skip) {
    const { user } = state;
    dispatch("socketEmit", {
      action: "uploadMassages",
      payload: { skip, id: user.id },
    });
  },
  joinRoom({ dispatch, state }) {
    const { user } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user,
    });
  },
  leftRoom({ commit, dispatch }) {
    console.log("leftRoom");
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null,
    });

    commit("clearData");
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit("setTypingStatus", typingStatus);
    const { user } = state;
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: user,
    });
  },
  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch("socketEmit", {
      action: "createUser",
      payload: user,
    });

    commit("setUser", { id, ...user });
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      const { id, ...userInfo } = user;
      dispatch("createUser", userInfo);
      dispatch("joinRoom");
    }
  },
};
