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
                      <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{{user.name}}</h4>
                      <p class="mb-0">@{{user.nickname}}</p>
                      <p class="mb-0">{{user.cpfUser}}</p>
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
                    <a href="#" @click="showSettings = 'one'" :class="activeOne" class="nav-link">QRcode</a>
                  </li>
                  <li class="nav-item custom-margin">
                    <a href="#" @click="showSettings = 'two' " :class="activeTwo" class="nav-link">QRcode</a>
                  </li>
                  <li class="nav-item custom-margin">
                    <a href="#" @click="showSettings = 'three' " :class="activeThree" class="nav-link">Dados</a>
                  </li>
                </ul>
                <div v-if="showSettings == 'three'" class="tab-content pt-3">
                  <div class="tab-pane active">
                    <form class="form" novalidate>
                      <div class="row">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label>Full Name</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  name="nameUser"
                                  placeholder="User Testholder"
                                  value="User Testholder"
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
                                  name="nicknameUser"
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
                                  type="text"
                                  name="emailUser"
                                  placeholder="user@example.com"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                <label>Birthday</label>
                                <input class="form-control" type="date" name="birthdayUser" />
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
                                  name="nameUser"
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
                                  name="ocupationUser"
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
                                  name="phonenumberUser"
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
                                  name="civilstatusUser"
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
                                  name="currentUserPassword"
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
                                  name="passwordUser"
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
                                  name="confirmPasswordUser"
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
                <div v-else-if="showSettings == 'one'">
                  <img :src="urlQRcode" alt />
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


export default {
  data(){
    return {
      showSettings: "one",
      urlQRcode: "https://via.placeholder.com/150",
      user: {
        cpfUser: ""
      }
    };
  },
  methods:{
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
    }
  },
  async created(){

    const userStore = this.$store.getters.user;

    //Mask cpf
    const cpf = userStore.cpfUser;
    this.user.cpfUser = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);

    if(userStore.name == null) this.user.name = "Preencha seu nome";
    console.log

    this.urlQRcode = `http://localhost:3000/static/usersQrCode/${userStore.idUser}.png?token=${userStore.token}`;
  }
};
</script>
<style scoped>
  .custom-margin{
    margin-right: 5px;
    /* margin-bottom: 5px;  */
  }
</style>