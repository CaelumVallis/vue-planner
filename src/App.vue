<template>
  <div id="app">
    <Header @authBtnClick="authModalOpen = true"/>
    <div class="main-container container-fluid">
      <div class="row">
        <div class="col"></div>
        <div class="col-6">
          <Tasks />
        </div>
        <div class="col"></div>
      </div>
      <LoginModal
        v-if="authModalOpen"
        @close="authModalOpen = false"
      />
    </div>
  </div>
</template>

<script>
  import Tasks from '@/components/tasks/Tasks';
  import Header from "@/components/shared/Header";
  import LoginModal from "@/components/modals/LoginModal";

  export default {
    name: 'App',
    components: {
      LoginModal,
      Header,
      Tasks,
    },
    data() {
      return {
        authModalOpen: false
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
