import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen, ModuleLandingPage } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { resetFiles, removeForm } from "egov-ui-kit/redux/form/actions";
import { mapCompIDToName } from "egov-ui-kit/utils/commons";
import { Image } from "components";
import logo from "egov-ui-kit/assets/images/punjab-logo.png";
import orderby from "lodash/orderBy";
import "./index.css";
import ComplaintsIcon from "@material-ui/icons/LibraryBooks";
import AddIcon from "@material-ui/icons/Add";

const cardItems = [
  {
    label: "CS_HOME_FILE_COMPLAINT",
    icon: <AddIcon />,
    route: "/add-complaint"
  },
  {
    label: "CS_HOME_MY_COMPLAINTS",
    icon: <ComplaintsIcon />,
    route: "/my-complaints"
  }
];
class Home extends Component {
  componentDidMount = () => {
    const { fetchComplaints, resetFiles, removeForm } = this.props;
    fetchComplaints([], false);
    if (this.props.form && this.props.form.complaint) {
      resetFiles("reopenComplaint");
      removeForm("complaint");
    }
  };

  render() {
    const { updates, history } = this.props;
    return (
      <Screen className="homepage-screen">
        <ModuleLandingPage items={cardItems} history={history} />
        <Label
          label="CS_HOME_UPDATES"
          dark={true}
          fontSize={16}
          fontWeight={900}
          bold={true}
          containerStyle={{ paddingLeft: 8, paddingTop: 16, paddingBottom: 8 }}
        />
        <div style={{ padding: "0px 8px" }}>
          <Notifications updates={updates} history={history} />
        </div>
      </Screen>

      // <Screen className="homepage-screen">
      //   {/* <div className="home-page-top-banner-cont">
      //     <div className="banner-image">
      //       <div className="banner-overlay" />
      //       <div className="logo-wrapper user-logo-wrapper">
      //         <Image className="mseva-logo" source={`${logo}`} />
      //       </div>
      //     </div>
      //   </div> */}
      //   <div className="home-page-cont">
      //     <div>
      //       <NewAndOldComplaints history={history} />
      //       <Notifications updates={updates} history={history} />
      //     </div>
      //   </div>
      // </Screen>
    );
  }
}
const mapStateToProps = state => {
  const complaints = state.complaints || {};
  const { form } = state || {};
  let updates = [];
  Object.keys(complaints.byId).forEach((complaintKey, index) => {
    let complaintObj = {};
    let complaintactions =
      complaints.byId[complaintKey].actions &&
      complaints.byId[complaintKey].actions.filter(
        complaint => complaint.status
      );
    complaintObj.status = complaints.byId[complaintKey].status;
    complaintObj.action = complaintactions && complaintactions[0].action;
    complaintObj.title = mapCompIDToName(
      complaints.categoriesById,
      complaints.byId[complaintKey].serviceCode
    );
    complaintObj.date = complaints.byId[complaintKey].auditDetails.createdTime;
    complaintObj.number = complaintKey;
    updates.push(complaintObj);
  });
  var closedComplaints = orderby(
    updates.filter(
      complaint =>
        complaint.status && complaint.status.toLowerCase() === "closed"
    ),
    ["date"],
    ["desc"]
  );
  var nonClosedComplaints = orderby(
    updates.filter(
      complaint =>
        complaint.status && complaint.status.toLowerCase() != "closed"
    ),
    ["date"],
    ["desc"]
  );
  return { form, updates: [...nonClosedComplaints, ...closedComplaints] };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComplaints: (criteria, hasUsers) =>
      dispatch(fetchComplaints(criteria, hasUsers)),
    resetFiles: formKey => dispatch(resetFiles(formKey)),
    removeForm: formKey => dispatch(removeForm(formKey))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
