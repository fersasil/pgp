<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="register d-flex justify-content-center">
          <div class="body-form">
            <form @submit="checkForm">
              <p class="text-center paragraph-white">Entrar</p>

              <!--Email-->
              <div class="form-group form-padding">
                <label v-if="errors.identifier.length === 0" class="text" for="input-email label-required">Email ou Nome de usuário</label>
                <label v-else class="p-login-error" for="input-email label-required">{{messageIdentifier}}</label>
                <input :class="errors.identifier" class="form-control-lg" v-model="identifier" type="text"  />
              </div>

              <!-- Senha -->
              <div class="form-group form-padding">
                <label v-if="errors.password.length === 0" for="input-senha label-required">Senha</label>
                <label v-else class="p-login-error" for="input-email label-required">{{messagePassword}}</label>                
                <input :class="errors.password" v-model="password" type="password" class="form-control-lg" />

              </div>

              <!--Botão Entrar-->
              <div class="form-group form-padding pat-3">
                <button
                  type="submit"
                  name="btn-entrar"
                  class="btn bg-primary btn-block btn-lg"
                >Entrar</button>
              </div>

              <!-- Texto você já possui conta e link -->
              <p class="blue-text">
                <router-link :to="{name: 'signup'}">Ainda não possui uma conta?</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "../axios/authAxios";

export default {
  data() {
    return {
      errors: {identifier: "", password: "", message: {identifier: "", password: ""}},
      identifier: "",
      password: "",
    };
  },
  computed: {
    messageIdentifier (){
      return this.errors.message.identifier;
    },
    messagePassword(){
      return this.errors.message.password;
    }
  },
  methods: {
    checkForm: async function(e) {
      e.preventDefault();

      //Checar os inputs antes de mandar para o backend
      let isEmpty = this.verifyEmpty("identifier");
      isEmpty += this.verifyEmpty("password");

      if(isEmpty) return;

      const authData = {
        identifier: this.identifier,
        password: this.password
      };

      let res;

      try{
        res = await axios.post("sign-in", authData);
      }
      catch(err){
        // console.log(err);
      };

      const userData = res.data;

      if(!this.checkErrorsInResponse(userData)) return;

      this.$store.dispatch('login', userData);
    },

    verifyEmpty(name) {
      if (this[name] === "") {
        this.errors[name] = "login-error-input";
        
        let fieldName;

        if(name === "identifier") fieldName = "Usuário";
        else if(name === "password") fieldName = "Senha"

        this.errors.message[name] = `${fieldName} - Campo em branco!`;
        return true;
      } else if (this[name] !== "") {
        this.errors[name] = "";
      }

      return false;
    },

    checkErrorsInResponse(userData){
      if(userData.loggedIn === false){
        if(userData.error == 1 && this.errors.identifier.length === 0){ //email errado
          this.errors.identifier = "login-error-input";
          this.errors.message.identifier = "Usuário não encontrado no sistema";

          //caso haja algum outro erro, o retirar.
          this.errors.password = "";

          //limpar a senha
          this.password = "";
        }

        else if(userData.error == 2 && this.errors.password.length === 0){ //senha errada
          this.errors.password = "login-error-input";
          this.errors.message.password = "Senha incorreta";
          this.errors.identifier = "";
        }
        
        return false;
      }

      return true;
    }
  },
  mounted() {
    document.body.classList.add("body-img");
  },
  destroyed() {
    document.body.classList.remove("body-img");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Mansalva&display=swap");

.p-login-error {
  color: #882828;
}

.login-error-input{
  border-color: #882828 !important;
  color: #882828 !important;
}

.register {
  width: 100%;
  height: 100%;
  margin-top: 70px;
}

.label-required::after {
  content: "*";
  color: red;
}
.label-required {
  width: 100%;
}
.align-center {
  display: flex;
  justify-content: center;
}
.btn-form {
  margin-top: 15px;
  width: 100%;
}
.button-submit {
  width: 82%;
  color: #fff;
  background-color: green;
  border-color: transparent;
  border-radius: 0.25rem;
}
.header-main {
  background-color: #343a40;
}
.bg-primary {
  color: #fff;
  cursor: pointer;
}
.paragraph-white {
  color: #dcddde;
  font-size: 25px;
  font-family: "Be Vietnam", cursive;
}
label {
  color: #8e9297;
}
.blue-text {
  color: #007bff;
  text-align: center;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  background-color: #d1d1d1;
  font-size: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  color: #e9e9e9;
  background-color: #343a40;
  border: 1px solid #212327;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  outline: none; /* Remove default outline and use border or box-shadow */
  border: none;
  background-color: #343a40;
  color: #e9e9e9;
  box-shadow: 0 0 0 2px gray; /* Full freedom. (works also with border-radius) */
}

/* Custom, iPhone Retina */

/* Extra Small Devices, Phones */
@media only screen and (max-width: 400px) {
  .body-img {
    background-color: #2d2f34 !important;
    background-image: none;
  }

  .body-form {
    font-family: "Be Vietnam", sans-serif;
    /* padding: 18px; */
    /* border-radius: 1rem; */
    width: 500px;
  }

  .form-padding {
    padding-bottom: 20px;
    margin: 0px;
  }

  .pat-3 {
    padding-top: 20px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 400px) {
  .body-img {
    background-color: #343a40;
    /* background-image: url("https://i.imgur.com/M3ioWqh.jpg") !important; */
    background-image: url('~@/assets/img/login/background.jpg');
    /* background-image: url("/assets/img/background.jpg"); */
  }

  .body-form {
    font-family: "Be Vietnam", sans-serif;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #343a40;
    padding: 18px;
    /* border-radius: 1rem; */
    width: 500px;
    height: 380px;
  }

  .form-padding {
    padding: 5px 15px;
  }
}
</style>