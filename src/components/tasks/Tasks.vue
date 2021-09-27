<template>
  <div class="card">
    <div class="card-body container">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">Add</button>
      <div class="row mt-2">
        <Task
          v-if="tasks.length"
          v-for="task in tasks"
          :task="task"
        />
      </div>
    </div>
    <TaskModal />
  </div>
</template>

<script>
  import Task from './Task';
  import TaskModal from "../modals/TaskModal";

  export default {
    components: { TaskModal, Task },
    computed: {
      tasks() {
        return this.$store.getters.tasks;
      }
    },
    watch: {
      tasks: function() {
        this.$store.dispatch('syncWithStorage');
      }
    },
    created() {
      this.$store.dispatch('fetchTasks');
    },
    methods: {}
  }
</script>

