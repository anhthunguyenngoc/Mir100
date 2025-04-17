import React, { useState, useEffect } from 'react';
import { Line, Group, Arrow } from 'react-konva';
import { MyCircle } from './MyCircle';
import { LineDirection } from '../../constant';

// Hàm tính toán B-Spline bằng thuật toán De Boor
const deBoor = (k, x, t, c, p) => {
  let d = c.map((point) => ({ ...point }));
  for (let r = 1; r <= p; r++) {
    for (let j = k; j > k - p + r - 1; j--) {
      let alpha = (x - t[j]) / (t[j + p - r + 1] - t[j]);
      d[j] = {
        x: (1 - alpha) * d[j - 1].x + alpha * d[j].x,
        y: (1 - alpha) * d[j - 1].y + alpha * d[j].y,
      };
    }
  }
  return d[k];
};

const computeBSpline = (flatPoints, degree = 2, numSamples = 100) => {
  if (flatPoints.length < (degree + 1) * 2) return flatPoints;

  // Chuyển đổi mảng phẳng thành mảng { x, y }
  let points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  let n = points.length - 1;
  let knots = Array(n + degree + 2)
    .fill(0)
    .map((_, i) => i);
  let curvePoints = [];

  for (let i = degree; i <= n; i++) {
    for (let j = 0; j < numSamples; j++) {
      let u = knots[i] + ((knots[i + 1] - knots[i]) * j) / numSamples;
      let point = deBoor(i, u, knots, points, degree);
      if (point) curvePoints.push(point.x, point.y);
    }
  }

  return curvePoints;
};

const getArrowRotation = (points, direction) => {
  const start =
    direction === LineDirection.START_TO_END
      ? {
          x: points[points.length - 4],
          y: points[points.length - 3],
        }
      : {
          x: points[0],
          y: points[1],
        };
  const end =
    direction === LineDirection.START_TO_END
      ? {
          x: points[points.length - 2],
          y: points[points.length - 1],
        }
      : {
          x: points[3],
          y: points[4],
        };

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

export const MySpline = ({
  ref,
  points,
  pointerLength,
  pointerWidth,
  fill,
  dash,
  stroke,
  strokeWidth,
  draggable,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
  onClick,
  selected,
  isDrawing,
  showStartPoint,
  showEndPoint,
  onUpdatePoints,
  direction,
  mode,
  isComplete,
  onDrag,
  onUpdateShape,
  name,
}) => {
  const [hovered, setHovered] = useState(false);

  const displayPoints = (pts) => {
    if (mode && mode.includes('p-')) {
      return pts;
    } else if (mode && mode.includes('cv-')) {
      return computeBSpline(pts);
    }
  };

  return (
    <Group ref={(node) => ref?.(node)}>
      <Line
        points={points}
        stroke="gray"
        strokeWidth={1}
        tension={0}
        lineCap="round"
        dash={[5, 5]}
        closed={isComplete}
      />
      <Line
        name={name}
        points={displayPoints(points)}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        fill={fill}
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke}
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        closed={isComplete}
        onDragEnd={(e) => {
          const spline = e.target;
          const absPos = spline.getAbsolutePosition();

          const newPoints = points.map((point, index) =>
            index % 2 === 0 ? point + absPos.x : point + absPos.y
          );

          onUpdatePoints(newPoints);
          spline.position({ x: 0, y: 0 });
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
        tension={0.5}
      />
      {points.length >= 4 && (
        <Arrow
          x={
            direction === LineDirection.START_TO_END
              ? points[points.length - 2]
              : points[0]
          }
          y={
            direction === LineDirection.START_TO_END
              ? points[points.length - 1]
              : points[1]
          }
          points={[-10, 0, 0, 0]}
          pointerLength={15}
          pointerWidth={10}
          stroke="black"
          fill="black"
          rotation={getArrowRotation(points, direction)}
        />
      )}
      {!isDrawing &&
        points.map(
          (point, index) =>
            index % 2 === 0 && (
              <MyCircle
                x={points[index]}
                y={points[index + 1]}
                radius={6}
                fill="white"
                stroke="blue"
                strokeWidth={1}
                draggable={true}
                isVisible={hovered || selected || showEndPoint}
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
              />
            )
        )}
    </Group>
  );
};
