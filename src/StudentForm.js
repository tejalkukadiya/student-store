import React from "react";
import { connect } from "react-redux";
import { Col, Button, Form, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const validate = values => {
  const errors = {};
  if (!values.hobby) {
    errors.hobby = "Required";
  } else if (values.hobby.length < 2) {
    errors.hobby = "select atleast 2 hobby.";
  }

  if (!values.gender) {
    errors.gender = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or long.";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/i.test(values.password)) {
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
    errors.retypepassword = "Both Password do not match.";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  multiple,
  name,
  inputType,
  placeholder,
  cssClass,
  disabled,
  options,
  meta: { touched, error, warning },
  children
}) => {
  let fieldt = null;
  switch (inputType) {
    case "text":
    case "email":
    case "file":
    case "password":
      fieldt = (
        <input
          id={input.name}
          {...input}
          type={inputType}
          className={cssClass}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
      break;
    case "radio":
      console.log("-----", input);

      fieldt = options.map((option, index) => (
        <div className="form-group form-check" key={`radio${index}`}>
          <label key={option.value} className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              {...input}
              value={option.value}
              checked={option.value === input.value}
              // {...input}
              // name={input.name}
              // id={option.name}
              // type="radio"
              // disabled={disabled}
              // value={option.value} checked={input.value === option.value}
            />

            {option.name}
          </label>
        </div>
      ));
      break;
    case "checkbox":
      fieldt = options.map((option, index) => [
        <div className="form-group form-check">
          <input
            type="checkbox"
            id={`${input.name}[${index}]`}
            className="form-check-input"
            name={`${input.name}[${index}]`}
            value={option.name}
            checked={input.value.indexOf(option.name) !== -1}
            onChange={event => {
              const newValue = [...input.value];
              if (event.target.checked) {
                newValue.push(option.name);
              } else {
                newValue.splice(newValue.indexOf(option.name), 1);
              }

              return input.onChange(newValue);
            }}
          />
          <label for={`${input.name}[${index}]`} className="form-check-label">
            {option.name}
          </label>
        </div>
      ]);
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
          type={inputType}
          placeholder={placeholder}
        />
      );
  }
  let formRowClass = `${inputType !== "select" ? "form-group" : ""} ${
    disabled ? "disabled" : ""
  } ${inputType}`;
  let formRowId = input.name;
  let inverse = inputType == "checkbox" || inputType == "radio" ? true : false;
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
    return [
      fieldt,
      <div className="form-valid-message">
        {touched &&
          ((error && <span className="error">* {error}</span>) ||
            (warning && <span className="warning">* {warning}</span>))}
      </div>
    ];
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
      console.log(currStudent);
      const initData = {
        name: currStudent.name,
        password: currStudent.password,
        retypepassword: currStudent.password,
        gender: currStudent.gender,
        hobby: currStudent.hobby,
        country: currStudent.country,
        email_id: currStudent.email_id
      };
      this.props.initialize(initData);
    }
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div className="add-student-header">
              {this.props.currStudent !== null ? "Edit" : "Add"} student
            </div>
            <Form onSubmit={handleSubmit}>
              <Field
                name="name"
                label="Name"
                component={renderField}
                cssClass="form-control"
                inputType="text"
                placeholder="Enter Name"
                validate={[required]}
              />
              <Field
                name="password"
                label="Password"
                cssClass="form-control"
                component={renderField}
                inputType="password"
                placeholder="Enter  Password"
                validate={[required]}
              />
              <Field
                name="retypepassword"
                label="Retype Password"
                cssClass="form-control"
                component={renderField}
                inputType="password"
                validate={[required]}
                placeholder="Retype  Password"
              />
              <Field
                name="email_id"
                label="Email"
                cssClass="form-control"
                component={renderField}
                inputType="email"
                placeholder="Enter Email"
                validate={[required, email]}
              />

              <div className="">
                <span className="font-bold">Gender</span>
                <Field
                  component={renderField}
                  label="Gender"
                  inputType="radio"
                  name="gender"
                  options={[
                    { name: "Female", value: "female" },
                    { name: "Male", value: "male" }
                  ]}
                />
              </div>
              <div className="">
                <span className="font-bold">Hobby</span>
                <Field
                  component={renderField}
                  label="Hobby"
                  inputType="checkbox"
                  name="hobby"
                  options={[
                    { name: "Reading", value: "reading" },
                    { name: "Drawing", value: "drawing" },
                    { name: "Swimming", value: "swimming" },
                    { name: "Travelling", value: "travelling" }
                  ]}
                />
              </div>
              <div className="select-list-wrapper">
                <label for="country">Country </label>
                <div className="select-wrapper">
                  <Field
                    placeholder="Select Country"
                    component={renderField}
                    inputType="select"
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
                <Button color="primary" className="float-right" type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default reduxForm({
  form: "studentForm", // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(StudentForm);
