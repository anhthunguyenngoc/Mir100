import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

import { ImageSrc } from '../../constant';

export const MyImage = ({
  x,
  y,
  rotation,
  imageSrc,
  width,
  height,
  onClick,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      if (img.width > 0 && img.height > 0) {
        setImage(img);
      } else {
        console.warn('Loaded image has 0 width or height:', imageSrc);
      }
    };
    img.onerror = () => {
      console.warn('Failed to load image:', imageSrc);
    };
  }, [imageSrc]);

  if (!image || !width || !height || x === undefined || y === undefined)
    return null;

  return (
    image && (
      <Image
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        offsetX={width / 2} // để xoay quanh tâm
        offsetY={height / 2}
        rotation={-rotation}
        onClick={() => onClick?.()}
      />
    )
  );
};
