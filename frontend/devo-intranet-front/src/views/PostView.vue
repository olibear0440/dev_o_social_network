<template>
  <div class="postBloc">
    <Header />
    <!--<Logout />-->
    <div class="adminBloc" v-if="currentUser.userRole == 1">
      <div class="adminBlocTitre">
        <h2>Accès administrateur</h2>
      </div>
      <div class="userProfilBloc">
        <button class="btnShowUsers" @click="btnShowUsers()">
          Comptes utilisateurs
        </button>
      </div>
    </div>
    <div class="myProfil">
      <div class="myProfilTitle">
        <h2>Mon profil</h2>
      </div>
      <div class="myProfilBloc">
        <div class="profilInfos">
          <p>{{ currentUser.firstname }}</p>
          <p>{{ currentUser.lastname }}</p>
          <p>{{ currentUser.email }}</p>
        </div>
        <div class="profilPassword">
          <button
            id="btnProfilPassword"
            v-if="mode == 'btnResetMdp'"
            @click="btnProfilPassword()"
          >
            Changer le mot de passe
          </button>
          <div class="updatePassword" v-if="mode == 'showLogResetMdp'">
            <form class="formChangeMdp" name="formChangeMdp">
              <input
                v-model="currentPassword"
                type="text"
                placeholder="Mot de passe actuel"
                id="currentPassword"
                name="currentPassword"
                aria-label="mot de passe actuel"
                required
              />
              <input
                v-model="newPassword"
                type="password"
                placeholder="Nouveau mot de passe"
                id="newPassword"
                name="newPassword"
                aria-label="nouveau mot de passe"
                required
              />
            </form>
            <p id="updateMdpError"></p>
            <button class="btnChangeMdp" @click="btnChangeMdp()">
              Valider
            </button>
          </div>
        </div>
        <div class="btnForm">
          <button class="btnCreatePost" @click="btnCreateMyPost()">
            Creer un post
          </button>
        </div>
      </div>
    </div>
    <div class="allThePosts">
      <div class="postsTitle">
        <h2>Les dernieres publications</h2>
      </div>
      <div class="usersPosts" v-for="post in allPosts" :key="post.id">
        <div class="postsUsersInfos">
          <p class="textMail">Posté par : {{ post.usersEmail }}</p>
          <p class="textDate">{{ renderDate(post.postDate) }}</p>
        </div>
        <div class="postsInfos">
          <h3 class="title">{{ post.postTitre }}</h3>
          <p class="description">{{ post.postDescription }}</p>
          <div class="blocImg">
            <img
              crossorigin
              class="postsImg"
              v-if="post.postImgUrl"
              :alt="post.postTitre"
              :src="post.postImgUrl"
            />
          </div>
          <div class="postFooterInfos">
            <router-link class="linkBtnComment" :to="`/posts/${post.id}`">
              <div class="postComments">
                <i class="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
                <p class="commentNbr">{{ post.comCount }}</p>
              </div>
            </router-link>
            <div class="likeIcon" @click="btnPostLike(post.id)">
              <span
                v-if="post.userLike != 1"
                class="fa fa-thumbs-o-up fa-lg"
                aria-hidden="true"
              ></span>
              <span
                v-if="post.userLike == 1"
                class="fa fa-thumbs-up fa-lg"
                aria-hidden="true"
              ></span>
              <p class="commentNbr">{{ post.likeCount }}</p>
            </div>
            <div class="postDelete" v-if="currentUser.userRole == 1">
              <button class="btnDeletePost" @click="btnDeletePost(post.id)">
                Supprimer cette publication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<Footer />-->
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { mapState } from "vuex";
// @ is an alias to /src

export default {
  name: "PostView",
  components: {
    Header,
  },

  data: () => {
    return {
      mode: "btnResetMdp",
      currentPassword: "",
      newPassword: "",
    };
  },

  mounted() {
    //console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) this.$router.push("/");
    //recuperer les infos du user
    this.$store.dispatch("getCurrentUser");
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    ...mapState(["currentUser", "allPosts", "postLike"]),
  },
  methods: {
    btnProfilPassword() {
      this.mode = "showLogResetMdp";
    },
    btnChangeMdp() {
      document.getElementById("currentPassword").classList.remove("inputError");
      document.getElementById("newPassword").classList.remove("inputError");
      const updateMdpError = document.getElementById("updateMdpError");
      //variable regexs
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#^&*]/, //caracteres speciaux acceptés
      ];
      updateMdpError.innerHTML = "";
      if (this.currentPassword == "") {
        document.getElementById("currentPassword").classList.add("inputError");
        updateMdpError.innerHTML = "Mot de passe actuel non valide";
        return;
      }
      if (regexs.some((regex) => !regex.test(this.newPassword))) {
        document.getElementById("newPassword").classList.add("inputError");
        updateMdpError.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une majuscule, un chiffre et un symbole";
        return;
      }
      this.$store.dispatch("btnChangeMdp");
    },
    btnCreateMyPost() {
      this.$router.push("/Mypost");
    },
    btnShowUsers() {
      this.$router.push("/Users");
    },
    btnPostLike(idPost) {
      this.$store.dispatch("btnPostLike", idPost);
    },
    btnDeletePost(id_post) {
      this.$store.dispatch("DeletePost", id_post);
    },
    renderDate(postDate) {
      const d = new Date(postDate);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() < 10 ? "0" : "") +
        (d.getMonth() + 1) +
        "-" +
        (d.getDate() < 10 ? "0" : "") +
        d.getDate() +
        " " +
        (d.getHours() < 10 ? "0" : "") +
        d.getHours() +
        ":" +
        (d.getMinutes() < 10 ? "0" : "") +
        d.getMinutes()
      );
    },
  },
};
</script>

