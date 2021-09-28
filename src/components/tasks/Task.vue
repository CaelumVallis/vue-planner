<template>
  <div class="card container planner-item mb-2">
    <div class="card-body row align-items-center">
      <div class="col-2 image-plug"></div>
      <div class="col-6 d-flex">
        <h4>{{task.title}}</h4>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <p
          v-if="this.task.taskType === this.constants.taskType.pointsOfTotal"
          class="m-0"
        >
          1 / {{task.totalPoints}}
        </p>
        <input
          v-if="this.task.taskType === this.constants.taskType.completed"
          @change="$emit('editTask', task)"
          type="checkbox"
        >
      </div>
    </div>
  </div>
</template>

<script>
  import { modalConstants } from "../../assets/constants";

  export default {
    props: ['task'],
    created() {
      this.constants = modalConstants;
      console.log(this.task);
    },
  }
</script>

<style scoped>
  .planner-item {
    max-height: 15vh;
  }

  .image-plug {
    width: 100px;
    height: 100%;
    background-color: gray;
  }
</style>
