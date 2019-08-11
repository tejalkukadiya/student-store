import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StudentForm from "./StudentForm";
import * as studentActions from "./Actions/StudentActions";
import { toast } from "react-toastify";
class AddStudent extends React.Component {
  submitForm(values) {
    const { studentList } = this.props;
    var found = studentList.find(item => {
      return item.email_id === values.email_id;
    });
    if (
      found === undefined ||
      this.props.location.pathname.includes("edit-student")
    ) {
      const { params } = this.props.match;
      if (params.id) {
        this.props.studentActions.EditStudentData(parseInt(params.id), values);
      } else {
        this.props.studentActions.AddStudentData(values);
      }
      this.props.history.push("/");
    } else {
      toast.error("Email already exists");
    }
  }
  render() {
    const { studentList } = this.props;
    const { params } = this.props.match;
    var currStudent = null;
    var studentId = null;
    if (params.id) {
      currStudent = {
        ...studentList.find(item => item.id === parseInt(params.id))
      };
      studentId = parseInt(params.id);
    }
    return (
      <StudentForm
        onSubmit={this.submitForm.bind(this)}
        currStudent={currStudent}
        studentId={studentId}
      />
    );
  }
}

const mapStateToProps = state => ({
  studentList: state.studentReducer.studentList
});

const mapDispatchToProps = dispatch => ({
  studentActions: bindActionCreators(studentActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
