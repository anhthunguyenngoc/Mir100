import React, { useState, useEffect } from 'react';
import { Arc, Arrow, Group } from 'react-konva';
import { MyCircle } from './MyCircle';
import { LineDirection } from '../../constant';

export const arcCalculateAngle = (center, end) => {
  let angle = (Math.atan2(end.y - center.y, end.x - center.x) * 180) / Math.PI;
  return angle;
};

export const calculateDistance = (p1, p2) => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

const findCircleFromThreePoints = (p1, p2, p3) => {
  const A =
    p1.x * (p2.y - p3.y) - p1.y * (p2.x - p3.x) + p2.x * p3.y - p3.x * p2.y;
  if (A === 0) return null;

  const B =
    (p1.x ** 2 + p1.y ** 2) * (p3.y - p2.y) +
    (p2.x ** 2 + p2.y ** 2) * (p1.y - p3.y) +
    (p3.x ** 2 + p3.y ** 2) * (p2.y - p1.y);

  const C =
    (p1.x ** 2 + p1.y ** 2) * (p2.x - p3.x) +
    (p2.x ** 2 + p2.y ** 2) * (p3.x - p1.x) +
    (p3.x ** 2 + p3.y ** 2) * (p1.x - p2.x);

  const centerX = -B / (2 * A);
  const centerY = -C / (2 * A);
  const radius = Math.sqrt((centerX - p1.x) ** 2 + (centerY - p1.y) ** 2);

  let startAngle = (Math.atan2(p1.y - centerY, p1.x - centerX) * 180) / Math.PI;
  let midAngle = (Math.atan2(p2.y - centerY, p2.x - centerX) * 180) / Math.PI;
  let endAngle = (Math.atan2(p3.y - centerY, p3.x - centerX) * 180) / Math.PI;

  if (startAngle < 0) startAngle += 360;
  if (midAngle < 0) midAngle += 360;
  if (endAngle < 0) endAngle += 360;

  let clockwise =
    endAngle > startAngle
      ? midAngle > startAngle && midAngle < endAngle
      : midAngle > startAngle || midAngle < endAngle;

  if (!clockwise) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  return {
    startP: p1,
    midP: p2,
    endP: p3,
    centerP: { x: centerX, y: centerY },
    radius,
    startAngle,
    endAngle,
    clockwise,
  };
};

const findCircleFromCenter = (start, center, end) => {
  const radius = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );
  let startAngle =
    (Math.atan2(start.y - center.y, start.x - center.x) * 180) / Math.PI;
  let endAngle =
    (Math.atan2(end.y - center.y, end.x - center.x) * 180) / Math.PI;

  let clockwise =
    endAngle > startAngle ? (endAngle * startAngle > 0 ? 0 : 1) : 0;

  if (!clockwise) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }

  return {
    startP: start,
    midP: null,
    endP: end,
    centerP: center,
    radius,
    startAngle,
    endAngle,
    clockwise,
  };
};

const findCircleFromAngle = (start, center, angle) => {
  const radius = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );
  const startAngle =
    (Math.atan2(start.y - center.y, start.x - center.x) * 180) / Math.PI;
  let endAngle = angle;

  if (endAngle < startAngle) {
    endAngle += 360;
  }

  const endRad = (endAngle * Math.PI) / 180;
  const end = {
    x: center.x + radius * Math.cos(endRad),
    y: center.y + radius * Math.sin(endRad),
  };

  return {
    startP: start,
    midP: null,
    endP: end,
    centerP: center,
    radius,
    startAngle,
    endAngle,
    clockwise: angle > 0,
  };
};

const findArcFromStartEndAngle = (start, end, angle) => {
  // Tính trung điểm của đoạn thẳng start - end
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Tính vector pháp tuyến (vuông góc với start-end)
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Độ dài đoạn thẳng từ start đến end
  const length = Math.sqrt(dx * dx + dy * dy);

  // Góc trung bình giữa start và end
  const baseAngle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Nếu góc quét lớn hơn 180, ta chọn tâm ở phía đối diện
  const isLargeArc = angle > 180;
  const sign = isLargeArc ? -1 : 1;

  // Độ dài từ trung điểm đến tâm
  const h = length / 2 / Math.tan((angle / 2) * (Math.PI / 180));

  // Tính tọa độ tâm theo vector pháp tuyến
  const normalX = -dy * sign;
  const normalY = dx * sign;
  const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);

  const center = {
    x: midX + (normalX / normalLength) * h,
    y: midY + (normalY / normalLength) * h,
  };

  // Bán kính của cung tròn
  const radius = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );

  // Tính góc bắt đầu và góc kết thúc
  let startAngle =
    (Math.atan2(start.y - center.y, start.x - center.x) * 180) / Math.PI;
  let endAngle =
    (Math.atan2(end.y - center.y, end.x - center.x) * 180) / Math.PI;

  // Đảm bảo góc luôn dương
  if (startAngle < 0) startAngle += 360;
  if (endAngle < 0) endAngle += 360;

  // Xác định chiều vẽ (clockwise)
  let clockwise = endAngle > startAngle ? angle > 0 : angle < 0;

  return {
    startP: start,
    midP: null,
    endP: end,
    centerP: center,
    radius,
    startAngle,
    endAngle,
    clockwise,
  };
};

