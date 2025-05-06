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
    const img = new window.Image();
    img.src = imageSrc; // hoặc PNG cũng được
    img.onload = () => setImage(img);
  }, []);

  if (!width || !height || !x || !y) return;

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
