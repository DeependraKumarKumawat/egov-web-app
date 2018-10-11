import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { applicationSuccessFooter } from "./acknowledgementResource/applicationSuccessFooter";
import { paymentSuccessFooter } from "./acknowledgementResource/paymentSuccessFooter";
import { approvalSuccessFooter } from "./acknowledgementResource/approvalSuccessFooter";
import { gotoHomeFooter } from "./acknowledgementResource/gotoHomeFooter";
import acknowledgementCard from "./acknowledgementResource/acknowledgementUtils";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import {
  loadUlbLogo,
  loadApplicationData,
  loadReceiptData,
  loadMdmsData
} from "../utils/receiptTransformer";
import set from "lodash/set";

/** Data used for creation of receipt is generated and stored in local storage here */
const loadReceiptGenerationData = (applicationNumber, tenant) => {
  /** Logo loaded and stored in local storage in base64 */
  loadUlbLogo(tenant); //pb.amritsar
  loadApplicationData(applicationNumber, tenant); //PB-TL-2018-09-27-000004
  loadReceiptData(applicationNumber, tenant); //PT-107-001330:AS-2018-08-29-001426     //PT consumerCode
  loadMdmsData(tenant);
};

const getAcknowledgementCard = (
  purpose,
  status,
  applicationNumber,
  secondNumber,
  tenant
) => {
  if (purpose === "apply" && status === "success") {
    return {
      header: getCommonHeader({
        labelName: "Application for New Trade License (2018-2019)",
        labelKey: "TL_COMMON_APPL_NEW_LIC"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: "Application Submitted Successfully",
            body:
              "A copy of application confirmation has been sent to trade owner at registered Mobile No.",
            tailText: "Application No.",
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: applicationSuccessFooter(
        applicationNumber,
        tenant
      )
    };
  } else if (purpose === "pay" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Payment for New Trade License (2018-2019)",
          labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: "Payment has been collected successfully!",
            body:
              "A copy of receipt has been sent to trade owner at registered Mobile No.",
            tailText: "Payment Receipt No.",
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter
    };
  } else if (purpose === "approve" && status === "success") {
    loadReceiptGenerationData(applicationNumber, tenant);
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: "Trade License Approved Successfully",
            body:
              "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
            tailText: "Trade License No.",
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: "Trade License Application Rejected",
            body:
              "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No."
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: getCommonContainer({
        header: getCommonHeader({
          labelName: "Trade License Application (2018-2019)",
          labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: "Trade License Cancelled",
            body:
              "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
            tailText: "Trade License No.",
            number: secondNumber
          })
        }
      },
      gotoHomeFooter
    };
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const purpose = getQueryArg(window.location.href, "purpose");
    const status = getQueryArg(window.location.href, "status");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const secondNumber = getQueryArg(window.location.href, "secondNumber");
    const tenant = getQueryArg(window.location.href, "tenantId");
    const data = getAcknowledgementCard(
      purpose,
      status,
      applicationNumber,
      secondNumber,
      tenant
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;