const findArcFromStartEndRadius = (start, end, radius) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  const h = Math.sqrt(radius * radius - (length / 2) * (length / 2));
  const normalX = -dy;
  const normalY = dx;
  const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);

  const center = {
    x: midX + (normalX / normalLength) * h,
    y: midY + (normalY / normalLength) * h,
  };

  return findCircleFromCenter(start, center, end);
};

const calculateArc = (points, mode, angle, radius) => {
  if (mode === '3p-sme-arc') {
    return findCircleFromThreePoints(points[0], points[1], points[2]);
  } else if (mode === '3p-sce-arc') {
    return findCircleFromCenter(points[0], points[1], points[2]);
  } else if (mode === 'sca-arc') {
    return findCircleFromAngle(points[0], points[1], angle);
  } else if (mode === 'sea-arc') {
    return findArcFromStartEndAngle(points[0], points[1], angle);
  } else if (mode === '3p-cse-arc') {
    return findCircleFromCenter(points[1], points[0], points[2]);
  } else if (mode === 'ser-arc') {
    return findArcFromStartEndRadius(points[0], points[1], radius);
  } else if (mode === 'csa-arc') {
    return findCircleFromAngle(points[1], points[0], angle);
  }

  return null;
};

export const ThreePointArc = ({
  ref,
  name,
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
  onUpdatePoints,
  showStartPoint,
  direction,
  mode,
  radius,
  angle,
  onDrag,
  onUpdateShape,
  centerP,
  startAngle,
  endAngle,
  clockwise,
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (points.length < 3) return;
    const arc = calculateArc(points, mode, angle, radius);
    if (arc) {
      onUpdateShape({
        startP: arc.startP,
        endP: arc.endP,
        midP: arc.midP,
        centerP: arc.centerP,
        radius: arc.radius,
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
        clockwise: arc.clockwise,
      });
    }
  }, [points, mode, angle, radius]);

  const getArrowRotation = () => {
    const point =
      direction === LineDirection.START_TO_END ? points[2] : points[0];
    const radialAngle =
      (Math.atan2(point.y - centerP.y, point.x - centerP.x) * 180) / Math.PI;

    return direction === LineDirection.START_TO_END
      ? clockwise
        ? radialAngle + 90
        : radialAngle - 90
      : clockwise
        ? radialAngle - 90
        : radialAngle + 90;
  };

  const calculateP2 = (A, B, C) => {
    return {
      x: A.x + C.x - B.x,
      y: A.y + C.y - B.y,
    };
  };

  return (
    <Group ref={(node) => ref?.(node)}>
      {centerP && (
        <>
          <Arc
            x={centerP.x}
            y={centerP.y}
            name={name}
            innerRadius={radius}
            outerRadius={radius + 1}
            angle={endAngle - startAngle}
            rotation={startAngle}
            stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
            strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
            draggable={draggable}
            onDragEnd={(e) => {
              const arc = e.target;
              const absPos = arc.getAbsolutePosition(); // Lấy vị trí mới của Arc

              // Tính toán lại các điểm dựa trên vị trí mới
              const start = {
                x:
                  absPos.x +
                  arc.innerRadius() *
                    Math.cos((arc.rotation() * Math.PI) / 180),
                y:
                  absPos.y +
                  arc.innerRadius() *
                    Math.sin((arc.rotation() * Math.PI) / 180),
              };

              const center = calculateP2(start, points[0], points[1]);

              const end = {
                x:
                  absPos.x +
                  arc.innerRadius() *
                    Math.cos(((arc.rotation() + arc.angle()) * Math.PI) / 180),
                y:
                  absPos.y +
                  arc.innerRadius() *
                    Math.sin(((arc.rotation() + arc.angle()) * Math.PI) / 180),
              };

              console.log(start, center, end);

              // Gửi tọa độ cập nhật lên state
              onUpdatePoints([start, center, end]);

              // Giữ vị trí của Arc về (0,0) để tránh lỗi kéo thả
              // arc.position({ x: 0, y: 0 });
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

          <Arrow
            x={
              direction === LineDirection.START_TO_END
                ? points[2].x
                : points[0].x
            }
            y={
              direction === LineDirection.START_TO_END
                ? points[2].y
                : points[0].y
            }
            points={[-10, 0, 0, 0]}
            pointerLength={15}
            pointerWidth={10}
            fill={stroke}
            stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
            strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
            rotation={getArrowRotation()}
          />
        </>
      )}
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
            isVisible={!isDrawing && (hovered || selected || showStartPoint)}
            onDragEnd={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape({
                points: points.map((point, idx) => {
                  if (idx === index) return newPos; // Cập nhật tọa độ tại index
                  return point; // Giữ nguyên các điểm khác
                }),
              });
            }}
            onDragMove={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape({
                points: points.map((point, idx) => {
                  if (idx === index) return newPos; // Cập nhật tọa độ tại index
                  return point; // Giữ nguyên các điểm khác
                }),
              });
            }}
            hitboxVisible={!isDrawing}
          />
        ))}
    </Group>
  );
};
