import firebase from "firebase/compat";

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
    async fetchTasks({ commit, rootState }) {
      const res = await firebase.database().ref(`/users/${rootState.user.currentUser.uid}/tasks`).once('value');
      commit('setTasks', res.val());
    },
    async syncWithStorage({ state, rootState }) {
      if(state.tasks.length) {
        await firebase
          .database()
          .ref(`/users/${rootState.user.currentUser.uid}/tasks`)
          .set(state.tasks);
      }
    }
  },

  mutations: {
    setTasks(store, tasks) {
      store.tasks = tasks || [];
      this.commit('recalcPoints');
    },
    addTask(store, task) {
      store.tasks.unshift(task);
      this.commit('recalcPoints');
    },
    editTask(store, task) {
      store.tasks = store.tasks.map((item) => item.id === task.id ? task : item);
      this.commit('recalcPoints');
    },
    deleteTask(store, id) {
      store.tasks = store.tasks.filter(item => item.id !== id);
      this.commit('recalcPoints');
    },
    recalcPoints(store) {
      const totalPoints = store.tasks.reduce((acc, item) => {
        if (item.currentPoints) {
          return acc + Number(item.currentPoints * item.pointValue);
        } else {
          return item.completed ? acc + Number(item.pointValue) : acc;
        }
      }, 0);
      this.commit('setUser', { totalPoints });
    }
  }
}