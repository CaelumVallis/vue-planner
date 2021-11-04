<template>
  <div id="app">
    <Header
      :authBtnTitle="authBtnTitle"
      @authBtnClick="authHandler"
    />
    <div class="main-container container-fluid py-3">
      <div class="row">
        <h2 class="text-center">Vue Planner</h2>
      </div>
      <div class="row">
        <div class="col-3">
          <WeatherWidget />
        </div>
        <div class="col-5">
          <Tasks v-if="userUid" />
        </div>
        <div class="col-4">
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
  import userProfile from '@/components/userProfile/UserProfile';
  import WeatherWidget from '@/components/weather-widget/WeatherWidget'

  export default {
    name: 'App',
    props: ['user'],
    components: {
      AuthModal,
      Header,
      Tasks,
      userProfile,
      WeatherWidget
    },
    data() {
      return {
        authModalOpen: false,
      }
    },
    created() {
      const { uid, email } = this.user._delegate;
      this.$store.dispatch('setToState', { uid, email });
    },
    computed: {
      authBtnTitle() {
        return this.userUid ? 'Log out' : 'Login';
      },
      userUid() {
        return this.$store.getters.currentUser.uid
      }
    },
    watch: {
      $route(to) {
        if (to.path === '/login' || to.path === '/register') {
          this.toggleAuthModal(true);
        }
      },

    },
    methods: {
      authHandler() {
        if(this.userUid) {
          this.$store.dispatch('logout');
        } else {
          this.navigateTo('/login');
        }
      },
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
