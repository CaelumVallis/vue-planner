<template>
  <div
    class="card container planner-item mb-2">
    <div class="card-body row align-items-center justify-content-between">
      <div class="col-2 image-plug"></div>
      <div class="col-6 d-flex">
        <h4>{{task.title}}</h4>
      </div>
      <div class="col-4 d-flex justify-content-end px-0">
        <div
          v-if="this.task.taskType === this.constants.taskType.pointsOfTotal"
          class="d-flex align-items-baseline justify-content-end"
        >
          <input
            v-model="currentPoints"
            type="number"
            class="rounded form-control w-auto"
          >
          <span class="mx-1">/ {{task.totalPoints}}</span>
          <span class="point-value text-primary">{{task.pointValue}}x multiplication</span>
        </div>
        <div v-if="this.task.taskType === this.constants.taskType.completed">
          <input
            @change="$emit('editTask', task)"
            :checked="task.completed"
            type="checkbox"
            class="form-check-input mx-1"
          >
          <span class="point-value text-primary">{{task.pointValue}}x multiplication</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { modalConstants } from "../../assets/constants";

  export default {
    props: { task: Object },
    data() {
      return {
        currentPoints: 0,
      }
    },
    created() {
      this.constants = modalConstants;
      this.currentPoints = this.task.currentPoints || 0;
    },
    watch: {
      currentPoints() {
        this.$store.commit('editTask', {...this.task, currentPoints: this.currentPoints});
      }
    }
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

  input[type=number] {
    max-width: 20%;
  }

  .point-value {
    font-size: 0.7em;
  }
</style>
