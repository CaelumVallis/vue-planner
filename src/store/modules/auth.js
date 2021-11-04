import firebase from "firebase/compat";
import { userDefaultObject } from "../../assets/constants";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        const data = { email, uid: user.uid };
        dispatch('setToState', data);
      } catch (err) {
        console.log(err);
      }
    },
    async register({ dispatch, commit }, { email, password, username }) {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase
          .database()
          .ref(`/users/${user.uid}/info`)
          .set({ ...userDefaultObject, username, email, uid: user.uid });
        const data = { username, email, uid: user.uid} ;
        dispatch('setToState', data);
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit('setUser', {...userDefaultObject});
    },
  }
}