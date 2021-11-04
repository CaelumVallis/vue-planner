import firebase from "firebase/compat";
import {userDefaultObject} from "../../assets/constants";

export default {
  state: {
    currentUser: { ...userDefaultObject }
  },
  actions: {
    async setToState({ state, commit }, data) {
      let user = { ...data };
      if(!data.username) {
        const res = await firebase.database().ref(`/users/${data.uid}/info`).once('value');
        user = { ...user, ...res.val() }
      }
      commit('setUser', user);
    }
  },
  mutations: {
    setUser(state, data) {
      // const { username, avatar, totalPoints, email, uid } = data;
      state.currentUser = { ...state.currentUser, ...data };
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    }
  }
}