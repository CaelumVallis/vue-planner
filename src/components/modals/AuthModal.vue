<template>
  <div class="backdrop d-flex justify-content-center align-items-center">
    <div
      class="show card p-3 w-50">
      <div class="dialog-header d-flex justify-content-between mb-3">
        <h4>{{$route.name}}</h4>
        <button
          @click="$emit('close')"
          type="button" class="btn-close"></button>
      </div>

      <div class="dialog-body container-fluid px-0">
        <form
          id="modalForm"
          @submit.prevent="submit"
        >
          <div
            v-if="$route.name === 'Register'"
            class="form-group mb-2">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Enter username"
            >
          </div>
          <div class="form-group mb-2">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Enter email"
              >
          </div>
          <div class="form-group mb-2">
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
              >
          </div>
        </form>
      </div>

      <div class="dialog-footer d-flex justify-content-end">
        <button
          v-if="$route.name === 'Login'"
          @click="$emit('registerBtnClick')"
          type="button"
          form="modalForm"
          class="btn btn-outline-secondary mx-2"
        >Don't have an account?</button>
        <button
          type="submit"
          form="modalForm"
          class="btn btn-primary"
        >{{$route.name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AuthModal",
    data() {
      return {
        email: '',
        password: '',
        username: ''
      }
    },
    created() {
      document.querySelector('body').classList.add('modal-open');
    },
    methods: {
      async submit() {
        const authData = {email: this.email, password: this.password};
        try {
          if (this.$route.path === '/login') {
            await this.$store.dispatch('login', authData);
          } else if(this.$route.path === '/register') {
            await this.$store.dispatch('register', {...authData, username: this.username});
          }
          this.$emit('close');
          await this.$router.push('/');
        } catch(e) {}
      }
    }
  }
</script>

<style scoped>
  .backdrop {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>