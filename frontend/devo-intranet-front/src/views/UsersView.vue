<template>
  <div class="usersBloc">
    <!--<BackToPost />-->
    <div class="allUsers">
      <div class="usersTitle">
        <h2>Utilisateurs enregistrés dans la base de donnée</h2>
      </div>
      <div class="users" v-for="user in allUsers" :key="user.id">
        <div class="usersInfos">
          <p class="userEmail">{{ user.email }}</p>
          <p class="userFirstname">{{ user.firstname }}</p>
          <p class="userLastname">{{ user.lastname }}</p>
          <button class="btnDeleteUser" @click="btnDeleteUser(user.id)">
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <!--<Footer />-->
  </div>
</template>

<script>
//import BackToPost from "@/components/BackToPost.vue";
//import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "Users-view",
  components: {
    //BackToPost,
    //Footer,
  },
  mounted() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    ...mapState(["allUsers"]),
  },
  methods: {
    btnDeleteUser(id_user) {
      this.$store.dispatch("deleteUser", id_user);
    },
  },
};
</script>
<style scoped lang="scss">
.usersBloc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1000px;
}
.allUsers {
  background-color: white;
  width: 100%;
  height: auto;
  box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
  border-radius: 5px;
}
.usersTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
}
.usersTitle h2 {
  margin: 0;
}
.users {
  padding: 5px 30px;
  background-color: white;
}
.usersInfos {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: #797676;
}

.userEmail,
.userFirstname,
.userLastname {
  width: 25%;
  text-align: start;
}
.btnDeleteUser {
  width: 25%;
  border: 1px solid #cecece;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
}
.btnDeleteUser:hover {
  color: rgb(51, 103, 214);
}
@media screen and (min-width: 375px) and (max-width: 1000px) {
  .adminBloc {
    margin-bottom: 5px;
  }
  .usersTitle,
  .users {
    padding-left: 10px;
    padding-right: 10px;
  }
  .users {
    margin-bottom: 10px;
  }
  .usersInfos {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .userEmail,
  .userFirstname,
  .userLastname,
  .btnDeleteUser {
    width: 100%;
  }
}
</style>
