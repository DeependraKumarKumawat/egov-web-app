import {
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  getCommonContainer,
  getCommonCaption
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

export const getApprovalDetails = () => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: {
          gridDefination: {
            xs: "12",
            sm: "10"
          },
          ...getCommonSubHeader("Approval/Rejection Details")
        },
        viewOne: getCommonContainer({
          reviewLicenceType: getLabelWithValue(
            "Approved By",
            "Sukhwindar Singh"
          ),
          reviewTradeName: getLabelWithValue(
            "Approval Comments",
            "asdfgfdsafsds"
          )
        }),
        viewTow: getCommonContainer({
          lbl: {
            gridDefination: {
              xs: 12
            },
            props: {
              style: {
                padding: "12px 24px 12px 0"
              }
            },
            ...getCommonCaption("Uploaded Documents")
          },
          documents: {
            uiFramework: "custom-molecules",
            componentPath: "MultiDownloadCard",
            props: {
              data: [
                {
                  title: "Document-1",
                  name: "Filename.jpg",
                  link:
                    "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
                  linkText: "View"
                },
                {
                  title: "Document-2",
                  name: "Filename.jpg",
                  link:
                    "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
                  linkText: "View"
                }
              ]
            }
          }
        })
      }
    }
  });
};
