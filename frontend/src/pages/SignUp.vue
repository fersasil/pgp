<template>

        <div id="teste" class="container">
            <!-- Para teste apenas -->
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="(i, error) in errors" v-bind:key="i" >{{ error }}</li>
                </ul>
            </p>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="register d-flex justify-content-center">
                        <div class="body-form">
                            <form @submit="checkForm">
                                <p class="text-center paragraph-white">Criar uma conta</p>
                                <div class="form-group">
                                </div>
                                <!--Email-->
                                <div class="form-group">
                                    <label class="text" for="input-email label-required">Email</label>
                                    <input v-model="email" type="text" email="input-email" class="form-control-lg">
                                </div>
                                <!--Senha-->
                                <div class="form-group">
                                    <label for="input-name label-required">Nome de Usuário</label>
                                    <input v-model ="name" type="text" name="input-senha" class="form-control-lg">
                                </div>
                                <div class="form-group">
                                    <label for="input-senha label-required">Senha</label>
                                    <input v-model ="senha" type="password" senha="input-senha" class="form-control-lg">
                                </div>
                                <!--Botão Entrar-->
                                <div class="form-group">
                                    <button type="submit" name="btn-entrar" class="btn bg-primary btn-block btn-lg">Entrar</button>
                                </div>

                                <!-- Texto você já possui conta e link -->
                                <p class="blue-text"><a>
                                    <router-link :to="{name: 'dashboard'}">Ja possui uma conta ?</router-link>
                                </a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
                errors: [],
                name: null,
                email: null,
                senha: null
            }
    },
    methods: {
        checkForm: function (e) {
            // console.log(this.email);
            // console.log(this.name);
            e.preventDefault();

            this.errors = [];
            
            if (!this.email){
                this.errors.push("email required.");
            } 

            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(this.email)) {
                this.errors.push("Valid email required.");
            }

            if (!this.errors.length){
                return true;
            }
            
        }
    },
    mounted(){
        document.body.classList.add('body-img');
    },
    destroyed(){
        document.body.classList.remove('body-img');
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Be+Vietnam|Mansalva&display=swap');

    .register{
        width: 100%;
        height: 100%;
        margin-top:70px;
    
    }
    
    .label-required::after{
        content: "*";
        color: red;
    }
    .label-required{
        width: 100%;
    }
    .align-center{
        display: flex;
        justify-content: center;
    }
    .btn-form{
        margin-top: 15px;
        width: 100%;
    }
    .button-submit{
        width: 82%;
        color: #FFF;
        background-color: green;
        border-color: transparent;
        border-radius: .25rem;
    }
    .header-main{
        background-color: #343a40;
    }
    .bg-primary{
        color: #FFF;
        cursor: pointer;
    }
    .paragraph-white{
        color: #dcddde;
        font-size: 25px;
        font-family: 'Be Vietnam', cursive;
    }
    label{
        color: #8E9297;
    }
    .blue-text{
        color: #007bff;
        text-align: center;
    }

    input[type="text"], 
    input[type="email"],
    input[type="password"],
    textarea {
        background-color : #d1d1d1; 
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
    input[type=text]:focus{
        outline: none;      /* Remove default outline and use border or box-shadow */
        background-color: #343a40;
        color: #e9e9e9;
        box-shadow: 0 0 0 2px gray; /* Full freedom. (works also with border-radius) */
    }


    /* Custom, iPhone Retina */ 

/* Extra Small Devices, Phones */ 
@media only screen and (max-width : 400px) {
    .body-img{
        background-color: #2D2F34 !important;
        background-image: none;
    }

    .body-form{
        font-family: 'Be Vietnam', sans-serif;
        padding: 18px;
        /* border-radius: 1rem; */
        width: 500px;
    }
    
}

/* Medium Devices, Desktops */
@media only screen and (min-width : 400px) {
    .body-img{
        background-color: #343a40;
        background-image: url('https://i.imgur.com/M3ioWqh.jpg');
    }

    .body-form{
        font-family: 'Be Vietnam', sans-serif;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
        border-radius: 5px;
        background-color: #343a40;
        padding: 18px;
        /* border-radius: 1rem; */
        width: 500px;
    }
}

</style>