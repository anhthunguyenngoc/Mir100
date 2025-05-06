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

// Tính khoảng cách giữa hai điểm
const getDistance = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

// Nội suy điểm giữa hai điểm theo t (0 <= t <= 1)
const interpolatePoint = (p1, p2, t) => ({
  x: p1.x + (p2.x - p1.x) * t,
  y: p1.y + (p2.y - p1.y) * t,
});

/**
 * Lấy mẫu điểm trên spline theo khoảng cách đều nhau
 * @param {number[]} flatPoints - Mảng phẳng chứa các điểm [x1, y1, x2, y2, ...]
 * @param {number} distance - Khoảng cách giữa các điểm mong muốn
 * @param {number} degree - Bậc của B-Spline
 * @param {number} numSamples - Số lượng điểm ban đầu trên spline để tính toán
 * @returns {number[]} Mảng phẳng các điểm cách đều
 */
export const sampleBSplineByDistance = (
  flatPoints,
  distance = 10,
  degree = 2,
  numSamples = 200
) => {
  if (flatPoints.length < (degree + 1) * 2) return flatPoints;

  // Tính spline với nhiều điểm
  const splineFlat = computeBSpline(flatPoints, degree, numSamples);

  // Chuyển thành mảng điểm {x, y}
  const splinePoints = [];
  for (let i = 0; i < splineFlat.length; i += 2) {
    splinePoints.push({ x: splineFlat[i], y: splineFlat[i + 1] });
  }

  // Lấy mẫu theo khoảng cách đều
  const sampledPoints = [];
  let currentDistance = 0;
  sampledPoints.push(splinePoints[0]);

  for (let i = 1; i < splinePoints.length; i++) {
    const prev = splinePoints[i - 1];
    const curr = splinePoints[i];
    const segmentLength = getDistance(prev, curr);

    if (currentDistance + segmentLength >= distance) {
      const remain = distance - currentDistance;
      const t = remain / segmentLength;
      const newPoint = interpolatePoint(prev, curr, t);
      sampledPoints.push(newPoint);

      // Restart loop from new point
      splinePoints.splice(i, 0, newPoint);
      currentDistance = 0;
    } else {
      currentDistance += segmentLength;
    }
  }

  // Trả về dưới dạng mảng phẳng
  return sampledPoints.flatMap((p) => [p.x, p.y]);
};

const sampleLinearSplineByDistance = (flatPoints, distance = 10) => {
  if (!flatPoints || flatPoints.length < 4) return flatPoints;

  const result = [];
  let current = { x: flatPoints[0], y: flatPoints[1] };
  result.push(current);

  for (let i = 2; i < flatPoints.length; i += 2) {
    const next = { x: flatPoints[i], y: flatPoints[i + 1] };
    let dx = next.x - current.x;
    let dy = next.y - current.y;
    let segmentLength = Math.sqrt(dx * dx + dy * dy);

    while (segmentLength >= distance) {
      const t = distance / segmentLength;
      current = {
        x: current.x + t * dx,
        y: current.y + t * dy,
      };
      result.push(current);

      dx = next.x - current.x;
      dy = next.y - current.y;
      segmentLength = Math.sqrt(dx * dx + dy * dy);
    }

    // Sau đoạn này, điểm hiện tại là gần cuối đoạn, tiếp tục với đoạn kế tiếp
    current = next;
  }

  // Trả kết quả dạng mảng phẳng
  return result.flatMap((p) => [p.x, p.y]);
};

export const samplePSplineByDistance = (
  flatPoints,
  distance = 5,
  degree = 2
) => {
  const splinePoints = computeBSpline(flatPoints, degree, 200); // Trả về mảng phẳng [x1, y1, x2, y2, ...]

  return sampleLinearSplineByDistance(splinePoints, distance);
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
