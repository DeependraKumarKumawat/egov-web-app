import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import _ from "lodash";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

let tableborder = {
  hLineColor: function(i, node) {
    return "#979797";
  },
  vLineColor: function(i, node) {
    return "#979797";
  },
  hLineWidth: function(i, node) {
    return 0.5;
  },
  vLineWidth: function(i, node) {
    return 0.5;
  }
};

let noborder = {
  hLineWidth: function(i, node) {
    return 0;
  },
  vLineWidth: function(i, node) {
    return 0;
  }
};

let borderKey = [true, true, false, true];
let borderValue = [false, true, true, true];
let receiptTableWidth = ["*", "*", "*", "*"];
let payableAmountTable = ["*", "*", "*", "*", "*", "*", "*"];
let payableAmountBorderKey = [true, true, true, true, true, true, true];
let payableInfoTable3 = ["*", "*", "*"];

const getReceiptData = (transformedData, ulbLogo) => {
  var receiptData = {
    content: [
      {
        style: "tl-head",
        table: {
          widths: [50, "*", 100],
          body: [
            [
              {
                image: `${ulbLogo}`,
                width: 50,
                height: 61.25,
                margin: [41, 12, 10, 10]
              },
              {
                //stack is used here to give multiple sections one after another in same body
                stack: [
                  {
                    text: "AMRITSAR MUNICIPAL CORPORATION",
                    style: "receipt-logo-header"
                  },
                  {
                    text: "Trade License Payment Receipt (Citizen Copy)",
                    style: "receipt-logo-sub-header"
                  }
                ],
                alignment: "center",
                margin: [56, 23, 0, 0]
              },
              {
                text: [
                  {
                    text: `Receipt No.\n ${transformedData.receiptNumber}`,
                    bold: true,
                    style: "receipt-no"
                  }
                ],
                alignment: "center",
                margin: [-50, 30, 0, 2]
              }
            ]
          ]
        },
        layout: noborder
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
          {
            text: [
              {
                text: "Application No. ",
                bold: true
              },
              {
                text: `${transformedData.applicationNumber}`,
                bold: false
              }
            ],

            alignment: "left"
          },
          {
            text: [
              {
                text: "Receipt No. ",
                bold: true
              },
              {
                text: `${transformedData.receiptNumber}`,
                bold: false
              }
            ],
            alignment: "right"
          }
        ]
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
          {
            text: [
              {
                text: "Financial Year ",
                bold: true
              },
              {
                text: `${transformedData.financialYear}`,
                bold: false
              }
            ],
            alignment: "left"
          },
          {
            text: [
              {
                text: "Payment Date ",
                bold: true
              },
              {
                text: `${transformedData.paymentDate}`,
                bold: false
              }
            ],
            alignment: "right"
          }
        ]
      },
      { text: "TRADE DETAILS", style: "pt-reciept-citizen-subheader" },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: receiptTableWidth,
          body: [
            [
              {
                text: "Trade Name",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: "Punjabi Dhaba", border: borderValue },
              {
                text: "Trade Category",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: "Goods",
                border: borderValue
              }
            ],
            [
              {
                text: "Trade Type",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: "Type/Sub-Type", border: borderValue },
              {
                text: "Accessories",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: "2",
                border: borderValue
              }
            ]
          ]
        },
        layout: tableborder
      },
      { text: "TRADE LOCATION DETAILS", style: "pt-reciept-citizen-subheader" },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: receiptTableWidth,
          body: [
            [
              {
                text: "House/Door No.",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: `${transformedData.doorNo}`, border: borderValue },
              {
                text: "Building/Colony Name.",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: `${transformedData.buildingName}`,
                border: borderValue
              }
            ],
            [
              {
                text: "Street Name",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: `${transformedData.streetName}`, border: borderValue },
              {
                text: "Locality/Mohalla",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: `${transformedData.locality}`,
                border: borderValue
              }
            ]
          ]
        },
        layout: tableborder
      },
      { text: "OWNERSHIP INFORMATION", style: "pt-reciept-citizen-subheader" },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: receiptTableWidth,
          body: [
            [
              {
                text: "Owner Name",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: `${transformedData.ownerName}`, border: borderValue },
              {
                text: "Mobile No",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: `${transformedData.mobileNo}`,
                border: borderValue
              }
            ]
          ]
        },
        layout: tableborder
      },
      { text: "PAYABLE AMOUNT", style: "pt-reciept-citizen-subheader" },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: payableAmountTable,
          body: [
            [
              {
                text: "License Tax",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Fire Cess",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Rebate/ Penalty",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Interest",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Additional Charges/Rebate",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Exemption",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Total",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              }
            ],
            [
              {
                text: "1600",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "160",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "-60",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "NA",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "NA",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "NA",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: "1700",
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              }
            ]
          ]
        },
        layout: tableborder
      },
      { text: "PAYMENT INFORMATION", style: "pt-reciept-citizen-subheader" },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: receiptTableWidth,
          body: [
            [
              {
                text: "Total Amount Paid:",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: `${transformedData.amountPaid}`, border: borderValue },
              {
                text: "Amount Due:",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: `${transformedData.amountDue}`,
                border: borderValue
              }
            ]
          ]
        },
        layout: tableborder
      },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: payableInfoTable3,
          body: [
            [
              {
                text: "Payment Mode",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Transaction ID/ Cheque/ DD No.",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              },
              {
                text: "Bank Name & Branch",
                border: payableAmountBorderKey,
                style: "receipt-table-key"
              }
            ],
            [
              {
                text: `${transformedData.paymentMode}`,
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: `${transformedData.transactionNumber}`,
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              },
              {
                text: `${transformedData.bankName}, ${
                  transformedData.branchName
                }`,
                border: payableAmountBorderKey,
                style: "receipt-table-value"
              }
            ]
          ]
        },
        layout: tableborder
      },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: receiptTableWidth,
          body: [
            [
              {
                text: "G8 Receipt No:",
                border: borderKey,
                style: "receipt-table-key"
              },
              { text: "1000", border: borderValue },
              {
                text: "G8 Receipt Issue Date:",
                border: borderKey,
                style: "receipt-table-key"
              },
              {
                text: "20/04/2018",
                border: borderValue
              }
            ]
          ]
        },
        layout: tableborder
      },
      {
        style: "pt-reciept-citizen-subheader",
        columns: [
          {
            text: [
              {
                text: "Generated by: ",
                bold: true
              },
              {
                text: "Satpal Dhillon",
                bold: false
              }
            ],
            alignment: "left"
          },
          {
            text: [
              {
                text: "Commissioner/EO",
                bold: true
              }
            ],
            alignment: "right"
          }
        ]
      }
    ],
    footer: [
      {
        text:
          "Note:\n1. Payment received by cheque/demand draft shall be subject to realization.\n2. This document is not a proof of Property Ownership.\n3. This is a computer generated document, hence requires no signature.",
        style: "receipt-footer"
      }
    ],
    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-41, -41, -41, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 13,
        letterSpacing: 1.6,
        margin: [0, 6, 0, 0]
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [30, -20, 0, 0]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      }
    }
  };
  return receiptData;
};

