<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/u/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/u/perfil" name="Perfil" icon="ti-user"/>
        <sidebar-link to="/table-list" name="Gerenciar eventos" icon="ti-view-list-alt"/>
        <sidebar-link to="/typography" name="Typography" icon="ti-text"/>
        <sidebar-link to="/icons" name="EVENTOS" icon="ti-direction-alt"/>
        <sidebar-link to="/maps" name="Map" icon="ti-map"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <drop-down class="nav-item"
                     title="Configurações"
                     title-classes="nav-link"
                     icon="ti-settings">

            <a class="dropdown-item" href="#">Perfil</a>
            <a class="dropdown-item" href="#">Meus eventos</a>
            <a class="dropdown-item" @click="logout" href="#">Sair</a>
          </drop-down>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout(){
      //alert("Você quer sair!")
      this.$store.dispatch('logout');
    }
  }
};
</script>
