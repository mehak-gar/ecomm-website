import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export type Effects='blur' | 'black-and-white' | 'opacity' 
interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: ()=>void;
   width?:number;
   height?:number;
   style?:React.CSSProperties;
   Effect?:Effects
}

const LazyLoadingImage = (image: ImageProps) => {
  return (
    <>
      <LazyLoadImage
        src={image?.src}
        alt={image.alt}
        className={image.className}
         effect={image?.Effect}
        onClick={image.onClick}
        // placeholderSrc={`/images/cokarma.png`}
        wrapperClassName={`${image.className}`}
        visibleByDefault={false}
        width={image?.width ?? '100%'}
        height={image?.height ?? "100%"}
        style={image?.style}
      />
    </>
  );
};

export default LazyLoadingImage;
