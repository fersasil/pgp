<template>
  <div>
    <div class="col">
      <div class="row">
        <div style="padding:0px" class="col mb-3">
          <div class="card">
            <div class="card-body">
              <div class="e-profile">
                <div class="row">
                  <div class="col-12 col-sm-auto mb-3">
                    <div class="mx-auto" style="width: 140px;">
                      <div
                        class="d-flex justify-content-center align-items-center rounded"
                        style="height: 140px; background-color: rgb(233, 236, 239);"
                      >
                        <img width="140px" src="@/assets/img/tim_80x80.png" alt="Minha Figura" />
                      </div>
                    </div>
                  </div>
                  <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                    <div class="text-center text-sm-left mb-2 mb-sm-0">
                      <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{{name}}</h4>
                      <p class="mb-0">@{{user.nicknameUser}}</p>
                      <p class="mb-0">{{maskedCpf}}</p>
                      <div class="mt-2">
                        <button class="btn btn-primary" type="button">
                          <i class="fa fa-fw fa-camera"></i>
                          <span>Change Photo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ul class="nav nav-tabs">
                  <li class="nav-item custom-margin">
                    <a href="#/u/perfil" @click="showSettings = 'one'" :class="activeOne" class="nav-link">QRcode</a>
                  </li>
                  <li class="nav-item custom-margin">
                    <a href="#/u/perfil" @click="showSettings = 'three' " :class="activeThree" class="nav-link">Dados</a>
                  </li>
                </ul>
                <div v-if="showSettings == 'three'" class="tab-content pt-3">
                  <div v-if="userInfo === true">
                    <div class="tab-pane active">
                      <form @submit="updateInfo" class="form">
                        <div class="row">
                          <div class="col">
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Full Name</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="user.nameUser"
                                    placeholder="User Testholder"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Username</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    @blur="nicknameAvaliable"
                                    :class="validNickname"
                                    v-model="user.nicknameUser"
                                    placeholder="user.test"
                                    value="user.test"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Email</label>
                                  <input
                                    class="form-control"
                                    @blur="emailIsAvaliable"
                                    :class="validEmailClass"
                                    type="text"
                                    v-model="user.emailUser"
                                    placeholder="user@example.com"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Birthday</label>
                                  <input class="form-control" type="date" v-model="user.birthdayUser" />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Gender</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="user.genderUser"
                                    placeholder="Gender"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Ocupation</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="user.ocupationUser"
                                    placeholder="Lawyer"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Phone number</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="user.phonenumberUser"
                                    placeholder="+55 81 99754-3242"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Civil status</label>
                                  <select
                                    class="form-control"
                                    v-model="user.civilstatusUser"
                                    id="civil_status"
                                  >
                                    <option value>-Select your civil status-</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Divorced">Divorced</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 col-sm-6 mb-3">
                            <div class="mb-2">
                              <b>Change Password</b>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>Current Password</label>
                                  <input
                                    class="form-control"
                                    type="password"
                                    v-model="user.currentUserPassword"
                                    placeholder="••••••••"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>New Password</label>
                                  <input
                                    class="form-control"
                                    type="password"
                                    v-model="user.passwordUser"
                                    placeholder="••••••••"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <div class="form-group">
                                  <label>
                                    Confirm
                                    <span class="d-none d-xl-inline">Password</span>
                                  </label>
                                  <input
                                    class="form-control"
                                    type="password"
                                    v-model="user.confirmPasswordUser"
                                    placeholder="••••••••"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col d-flex justify-content-end">
                            <button class="btn btn-primary" type="submit">Save Changes</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div v-else>
                    <p>Loading...</p>
                  </div>
                </div>
                <div v-else-if="showSettings == 'one'">
                  <div class="qrcode">
                    <img :src="urlQRcode" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../axios/authAxios";
import { serverUrl } from "../store/constants";

