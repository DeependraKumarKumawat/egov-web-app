import {
  getTextField,
  getCommonContainer,
  getCommonSubHeader,
  getDateField
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { payeeDetails } from "./payeeDetails";

export const chequeDetails = getCommonContainer({
  chequeNo: getTextField("Cheque No", "Enter Cheque  no.", true, ""),
  chequeDate: getDateField("Cheque Date", "dd/mm/yy", true, ""),
  chequeIFSC: getTextField("IFSC", "Enter bank IFSC", true, "")
});

export const cheque = getCommonContainer({
  payeeDetails,
  header: getCommonSubHeader("Cheque Details: "),
  chequeDetails
});
