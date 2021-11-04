import Vue from 'vue'
import store from './store';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase_config from '@/assets/firebase_config';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

firebase.initializeApp(firebase_config);
let app;
firebase.auth().onAuthStateChanged((user) => {
  if(!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App, { props: { user } })
    }).$mount('#app');
  }
});
