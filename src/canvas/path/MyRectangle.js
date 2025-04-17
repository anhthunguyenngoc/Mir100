import React, { useState, useEffect } from 'react';
import { Rect, Group } from 'react-konva';
import { MyCircle } from './MyCircle';

export const MyRectangle = ({
  name,
  ref,
  width,
  height,
  mode,
  fill,
  stroke,
  strokeWidth,
  draggable,
  selected,
  isDrawing,
  onDrag,
  startP,
  endP,
  onClick,
  onUpdateShape,
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    onUpdateShape({
      width: Math.abs(endP.x - startP.x),
      height: Math.abs(endP.y - startP.y),
    });
  }, [startP, endP]);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Rect
        name={name}
        x={startP && endP && Math.min(startP.x, endP.x)}
        y={startP && endP && Math.min(startP.y, endP.y)}
        width={width}
        height={height}
        fill={fill}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke}
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        onMouseEnter={(e) => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={(e) => {
          onClick?.(e);
        }}
      />
      {!isDrawing &&
        [startP, endP].map((point, index) => (
          <MyCircle
            x={point.x}
            y={point.y}
            radius={6}
            fill="white"
            stroke="blue"
            strokeWidth={1}
            draggable={true}
            isVisible={!isDrawing && (hovered || selected)}
            onDragEnd={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0 ? { startP: newPos } : { endP: newPos }
              );
            }}
            onDragMove={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0 ? { startP: newPos } : { endP: newPos }
              );
            }}
            hitboxVisible={!isDrawing}
          />
        ))}
    </Group>
  );
};
