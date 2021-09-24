export default {
  state: {
    tasks: []
  },
  getters: {

  },
  actions: {
    fetchTasks() {
      this.commit('setTasks', JSON.parse(localStorage.getItem('tasks'))) ;
    }
  },
  mutations: {
    setTasks(store, tasks) {
      store.state.tasks = tasks || [];
    },
    // addTask(store, task) {
    //   store.state.tasks.push(task);
    // }
  }
}