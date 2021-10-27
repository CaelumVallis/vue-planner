<template>
  <nav class="navbar navbar-light px-5">
    <h3>Vue-planner</h3>
    <button
      @click="$emit('authBtnClick')"
      type="button"
      class="btn btn-outline-primary"
    >Login</button>
  </nav>
</template>

<script>
  export default {
    name: "Header"
  }
</script>