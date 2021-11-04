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
          :key="task.id"
          :task="task"
          @editTask="editTask"
          @deleteTask="deleteTask"
          @taskSelect="selectCurrentTask"
        />
      </div>
    </div>
    <TaskModal
      v-if="modalOpen"
      :modalOpen="modalOpen"
      :initialValues="currentTask"
      @close="closeModal"
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
      tasks() {
        this.$store.dispatch('syncWithStorage');
      }
    },
    created() {
      this.$store.dispatch('fetchTasks');
      this.currentTask = { ...taskDefaultObject }
    },
    methods: {
      editTask(task) {
        this.$store.commit('editTask', task);
      },
      deleteTask(id) {
        this.$store.commit('deleteTask', id);
      },
      selectCurrentTask(task) {
        this.currentTask = task;
        this.modalOpen = true;
      },
      closeModal() {
        this.modalOpen = false;
        this.currentTask = { ...taskDefaultObject };
      }
    }
  }
</script>

