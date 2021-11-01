import firebase from "firebase/compat";

export default {
  state: {
    currentUser: {
      username: null,
      email: null,
      uid: null
    }
  },
  actions: {
    async login({ dispatch, commit }, {email, password}) {
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        const data = { email, uid: user.uid };
        dispatch('setToState', data);
      } catch(err) {}
    },
    async register({ dispatch, commit }, {email, password, username}) {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.database().ref(`/users/${user.uid}/info`).set({username, email});
        const data = { username, email, uid: user.uid };
        dispatch('setToState', data);
      } catch(err) {}
    },
    // async logout() {
    //   await firebase.auth().signOut();
    // },
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
    setUser(state, user) {
      state.currentUser = user;
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    }
  }
}