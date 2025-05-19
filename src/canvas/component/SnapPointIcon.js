import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Image } from 'react-konva';

function utf8ToBase64(str) {
  return btoa(
    new TextEncoder()
      .encode(str)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}

export const SnapPointIcon = ({
  Icon,
  x,
  y,
  width = 20,
  height = 20,
  color,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const svgString = ReactDOMServer.renderToString(
      <Icon width={width} height={height} color={color} />
    );

    // Bổ sung xmlns nếu thiếu
    const svgWithNamespace = svgString.includes('xmlns')
      ? svgString
      : svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');

    const svgBase64 = utf8ToBase64(svgWithNamespace);
    const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    const img = new window.Image();
    img.src = dataUrl;
    img.onload = () => {
      if (img.width > 0 && img.height > 0) {
        setImage(img);
      } else {
        console.warn('Loaded image has 0 width or height:', dataUrl);
      }
    };
    img.onerror = () => {
      console.warn('Failed to load image:', dataUrl);
    };
  }, [Icon, width, height, color]);

  if (!image || !width || !height || x === undefined || y === undefined)
    return null;

  return image ? (
    <Image
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      offsetX={width / 2}
      offsetY={height / 2}
    />
  ) : null;
};
