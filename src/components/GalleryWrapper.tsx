import React, { useEffect, useState } from "react";
import ImageLightbox from "@components/ImageLightbox";

const GalleryWrapper = ({ images, bucketUrl }: any) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  // Transform the image objects into full URLs
  const imageUrls =
    images?.map((img: { url: any }) => `${bucketUrl}/${img.url}`) || [];

  // Find index of first image containing "main"
  const mainImageIndex = imageUrls.findIndex((url: string) =>
    url.toLowerCase().includes("main")
  );
  // Use -1 check in case no matches are found
  const indexToUse = mainImageIndex !== -1 ? mainImageIndex : 0;

  const handleImageClick = (index: any) => {
    setInitialIndex(index);
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div className="lg:col-span-2">
        <img
          src={imageUrls[indexToUse]}
          alt="Main gallery image"
          className="w-full h-96 object-cover object-center rounded-lg cursor-pointer"
          onClick={() => handleImageClick(indexToUse)}
          loading="lazy"
        />
      </div>
      <div className="grid sm:grid-cols-1 grid-cols-none sm:grid-flow-row grid-flow-col auto-cols-[33.3%] sm:gap-4 gap-2 max-h-96 overflow-scroll">
        {imageUrls.slice(1).map((url: any, index: any) => (
          <img
            key={index}
            src={url}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full sm:aspect-auto aspect-square sm:h-28 object-cover rounded-md cursor-pointer"
            onClick={() => handleImageClick(index + 1)}
            loading="lazy"
          />
        ))}
      </div>

      {isLightboxOpen && (
        <ImageLightbox
          images={imageUrls}
          initialIndex={initialIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default GalleryWrapper;
