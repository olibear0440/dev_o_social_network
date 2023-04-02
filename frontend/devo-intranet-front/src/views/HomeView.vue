<template>
  <div class="registerBloc">
    <h1 class="mainTitle">DEV_O Intranet</h1>
    <div class="createAccount">
      <div id="formTitre">
        <h1 v-if="mode == 'loginAccount'">Connexion</h1>
        <h1 v-else>Inscription</h1>
      </div>
      <form class="formSignup" id="formSignup">
        <div class="formControl">
          <p class="switchLogin" v-if="mode == 'loginAccount'">
            Si vous n'avez pas encore de compte ?
            <span @click="switchToCreateAccount()">Creer un compte</span>
          </p>
          <p class="switchLogin" v-else>
            Vous avez déjà un compte ?
            <span @click="switchToLoginAccount()">Se connecter </span>
          </p>

          <div class="createAccountField" v-if="mode == 'createAccount'">
            <input
              v-model="nom"
              type="text"
              placeholder="Nom"
              id="firstname"
              name="firstname"
              aria-required="true"
              required
            /><br />
            <input
              v-model="prenom"
              type="text"
              placeholder="Prénom"
              id="lastname"
              name="lastname"
              aria-required="true"
              required
            /><br />
          </div>
          <div class="loginAccountField">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              aria-required="true"
              aria-label="email"
              required
            /><br />
            <input
              v-model="mdp"
              type="password"
              placeholder="Mot de passe"
              id="password"
              name="password"
              aria-required="true"
              aria-label="mot de passe"
              required
            />
          </div>

          <p
            class="errorLogin"
            v-if="mode == 'loginAccount' && status == 'error_login'"
          >
            Echec de la connection; Email et/ou mot de passe non valide
          </p>

          <p
            class="errorLogin"
            v-if="mode == 'createAccount' && status == 'error_create'"
          >
            Identifiants de connexion non valide ou adresse mail déjà utilisée
          </p>
          <p id="errorRegxMdp"></p>

          <button
            @click="btnLoginAccount()"
            v-if="mode == 'loginAccount'"
            id="confirmForm"
            class="confirmForm"
            type="button"
            name="confirmForm"
          >
            <span class="btnLoading" v-if="status == 'loading'"
              >Connexion en cours...</span
            >
            <span class="btnValidated" v-else>Se connecter</span>
          </button>
          <button
            @click="btnCreateAccount()"
            v-else
            id="confirmForm"
            class="confirmForm"
            type="button"
            name="confirmForm"
          >
            <span class="btnLoading" v-if="status == 'loading'"
              >Création en cours...</span
            >
            <span class="btnValidated" v-else>Creer mon compte</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "HomeView",
  data: () => {
    return {
      mode: "loginAccount",
      nom: "",
      prenom: "",
      email: "",
      mdp: "",
    };
  },
  components: {},
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "createAccount";
    },
    switchToLoginAccount: function () {
      this.mode = "loginAccount";
    },
    btnLoginAccount: function () {
      let self = this;
      this.$store
        .dispatch("btnLoginAccount", {
          //recuperer les parametres: email et password de la bd et les relier au data du frontend
          email: this.email,
          password: this.mdp,
        })
        .then(function () {
          self.$router.push("/Posts");
        }),
        function (error) {
          console.log(error);
        };
    },
    btnCreateAccount: function () {
      document.getElementById("password").classList.remove("inputError");
      const errorMdp = document.getElementById("errorRegxMdp");
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#^&*]/, //caracteres speciaux acceptés
      ];
      errorMdp.innerHTML = "";
      if (regexs.some((regex) => !regex.test(this.mdp))) {
        document.getElementById("password").classList.add("inputError");
        errorMdp.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une majuscule, un chiffre et un symbole";
        return;
      }
      let self = this;
      this.$store
        .dispatch("btnCreateAccount", {
          firstname: this.nom,
          lastname: this.prenom,
          email: this.email,
          password: this.mdp,
        })
        .then(function () {
          self.btnLoginAccount();
        }),
        function (error) {
          console.log(error);
        };
    },
  },
};
</script>

<style scoped lang="scss">
.registerBloc {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
}
.mainTitle {
  color: white;
  width: 100%;
  font-size: 3em;
  margin: 50px 0;
}
.createAccount {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#formTitre {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 40px;
  width: auto;
}
#formTitre h1 {
  margin: 0;
}

.formSignup {
  padding: 20px 40px;
  width: auto;
}
.formControl {
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
.switchLogin {
  font-size: 12px;
  text-align: center;
}
span {
  color: blue;
  text-decoration-line: underline;
  cursor: pointer;
}
.createAccountField,
.loginAccountField {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
#email,
#password,
#firstname,
#lastname {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: auto;
}

.btnLoading,
.btnValidated {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-family: inherit;
}
.errorLogin {
  font-size: 14px;
  color: red;
  //margin-top: 0;
}
#errorRegxMdp {
  color: rgb(51, 103, 214);
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.confirmForm {
  background-color: rgb(51, 103, 214);
  border: 2px solid rgb(51, 103, 214);
  color: white;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
@media screen and (min-width: 375px) and (max-width: 720px) {
  .registerBloc {
    width: auto;
    padding-top: 0px;
    height: auto;
  }
  .registerLogo {
    width: 80px;
    top: 15px;
  }
  .homeLogo {
    border-radius: 50%;
  }
  .createAccount {
    top: 100px;
  }
  #formTitre {
    padding-left: 10px;
    padding-right: 10px;
  }
  h1 {
    margin: 0;
  }
  .formSignup {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
