import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import RegisterForm from "./components/RegisterForm";
import { handleFieldChange, submitForm, initForm } from "../../../../redux/form/actions";

class Register extends Component {
  formConfig = {
    name: "register",
    fields: {
      name: {
        id: "person-name",
        jsonPath: "user.name",
        required: true,
        floatingLabelText: "Name",
        hintText: "Enter Your Name",
        pattern: "^([A-z])+$",
        errorMessage: "Please enter a valid name",
      },
      city: {
        id: "person-city",
        jsonPath: "user.location.city",
        required: true,
        floatingLabelText: "City",
        hintText: "Enter Your City",
      },
      phone: {
        id: "person-phone",
        required: true,
        jsonPath: "user.contact.phone",
        floatingLabelText: "Phone Number",
        hintText: "Enter Your Phone Number",
        pattern: "^([0-9])+$",
        errorMessage: "Please enter a valid phone number",
        value: "",
      },
    },
    saveUrl: "/user/register",
  };

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  register = () => {
    const formKey = this.formConfig.name;
    this.props.submitForm(formKey);
    // this.props.history.push("/citizen/user/otp");
  };

  navigateToLogin = () => {
    this.props.history.push("/citizen/user/login");
  };

  render() {
    const { register, formConfig, navigateToLogin } = this;
    const { form, handleFieldChange } = this.props;
    const formKey = formConfig.name;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <RegisterForm form={form} formKey={formKey} onChange={handleFieldChange} register={register} navigateToLogin={navigateToLogin} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "register";
  const form = state.form[formKey] || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
