import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/reseau_social/",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    Userid: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      Userid: -1,
      token: "",
    };
  }
}

const store = createStore({
  state: {
    status: "",
    user: {
      message: "",
      Userid: -1,
      role: "",
      username: "",
      token: "",
    },
    userInfos: {
        username: "",
        email: "",
        createdAt: ""
    },
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
        instance.defaults.headers.common['Authorization'] = user.token;
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
    },
    userInfos: function (state, userInfos) {
        state.userInfos = userInfos;
    },
  },
  actions: {
    connect: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/login", userInfos)
          .then(function(response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_connect");
            reject(error);
          });
      });
    },

    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/signup", userInfos)
          .then(function(response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function(error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

  },
});

export default store;
