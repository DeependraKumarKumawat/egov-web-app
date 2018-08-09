import React from "react";
import Label from "egov-ui-kit/utils/translationNode";
import { TextField, Button, DropDown } from "components";
const labelStyle = {
  fontFamily: "Roboto",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  letterSpacing: 0.7,
  color: "#484848",
  marginLeft: 14,
};
const AddRebateExemption = ({ form, formKey, handleFieldChange, updateEstimate }) => {
  const fields = form.fields || {};
  const { adhocPenalty, adhocPenaltyReason, adhocExemption, adhocExemptionReason } = fields;
  return (
    <div className="add-rebate-box">
      <div className="pt-emp-penalty-charges col-xs-12">
        <Label label="Additional Charges" className="rebate-box-labels" labelStyle={labelStyle} />
        <div className="adhocPenalty col-xs-6">
          <TextField onChange={(e, value) => handleFieldChange("adhocPenalty", value)} {...adhocPenalty} />
        </div>
        <div className="adhocPenaltyReason col-xs-6">
          <DropDown onChange={(e, value) => handleFieldChange("adhocPenaltyReason", e.target.innerHTML)} {...adhocPenaltyReason} />
        </div>
      </div>
      <div className="pt-emp-rebate-charges col-xs-12">
        <Label label="Additional Rebate" labelStyle={labelStyle} />
        <div className="adhocExemption col-xs-6">
          <TextField onChange={(e, value) => handleFieldChange("adhocExemption", value)} {...adhocExemption} />
        </div>
        <div className="adhocExemptionReason col-xs-6">
          <DropDown onChange={(e, value) => handleFieldChange("adhocExemptionReason", e.target.innerHTML)} {...adhocExemptionReason} />
        </div>
      </div>
      <div className="pt-rebate-box-btn">
        <Button
          primary={true}
          style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
          className="add-rebate-action-button"
          onClick={updateEstimate}
        />
      </div>
    </div>
  );
};

export default AddRebateExemption;
