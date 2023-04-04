<template>
  <div class="header">
    <div @click="btnBackToPost()" class="mainTitle">
      <router-link class="BackToPostLink" to="/Posts"
        ><h1>DEV_O Intranet</h1></router-link
      >
    </div>
    <div @click="btnLogout()" class="secondTitle">
      <router-link class="logoutLink" to="/"
        ><h2>Se deconnecter</h2></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Header-vue",
  methods: {
    btnLogout() {
      this.$store.commit("btnLogout");
      this.$router.push("/");
    },
    btnBackToPost() {
      this.$router.push("/Posts");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  height: auto;
  background-color: #f7f7f7;
  color: #2c3e50;
}
.mainTitle,
.secondTitle {
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.BackToPostLink,
.logoutLink {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bolder;
  padding-left: 12px;
  padding-right: 12px;
}

.logoutLink:hover,
.BackToPostLink:hover {
  color: #678fb9;
}

@media screen and (min-width: 375px) and (max-width: 720px) {
}
</style>
