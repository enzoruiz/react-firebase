import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import './index.css';


firebase.initializeApp({
    apiKey: "AIzaSyDU4HqPqH5e6P4rX9kJqOPbExX0WizRBUw",
    authDomain: "reactfirebase01.firebaseapp.com",
    databaseURL: "https://reactfirebase01.firebaseio.com",
    projectId: "reactfirebase01",
    storageBucket: "reactfirebase01.appspot.com",
    messagingSenderId: "17820728129"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);