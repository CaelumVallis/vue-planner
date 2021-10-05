<template>
  <div
    class="card container planner-item mb-2">
    <div class="card-body row align-items-center justify-content-between">
      <div class="col-2 image-plug"></div>
      <div class="col-4 d-flex">
        <h4>{{task.title}}</h4>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center px-0">
        <div
          v-if="this.task.taskType === this.constants.taskType.pointsOfTotal"
          class="d-flex align-items-baseline justify-content-end"
        >
          <input
            v-model="currentPoints"
            type="number"
            class="rounded form-control p-0 w-100"
          >
          <span class="mx-1">/ {{task.totalPoints}} {{task.pointName}}</span>
        </div>
        <div v-if="this.task.taskType === this.constants.taskType.completed">
          <input
            @change="$emit('toggleTask', task)"
            :checked="task.completed"
            type="checkbox"
            class="form-check-input mx-1"
          >
        </div>
        <small class="text-primary flex-shrink-0">({{task.pointValue}} exp.)</small>
        <div
          @click="$emit('taskSelect', task)"
          class="edit-btn bg-warning"
        ></div>
        <div
          @click="$emit('deleteTask', task.id)"
          class="close-btn bg-danger"
        ></div>
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

  .edit-btn,
  .close-btn {
    width: 10px;
    height: 10px;
    border-radius: .25rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .edit-btn {
    right: 15px;
  }
</style>
