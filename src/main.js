import Vue from 'vue'
import store from './store';
import Vuelidate from "vuelidate";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase_config from '@/assets/firebase_config';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

let app;

firebase.initializeApp(firebase_config);
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
