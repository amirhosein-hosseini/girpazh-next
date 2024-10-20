import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { url } from "../../api/domain";


// const images = [
//   {
//     original: gallery1image,
//     thumbnail: gallery1image,
//   },
//   {
//     original: gallery1image,
//     thumbnail: gallery1image,
//   },
//   {
//     original: gallery1image,
//     thumbnail: gallery1image,
//   },
//   // Add more images as needed
// ];



const MyImageGallery = ({data}) => {


  const [images, setImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
        setImages(data.map(item => ({
            original: item,
            thumbnail: item,
        })));
    }
}, [data, url]);


console.log("imageGallery" , images)




    return(
        <div>
        {images && (
          <ImageGallery
            items={images}
            showThumbnails={true}
            showFullscreenButton={false}
            thumbnailPosition="left"
            showIndex={true}
            autoPlay={false}
            infinite={true}
          />
        )}
      </div>
    )
}

export default MyImageGallery;
