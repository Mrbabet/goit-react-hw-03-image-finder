import React from "react";

const ImageGalleryItem = ({ src }) => {
  return (
    <li className="gallery-item">
      <img src={src} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
