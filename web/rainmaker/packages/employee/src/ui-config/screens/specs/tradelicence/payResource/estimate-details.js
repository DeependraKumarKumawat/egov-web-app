import { getCommonGrayCard } from "mihy-ui-framework/ui-config/screens/specs/utils";

const estimate = getCommonGrayCard({
  estimateSection: {
    uiFramework: "custom-molecules-local",
    componentPath: "FeesEstimateCard",
    props: {
      estimate: {
        header: "Trade License Fee",
        fees: [],
        extra: [
          { textLeft: "Last Date for Rebate (20% of TL)" },
          {
            textLeft: "Penalty (10% of TL) applicable from"
          },
          { textLeft: "Additoinal Penalty (20% of TL) applicable from" }
        ]
      }
    }
  }
});

export default estimate;
