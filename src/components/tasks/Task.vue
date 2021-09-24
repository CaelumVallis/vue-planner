<template>
  <div class="card container planner-item mb-2">
    <div class="card-body row align-items-center">
      <div class="col-6 d-flex align-items-center">
        <div class="img-container mx-2">
          <img src="https://picsum.photos/200" alt="">
        </div>
        <h4>React.js learning</h4>
      </div>
      <div class="col-6">
        <h4>Topics studied:</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['todo'],
    mounted() {
      console.log(this.todo);
    }
  }
</script>

<style>
  .planner-item {
    max-height: 15vh;
  }

  img {
    height: 50px;
  }
</style>
