import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomImageGallery.module.scss';
import { image_url } from '../../api/domain'; // Adjust the import path as needed

const CustomImageGallery = ({ data }) => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsContainerRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const formattedImages = data.map(item => ({
        src: item,
        thumb: item,
        title: item?.title || '',
        description: item?.description || ''
      }));
      setImages(formattedImages);
      setSelectedIndex(0); // Set the first image as the default selected image
    }
  }, [data]);

  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      const thumbnailElement = thumbnailsContainerRef.current.children[selectedIndex];
      if (thumbnailElement) {
        thumbnailsContainerRef.current.scrollTo({
          top: thumbnailElement.offsetTop - thumbnailsContainerRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const selectedImage = images[selectedIndex];

  return (
    <div className={styles.galleryContainer}>
      {/* Thumbnails Column */}
      <div
        className={styles.thumbnailsContainer}
        ref={thumbnailsContainerRef}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            className={`${styles.thumbnail} ${selectedIndex === index ? styles.selectedThumbnail : ''}`}
          />
        ))}
      </div>

      {/* Selected Image Display */}
      <div className={styles.selectedImageContainer}>
        {selectedImage && (
          <div className={styles.imageWrapper}>
            <button onClick={handlePrev} className={`${styles.navButton} ${styles.prevButton}`}>
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.7">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4997 37.5833C11.0648 37.5833 3.41634 29.9348 3.41635 20.5C3.41635 11.0651 11.0648 3.41665 20.4997 3.41665C29.9345 3.41665 37.583 11.0651 37.583 20.5C37.583 29.9348 29.9345 37.5833 20.4997 37.5833ZM11.4273 20.5L18.7913 13.1359L20.6033 14.9479L16.3325 19.2187L29.0413 19.2187L29.0413 21.7812L16.3325 21.7812L20.6033 26.0521L18.7913 27.864L11.4273 20.5Z" fill="#D2D2D2" />
                </g>
              </svg>
            </button>
            <img src={selectedImage.src} alt="Selected" className={styles.selectedImage} />
            <button onClick={handleNext} className={`${styles.navButton} ${styles.nextButton}`}>
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.7">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5003 3.41669C29.9352 3.41669 37.5837 11.0652 37.5837 20.5C37.5837 29.9349 29.9352 37.5834 20.5003 37.5834C11.0655 37.5834 3.41699 29.9349 3.41699 20.5C3.41699 11.0652 11.0655 3.41669 20.5003 3.41669ZM29.5727 20.5L22.2087 27.8641L20.3967 26.0521L24.6675 21.7813H11.9587V19.2188H24.6675L20.3967 14.9479L22.2087 13.136L29.5727 20.5Z" fill="#D2D2D2" />
                </g>
              </svg>
            </button>
          </div>
        )}
        {selectedImage?.title && <h4>{selectedImage.title}</h4>}
        {selectedImage?.description && <p>{selectedImage.description}</p>}
      </div>
    </div>
  );
};

export default CustomImageGallery;