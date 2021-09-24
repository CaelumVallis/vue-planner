<template>
  <div id="app">
    <div class="main-container container">
      <div class="row">
        <h2 class="text-center">Vue Planner</h2>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <Tasks />
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tasks from '@/components/tasks/Tasks';

  export default {
    name: 'App',
    components: {
      Tasks,
    },
  }
</script>

<style>
  .main-container {
    background-color: red;
  }
</style>
