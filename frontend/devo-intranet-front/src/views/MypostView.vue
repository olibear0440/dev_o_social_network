<template>
  <div class="createPost">
    <Header />
    <!--<BackToPost />-->
    <div class="myPostBloc">
      <div class="myPostTitle">
        <h2>Creer un post</h2>
      </div>
      <div class="myPostMsg">
        <form
          action="/upload"
          method="POST"
          name="createPostForm"
          class="formBloc"
          enctype="multipart/form-data"
        >
          <div class="formControl">
            <input
              v-model="postTitre"
              type="text"
              placeholder="Titre"
              id="postTitre"
              name="postTitre"
              aria-label="titre"
              required
            />
            <textarea
              v-model="postDescription"
              placeholder="Votre message"
              id="postDescription"
              name="postDescription"
              aria-label="description"
              required
            ></textarea>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .gif, .webp"
              id="postImgUrl"
              ref="myFiles"
              @change="uploadFile()"
              name="postImgUrl"
              aria-label="fichier"
              required
            />
            <span id="createPostError"></span>
            <button
              type="button"
              @click="btnCreatePost()"
              id="confirmPost"
              name="confirmPost"
              class="confirmPost"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
    <PostsRules />
    <!--<Footer />-->
  </div>
</template>

<script>
//import BackToPost from "@/components/BackToPost.vue";
//import Footer from "@/components/Footer.vue";
import Header from "../components/Header.vue";
import PostsRules from "../components/Posts-rules.vue";
export default {
  name: "My-post",
  components: {
    //BackToPost,
    //Footer,
    Header,
    PostsRules,
  },
  data: () => {
    return {
      postTitre: "",
      postDescription: "",
      file: "",
    };
  },
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    uploadFile() {
      this.file = this.$refs.myFiles.files[0];
    },
    btnCreatePost() {
      const createPostError = document.getElementById("createPostError");
      createPostError.innerHTML = "";
      if (!this.postTitre || !this.postDescription) {
        createPostError.innerHTML =
          "Veuillez renseigner au minimum un titre et un message";
        return;
      }
      this.$store.dispatch("btnCreatePost");
      this.$router.push("Posts");
    },
  },
};
</script>

<style scoped>
.createPost {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto;
  max-width: 1000px;
  height: auto;
}
input {
  box-shadow: 0 0 10px #678fb9;
  margin: 5px 0 10px 0;
}
textarea {
  box-shadow: 0 0 10px #678fb9;
}
input:focus,
textarea:focus {
  outline: none !important;
  border: 1px solid red;
  box-shadow: 0 0 10px #678fb9;
}

.myPostBloc {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 420px;
  margin-top: 5px;
}
.myPostTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
  text-align: center;
}
.myPostTitle h2 {
  margin: 0;
  color: #2c3e50;
}
.myPostMsg {
  padding: 20px 30px;
}
.formBloc {
  padding: 5px;
}
.formControl {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}
#postTitre,
#postDescription,
#postImgUrl {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: auto;
}
#postTitre {
  margin-bottom: 5px;
}
textarea {
  min-height: 120px;
  margin-bottom: 5px;
}
#createPostError {
  padding: 5px;
  text-decoration: none;
  color: rgb(253, 41, 1);
  cursor: text;
}
.confirmPost {
  background-color: #678fb9;
  border: 2px solid #678fb9;
  border-radius: 3px;
  color: white;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
@media screen and (min-width: 375px) and (max-width: 720px) {
  .myPostTitle {
    padding-left: 10px;
    padding-right: 10px;
  }
  .myPostMsg {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
