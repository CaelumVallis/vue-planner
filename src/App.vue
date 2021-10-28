<template>
  <div id="app">
    <Header @authBtnClick="navigateTo('/login')"/>
    <div class="main-container container-fluid">
      <div class="row">
        <div class="col"></div>
        <div class="col-6">
          <Tasks />
        </div>
        <div class="col-3">
          <userProfile />
        </div>
      </div>
      <AuthModal
        v-if="authModalOpen"
        @close="toggleAuthModal(false); navigateTo('/')"
        @registerBtnClick="navigateTo('/register')"
      />
    </div>
  </div>
</template>

<script>
  import Tasks from '@/components/tasks/Tasks';
  import Header from "@/components/shared/Header";
  import AuthModal from "./components/modals/AuthModal";
  import userProfile from '@/components/userProfile/userProfile';

  export default {
    name: 'App',
    components: {
      AuthModal,
      Header,
      Tasks,
      userProfile
    },
    data() {
      return {
        authModalOpen: false
      }
    },
    watch: {
      $route(to) {
        if (to.path === '/login' || to.path === '/register') {
          this.toggleAuthModal(true);
        }
      }
    },
    methods: {
      navigateTo(path) {
        if(this.$route.path !== path) {
          this.$router.push(path);
        }
      },
      toggleAuthModal(open) {
        this.authModalOpen = open;
      }
    }
  }
</script>

<style scoped>
  .main-container {
    background-color: #bebebe;
    min-height: 100vh;
  }
</style>
