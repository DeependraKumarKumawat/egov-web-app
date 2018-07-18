import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Label } from "components";
import { deleteForm } from "egov-ui-kit/redux/form/actions";
import { UsageInformationHOC, PropertyAddressHOC, OwnershipTypeHOC, OwnerInfoHOC, InstitutionHOC, OwnerInformation, InstitutionAuthorityHOC } from "./components/Forms";
import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
import FloorsDetails from "./components/Forms/FloorsDetails";
import PlotDetails from "./components/Forms/PlotDetails";
import { getPlotAndFloorFormConfigPath } from "./utils/assessInfoFormManager";
import { getOwnerInfoFormConfigPath } from "./utils/ownerInfoFormManager";
import isEmpty from "lodash/isEmpty";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-kit/redux/app/actions";
import formHoc from "egov-ui-kit/hocs/form";
// import get from "lodash/get";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
  };

  addOwner = () => {
    const { ownerInfoArr } = this.state
    const index = ownerInfoArr.length
    const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${index}`, path: "PropertyTaxPay" })(OwnerInformation)
    this.setState({
      ownerInfoArr: [ ...this.state.ownerInfoArr, { index, Component: OwnerInfoHOC } ],
    })
  }

  componentDidMount() {
    this.addOwner()
  }

  deleteData = (index, formKey) => {
    const { ownerInfoArr } = this.state
    const updatedOwnerArr = [...ownerInfoArr]
    updatedOwnerArr.splice(ownerInfoArr.findIndex(ownerData => ownerData.index === index), 1)
    this.setState({
      ownerInfoArr: updatedOwnerArr,
    })
    this.props.deleteForm(formKey)
  }

  renderPlotAndFloorDetails = () => {
    let { basicInformation, plotDetails, floorDetails_0 } = this.props.form;
    if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
      let uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
      floorDetails_0.fields.builtArea.floatingLabelText = `Built Area(${uom})`;
    }

    if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
      let pathFormKeyObject = getPlotAndFloorFormConfigPath(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
      return !isEmpty(pathFormKeyObject) ? (
        <div>
          {pathFormKeyObject.hasPlot && <PlotDetails component={pathFormKeyObject.plotForm} />}
          {pathFormKeyObject.hasFloor && <FloorsDetails componentDetails={pathFormKeyObject.floorObject} />}
        </div>
      ) : null;
    } else {
      return null;
    }
  };

  getConfigFromCombination = (combination, fetchConfigurationFn) => {
    let configObject = fetchConfigurationFn(combination);
    return configObject;
  };

  getSelectedCombination = (form, formKey, fieldKeys) => {
    return (
      form[formKey] &&
      form[formKey].fields &&
      fieldKeys.reduce((result, current) => {
        if (form[formKey].fields[current].value) {
          result += form[formKey].fields[current].value;
        } else {
          result = "";
        }
        return result;
      }, "")
    );
  };

  getOwnerDetails = (ownerType) => {
    const { selected } = this.state
    const { addOwner, deleteData, deleteForm } = this.props
    switch(ownerType) {
      case "IND":
        return <OwnerInfoHOC />
      case "MUL":
        return (
          <MultipleOwnerInfoHOC
            addOwner={this.addOwner}
            deleteData={this.deleteData}
            ownerDetails={this.state.ownerInfoArr}
            disabled={selected === 3}
          />
        )
      case "Institution":
        return (
          <div>
            <InstitutionHOC />
            <InstitutionAuthorityHOC cardTitle={<div>Details of authorised person</div>} />
          </div>
        )
      default:
        return null
    }
  }

  renderStepperContent = (selected) => {
    const { renderPlotAndFloorDetails, getOwnerDetails } = this;
    switch (selected) {
      case 0:
        return <PropertyAddressHOC />;
      case 1:
        return (
          <div>
            <UsageInformationHOC />
            {renderPlotAndFloorDetails()}
          </div>
        );
      case 2:
        const ownerType = this.getSelectedCombination(this.props.form, "ownershipType", ["typeOfOwnership"]);
        const OwnerConfig = this.getConfigFromCombination("Institution", getOwnerInfoFormConfigPath);
        const { ownerForm: Institution } = OwnerConfig;
        return (
          <div>
            <OwnershipTypeHOC />
            {getOwnerDetails(ownerType)}
          </div>
        )
      case 3:
        return (
          <div>
            <ReviewForm
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0)}
              stepOne={this.renderStepperContent(1)}
              stepTwo={this.renderStepperContent(2)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { setRoute } = this.props;
    if (index <= 3) {
      this.setState({ selected: index });
    } else if (index === 4) {
      setRoute("/property-tax/payment-success");
    }
  };

  onTabClick = (index) => {
    this.setState({ selected: index });
  };

  render() {
    const { renderStepperContent } = this;
    const { selected, ownerInfoArr } = this.state;

    return (
      <div className="wizard-form-main-cont">
        {/* <Label
          label="Assessment Form"
          containerStyle={{ padding: "24px 0px 16px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        /> */}
        <WizardComponent
          content={renderStepperContent(selected)}
          onTabClick={this.onTabClick}
          selected={selected}
          updateIndex={this.updateIndex}
          backLabel="GO BACK"
          nextLabel={selected === 3 ? "PAY" : "NEXT"}
          ownerInfoArr={ownerInfoArr}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form } = state || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteForm: (formKey) => dispatch(deleteForm(formKey)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
