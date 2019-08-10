import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store';
import AddStudent from './addStudent';
import { Route, BrowserRouter as Router } from 'react-router-dom'
   
ReactDOM.render(
    <Provider store={configureStore()}>
        <Router >
        <div>
            <Route exact path="/" component={App} />
            <Route path="/add-student" component={AddStudent} />
            <Route path="/edit-student/:id" component={AddStudent} />
        </div>
        </Router>
    </Provider>
   ,document.getElementById('root')
);
serviceWorker.unregister();
