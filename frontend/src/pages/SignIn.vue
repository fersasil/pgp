<template>
  <div class="container">
    <!-- Para teste apenas -->
    <!-- <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="(error, i) in errors" v-bind:key="i" >{{ error }}</li>
      </ul>
    </p>-->

    <div class="row">
      <div class="col-md-12">
        <div class="register d-flex justify-content-center">
          <div class="body-form">
            <form @submit="checkForm">
              <p class="text-center paragraph-white">Entrar</p>
              <!--Email-->
              <div class="form-group">
                <label class="text" for="input-email label-required">Email ou Nome de usuário</label>
                <input v-model="identifier" type="text" class="form-control-lg" />
              </div>

              <!-- Senha -->
              <div class="form-group">
                <label for="input-senha label-required">Senha</label>
                <input v-model="password" type="password" class="form-control-lg" />
              </div>

              <!--Botão Entrar-->
              <div class="form-group">
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
      errors: [],
      identifier: '',
      password: ''
    };
  },
  methods: {
    checkForm: async function(e) {
      // console.log(this.email);
      // console.log(this.name);
      e.preventDefault();

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
      }

      const userData = res.data;

      if(userData.isloggedIn === false){
        console.log('erro');
        //TODO: visual
        return;
      }

      console.log(userData);

      this.$store.dispatch('login', userData);
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
    padding: 18px;
    /* border-radius: 1rem; */
    width: 500px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 400px) {
  .body-img {
    background-color: #343a40;
    background-image: url("https://i.imgur.com/M3ioWqh.jpg");
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
}
</style>