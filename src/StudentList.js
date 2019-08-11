import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import * as studentActions from "./Actions/StudentActions";


class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentIdList: []
    };
  }

  handleEditStudent = studentId => {
    this.props.history.push({
      pathname: `/edit-student/${studentId}`
    });
  };
  handleDeleteStudent = studentId => {
    this.props.studentActions.deleteStudent(studentId);
    this.setState({
      studentIdList: []
    });
  };
  handleCheckbox = (studentId, e) => {
    if (e.target.checked == true) {
      this.setState({
        studentIdList: [...this.state.studentIdList, studentId]
      });
    } else {
      this.setState({
        studentIdList: [
          ...this.state.studentIdList.filter(
            (student, index) => student !== studentId
          )
        ]
      });
    }
  };
  render() {
    return (
      <div className="studentList-wrapper">
        <div className="add-student-btn">
          <Link to="/add-student">Add Student</Link>
          {this.state.studentIdList.length > 0 ? (
            <span
              className="delete-all-btn"
              onClick={() => {
                this.handleDeleteStudent(this.state.studentIdList);
              }}
            >
              <i className="material-icons">delete</i>
            </span>
          ) : (
            ""
          )}
        </div>
        {this.props.studentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th />
                <th>#</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Hobby</th>
                <th>actions</th>
              </tr>
            </thead>

            <tbody>
              {this.props.studentList.map((student, index) => {
                console.log(student)
                return (
                  <tr key={`index_${index}_${student.id}`}>
                    <td>
                      <div className="checkbox studentlist-checkbox">
                        <input
                          type="checkbox"
                          onChange={this.handleCheckbox.bind(this, student.id)}
                        />
                        <label for={student.id} />
                      </div>
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{student.email_id}</td>
                    <td>{student.gender}</td>
                    <td>{student.country}</td>
                    <td>
                      {student.hobby.map(item => item + "  ")}
                    </td>
                    <td className="action-btn">
                      <span
                        onClick={() => {
                          this.handleEditStudent(student.id);
                        }}
                      >
                        <i className="material-icons">create</i>
                      </span>
                      <span
                        onClick={() => {
                          this.handleDeleteStudent([student.id]);
                        }}
                      >
                        <i className="material-icons">delete</i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="no-data-list"> No Record found.</div>
        )}
      </div>
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
)(StudentList);