const getCertificateData = (transformedData, ulbLogo) => {
  var tlCertificateData = {
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  {
                    image: `${ulbLogo}`,
                    width: 50,
                    height: 61.25,
                    alignment: "center"
                  },
                  {
                    text: "AMRITSAR MUNICIPAL CORPORATION",
                    style: "receipt-logo-header",
                    margin: [0, 10, 0, 0]
                  },
                  {
                    text:
                      "C Block, Ranjit Avenue, Amritsar\nPunjab. (India)\nFax : +91-183-2503433\nWebsite : www.amritsarcorp.com\nEmail : cmcasr@punjab.gov.in",
                    style: "receipt-logo-sub-text",
                    margin: [0, 8, 0, 0]
                  },
                  {
                    text: "TRADE LICENSE CERTIFICATE",
                    style: "receipt-logo-sub-header",
                    margin: [0, 30, 0, 0]
                  }
                ],
                alignment: "center",
                margin: [0, 0, 0, 0]
              }
            ]
          ]
        },
        layout: noborder
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
          {
            text: [
              {
                text: "Trade License No. "
              },
              {
                text: `${transformedData.licenseNumber}`
              }
            ],
            alignment: "left"
          },
          {
            text: [
              {
                text: "Financial Year "
              },
              {
                text: `${transformedData.financialYear}`
              }
            ],
            alignment: "right"
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            text: [
              {
                text: "Application Number "
              },
              {
                text: `${transformedData.applicationNumber}`
              }
            ],
            alignment: "left"
          },
          {
            text: [
              {
                text: "Receipt Number "
              },
              {
                text: `${transformedData.receiptNumber}`
              }
            ],
            alignment: "right"
          }
        ]
      },
      {
        style: "tl-certificate-data",
        columns: [
          {
            width: 160,
            text: "Trade Name"
          },
          {
            width: "*",
            text: `${transformedData.tradeName}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "Trade Owner Name"
          },
          {
            width: "*",
            text: `${transformedData.ownerName}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "Trade Address"
          },
          {
            width: "*",
            text: `${transformedData.address}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "Trade Type"
          },
          {
            width: "*",
            text: `${transformedData.tradeType}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "Trade License Fee"
          },
          {
            width: "*",
            text: `${transformedData.totalAmount}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "License Issue Date"
          },
          {
            width: "*",
            text: `${transformedData.licenseIssueDate}`
          }
        ]
      },
      {
        style: "tl-certificate-data-2",
        columns: [
          {
            width: 160,
            text: "License Expiry Date"
          },
          {
            width: "*",
            text: `${transformedData.licenseExpiryDate}`
          }
        ]
      },
      {
        style: "tl-certificate-data",
        columns: [
          {
            text: [
              {
                text: "Approved by: "
              },
              {
                text: "Satpal Dhillon"
              }
            ],
            alignment: "left"
          },
          {
            text: [
              {
                text: "Commissioner/EO",
                bold: false
              }
            ],
            alignment: "right"
          }
        ]
      }
    ],
    //define all the styles here
    styles: {
      "pt-reciept-citizen-header": {
        fontSize: 14,
        margin: [0, 24, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data": {
        fontSize: 14,
        margin: [0, 40, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data-2": {
        fontSize: 14,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#1E1E1E",
        fontFamily: "Roboto",
        fontSize: 18,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-text": {
        color: "#656565",
        fontFamily: "Roboto",
        fontSize: 14,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#1E1E1E",
        fontFamily: "Roboto",
        fontSize: 16,
        letterSpacing: 1.6,
        bold: true
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [0, 0, 0, 5]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      }
    }
  };
  return tlCertificateData;
};

const generateReceipt = async (state, dispatch, type) => {
  let data1 = JSON.parse(localStorage.getItem("applicationDataForReceipt"));
  let data2 = JSON.parse(localStorage.getItem("receiptDataForReceipt"));
  let transformedData = {
    ...data1,
    ...data2
  };
  let ulbLogo = localStorage.getItem("base64UlbLogo");
  if (_.isEmpty(data1) || _.isEmpty(data2) || _.isEmpty(transformedData)) {
    return;
  }
  switch (type) {
    case "tlCertificate":
      let certificate_data = getCertificateData(transformedData, ulbLogo);
      certificate_data &&
        pdfMake.createPdf(certificate_data).download("tl_receipt.pdf");
      break;
    case "receipt":
      let receipt_data = getReceiptData(transformedData, ulbLogo);
      receipt_data &&
        pdfMake.createPdf(receipt_data).download("tl_certificate.pdf");
      break;
    default:
      break;
  }
};

export default generateReceipt;
