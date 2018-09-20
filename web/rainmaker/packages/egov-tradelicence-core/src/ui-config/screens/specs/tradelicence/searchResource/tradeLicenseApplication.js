import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectTextField,
    getCommonContainer,
    getCommonSubHeader,
    getCommonParagraph,
    getPattern
  } from "mihy-ui-framework/ui-config/screens/specs/utils";
  export const tradeLicenseApplication = getCommonCard(
    {
        subHeader:getCommonSubHeader("Search Trade License Application"),
        subParagraph:getCommonParagraph("Please provide at least one parameter to search for an application"),
        appTradeAndMobNumContainer: getCommonContainer({
          applicationNo: getTextField(
            "Application No.",
            "Enter Application No.",
            false,
            "",
            "",
            {},
            {
              xs: 12,
              sm: 4
            }
          ),
          tradeLicenseNo: getTextField(
            "Trade License No.",
            "Enter Trade License No.",
            false,
            "",
            "",
            {},
            {
              xs: 12,
              sm: 4
            }
          ),
          ownerMobNo: getTextField(
            "Owner Mobile No.",
            "Enter your mobile No.",
            false,
            getPattern("MobileNo"),
            "",
            {
              position:"start",
              label:"+91 |",
            },
            {
              xs: 12,
              sm: 4
            }
          )  
        }),
        appStatusAndToFromDateContainer: getCommonContainer({
          applicationStatus: getSelectTextField("Application status", "Select Application Status", false, "","",{},
          {
            xs: 12,
            sm: 4
          }),
          
          fromDate: getTextField(
            "From Date",
            "From Date",
            false,
            getPattern("Date"),
            "",
            {
              position:"end",
              iconName:"date_range"
            },
                
            {
              xs: 12,
              sm: 4
            }
          ),
          toDate: getTextField(
            "To Date",
            "To date",
            false,
            getPattern("Date"),
            "",
            {
              position:"end",
              iconName:"date_range"
            },
            {
              xs: 12,
              sm: 4
            }
          )
          })
  });