export default {
  data(){
    return {
      showSettings: "one",
      nicknameValid: "",
      emailValid: "",
      urlQRcode: "https://via.placeholder.com/150",
      userInfo: false,
      name: "",
      maskedCpf: "",
      user: {
        cpfUser: "",
        birthdayUser: "",
        civilstatusUser: "",
        cpfUser: "",
        emailUser: "",
        genderUser: "",
        hasEvent: "",
        idUser: "",
        imageUser: "",
        nameUser: "",
        nicknameUser: "",
        ocupationUser: "",
        phonenumberUser: "", 
      },
      originalUserInfo: {
        cpfUser: "",
        birthdayUser: "",
        civilstatusUser: "",
        cpfUser: "",
        emailUser: "",
        genderUser: "",
        hasEvent: "",
        idUser: "",
        imageUser: "",
        nameUser: "",
        nicknameUser: "",
        ocupationUser: "",
        phonenumberUser: "", 
      },
    };
  },
  methods:{
    async getUserInfo(){
      let res;

      try{
        res = await axios.get('get-user-info', { params: {
          idUser: this.$store.getters.idUser
        }});

        if(res.status === 200 && res.data.status === 1) res = res.data.data;

      }
      catch (err){
        console.log("erro");
      }

      //BIND WITH USER INFO
      this.user.cpfUser = res.cpfUser ? res.cpfUser : "";
      this.user.birthdayUser = res.birthdayUser ? res.birthdayUser : "";
      this.user.civilstatusUser = res.civilstatusUser ? res.civilstatusUser : "";
      this.user.cpfUser = res.cpfUser ? res.cpfUser : "";
      this.user.emailUser = res.emailUser ? res.emailUser : "";
      this.user.genderUser = res.genderUser ? res.genderUser : "";
      this.user.hasEvent = res.hasEvent ? res.hasEvent : "";
      this.user.idUser = res.idUser ? res.idUser : "";
      this.user.imageUser = res.imageUser ? res.imageUser : "";
      this.user.nameUser = res.nameUser ? res.nameUser : "";
      this.user.nicknameUser = res.nicknameUser ? res.nicknameUser : "";
      this.user.ocupationUser = res.ocupationUser ? res.ocupationUser : "";
      this.user.phonenumberUser = res.phonenumberUser ? res.phonenumberUser : "";

      this.userInfo = true;

      //Manter dados originais
      this.originalUserInfo.cpfUser = res.cpfUser ? res.cpfUser : "";
      this.originalUserInfo.birthdayUser = res.birthdayUser ? res.birthdayUser : "";
      this.originalUserInfo.civilstatusUser = res.civilstatusUser ? res.civilstatusUser : "";
      this.originalUserInfo.cpfUser = res.cpfUser ? res.cpfUser : "";
      this.originalUserInfo.emailUser = res.emailUser ? res.emailUser : "";
      this.originalUserInfo.genderUser = res.genderUser ? res.genderUser : "";
      this.originalUserInfo.hasEvent = res.hasEvent ? res.hasEvent : "";
      this.originalUserInfo.idUser = res.idUser ? res.idUser : "";
      this.originalUserInfo.imageUser = res.imageUser ? res.imageUser : "";
      this.originalUserInfo.nameUser = res.nameUser ? res.nameUser : "";
      this.originalUserInfo.nicknameUser = res.nicknameUser ? res.nicknameUser : "";
      this.originalUserInfo.ocupationUser = res.ocupationUser ? res.ocupationUser : "";
      this.originalUserInfo.phonenumberUser = res.phonenumberUser ? res.phonenumberUser : "";

    },

    updateCurrentValuesAndOriginal(updatedFields){
      const allKeys = Object.keys(updatedFields);
      this.emailValid = "";
      this.nicknameValid = "";

      for(let key of allKeys){
        if(key === 'passwordUser' || key === 'confirmPasswordUser'){
          this.originalUserInfo[key] = "";
          continue;
        }
        
        this.user[key] = updatedFields[key];
        this.originalUserInfo[key] = updatedFields[key];

      }

    },
    async updateInfo(e){
      e.preventDefault();
  
      if(this.nicknameValid === false){
        alert("Nome de usuário ja cadastrado");
        return;
      }

      if(this.emailValid === false){
        alert("Email ja cadastrado");
        return;
      }

      //TODO validação de inputs
      if(deepEqual(this.user, this.originalUserInfo)){
        alert("Nada foi alterado");
        return;
      }
        
      //Encontrar o que foi alterado
      const findUpdatedFields = (updated, original) => {
        const allKeys = Object.keys(updated);
        const names = {};

        for(let key of allKeys){
          if(key === 'passwordUser' || key === 'confirmPasswordUser'){
            if(key !== "") names[key] = updated[key];
          }
          else if(updated[key] !== original[key]) names[key] = updated[key];  
        }

        return names;
      }

      const updatedFields = findUpdatedFields(this.user, this.originalUserInfo);

      try{
        const res = await axios.put("update-user", {
          idUser: this.$store.getters.idUser,
          data: updatedFields
        });

        if(res.data.status === 1){
          alert("Dados alterados!");
          //Alterar os dados
          this.updateCurrentValuesAndOriginal(updatedFields);
        }

        this.nicknameValid = "";

        const firstName = this.user.nameUser.split(" ");

        if(firstName.length > 1) this.name = firstName[0];

        //update nickname também

        //DISPATCH CHANGES TO STORE
        this.$store.dispatch("updateUser", updatedFields);

      } catch (err){
        console.log(err);
      }

    },
    async emailIsAvaliable() {
      if(this.user.emailUser === this.originalUserInfo.emailUser) {
        this.emailValid = "";
        return;
      }

      try{
        const res = await axios.get("email-is-avaliable", {
          params: { email: this.user.emailUser }
        });
          this.emailValid = !res.data.isInUse;
      }
      catch(err){
        console.log(err);
      }
    },

    async nicknameAvaliable(){
      if(this.user.nicknameUser === this.originalUserInfo.nicknameUser) {
        this.nicknameValid = "";
        return;
      }

      try{
        const res = await axios.get('avaliable-user-name', { params: {nicknameUser: this.user.nicknameUser}});
        if(res.data.status === 1) {
          this.nicknameValid = res.data.data.avaliable;
        }
      }
      catch(err){
        console.log(err);
      }
    }
  },
  computed:{
    activeOne(){
      if(this.showSettings == "one") return "active"
      else return ""
    },
    activeTwo(){
      if(this.showSettings == "two") return "active"
      else return ""
    },
    activeThree(){
      if(this.showSettings == "three") return "active"
      else return ""
    },
    validNickname(){
      if(this.user.nicknameUser === this.originalUserInfo.nicknameUser)
        return "";
      
      if(this.nicknameValid) return "input-avaliable";
      else if(this.nicknameValid === false) return "input-not-avaliable";
    },
    validEmailClass(){
      if(this.user.emailUser == this.originalUserInfo.emailUser)
        return "";
            
      if(this.emailValid) return "input-avaliable";
      else if(this.emailValid === false) return "input-not-avaliable";
    }
  },
  async created(){

    const userStore = this.$store.getters.user;

    //Mask cpf
    const cpf = userStore.cpfUser !== undefined ? userStore.cpfUser : "";

    this.maskedCpf = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);

    if(userStore.nameUser == null) this.name = "Preencha seu nome";
    else this.name = userStore.nameUser;

    try{
      await this.getUserInfo();
    }
    catch(err){ console.log(err)}

    this.urlQRcode = `${serverUrl}/static/usersQrCode/${userStore.idUser}.png?token=${userStore.token}`;
  }
};


function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}


</script>
<style scoped>
  .custom-margin{
    margin-right: 5px;
    /* margin-bottom: 5px;  */
  }

  .qrcode img {
    width: 100%;
    height: 100%;
  }

  .input-not-avaliable {
    border: solid 1px #f14a45 !important;
  }

  .input-avaliable {
    border: solid 1px #28a745 !important;
  }

  @media only screen and (min-width: 400px) {
    .qrcode{
      width: 310px;
      height: 310px;
    }
  }

  @media only screen and (max-width: 400px) {
    .qrcode{
      width: 230px;
      height: 230px;
}
  }
</style>