export default {
  state: {
    tasks: []
  },
  getters: {
    tasks(store) {
      return store.tasks;
    }
  },
  actions: {
    fetchTasks() {
      this.commit('setTasks', JSON.parse(localStorage.getItem('tasks'))) ;
    },
    syncWithStorage(store) {
      localStorage.setItem('tasks', JSON.stringify(store.state.tasks));
    }
  },
  mutations: {
    setTasks(store, tasks) {
      store.tasks = tasks || [];
    },
    addTask(store, task) {
      store.tasks.push(task);
    }
  }
}