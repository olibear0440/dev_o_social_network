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
  thisPost: [],
  deleteUser: [],
  deleteThisCom: [],
  deleteThisPost: [],
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
  LOG_NEWPOST(state, newPost) {
    state.newPost = newPost;
  },
  LOG_NEWCOMMENT(state, newComment) {
    state.newComment = newComment;
  },
  UPDATE_MDP(state, newMdp) {
    state.newMdp = newMdp;
  },
  GET_ALL_POSTS(state, allPosts) {
    state.allPosts = allPosts;
  },
  GET_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },
  GET_ALL_COM(state, allCom) {
    state.allCom = allCom;
  },
  GET_THISPOST(state, thisPost) {
    state.thisPost = thisPost;
  },
  DELETE_USER(state, deleteUser) {
    state.deleteUser = deleteUser;
  },

  DELETE_THISCOM(state, deleteThisCom) {
    state.deleteThisCom = deleteThisCom;
  },
  DELETE_THISPOST(state, deleteThisPost) {
    state.deleteThisPost = deleteThisPost;
  },
  POST_LIKE(state, postLike) {
    state.postLike = postLike;
  },
  //deconnecter la session et supprimer le user du localstorage
  btnLogout(state) {
    state.user = {
      userId: -1,
      token: "",
    };
    localStorage.removeItem("user");
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
  //appel api pour afficher la liste de tt les utilisateurs
  getAllUsers({ commit }) {
    instance
      .get("/users")
      .then((response) => {
        commit("GET_ALL_USERS", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
  //appel api pour la creation d'un post
  btnCreatePost({ commit }) {
    if (window.confirm("Veuillez valider votre publication ") != true) {
      return;
    }
    //recuperer le formulaire html
    const form = document.forms["createPostForm"];
    //rechercher l'id correspondant au selecteur
    const myFiles = document.querySelector("#postImgUrl");
    //creer un nouvel objet formData et integrer les champs du formulaire (clé/valeur)
    const formData = new FormData();
    formData.append("postTitre", form.postTitre.value);
    formData.append("postDescription", form.postDescription.value);
    formData.append("postImgUrl", myFiles.files[0]);

    //recuperer le token de l'utilisateur depuis le local storage
    const token = JSON.parse(localStorage.getItem("user")).token;
    //appel api pour la creation du post
    instance
      .post("posts", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("LOG_NEWPOST", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api pour recuperer le post avec son id
  getThisPost({ commit }, idRoute) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .get("/posts/" + idRoute, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          commit("GET_THISPOST", response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api sur le btn "publier un com" pour la creation d'un commentaire
  btnCreateComment({ commit }, commentBody) {
    if (window.confirm("Voulez vous valider ce commentaire ?") != true) {
      return;
    }
    instance
      .post("comments", commentBody)
      .then((response) => {
        commit("LOG_NEWCOMMENT", response.data);
        location.reload();
      })
      .catch((error) => console.log(error));
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
  //appel api suppression d'un utilisateur
  deleteUser({ commit }, id_user) {
    if (
      window.confirm(
        "Cet utilisateur et toutes ses publications seront supprimés !"
      ) != true
    ) {
      return;
    }
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .delete("/users/" + id_user, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("DELETE_USER", response.data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api suppression des commentaires
  deleteComment({ commit }, idCom) {
    if (window.confirm("Ce commentaire sera supprimé !") != true) {
      return;
    }
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .delete("/comments/" + idCom, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("DELETE_THISCOM", response.data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //appel api suppression d'un posts
  DeletePost({ commit }, id_post) {
    if (
      window.confirm(
        "Cette publication et tous les commentaires associés seront supprimés "
      ) != true
    ) {
      return;
    }
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .delete("/posts/" + id_post, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("DELETE_THISPOST", response.data);
        location.reload();
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
