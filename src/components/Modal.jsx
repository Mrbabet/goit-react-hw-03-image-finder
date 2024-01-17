import React from "react";

const Modal = ({ isOpen, onClose, imageURL }) => {
  if (!isOpen) {
    console.log("aaa");
  }
  return (
    <div onClick={onClose} className="overlay">
      <div className="modal">
        <h2>Modal</h2>
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
