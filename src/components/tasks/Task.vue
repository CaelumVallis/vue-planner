<template>
  <div class="card container planner-item mb-2">
    <div class="card-body row align-items-center">
      <div class="col-6 d-flex align-items-center">
<!--        <div class="img-container mx-2">-->
<!--          <img src="https://picsum.photos/200" alt="">-->
<!--        </div>-->
        <h4>{{task.title}}</h4>
      </div>
<!--      <div class="col-6">-->
<!--        <h4>Topics studied:</h4>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  export default {
    props: ['task'],
    mounted() {
      console.log(this.task);
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
