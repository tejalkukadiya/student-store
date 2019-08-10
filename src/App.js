import React from 'react';
import "./App.scss";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as  studentActions  from './Actions/StudentActions'
import StudentList from './StudentList'

class App extends React.Component {
  constructor(props){
    super();
    this.state={
      studentsList :[]
    }
  }
  render(){
    return (
      <div className="App">
        <StudentList 
          studentData = {this.props.studentList}
          history = {this.props.history}
        />
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  studentList:state.studentReducer.studentList
})

const mapDispatchToProps = dispatch =>({
    studentActions : bindActionCreators(studentActions,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
