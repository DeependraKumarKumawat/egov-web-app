import React, { Component } from "react";
import { List } from "../../../../components";
import Send from "material-ui/svg-icons/content/send";
import MaterialUITextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../assets/images/faceOne.jpg";

import "./index.css";

const iconStyle = {
  marginLeft: "20px",
  height: "27px",
  width: "27px",
  transform: "rotate(-15deg)",
  marginBottom: "5px",
};

const textFieldStyle = {
  backgroundColor: "transparent",
  border: "none",
  height: "38px",
  fontSize: "14px",
};

const itemsOne = [
  {
    leftAvatar: <Avatar src={faceOne} />,
    primaryText: (
      <div className="write-comment-align-ComplaintTimeLine rainmaker-list-right-item-overide-style">
        <MaterialUITextField
          hintText="Write your comments..."
          style={textFieldStyle}
          onChange={() => {
            console.log("test");
          }}
          className="write-complaint-chat-field"
          fullWidth={true}
          multiLine={true}
          underlineShow={false}
          hintStyle={{ bottom: "8px" }}
        />
        <Send style={iconStyle} color={"#00bcd1"} />
      </div>
    ),
  },
];

class WriteComment extends Component {
  render() {
    return <List items={itemsOne} />;
  }
}

export default WriteComment;
