import React from "react";
import PropTypes from "prop-types";

const Button = ({ nextPage, label, type, className }) => {
  return (
    <button type={type} className={className} onClick={nextPage}>
      {label}
    </button>
  );
};

export default Button;

Button.PropTypes = {
  nextPage: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
};
