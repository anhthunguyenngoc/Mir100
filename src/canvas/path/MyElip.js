import React, { useState, useEffect } from 'react';
import { Ellipse, Group } from 'react-konva';
import { MyCircle } from './MyCircle';

const findElipFromCenterRadius = (p1, p2) => {
  if (!p2) return { x: p1.x, y: p1.y, rx: 0.1, ry: 0.1 };
  const rx = Math.abs(p2.x - p1.x);
  const ry = Math.abs(p2.y - p1.y);
  return { x: p1.x, y: p1.y, rx, ry };
};

const findElipFromRadius = (p1, p2, p3) => {
  if (!p2) return { x: p1.x, y: p1.y, rx: 0.1, ry: 0.1 };

  const centerX = (p1.x + p2.x) / 2;
  const centerY = (p1.y + p2.y) / 2;

  const rx = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / 2;
  if (!p3) return { x: centerX, y: centerY, rx, ry: 0.1 };

  const ry = Math.sqrt(
    Math.pow(p3.x - centerX, 2) + Math.pow(p3.y - centerY, 2)
  );

  return { x: centerX, y: centerY, rx, ry };
};

const calculateElip = (points, mode, x, y, rx, ry) => {
  if (mode === 'cr-elip') {
    return findElipFromCenterRadius(points[0], points[1]);
  } else if (mode === 'r-elip') {
    return findElipFromRadius(points[0], points[1], points[2]);
  } else {
    return { x, y, rx, ry };
  }
};

export const MyElip = ({
  name,
  ref,
  points,
  radiusX,
  radiusY,
  mode,
  x,
  y,
  fill,
  stroke,
  strokeWidth,
  draggable,
  selected,
  isDrawing,
  onDrag,
  onUpdateShape,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const elip = calculateElip(points, mode, x, y, radiusX, radiusY);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Ellipse
        name={name}
        x={elip.x}
        y={elip.y}
        radiusX={elip.rx}
        radiusY={elip.ry}
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
        points.map(
          (point, index) =>
            index % 2 === 0 && (
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
            )
        )}
    </Group>
  );
};
