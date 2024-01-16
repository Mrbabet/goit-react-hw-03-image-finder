import React from "react";

const ImageGalleryItem = ({ src, description }) => {
  return (
    <li className="gallery-item">
      <img src={src} alt={description} />
    </li>
  );
};

export default ImageGalleryItem;
