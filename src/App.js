import React from "react";

import StudentList from "./StudentList";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux'
import configureStore from './store';
import AddStudent from './addStudent';

import { Route, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={configureStore()}>
          <Router>
              <Route exact path="/" component={StudentList} />
              <Route path="/add-student" component={AddStudent} />
              <Route path="/edit-student/:id" component={AddStudent} />
          </Router>
        </Provider>
        <ToastContainer />
      </div>
    );
  }
}


export default App;
