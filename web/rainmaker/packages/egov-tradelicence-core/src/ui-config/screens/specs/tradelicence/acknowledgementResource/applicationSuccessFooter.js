import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const applicationSuccessFooter = getCommonApplyFooter({
  downloadFormButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "290px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadFormButtonLabel: getLabel("DOWNLOAD CONFIRMATION FORM")
    }
  },
  printFormButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      printFormButtonLabel: getLabel("PRINT CONFIRMATION FORM")
    }
  },
  collectPaymentButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      collectPaymentButtonLabel: getLabel("COLLECT PAYMENT")
    },
    onClickDefination:{
      action: "page_change",
      path: "/landing/mihy-ui-framework/tradelicence/pay"
    }
  }
});
