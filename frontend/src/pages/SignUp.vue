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
        <div class="margin-top d-flex justify-content-center">
          <div class="body-form">
            <form @submit="checkForm">
              <p class="text-center paragraph-white">Criar uma conta</p>
              <!--Email-->
              <div :class="classes.email" class="form-group form-padding">
                <label class="text" for="input-email label-required">Email</label>
                <p class="p-error" v-if="errors.email">{{errors.email}}</p>
                <input
                  @blur="emailIsUsable"
                  v-model="email"
                  type="text"
                  class="form-control-lg normal-input"
                />
              </div>
              <!--CPF-->
              <div :class="classes.cpf" class="form-group form-padding">
                <label for="input-name label-required">CPF</label>
                <p class="p-error" v-if="errors.cpf">{{errors.cpf}}</p>
                <input
                  @blur="cpfIsUsable"
                  v-model="cpf"
                  v-mask="'###.###.###-##'"
                  type="text"
                  class="normal-input form-control-lg"
                />
              </div>
              <!-- Senha -->
              <div :class="classes.password" class="form-group form-padding">
                <div>
                  <label for="input-senha label-required">Senha</label>
                  <p class="p-error" v-if="errors.password">{{errors.password}}</p>
                </div>

                <input v-model="password" type="password" class="normal-input form-control-lg" />
              </div>

              <div :class="classes.confirmPassword" class="form-group form-padding">
                <div>
                  <label for="input-senha label-required">Confirme sua senha</label>
                  <p class="p-error" v-if="errors.confirmPassword">{{errors.confirmPassword}}</p>
                </div>
                <input
                  @blur="passwordIsEqual"
                  v-model="confirmPassword"
                  type="password"
                  class="normal-input form-control-lg"
                />
              </div>

              <!--Botão Entrar-->
              <div class="form-group form-padding">
                <button
                  type="submit"
                  name="btn-entrar"
                  class="btn bg-primary btn-block btn-lg"
                >Entrar</button>
              </div>

              <!-- Texto você já possui conta e link -->
              <p class="blue-text">
                <router-link :to="{name: 'signin'}">Ja possui uma conta ?</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import axios from "../axios/authAxios";

export default {
  data() {
    return {
      errors: { cpf: "", email: "", password: "", confirmPassword: "" },
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
      classes: {
        email: "",
        password: [],
        confirmPassword: "",
        password: [],
        cpf: ""
      }
    };
  },
  methods: {
    emailIsUsable() {
      if (!this.validateEmail()) return;
      //TODO verificar se o email esta disponível no sistema antes!

      //MOVE this to function above ?
      this.classes.email = "success-input";
    },

    passwordIsEqual(){
      if(this.password === this.confirmPassword){
        this.classes.confirmPassword = "success-input";
        
        this.errors.confirmPassword = "";
        return;
      }

      this.classes.confirmPassword = "error";
      this.errors.confirmPassword = "Senhas diferentes";

    },

    cpfIsUsable() {
     
      if(this.cpf === ""){
        this.classes.cpf = "";
        this.errors.cpf = "";

        return;
      }

      if (!this.validateCpf()){
        this.classes.cpf = "error";
        this.errors.cpf = "CPF inválido";
        return;
      }

      this.classes.cpf = "";
      this.errors.cpf = "";

      this.classes.cpf = "success-input";
    },

    validateCpf(){
      //TODO: Algoritmo não muito bom, essas entradas passam! ps: mudar padrão para ingles 222222222, 3333333... 
      const strCPF = this.cpf.replace(/\D/g, "");
      
      let Soma, Resto, i;
      
      Soma = 0;
      if (strCPF == "00000000000") return false;

      if (strCPF == "11111111111") return false;


      for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
    },

    // validateCpf() {
    //   console.log("oi");
      
    //   console.log(strCPF);

      
    // },

    checkForm: async function(e) {
      e.preventDefault();

      let isBlank = false;
      isBlank += this.verifyEmpty("email");
      isBlank += this.verifyEmpty("cpf");
      isBlank += this.verifyEmpty("password");
      isBlank += this.verifyEmpty("confirmPassword");

      this.validateEmail();

      this.validateCpf();
      this.securePassword();
      this.equalPassword();

      // Mandar para o backend

      const data = {
        cpf: this.cpf,
        email: this.email,
        password: this.password
      };

      let res;

      try {
        res = await axios.post("sign-up", data);
      } catch (err) {
        console.log(err);
      }

      const userData = res.data;

      if (userData.status == -1) {
        console.log("erro");
        //error: "User already signedUp"
        //TODO: visual
        return;
      }

      console.log(userData);

      this.$store.dispatch("login", userData);
    },

    securePassword() {
      //TODO
    },
    // validateCpf() {
    //   //TODO
    // },
    equalPassword() {
      //TODO
    },
    validateEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(this.email.toLowerCase())) {
        this.classes.email = "error";
        this.errors.email = "Por favor, digite um email valido";
        return false;
      } else if (
        this.classes.email.length > 0 &&
        this.errors.email === "Por favor, digite um email valido"
      ) {
        this.classes.email = "";
        this.errors.email = false;

        return true;
      }

      // return re.test(email.toLowerCase());
    },
    verifyEmpty(name) {
      if (this[name] === "" && this.classes[name].length === 0) {
        this.classes[name].push("error");
        this.errors[name] = "Por favor, prencha esse campo";
        return true;
      } else if (this[name] !== "") {
        this.classes[name].pop();
        this.errors[name] = false;
      }

      return false;
    }
  },
  mounted() {
    document.body.classList.add("body-img");
  },
  destroyed() {
    document.body.classList.remove("body-img");
  },
  directives: { mask }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam|Mansalva&display=swap");

