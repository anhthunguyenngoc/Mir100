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
  onMouseEnter,
  onMouseLeave,
  onDblClick,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setImage(img);
      } else {
        console.warn('Loaded image has 0 width or height:', imageSrc);
      }
    };
    img.onerror = () => {
      console.warn('Failed to load image:', imageSrc);
    };
  }, [imageSrc]);

  if (
    !image ||
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    typeof width !== 'number' ||
    typeof height !== 'number' ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  const handleOnClick = (e) => {
    const currentX = e.target.x(); // Lấy tọa độ X hiện tại của Image
    const currentY = e.target.y() - width / 2; // Lấy tọa độ Y hiện tại của Image
    if (onClick) onClick(e, currentX, currentY);
  };

  const handleOnMouseEnter = (e) => {
    const currentX = e.target.x(); // Lấy tọa độ X hiện tại của Image
    const currentY = e.target.y() - width / 2; // Lấy tọa độ Y hiện tại của Image
    if (onMouseEnter) onMouseEnter(e, currentX, currentY);
  };

  const handleOnDblClick = (e) => {
    const currentX = e.target.x(); // Lấy tọa độ X hiện tại của Image
    const currentY = e.target.y() - width / 2; // Lấy tọa độ Y hiện tại của Image
    if (onDblClick) onDblClick(e, currentX, currentY);
  };

  const handleOnMouseLeave = (e) => {
    if (onMouseLeave) onMouseLeave(e);
  };

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
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onDblClick={handleOnDblClick}
      />
    )
  );
};
