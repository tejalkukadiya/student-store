import React from "react";
import { connect } from "react-redux";
import { Col, Button, Form, Container } from "reactstrap";
import { Field, reduxForm } from "redux-form";
const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const validatepassword = values => {
  console.log("herere", values);
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or long.";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/i.test(values.newpassword)) {
    errors.password =
      "Password must contain one uppercase letter,one special character,one number and one letter";
  }

  if (!values.retypepassword) {
    errors.retypepassword = "Required";
  } else if (values.retypepassword.length < 6) {
    errors.retypepassword = "Must be 6 characters or long.";
  } else if (
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/i.test(values.retypepassword)
  ) {
    errors.retypepassword =
      "Password must contain one uppercase letter,one special character,one number and one letter";
  }

  if (!values.retypepassword) {
    errors.retypepassword = "Required";
  } else if (values.retypepassword != values.password) {
    errors.confirmpassword = "Both Password do not match.";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  multiple,
  type,
  data,
  placeholder,
  value,
  cssClass,
  rows,
  disabled,
  meta: { touched, error, warning },
  children
}) => {
  let fieldt = null;
  switch (type) {
    case "text":
    case "checkbox":
    case "radio":
    case "file":
    case "password":
      fieldt = (
        <input
          id={input.name}
          {...input}
          className={cssClass}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          checked={input.checked}
        />
      );
      break;

    case "select":
      fieldt = (
        <select
          id={input.name}
          {...input}
          className={cssClass}
          disabled={disabled}
          multiple={multiple}
        >
          {" "}
          {children}{" "}
        </select>
      );
      break;

    default:
      fieldt = (
        <input
          id={input.name}
          {...input}
          type={type}
          placeholder={placeholder}
        />
      );
  }
  let formRowClass = `${type !== "select" ? "form-row" : ""} ${
    disabled ? "disabled" : ""
  } ${type}`;
  let formRowId = input.name;
  let inverse = type == "checkbox" || type == "radio" ? true : false;
  if (!inverse) {
    return (
      <div className={formRowClass}>
        {label != null ? <label for={formRowId}>{label}</label> : null}
        {fieldt}
        <div className="form-valid-message">
          {touched &&
            ((error && <span className="error">* {error}</span>) ||
              (warning && <span className="warning">* {warning}</span>))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={formRowClass}>
        {fieldt}
        <label for={formRowId}>{label}</label>
        <div className="form-valid-message">
          {touched &&
            ((error && <span className="error">* {error}</span>) ||
              (warning && <span className="warning">* {warning}</span>))}
        </div>
      </div>
    );
  }
};

class StudentForm extends React.Component {
  componentDidMount() {
    this.handleInitalize();
  }
  handleInitalize() {
    let currStudent = this.props.currStudent;
    let studentId = this.props.studentId;
    if (currStudent !== null) {
      const initData = {
        name: currStudent.name,
        password: currStudent.password,
        retypepassword: currStudent.password,
        gender: currStudent.gender,
        country: currStudent.country,
        hobby: currStudent.hobby,
        email_id: currStudent.email_id
      };
      this.props.initialize(initData);
    }
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div className="add-student-header">
              {this.props.currStudent !== null ? "Edit" : "Add"} student
            </div>
            <Form onSubmit={handleSubmit}>
              <Field
                name="name"
                label="Name"
                component={renderField}
                type="text"
                placeholder="Enter Name"
                validate={[required]}
              />
              <Field
                name="password"
                label="Password"
                component={renderField}
                type="password"
                placeholder="Enter  Password"
                validate={[required]}
              />
              <Field
                name="retypepassword"
                label="Retype Password"
                component={renderField}
                type="password"
                validate={[required]}
                placeholder="Retype  Password"
              />
              <Field
                name="email_id"
                label="Email"
                component={renderField}
                type="email"
                placeholder="Enter Email"
                validate={[required, email]}
              />

              <div className="radioGender clearfix">
                <span className="radiobtnGender-label">Gender</span>
                <label className="customradio">
                  Female
                  <Field
                    component="input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <span className="checkmark" />
                </label>
                <label className="customradio">
                  Male
                  <Field
                    component="input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="select-list-wrapper">
                <label for="hobby"> Hobby</label>
                <div className="select-wrapper">
                  <Field
                    placeholder="Select Hobby"
                    component={renderField}
                    type="select"
                    name="hobby"
                    validate={[required]}
                  >
                    <option value="">Select Hobby</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Writting">Writting</option>
                    <option value="Cooking">Cooking</option>
                  </Field>
                </div>
              </div>
              <div className="select-list-wrapper">
                <label for="country">Country </label>
                <div className="select-wrapper">
                  <Field
                    placeholder="Select Country"
                    component={renderField}
                    type="select"
                    name="country"
                    validate={[required]}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="US">US</option>
                  </Field>
                </div>
              </div>
              <div>
                <Button type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}
export default reduxForm({
  form: "StudentForm", // a unique identifier for this form
  validatepassword // <--- validation function given to redux-form
})(StudentForm);
