import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ results }) => {
  return (
    <>
      <ul className="gallery">
        {results.map((result) => {
          return (
            <ImageGalleryItem
              key={result.id}
              webformatURL={result.webformatURL}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
