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

  const extendFactor = 0; // Giảm độ kéo dài để tránh vượt quá

  // Bước 1: Chuyển mảng phẳng thành mảng {x, y}
  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const extendedPoints = [];

  // Bước 2: Kéo dài điểm đầu
  const p0 = points[0];
  const p1 = points[1];
  const dx0 = p0.x - p1.x;
  const dy0 = p0.y - p1.y;
  extendedPoints.push({
    x: p0.x + dx0 * extendFactor,
    y: p0.y + dy0 * extendFactor,
  });

  // Thêm các điểm gốc
  extendedPoints.push(...points);

  // Bước 3: Kéo dài điểm cuối
  const pn = points[points.length - 1];
  const pn1 = points[points.length - 2];
  const dxn = pn.x - pn1.x;
  const dyn = pn.y - pn1.y;
  extendedPoints.push({
    x: pn.x + dxn * extendFactor,
    y: pn.y + dyn * extendFactor,
  });

  // Bước 4: Tạo knot vector đều
  const n = extendedPoints.length - 1;
  const knots = Array(n + degree + 2)
    .fill(0)
    .map((_, i) => i);

  // Bước 5: Tính điểm trên spline
  const curvePoints = [];
  for (let i = degree; i <= n; i++) {
    for (let j = 0; j < numSamples; j++) {
      const u = knots[i] + ((knots[i + 1] - knots[i]) * j) / numSamples;
      const point = deBoor(i, u, knots, extendedPoints, degree);
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

/**
 * Lấy mẫu đều theo độ dài cung trên đường spline Catmull-Rom
 * @param {number[]} flatPoints - [x1, y1, x2, y2, ...]
 * @param {number} distance - Khoảng cách giữa các điểm lấy mẫu
 * @param {number} samplesPerSegment - Số điểm nội suy mỗi đoạn
 * @returns {number[]} - [x1, y1, x2, y2, ...]
 */
export function samplePSplineByDistance(
  flatPoints,
  distance = 10,
  samplesPerSegment = 100
) {
  if (flatPoints.length < 4) return flatPoints;

  // 1. Chuyển về mảng point [{x, y}]
  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const interpolated = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    for (let j = 0; j <= samplesPerSegment; j++) {
      const t = j / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      interpolated.push({ x, y });
    }
  }

  // 2. Tính độ dài cung tích lũy
  const arcLengths = [0];
  for (let i = 1; i < interpolated.length; i++) {
    const dx = interpolated[i].x - interpolated[i - 1].x;
    const dy = interpolated[i].y - interpolated[i - 1].y;
    arcLengths[i] = arcLengths[i - 1] + Math.hypot(dx, dy);
  }

  // 3. Lấy điểm tại các mốc cung mong muốn
  const result = [];
  const totalLength = arcLengths[arcLengths.length - 1];
  let currentTarget = 0;

  while (currentTarget <= totalLength) {
    // Tìm chỉ số gần nhất theo cung
    let low = 0,
      high = arcLengths.length - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arcLengths[mid] < currentTarget) low = mid + 1;
      else high = mid;
    }

    const idx = Math.max(1, low);
    const l1 = arcLengths[idx - 1];
    const l2 = arcLengths[idx];
    const p1 = interpolated[idx - 1];
    const p2 = interpolated[idx];
    const t = (currentTarget - l1) / (l2 - l1);

    const x = p1.x + (p2.x - p1.x) * t;
    const y = p1.y + (p2.y - p1.y) * t;
    result.push(x, y);

    currentTarget += distance;
  }

  return result;
}

function computePSpline(flatPoints, numSamples = 20, alpha = 0.0) {
  if (flatPoints.length < 4) return flatPoints;

  // Bước 1: Convert sang mảng điểm
  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const curvePoints = [];

  // Bước 2: Lặp qua các đoạn Catmull-Rom
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]; // Nếu không có thì lặp lại
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1]; // Nếu không có thì lặp lại

    for (let j = 0; j <= numSamples; j++) {
      const t = j / numSamples;

      // Catmull-Rom với hệ số alpha (centripetal: 0.5 là tốt nhất)
      const t0 = 0;
      const t1 = getT(t0, p0, p1, alpha);
      const t2 = getT(t1, p1, p2, alpha);
      const t3 = getT(t2, p2, p3, alpha);

      const tt = t1 + (t2 - t1) * t;

      const A1 = interpolate(
        p0,
        p1,
        (t1 - tt) / (t1 - t0),
        (tt - t0) / (t1 - t0)
      );
      const A2 = interpolate(
        p1,
        p2,
        (t2 - tt) / (t2 - t1),
        (tt - t1) / (t2 - t1)
      );
      const A3 = interpolate(
        p2,
        p3,
        (t3 - tt) / (t3 - t2),
        (tt - t2) / (t3 - t2)
      );

      const B1 = interpolate(
        A1,
        A2,
        (t2 - tt) / (t2 - t0),
        (tt - t0) / (t2 - t0)
      );
      const B2 = interpolate(
        A2,
        A3,
        (t3 - tt) / (t3 - t1),
        (tt - t1) / (t3 - t1)
      );

      const C = interpolate(
        B1,
        B2,
        (t2 - tt) / (t2 - t1),
        (tt - t1) / (t2 - t1)
      );

      curvePoints.push(C.x, C.y);
    }
  }

  return curvePoints;
}

function getT(ti, p0, p1, alpha) {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return ti + Math.pow(Math.sqrt(dx * dx + dy * dy), alpha);
}

function interpolate(p1, p2, w1, w2) {
  return {
    x: p1.x * w1 + p2.x * w2,
    y: p1.y * w1 + p2.y * w2,
  };
}

export const MySpline = ({
  ref,
  points,
  pointerLength,
  pointerWidth,
  pointRadius,
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
      return computePSpline(pts);
    } else if (mode && mode.includes('cv-')) {
      return computeBSpline(pts);
    }
  };

  return (
    <Group ref={(node) => ref?.(node)}>
      <Line
        points={points}
        stroke="gray"
        strokeWidth={strokeWidth}
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

          onUpdateShape({ points: newPoints });
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
          pointerLength={pointerLength}
          pointerWidth={pointerWidth}
          strokeWidth={strokeWidth}
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
                radius={pointRadius}
                fill="white"
                stroke="blue"
                strokeWidth={strokeWidth}
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
