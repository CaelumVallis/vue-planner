<template>
  <div class="card px-2">
    <div class="card-body container">
      <button
        @click="modalOpen = true"
        type="button"
        class="btn btn-primary"
      >Add</button>
      <div class="row mt-2">
        <Task
          v-for="task in tasks"
          :task="task"
          v-if="tasks.length"
          @editTask="editTask"
          @taskClick="selectCurrentTask"
        />
      </div>
    </div>
    <TaskModal
      v-if="modalOpen"
      :modalOpen="modalOpen"
      :initialValues="currentTask"
      @close="modalOpen = false"
    />
  </div>
</template>

<script>
  import Task from './Task';
  import TaskModal from "../modals/TaskModal";
  import { taskDefaultObject } from "../../assets/constants";

  export default {
    components: { TaskModal, Task },
    computed: {
      tasks() {
        return this.$store.getters.tasks;
      }
    },
    data() {
      return {
        modalOpen: false,
        currentTask: {}
      }
    },
    watch: {
      tasks: function() {
        this.$store.dispatch('syncWithStorage');
      }
    },
    created() {
      this.$store.dispatch('fetchTasks');
      this.currentTask = {...taskDefaultObject}
    },
    methods: {
      editTask(task) {
        this.$store.commit('editTask', {...task, completed: !task.completed})
      },
      selectCurrentTask(task) {
        this.currentTask = task;
        this.modalOpen = true;
      }
    }
  }
</script>

