import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import * as serviceWorker from './serviceWorker';
   
ReactDOM.render(
    <App/>
   ,document.getElementById('root')
);
serviceWorker.unregister();
