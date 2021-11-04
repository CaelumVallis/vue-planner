<template>
  <div
    class="card container planner-item mb-2">
    <div class="card-body row align-items-center justify-content-between">
      <div
        v-if="task.imageUrl"
        class="col-2 img-container">
        <img :src="task.imageUrl"/>
      </div>
      <div class="col-4 d-flex">
        <h4>{{task.title}}</h4>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center px-0">
        <div
          v-if="task.taskType === this.constants.taskType.pointsOfTotal"
          class="d-flex align-items-baseline justify-content-end"
        >
          <input
            :value="task.currentPoints || 0"
            @change="editTask({ currentPoints: $event.target.value })"
            type="number"
            class="rounded form-control p-0 w-100"
          >
          <span class="mx-1">
            <span v-if="task.totalPoints">/ {{task.totalPoints}}</span>
            {{task.pointName}}
          </span>
        </div>
        <div v-if="task.taskType === this.constants.taskType.completed">
          <input
            @change="editTask({ completed: !task.completed })"
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
    created() {
      this.constants = modalConstants;
    },
    methods: {
      editTask(change) {
        this.$emit('editTask', { ...this.task, ...change });
      }
    },
  }
</script>

<style scoped>
  .planner-item {
    max-height: 15vh;
  }

  .img-container img{
    max-height:75%;
    max-width:75%;
    height:auto;
    width:auto;
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
