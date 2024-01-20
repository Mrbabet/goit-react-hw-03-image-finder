import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ closeModal, imageURL }) => {
  return (
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>
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
