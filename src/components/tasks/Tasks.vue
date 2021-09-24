<template>
  <div class="card">
    <div class="card-body container">
      <button type="button" class="btn btn-primary">Add</button>
      <div class="row">
        <Task
          v-if="tasks.length"
          v-for="task in tasks"
          :task="task"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Task';

  export default {
    components: { Task },
    data() {
      return {
        tasks: []
      }
    },
    created() {
      this.tasks = this.$store.state.tasks;
    },
    methods: {}
  }
</script>

