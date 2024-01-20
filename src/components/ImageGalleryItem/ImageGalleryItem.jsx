import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({ onClick, src, description }) => {
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
      <li className={styles.galleryItem} onClick={() => onClick(src)}>
        {imageLoaded ? (
          <img loading="lazy" src={src} alt={description} />
        ) : (
          <Blurhash
            hash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
            width={640}
            height={360}
            punch={1}
          />
        )}
      </li>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.PropTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string,
  description: PropTypes.string,
};
