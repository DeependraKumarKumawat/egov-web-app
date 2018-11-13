import { sortDropdown } from "egov-ui-kit/utils/PTCommon";
import { prepareFormData, fetchGeneralMDMSData, toggleSpinner } from "egov-ui-kit/redux/common/actions";
import { setDependentFields } from "./enableDependentFields";
import { removeFormKey } from "./removeFloors";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import set from "lodash/set";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";

let floorDropDownData = [];

for (var i = 1; i <= 25; i++) {
  floorDropDownData.push({ label: i, value: i });
}

export const plotSize = {
  plotSize: {
    id: "assessment-plot-size",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_PLOT_SIZE",
    hintText: "PT_FORM2_PLOT_SIZE_PLACEHOLDER",
    errorMessage: "Enter a valid Plot Size",
    required: true,
    fullWidth: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    numcols: 6,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      let propertyType = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertyType");
      let propertySubType = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType");
      if (propertyType === "VACANT" || propertySubType === "INDEPENDENTPROPERTY") {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].landArea", field.value));
        dispatch(prepareFormData("Properties[0].propertyDetails[0].buildUpArea", null));
      }
    },
  },
};

export const floorCount = {
  floorCount: {
    id: "assessment-number-of-floors",
    jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_NUMBER_OF_FLOORS",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    toolTip: true,
    fullWidth: true,
    toolTipMessage: "PT_NUMBER_OF_FLOORS_TOOLTIP_MESSAGE",
    required: true,
    numcols: 6,
    dropDownData: floorDropDownData,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      // removeFormKey(formKey, field, dispatch, state);
      var previousFloorNo = localStorage.getItem("previousFloorNo") || -1;
      localStorage.setItem("previousFloorNo", field.value);
      // dispatch(toggleSpinner());
      if (previousFloorNo > field.value) {
        for (var i = field.value; i < previousFloorNo; i++) {
          if (state.form.hasOwnProperty(`customSelect_${i}`)) {
            dispatch(removeForm(`customSelect_${i}`));
          }
          for (var variable in state.form) {
            if (state.form.hasOwnProperty(variable) && variable.startsWith(`floorDetails_${i}`)) {
              dispatch(removeForm(variable));
            }
          }
        }
      }
    },
  },
};

export const subUsageType = {
  subUsageType: {
    id: "assessment-subUsageType",
    jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryDetail",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_SUB_USAGE_TYPE",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    dropDownData: [],
    required: true,
    numcols: 4,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      let subUsageMinor = get(state, `common.generalMDMSDataById.UsageCategoryDetail[${field.value}]`);
      if (!isEmpty(subUsageMinor)) {
        dispatch(prepareFormData(`${field.jsonPath.split("usageCategoryDetail")[0]}usageCategorySubMinor`, subUsageMinor.usageCategorySubMinor));
      } else {
        dispatch(prepareFormData(`${field.jsonPath.split("usageCategoryDetail")[0]}usageCategorySubMinor`, field.value));
        dispatch(prepareFormData(field.jsonPath, null));
      }
    },
  },
};

export const occupancy = {
  occupancy: {
    id: "assessment-occupancy",
    jsonPath: "Properties[0].propertyDetails[0].units[0].occupancyType",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_OCCUPANCY",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    required: true,
    numcols: 4,
    dropDownData: [],
    updateDependentFields: ({ formKey, field: sourceField, dispatch }) => {
      const { value } = sourceField;
      const dependentFields1 = ["annualRent"];
      switch (value) {
        case "RENTED":
          setDependentFields(dependentFields1, dispatch, formKey, false);
          break;
        default:
          setDependentFields(dependentFields1, dispatch, formKey, true);
          break;
      }
    },
  },
};

export const builtArea = {
  builtArea: {
    id: "assessment-built-area",
    jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
    type: "number",
    floatingLabelText: "PT_FORM2_BUILT_AREA",
    hintText: "PT_FORM2_BUILT_UP_AREA_PLACEHOLDER",
    errorMessage: "Enter a valid built area size",
    toolTip: true,
    toolTipMessage: "PT_BUILT_UP_AREA_TOOLTIP_MESSAGE",
    required: true,
    hideField: false,
    numcols: 4,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
  },
};

