<template>
  <div class="comment">
    <Header />
    <div class="commentBloc">
      <!--<BackToPost />-->
      <div class="onePost">
        <div class="postsTitle">
          <h2>Commenter cette publication</h2>
        </div>
        <div class="usersPosts">
          <div class="postsUsersInfos">
            <p>Posté par : {{ thisPost.usersEmail }}</p>
            <p>{{ renderDate(thisPost.postDate) }}</p>
          </div>
          <div class="thisPostsInfos">
            <h3 class="title">{{ thisPost.postTitre }}</h3>
            <p class="description">{{ thisPost.postDescription }}</p>
            <div class="blocImg">
              <img
                crossorigin
                class="postsImg"
                v-if="thisPost.postImgUrl"
                :alt="thisPost.postTitre"
                :src="thisPost.postImgUrl"
              />
            </div>
          </div>
          <div class="thisPostCommentsNbr">
            <i class="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
            <p class="commentNbr">{{ thisPost.comCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="commentBlocMsg">
      <div class="myCommentBlocMsg">
        <div class="myCommentTitleMsg">
          <h2>Votre message</h2>
        </div>
        <div class="myCommentMsg">
          <form
            action="/upload"
            method="POST"
            name="createCommentForm"
            class="formBloc"
            enctype="multipart/form-data"
          >
            <div class="formControlComment">
              <input
                v-model="commentText"
                type="text"
                placeholder="Ecrire un commentaire..."
                id="commentText"
                name="commentText"
                aria-label="commentaire"
                required
              />
              <div class="btnCommentBloc">
                <button
                  type="button"
                  @click="btnCreateComment()"
                  id="confirmComment"
                  name="confirmComment"
                  class="confirmComment"
                >
                  Publier
                </button>
              </div>
            </div>
          </form>
          <div
            class="allComBloc"
            v-for="com in allCom"
            :key="com.id"
            :id="com.id"
          >
            <div class="userInfoCom">
              <p class="comMailStyle">{{ com.email }}</p>
              <p class="dateStyle">{{ renderDate(com.commentDate) }}</p>
              <div class="comDelete" v-if="currentUser.userRole == 1">
                <button class="deleteComment" @click="btnDeleteComment(com.id)">
                  Supprimer ce commentaire
                </button>
              </div>
            </div>
            <div class="msgCom">
              <p class="msgComStyle">{{ com.commentText }}</p>
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
//import BackToPost from "@/components/BackToPost.vue";
//import Footer from "@/components/Footer.vue";
export default {
  name: "ThisPost",
  components: {
    Header,
    //BackToPost,
    //Footer,
  },
  data: () => {
    return {
      com: "",
      commentText: "",
    };
  },
  computed: {
    ...mapState(["thisPost", "allCom", "currentUser"]),
  },
  mounted() {
    const idRoute = this.$route.params.id;
    this.$store.dispatch("getThisPost", idRoute);
    this.$store.dispatch("getAllCom", idRoute);
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
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
    btnCreateComment() {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const idRoute = this.$route.params.id;
      const commentBody = {
        commentDate: this.commentDate,
        commentText: this.commentText,
        post_id: idRoute,
        user_id: token,
      };
      this.$store.dispatch("btnCreateComment", commentBody);
    },
    btnDeleteComment(idCom) {
      this.$store.dispatch("deleteComment", idCom);
    },
  },
};
</script>

<style scoped>
.comment {
  margin: 0 auto;
  height: auto;
  max-width: 1000px;
}
.commentBloc {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 5px;
}
.onePost {
  margin-bottom: 5px;
  width: 100%;
  box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
  background-color: white;
}
.postsTitle {
  background-color: #f7f7f7;
  padding: 20px 30px;
  border-bottom: 1px solid #f0f0f0;
}
.postsTitle h2 {
  margin: 0;
  color: #2c3e50;
}
.usersPosts {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.thisPostsInfos {
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
.postsUsersInfos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 5px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: #797676;
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
  -o-object-fit: cover;
  object-fit: cover;
  margin: 0 auto;
}

.thisPostCommentsNbr {
  border-radius: 4px;
  padding: 10px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50px;
  border: 1px solid #cecece;
  margin-left: 5px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.5);
}
p.commentNbr {
  margin: 0;
  font-weight: normal;
}
.fa-commenting-o {
  padding: 5px;
}
.myCommentBlocMsg {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
.myCommentTitleMsg {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
}
.myCommentTitleMsg h2 {
  margin: 0;
  color: #2c3e50;
}
.myCommentMsg {
  padding: 30px;
}
input{
  box-shadow: 0 0 10px #678fb9;
}
input:focus {
  outline: none !important;
  border: 1px solid red;
  
}
.formBloc {
  margin-bottom: 20px;
  width: auto;
}
.formControlComment {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: auto;
}
#commentText {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0px solid #678fb9;
  border-radius: 3px;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  margin-bottom: 5px;
}

.btnCommentBloc {
  display: flex;
  justify-content: flex-end;
  padding: 0px 5px 5px 0px;
}
.confirmComment {
  background-color: #678fb9;
  border: 2px solid #678fb9;
  border-radius: 3px;
  color: white;
  padding: 10px;
  width: 100px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  margin-left: 15px;
}
.deleteComment {
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #cecece;
  margin-left: 20px;
  height: 30px;
}
.deleteComment:hover {
  color: rgb(51, 103, 214);
}

.allComBloc {
  font-family: inherit;
  border-bottom: 1px solid #e5e5e5;
}
.allComBloc:hover {
  background-color: #e5e5e5;
}
.userInfoCom {
  display: flex;
  color: #797676;
  font-size: 12px;
}
.dateStyle {
  color: #797676;
  margin-left: 20px;
}
.comDelete {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.msgCom {
  display: flex;
  justify-content: space-between;
  text-align: start;
  font-size: 16px;
}
.msgComStyle {
  color: #678fb9;
  margin: 5px 0px;
  font-family: cursive;
}
@media screen and (min-width: 375px) and (max-width: 720px) {
  .myCommentTitle,
  .myCommentMsg {
    padding-left: 10px;
    padding-right: 10px;
  }
  .userInfoCom {
    flex-direction: column;
  }
  .thisPostCommentsNbr {
    width: auto;
    border: none;
  }
  .allComBloc {
    padding-top: 10px;
  }
  .comMailStyle,
  .dateStyle {
    margin: 0;
    text-align: left;
  }
  .comDelete {
    width: auto;
  }
  .deleteComment {
    margin: 10px 0 10px 0;
    width: 100%;
  }
}
</style>
