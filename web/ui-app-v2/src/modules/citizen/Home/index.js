import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "modules/common/Banner";
import Notifications from "./components/Notifications";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import "./index.css";

//
class Home extends Component {
  notifications = [
    {
      title: "Pay your water & sewerage tax",
      amountDue: "₹1,732",
      dueDate: "24th May 2018",
      date: "24th May 2018",
      status: "Resolved",
    },
  ];

  render() {
    const { notifications } = this;
    return (
      <Banner className="homepage-banner">
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <SearchService />
            <ServiceList />
            <Notifications notifications={notifications} />
          </div>
        </div>
      </Banner>
    );
  }
}

export default Home;