export const superArea = {
  superArea: {
    id: "assessment-super-area",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_BUILT_AREA",
    hintText: "PT_FORM2_TOTAL_BUILT_AREA_PLACEHOLDER",
    ErrorText: "Enter a valid super area size",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
    required: true,
    numcols: 4,
    hideField: false,
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      dispatch(prepareFormData("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
    },
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    errorMessage: "Enter a valid super area size",
  },
};

export const annualRent = {
  annualRent: {
    id: "assessment-annual-rent",
    jsonPath: "Properties[0].propertyDetails[0].units[0].arv",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_ANNUAL_RENT",
    hintText: "PT_FORM2_TOTAL_ANNUAL_RENT_PLACEHOLDER",
    ErrorText: "Enter a valid amount",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "PT_TOTAL_ANNUAL_RENT_TOOLTIP_MESSAGE",
    required: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    hideField: true,
    numcols: 4,
  },
};

export const measuringUnit = {
  // measuringUnit: {
  //   id: "assessment-plot-unit",
  //   jsonPath: "",
  //   type: "singleValueList",
  //   floatingLabelText: "Measuring unit",
  //   dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
  //   required: true,
  //   numcols: 4,
  //   value: "sq yards",
  // },
};

export const floorName = {
  floorName: {
    id: "floorName",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_SELECT_FLOOR",
    hintText: "PT_FORM2_SELECT_FLOOR",
    numcols: 4,
    errorMessage: "",
    required: true,
    jsonPath: "Properties[0].propertyDetails[0].units[0].floorNo",
    hideField: true,
    //   beforeFieldChange: ({ action, dispatch, state }) => {
    //     const { value } = action;
    //     const floorValues = Object.keys(state.form).reduce((floorValues, key) => {
    //       if (key.startsWith("customSelect_")) {
    //         const form = state.form[key];
    //         if (form && form.fields.floorName.value) {
    //           floorValues.push(form.fields.floorName.value);
    //         }
    //       }
    //       return floorValues;
    //     }, []);
    //     const valueExists = floorValues.find((floorvalue) => {
    //       return floorvalue === value;
    //     });
    //     if (valueExists && get(state, `form[${action.formKey}].fields[${action.fieldKey}].value`) !== action.value) {
    //       alert("This floor is already selected, please select another floor");
    //       action.value = "";
    //     }
    //     return action;
    //   },
    //   updateDependentFields: ({ formKey, field, dispatch, state }) => {
    //     var arr = formKey.split("_");
    //     var floorIndex = parseInt(arr[1]);
    //     const floorNo = get(state, `form.${formKey}.fields.floorName.value`);
    //     dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[${floorIndex}].floorNo`, floorNo));
    //   },
  },
  // beforeInitForm: (action, store, dispatch) => {
  //   try {
  //     let state = store.getState();
  //     const { Floor } = state.common && state.common.generalMDMSDataById;
  //     set(action, "form.fields.floorName.dropDownData", prepareDropDownData(Floor));
  //     return action;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
};

export const beforeInitForm = {
  beforeInitForm: (action, store) => {
    let state = store.getState();
    let { dispatch } = store;
    const { form } = action;
    const { name: formKey, fields } = form;
    const propertyType = get(state, "form.basicInformation.fields.typeOfBuilding.value");
    if (propertyType === "SHAREDPROPERTY") {
      const { Floor } = state.common && state.common.generalMDMSDataById;
      set(action, "form.fields.floorName.hideField", false);
      set(action, "form.fields.floorName.dropDownData", prepareDropDownData(Floor));
    }

    //For adding multiple units to prepareFormData
    if (formKey.startsWith(`floorDetails_`)) {
      const arr = formKey.split("_");
      const floorIndex = parseInt(arr[1]);
      const unitIndex = parseInt(arr[3]);
      const property = get(state, `common.prepareFormData.Properties[0].propertyDetails[0]`);
      let unitsCount = null;
      if (state.form[formKey]) {
        unitsCount = state.form[formKey].unitsIndex;
      } else {
        unitsCount = property && property.units && property.units.length;
        form.unitsIndex = unitsCount;
      }
      if (floorIndex === 0 && unitIndex === 0) {
        form.unitsIndex = 0;
        propertyType !== "SHAREDPROPERTY" && dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[0].floorNo`, "0"));
      } else {
        const updatedFields = Object.keys(fields).reduce((updatedFields, fieldKey) => {
          const jsonPath = fields[fieldKey].jsonPath;
          updatedFields[fieldKey] = { ...fields[fieldKey], unitsIndex: unitsCount };
          if (jsonPath.indexOf("units[") > -1) {
            const first = jsonPath.split("units[")[0];
            const last = jsonPath.split("units[")[1].split("]")[1];
            updatedFields[fieldKey].jsonPath = `${first}units[${unitsCount}]${last}`;
          }
          return updatedFields;
        }, {});
        set(action, "form.fields", { ...updatedFields });
        if (!state.form[formKey]) {
          const customSelectObj = state.form[`customSelect_${floorIndex}`];
          const floorNo = customSelectObj.fields && customSelectObj.fields.floorName && customSelectObj.fields.floorName.value;
          dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[${unitsCount}].floorNo`, `${floorNo}`));
        }
      }
    }

    var occupancy = get(state, "common.generalMDMSDataById.OccupancyType");
    var usageCategoryMinor = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    var usageCategoryMajor = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
    set(action, "form.fields.subUsageType.hideField", false);

    const unitFormUpdate = (usageCategoryMinor, skipMajorUpdate = true) => {
      var filteredSubUsageMinor = filter(
        prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true),
        (subUsageMinor) => {
          return subUsageMinor.usageCategoryMinor === get(state, usageCategoryMinor);
        }
      );
      if (filteredSubUsageMinor.length > 0) {
        var filteredUsageCategoryDetails = getPresentMasterObj(
          prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategoryDetail"), true),
          filteredSubUsageMinor,
          "usageCategorySubMinor"
        );
        const mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
        const subUsageData = sortDropdown(mergedMaster, "label", true);
        set(action, "form.fields.subUsageType.dropDownData", subUsageData);
        if (get(action, "form.fields.subUsageType.jsonPath") && skipMajorUpdate) {
          dispatch(
            prepareFormData(
              `${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMinor`,
              get(state, `common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor`)
            )
          );
        }
        set(action, "form.fields.subUsageType.hideField", false);
      } else {
        set(action, "form.fields.subUsageType.hideField", true);
      }
    };

    if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
      unitFormUpdate("common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    } else {
      if (usageCategoryMajor === "MIXED") {
        var masterOne = get(state, "common.generalMDMSDataById.UsageCategoryMajor");
        var masterTwo = get(state, "common.generalMDMSDataById.UsageCategoryMinor");
        var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
        var filterArrayWithoutMixed = filter(usageTypes, (item) => item.value !== "MIXED");
        set(action, "form.fields.usageType.disabled", false);
        const usageTypeData = sortDropdown(filterArrayWithoutMixed, "label", true);
        set(action, "form.fields.usageType.dropDownData", usageTypeData);
        unitFormUpdate(`common.prepareFormData.${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMinor`, false);
      } else {
        set(action, "form.fields.subUsageType.hideField", true);
      }
    }
    set(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
    if (get(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
      dispatch(
        prepareFormData(
          `${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMajor`,
          get(state, `common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor`)
        )
      );
    }
    if (get(state, `common.prepareFormData.${get(action, "form.fields.occupancy.jsonPath")}`) === "RENTED") {
      set(action, "form.fields.annualRent.hideField", false);
    } else {
      set(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  },
};

export const beforeInitFormForPlot = {
  beforeInitForm: (action, store) => {
    let state = store.getState();
    let { dispatch } = store;
    const propertyType = get(state, "form.basicInformation.fields.typeOfBuilding.value");
    if (propertyType != "VACANT") {
      var occupancy = get(state, "common.generalMDMSDataById.OccupancyType");
      var usageCategoryMinor = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
      var usageCategoryMajor = get(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
      set(action, "form.fields.subUsageType.hideField", false);

      if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
        var filteredSubUsageMinor = filter(
          prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true),
          (subUsageMinor) => {
            return subUsageMinor.usageCategoryMinor === get(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
          }
        );
        if (filteredSubUsageMinor.length > 0) {
          var filteredUsageCategoryDetails = getPresentMasterObj(
            prepareDropDownData(get(state, "common.generalMDMSDataById.UsageCategoryDetail"), true),
            filteredSubUsageMinor,
            "usageCategorySubMinor"
          );
          const mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
          const subUsageData = sortDropdown(mergedMaster, "label", true);
          set(action, "form.fields.subUsageType.dropDownData", subUsageData);
          // set(
          //   action,
          //   "form.fields.subUsageType.value",
          //   null)
          // );
          if (get(action, "form.fields.subUsageType.jsonPath")) {
            dispatch(
              prepareFormData(
                `${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMinor`,
                get(state, `common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor`)
              )
            );
          }
        } else {
          set(action, "form.fields.subUsageType.hideField", true);
        }
      } else {
        if (usageCategoryMajor === "MIXED") {
          var masterOne = get(state, "common.generalMDMSDataById.UsageCategoryMajor");
          var masterTwo = get(state, "common.generalMDMSDataById.UsageCategoryMinor");
          var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
          var filterArrayWithoutMixed = filter(usageTypes, (item) => item.value !== "MIXED");
          set(action, "form.fields.usageType.disabled", false);
          const usageTypeData = sortDropdown(filterArrayWithoutMixed, "label", true);
          set(action, "form.fields.usageType.dropDownData", usageTypeData);
        }
        set(action, "form.fields.subUsageType.hideField", true);
      }
      set(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
      if (get(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
        dispatch(
          prepareFormData(
            `${action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0]}usageCategoryMajor`,
            get(state, `common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor`)
          )
        );
      }
    }
    if (propertyType == "VACANT") {
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].noOfFloors`, 1));
    }
    if (propertyType == "SHAREDPROPERTY") {
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].noOfFloors`, 2));
      dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[0].floorNo`, -1));
    }
    if (get(state, `common.prepareFormData.${get(action, "form.fields.occupancy.jsonPath")}`) === "RENTED") {
      set(action, "form.fields.annualRent.hideField", false);
    } else {
      set(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  },
};

export const city = {
  city: {
    id: "city",
    jsonPath: "Properties[0].address.city",
    required: true,
    type: "singleValueList",
    floatingLabelText: "CORE_COMMON_CITY",
    className: "pt-emp-property-address-city",
    disabled: true,
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    fullWidth: true,
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    numcols: 6,
    dataFetchConfig: {
      // url: CITY.GET.URL,
      // action: CITY.GET.ACTION,
      // queryParams: [],
      // requestBody: {
      //   MdmsCriteria: {
      //     tenantId: "pb",
      //     moduleDetails: [
      //       {
      //         moduleName: "tenant",
      //         masterDetails: [
      //           {
      //             name: "tenants",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
      // dataPath: ["MdmsRes.tenant.tenants"],
      dependants: [
        {
          fieldKey: "mohalla",
        },
      ],
    },
    updateDependentFields: ({ formKey, field, dispatch, state }) => {
      dispatch(prepareFormData("Properties[0].tenantId", field.value));
      let requestBody = {
        MdmsCriteria: {
          tenantId: field.value,
          moduleDetails: [
            {
              moduleName: "PropertyTax",
              masterDetails: [
                {
                  name: "Floor",
                },
                {
                  name: "OccupancyType",
                },
                {
                  name: "OwnerShipCategory",
                },
                {
                  name: "OwnerType",
                },
                {
                  name: "PropertySubType",
                },
                {
                  name: "PropertyType",
                },
                {
                  name: "SubOwnerShipCategory",
                },
                {
                  name: "UsageCategoryDetail",
                },
                {
                  name: "UsageCategoryMajor",
                },
                {
                  name: "UsageCategoryMinor",
                },
                {
                  name: "UsageCategorySubMinor",
                },
              ],
            },
          ],
        },
      };

      dispatch(
        fetchGeneralMDMSData(requestBody, "PropertyTax", [
          "Floor",
          "OccupancyType",
          "OwnerShipCategory",
          "OwnerType",
          "PropertySubType",
          "PropertyType",
          "SubOwnerShipCategory",
          "UsageCategoryDetail",
          "UsageCategoryMajor",
          "UsageCategoryMinor",
          "UsageCategorySubMinor",
        ])
      );
    },
  },
};

export const dummy = {
  dummy: {
    numcols: 6,
    type: "dummy",
  },
};

export const houseNumber = {
  houseNumber: {
    id: "house-number",
    jsonPath: "Properties[0].address.doorNo",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
    hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64,
  },
};

export const colony = {
  colony: {
    id: "property-colony",
    jsonPath: "Properties[0].address.buildingName",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME",
    hintText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64,
  },
};

export const street = {
  street: {
    id: "property-street",
    jsonPath: "Properties[0].address.street",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_STREET_NAME",
    hintText: "PT_PROPERTY_DETAILS_STREET_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64,
  },
};

export const mohalla = {
  mohalla: {
    id: "mohalla",
    jsonPath: "Properties[0].address.locality.code",
    type: "autoSuggestDropdown",
    floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    fullWidth: true,
    toolTip: true,
    toolTipMessage: "PT_MOHALLA_TOOLTIP_MESSAGE",
    //toolTipMessage: "Name of the area in which your property is located",
    boundary: true,
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
    dataFetchConfig: {
      url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      action: "",
      queryParams: [],
      requestBody: {},
      isDependent: true,
    },
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    required: true,
    updateDependentFields: ({ formKey, field, dispatch }) => {
      if (field.value && field.value.length > 0) {
        const mohalla = field.dropDownData.find((option) => {
          return option.value === field.value;
        });
        dispatch(prepareFormData("Properties[0].address.locality.area", mohalla.area));
      }
    },
  },
};

export const pincode = {
  pincode: {
    id: "pincode",
    type: "number",
    jsonPath: "Properties[0].address.pincode",
    floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
    hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
    numcols: 6,
    //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
    errorMessage: "Pincode should be 6 digits",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    pattern: "^([0-9]){6}$",
  },
};

export const prepareDropDownData = (master, withOriginal = false) => {
  let dropDownData = [];
  for (var variable in master) {
    if (master.hasOwnProperty(variable)) {
      if (withOriginal) {
        dropDownData.push(master[variable]);
      } else {
        dropDownData.push({ label: master[variable].name, value: master[variable].code });
      }
    }
  }
  return dropDownData;
};

export const getPresentMasterObj = (master1Arr, master2Arr, propToCompare) => {
  const propArray = master2Arr.reduce((result, item) => {
    if (item["code"] && result.indexOf(item["code"]) === -1) {
      result.push(item["code"]);
    }
    return result;
  }, []);
  return master1Arr.filter((item) => propArray.indexOf(item[propToCompare]) !== -1);
};

export const getAbsentMasterObj = (master1Arr, master2Arr, propToCompare) => {
  const propArray = master2Arr.reduce((result, item) => {
    if (item[propToCompare] && result.indexOf(item[propToCompare]) === -1) {
      result.push(item[propToCompare]);
    }
    return result;
  }, []);
  return master1Arr.filter((item) => propArray.indexOf(item.code) === -1);
};

export const mergeMaster = (masterOne, masterTwo, parentName = "") => {
  let dropDownData = [];
  let parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  let masterOneData = getAbsentMasterObj(prepareDropDownData(masterOne, true), prepareDropDownData(masterTwo, true), parentName);
  for (var i = 0; i < masterOneData.length; i++) {
    dropDownData.push({ label: masterOneData[i].name, value: masterOneData[i].code });
  }
  return dropDownData;
};
