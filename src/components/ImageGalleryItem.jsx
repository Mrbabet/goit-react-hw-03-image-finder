import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import LazyLoad from "react-lazy-load";

const ImageGalleryItem = ({ src, description }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <li className="gallery-item">
        {imageLoaded ? (
          <LazyLoad width={640} height={420} threshold={0.95}>
            <img loading="lazy" src={src} alt={description} />
          </LazyLoad>
        ) : (
          <Blurhash
            hash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
            width={640}
            height={420}
            punch={1}
          />
        )}
      </li>
    </>
  );
};

export default ImageGalleryItem;
