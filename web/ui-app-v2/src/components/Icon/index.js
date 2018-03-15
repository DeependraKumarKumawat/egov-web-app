import React from "react";
import PropTypes from "prop-types";

const Icon = ({ action, className, name, style = {}, color, onClick }) => {
  let error = "";
  try {
    let WrappedIcon = null;

    if (action === "custom") {
      WrappedIcon = require(`../../custom-icons/${name}`).default;
    } else {
      WrappedIcon = require(`material-ui/svg-icons/${action}/${name}`).default;
    }
    return <WrappedIcon className={className} style={{ ...style }} color={color} onClick={onClick} />;
  } catch (error) {}
  throw new Error("Icon not found");
};

Icon.propTypes = {
  className: PropTypes.string,
  action: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;
