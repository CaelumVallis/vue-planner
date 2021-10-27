<template>
  <div class="backdrop d-flex justify-content-center align-items-center">
    <div
      class="show card p-3 w-50">
      <div class="dialog-header d-flex justify-content-between mb-3">
        <h4>Login / register</h4>
        <button
          @click="$emit('close')"
          type="button" class="btn-close"></button>
      </div>

      <div class="dialog-body container-fluid px-0">
        <form
          id="modalForm"
          @submit.prevent="submit"
        >
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
          @click="$emit('close')"
          type="button"
          form="modalForm"
          class="btn btn-secondary mx-2"
        >Close</button>
        <button
          type="submit"
          form="modalForm"
          class="btn btn-primary"
        >Login / register</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginModal",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    created() {
      document.querySelector('body').classList.add('modal-open');
    },
    methods: {
      async submit() {
        try {
          await this.$store.dispatch('login', {email: this.email, password: this.password})
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