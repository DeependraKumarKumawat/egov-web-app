import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "modules/common/Banner";
import OTPForm from "./components/OTPForm";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { setRoute } from "redux/app/actions";
import { sendOTP } from "redux/auth/actions";

class OTP extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/otp").default;
  }

  componentWillMount() {
    const { setRoute, previousRoute } = this.props;
    if (previousRoute.length === 0) {
      setRoute("/citizen/user/register");
    }
  }

  componentDidMount() {
    const { initForm, submitForm, handleFieldChange } = this.props;
    const otpElement = document.getElementById("otp");
    otpElement.addEventListener("smsReceived", (e) => {
      const { otp } = e.detail;
      handleFieldChange("otp", "otp", otp);
      // submitForm("otp");
    });

    initForm(this.formConfig);
  }

  componentWillUnmount() {
    const otpElement = document.getElementById("otp");
    otpElement.removeEventListener("smsReceived", null);
  }

  resendOTP = () => {
    const { sendOTP, intent } = this.props;
    sendOTP(intent);
  };

  render() {
    const { form, handleFieldChange, submitForm, phoneNumber } = this.props;
    const { resendOTP } = this;
    const { name: formKey } = this.formConfig;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <OTPForm submitForm={submitForm} resendOTP={resendOTP} form={form} formKey={formKey} phoneNumber={phoneNumber} onChange={handleFieldChange} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "otp";
  const form = state.form[formKey] || {};
  const { previousRoute } = state.app;
  const intent = previousRoute.endsWith("register") ? "register" : previousRoute.endsWith("login") ? "login" : null;
  let phoneNumber = null;
  if (intent) {
    phoneNumber = state.form[intent].fields.phone.value;
  }
  return { form, previousRoute, intent, phoneNumber };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    setRoute: (route) => dispatch(setRoute(route)),
    sendOTP: (otp) => dispatch(sendOTP(otp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
