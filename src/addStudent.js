import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentForm from './StudentForm';
import * as  studentActions  from './Actions/StudentActions'
class AddStudent extends React.Component{
    submitForm(values){
        const {params} =this.props.match
        if(params.id){
            this.props.studentActions.EditStudentData(parseInt(params.id),values);
        }else{
            this.props.studentActions.AddStudentData(values);
        }
        this.props.history.push("/");
    }
    render(){
        const {studentList} = this.props;
        const {params} = this.props.match;
        var currStudent = null;
        var studentId = null;
        if(params.id){
            currStudent = {...studentList.find(item=>item.id === parseInt(params.id))}
            studentId = parseInt(params.id)
        }        
        return( 
            <div>
                <StudentForm onSubmit={this.submitForm.bind(this)} currStudent={currStudent} studentId={studentId}/>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(AddStudent);