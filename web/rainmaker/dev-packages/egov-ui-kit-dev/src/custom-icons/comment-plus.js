import React from "react";
import SvgIcon from "material-ui/SvgIcon";

const CommentPlus = (props) => {
  return (
    <SvgIcon className="custom-icon" viewBox="0 -8 24 24" {...props}>
      <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22H9M11,6V9H8V11H11V14H13V11H16V9H13V6H11Z" />
    </SvgIcon>
  );
};

export default CommentPlus;