<style scoped>
p {
  margin-top: 5px;
  margin-bottom: 5px;
}
h1 {
  text-align: center;
}
.postBloc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1000px;
}

.myProfil {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
}
.myProfilTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
}
.myProfilTitle {
  text-align: center;
}
.myProfilTitle h2 {
  margin: 0;
  color: #2c3e50;
}
.myProfilBloc {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  height: auto;
  padding: 0px 30px;
  background-color: white;
}

.profilInfos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  padding: 5px;
  width: 100%;
  color: #2c3e50;
}

.profilPassword {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px;
  width: 100%;
  color: #2c3e50;
}
.updatePassword {
  width: 100%;
  padding: 10px;
  color: #2c3e50;
}
.formChangeMdp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
#currentPassword,
#newPassword {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: auto;
}
#currentPassword {
  margin-bottom: 5px;
}
.btnForm {
  padding: 10px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#btnProfilPassword {
  border-radius: 3px;
  padding: 10px;
  width: 90%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid #cecece;
  color: #2c3e50;
}
#updateMdpError {
  font-size: 12px;
  color: rgb(253, 45, 1);
  text-decoration: none;
  margin: 5px 0px 5px 0px;
  padding: 0px 15px;
}
.btnChangeMdp {
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid #cecece;
  border-radius: 3px;
}
.inputError {
  background-color: #ffc0c0;
}
input:focus {
  outline: none !important;
  border: 1px solid red;
  box-shadow: 0 0 10px #678fb9;
}
.btnCreatePost {
  background-color: #678fb9;
  border: 1px solid #678fb9;
  border-radius: 3px;
  color: white;
  display: block;
  padding: 10px;
  width: 90%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
.adminBlocTitre {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
}
.adminBlocTitre h2 {
  margin: 0;
  color: #2c3e50;
}
.adminBloc {
  height: 120px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-top: 5px;
}
.userProfilBloc {
  padding: 0px 30px;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.btnShowUsers {
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  margin: 10px 0px 10px 5px;
  cursor: pointer;
}
.btnShowUsers:hover {
  color: rgb(51, 103, 214);
}

.allThePosts {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
}
.postsTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
}
.postsTitle h2 {
  margin: 0;
  color: #2c3e50;
}
.usersPosts {
  padding: 10px 30px;
  background-color: white;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.postsUsersInfos {
  color: #797676;
}
.textMail,
.textDate {
  font-size: 14px;
}
.postsInfos {
  border-bottom: 2px solid #678fb9;
  padding: 5px;
  margin: 5px;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
.title {
  text-align: start;
  width: auto;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0 0 5px 0;
  color: #2c3e50;
}
.description {
  text-align: start;
  width: auto;
  color: #678fb9;
  margin-bottom: 20px;
}
.blocImg {
  border-radius: 5px;
  max-height: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.postsImg {
  width: 60%;
  height: 100%;
  object-fit: cover;
  margin: 0 auto;
}
.linkBtnComment {
  text-decoration: none;
  color: #2c3e50;
  font-size: 1em;
  font-weight: lighter;
  padding-left: 0;
}
.linkBtnComment:hover {
  color: black;
}
.postComments {
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: auto;
}
.postComments:hover {
  background-color: #f7f7f7;
}

.postFooterInfos {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.likeIcon {
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  margin: 5px 0px 5px 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: auto;
}
.likeIcon:hover {
  background-color: #f7f7f7;
}
.fa-commenting-o {
  margin-left: 5px;
  margin-right: 5px;
  color: rgba(0, 0, 0, 0.5);
}
.fa-thumbs-o-up {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px;
}
.fa-thumbs-up {
  text-decoration: none;
  color: #678fb9;
  padding: 5px;
}
.commentNbr {
  color: rgba(0, 0, 0, 0.5);
}
.btnDeletePost {
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  margin: 5px 0px 5px 40px;
  cursor: pointer;
}
.btnDeletePost:hover {
  color: rgb(51, 103, 214);
}
@media screen and (min-width: 375px) and (max-width: 720px) {
  .myProfil {
    height: auto;
  }
  .myProfilBloc {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  .myProfilTitle {
    padding-left: 10px;
    padding-right: 10px;
  }
  .profilInfos,
  .profilPassword {
    width: 100%;
    align-items: center;
  }
  .btnForm {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #btnProfilPassword {
    width: 100%;
  }
  .formChangeMdp {
    padding: 0;
  }
  .btnChangeMdp {
    width: 100%;
  }
  #updateMdpError {
    padding: 0;
  }
  .btnCreatePost {
    width: 100%;
  }
  .postsTitle {
    padding-left: 10px;
    padding-right: 10px;
  }
  .usersPosts {
    padding-left: 10px;
    padding-right: 10px;
  }
  .textMail {
    width: 100%;
  }
  .postComments,
  .likeIcon {
    background-color: #f7f7f7;
  }

  .postFooterInfos {
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 5px;
  }
  .likeIcon,
  .linkBtnComment {
    width: auto;
    margin: 0;
    align-items: center;
  }
  .postDelete {
    width: 100%;
  }
  .btnDeletePost {
    margin: 10px 0 0 0;
    width: 100%;
  }
  .userProfilBloc {
    justify-content: center;
    height: auto;
  }
}
</style>
