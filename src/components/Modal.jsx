import React from "react";

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
