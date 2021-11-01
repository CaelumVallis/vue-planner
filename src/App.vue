<template>
  <div id="app">
    <div class="main-container container-fluid">
      <div class="row">
        <h2 class="text-center">Vue Planner</h2>
      </div>
      <div class="row">
        <div class="col-3">
          <WeatherWidget />
        </div>
        <div class="col-6">
          <Tasks />
        </div>
        <div class="col-3">
          <userProfile />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tasks from '@/components/tasks/Tasks';
  import userProfile from '@/components/userProfile/userProfile';
  import WeatherWidget from '@/components/weather-widget/WeatherWidget'

  export default {
    name: 'App',
    components: {
      Tasks,
      userProfile,
      WeatherWidget
    },
  }
</script>

<style scoped>
  .main-container {
    background-color: #bebebe;
    min-height: 100vh;
  }
</style>