.p-error {
  color: #ca2525;
  margin: 0px;
  padding: 0px;
  font-size: 13px;
  float: right;
}

.success-input input {
  margin: 0 auto;
  outline: none; /* Remove default outline and use border or box-shadow */
  border: none !important;
  outline: none;
  box-shadow: 0 0 0 2px #0d5d0d;
  color: #351e1e;
}

.margin-top {
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
  width: 100%;
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
  display: block;
}

.normal-input:focus,
.normal-input:focus,
.normal-input:focus {
  margin: 0 auto;
  outline: none; /* Remove default outline and use border or box-shadow */
  border: none;
  background-color: #343a40;
  color: #e9e9e9;
  box-shadow: 0 0 0 2px gray; /* Full freedom. (works also with border-radius) */
}

.error input {
  margin: 0 auto;
  outline: none; /* Remove default outline and use border or box-shadow */
  border: none !important;
  outline: none;
  box-shadow: 0 0 0 2px #633333;
  color: #351e1e;
}

.error input[type="text"]:focus,
.error input[type="password"]:focus,
.error input[type="text"]:focus {
  margin: 0 auto !important;
  outline: none !important; /* Remove default outline and use border or box-shadow */
  border: none !important;
  background-color: #343a40 !important;
  color: #e9e9e9 !important;
  box-shadow: 0 0 0 2px rgb(148, 34, 34) !important;
}

/* Custom, iPhone Retina */

/* Extra Small Devices, Phones */
@media only screen and (max-width: 400px) {
  .body-img {
    background-color: #2d2f34 !important;
    background-image: none;
  }

  .body-form {
    font-family: " !importantBe Vietnam", sans-serif;
    padding: 5px;
    /* border-radius: 1rem; */
    width: 500px;
  }

  .form-padding {
    padding: 0px;
    margin: 0px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 400px) {
  .body-img {
    background-color: #343a40;
    /* background-image: url("https://i.imgur.com/M3ioWqh.jpg") !important; */
    background-image: url("~@/assets/img/login/background.jpg");
  }

  .form-padding {
    padding: 5px 15px;
  }

  .body-form {
    font-family: "Be Vietnam", sans-serif;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #343a40;
    padding: 18px;
    padding-bottom: 0px;
    /* border-radius: 1rem; */
    width: 500px;
    height: 580px;
  }
}
</style>