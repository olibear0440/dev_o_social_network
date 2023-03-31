import { createStore } from "vuex";

const axios = require("axios");

//import url de l'api par axios
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//verification du user dans le localstorage
let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const state = {
  status: "",
  user: user,
};
const getters = {};
const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  //recuperer header token et enregistrer dans localstorage le user
  LOG_USER(state, user) {
    instance.defaults.headers.common["Authorization"] = user.token;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
};
const actions = {
  //appel api sur le btn "connexion" pour le login du compte
  btnLoginAccount: ({ commit }, infoUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/registers/login", infoUser)
        .then(function (response) {
          commit("SET_STATUS", "login");
          commit("LOG_USER", response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_login");
          reject(error);
        });
    });
  },

  //appel api sur le btn "creer mon compte" pour la creation du compte
  btnCreateAccount: ({ commit }, newUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/registers/signup", newUser)
        .then(function (response) {
          commit("SET_STATUS", "created");
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_create");
          reject(error);
        });
    });
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
