import Vue from 'vue'
import store from './store';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase_config from '@/assets/firebase_config';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';

Vue.config.productionTip = false;

let app;

firebase.initializeApp(firebase_config);
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
