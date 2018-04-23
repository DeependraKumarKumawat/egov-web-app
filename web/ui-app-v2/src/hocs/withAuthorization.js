import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import withData from "./withData";
import Header from "modules/common/Header";
import Footer from "modules/common/Footer";

const withAuthorization = (Component, options = {}) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
        window.androidAppProxy.stopSMSReceiver();
      }
    }

    componentWillMount() {
      const { authenticated } = this.props;
      const { redirectionUrl } = options;
      if (!authenticated) {
        this.props.history.replace(redirectionUrl || "/citizen/user/login");
      }
    }

    getUserRole = (userInfo) => {
      return (userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase()) || null;
    };

    render() {
      const { hideHeader, hideFooter, title } = options;
      const { history, authenticated, userInfo } = this.props;
      const role = this.getUserRole(userInfo);
      return (
        <div>
          {!hideHeader && authenticated ? <Header title={title} userInfo={userInfo} role={role} history={history} /> : null}
          <Component {...this.props} />
          {!hideFooter && authenticated ? <Footer history={history} /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    return { authenticated, userInfo };
  };
  // use recompose to make this more readable
  return withRouter(withData(connect(mapStateToProps)(Wrapper)));
};

export default withAuthorization;
