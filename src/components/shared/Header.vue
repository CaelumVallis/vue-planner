<template>
  <nav class="navbar navbar-light px-5">
    <h3>Hello, {{this.$store.getters.currentUser.username}}</h3>
    <button
      @click="$emit('authBtnClick')"
      type="button"
      class="btn btn-outline-primary"
    >{{authBtnTitle}}</button>
  </nav>
</template>

<script>
  export default {
    name: "Header",
    props: ['authBtnTitle']
  }
</script>