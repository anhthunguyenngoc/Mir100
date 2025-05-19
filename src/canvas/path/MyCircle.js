import React, { useEffect, useState } from 'react';
import { Circle, Group } from 'react-konva';

const findCircleFromCenterRadius = (p1, p2) => {
  if (!p2) return { x: p1.x, y: p1.y, radius: 0.1 };
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return { x: p1.x, y: p1.y, radius: Math.sqrt(dx * dx + dy * dy) };
};

const findCircleFromCenterDiameter = (p1, p2) => {
  if (!p2) return { x: p1.x, y: p1.y, radius: 0.1 };
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return { x: p1.x, y: p1.y, radius: Math.sqrt(dx * dx + dy * dy) / 2 };
};

const findCircle2Points = (p1, p2) => {
  if (!p2) return { x: p1.x, y: p1.y, radius: 0.1 };
  const centerX = (p1.x + p2.x) / 2;
  const centerY = (p1.y + p2.y) / 2;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return { x: centerX, y: centerY, radius: Math.sqrt(dx * dx + dy * dy) / 2 };
};

const findCircle3Points = (A, B, C) => {
  if (!B || !C) return { x: A.x, y: A.y, radius: 0.1 };
  const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  if (D === 0) return;
  const Ux =
    ((A.x * A.x + A.y * A.y) * (B.y - C.y) +
      (B.x * B.x + B.y * B.y) * (C.y - A.y) +
      (C.x * C.x + C.y * C.y) * (A.y - B.y)) /
    D;
  const Uy =
    ((A.x * A.x + A.y * A.y) * (C.x - B.x) +
      (B.x * B.x + B.y * B.y) * (A.x - C.x) +
      (C.x * C.x + C.y * C.y) * (B.x - A.x)) /
    D;
  const radius = Math.sqrt((A.x - Ux) ** 2 + (A.y - Uy) ** 2);
  return { x: Ux, y: Uy, radius };
};

const calculateCircle = (points, mode, x, y, radius) => {
  if (mode === 'cr-circle') {
    return findCircleFromCenterRadius(points[0], points[1]);
  } else if (mode === 'cd-circle') {
    return findCircleFromCenterDiameter(points[0], points[1]);
  } else if (mode === '2p-circle') {
    return findCircle2Points(points[0], points[1]);
  } else if (mode === '3p-circle') {
    return findCircle3Points(points[0], points[1], points[2]);
  } else {
    return { x, y, radius };
  }
};

export const MyCircle = ({
  name,
  points,
  x,
  y,
  radius,
  fill,
  stroke,
  strokeWidth,
  draggable,
  onDragMove,
  onDragEnd,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
  selected,
  isVisible,
  dragBoundFunc,
  hitboxVisible,
  mode,
  ref,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const [showCircle, setShowCircle] = useState(false);

  useEffect(() => {
    setShowCircle(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [hovered]);

  const circle = calculateCircle(points, mode, x, y, radius);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Circle //hitbox
        x={circle.x}
        y={circle.y}
        radius={circle.radius + 10}
        visible={hitboxVisible}
        onMouseEnter={() => {
          setShowCircle(true);
          onMouseEnter?.(circle.x, circle.y);
        }}
        onMouseLeave={() => {
          // setShowCircle(false);
          onMouseLeave?.();
        }}
      />
      <Circle
        name={name}
        x={circle.x}
        y={circle.y}
        radius={circle.radius}
        fill={fill}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke}
        strokeWidth={hovered ? strokeWidth + 1 : strokeWidth}
        draggable={draggable}
        visible={showCircle}
        onDragEnd={(e) => {
          onDragEnd?.(e.target.x(), e.target.y());
        }}
        onMouseEnter={(e) => {
          setShowCircle(true);
          setHovered(true);
          onMouseEnter?.(e.target.x(), e.target.y());
        }}
        onMouseLeave={() => {
          // setShowCircle(false);
          setHovered(false);
          onMouseLeave?.();
        }}
        onMouseUp={() => {
          setHovered(false);
          onMouseUp?.(x, y);
        }}
        onDragMove={(e) => {
          onDragMove?.(e.target.x(), e.target.y());
        }}
        onDragStart={() => {
          onDragStart?.();
        }}
        dragBoundFunc={(pos) => {
          return dragBoundFunc ? dragBoundFunc(pos) : pos;
        }}
        onClick={(e) => {
          onClick?.(e);
        }}
      />
    </Group>
  );
};
