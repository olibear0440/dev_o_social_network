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

  currentUser: [],
  allUsers: [],
  allPosts: [],
  allCom: [],
  file: "",
  postLike: [],
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

  CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser;
  },
  UPDATE_MDP(state, newMdp) {
    state.newMdp = newMdp;
  },
  GET_ALL_POSTS(state, allPosts) {
    state.allPosts = allPosts;
  },
  POST_LIKE(state, postLike) {
    state.postLike = postLike;
  },
  GET_ALL_COM(state, allCom) {
    state.allCom = allCom;
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

  //appel api de l'utilisateur en cours
  getCurrentUser({ commit }) {
    instance
      .get("/users/currentUser")
      .then((response) => {
        commit("CURRENT_USER", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api sur le bouton "changer le mdp" pour le changement de mot de passe
  btnChangeMdp({ commit }) {
    if (
      window.confirm(
        "Veuillez noter votre nouveau mot de passe avant de valider"
      ) != true
    ) {
      return;
    }
    const form = document.forms["formChangeMdp"];
    const formData = {
      currentPassword: form.currentPassword.value,
      newPassword: form.newPassword.value,
    };
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .put("users", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("UPDATE_MDP", response.data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  },
  //appel api qui renvoie tt les posts
  getAllPosts({ commit }) {
    instance
      .get("/posts")
      .then((response) => {
        commit("GET_ALL_POSTS", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api qui renvoie tt les commentaires
  getAllCom({ commit }, idRoute) {
    instance
      .get("/comments/" + idRoute)
      .then((response) => {
        commit("GET_ALL_COM", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api creation de like
  btnPostLike({ commit }, idPost) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .post(`/posts/${idPost}/like`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("POST_LIKE", response.data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
