import React from "react";
import PropTypes from "prop-types";

const Modal = ({ closeModal, imageURL }) => {
  return (
    <div onClick={closeModal} className="overlay">
      <div className="modal">
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.PropTypes = {
  closeModal: PropTypes.func,
  imageURL: PropTypes.string,
};
