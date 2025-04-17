import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

import { ImageSrc } from '../../constant';

export const MyImage = ({ x, y, rotation, orientation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = ImageSrc['robot']; // hoặc PNG cũng được
    img.onload = () => setImage(img);
  }, []);

  return (
    image && (
      <Image
        image={image}
        x={x}
        y={y}
        width={40}
        height={40}
        offsetX={20} // để xoay quanh tâm
        offsetY={20}
        rotation={rotation}
      />
    )
  );
};
