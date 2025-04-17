import React, { useState, useRef } from 'react';
import { Line, Group } from 'react-konva';
import { MyCircle } from './MyCircle';

export const MyPolygon = ({
  name,
  ref,
  points,
  isComplete,
  fill,
  stroke,
  strokeWidth,
  draggable,
  selected,
  isDrawing,
  onDrag,
  dash,
  onDragStart,
  onUpdatePoints,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onUpdateShape,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Line
        name={name}
        points={points.flatMap((p) => [p.x, p.y])}
        closed={isComplete}
        fill={fill}
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        onDragEnd={(e) => {
          const line = e.target;
          const absPos = line.getAbsolutePosition(); // Lấy vị trí tuyệt đối của line

          const newPoints = points.map((point) => {
            return {
              x: point.x + absPos.x,
              y: point.y + absPos.y,
            };
          });

          onUpdatePoints(newPoints);
          // Reset vị trí của line về (0,0) để tránh bị lệch
          line.position({ x: 0, y: 0 });
        }}
        onMouseEnter={(e) => {
          if (!isDrawing) {
            setHovered(true);
            onMouseEnter?.(e);
          }
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        onClick={(e) => {
          onClick?.(e);
        }}
        onDragStart={() => {
          onDragStart?.();
        }}
      />
      {!isDrawing &&
        points.map((point, index) => (
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
