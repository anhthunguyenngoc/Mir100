import React, { useEffect, useState } from 'react';
import { Arrow, Group } from 'react-konva';
import { MyCircle } from './MyCircle';

const getTangentLine = (contactPoint, center, radius) => {
  if (!center || !radius) return [];
  const { x, y } = contactPoint;
  const dx = x - center.x;
  const dy = y - center.y;
  const slope = -dx / dy;
  const length = 100;

  const angle = Math.atan(slope);
  const x1 = x - length * Math.cos(angle);
  const y1 = y - length * Math.sin(angle);
  const x2 = x + length * Math.cos(angle);
  const y2 = y + length * Math.sin(angle);

  return [x1, y1, x2, y2];
};

export const MyTangent = ({
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
  reversed,
  contactPoint,
  arc,
  onDrag,
  onUpdateShape,
}) => {
  const [hovered, setHovered] = useState(false);

  const onUpdateContactPoint = (x, y) => {
    const dx = x - arc.center.x;
    const dy = y - arc.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (Math.abs(distance - arc.radius) <= 5) {
      onUpdateShape({
        points: getTangentLine({ x, y }, arc.center, arc.radius),
      });
    }
  };

  useEffect(() => {
    onUpdateShape({
      points: getTangentLine(contactPoint, arc.center, arc.radius),
    });
  }, [contactPoint]);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Arrow
        name="arrow"
        points={
          reversed ? [points[2], points[3], points[0], points[1]] : points
        }
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        fill={fill}
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        // onDragEnd={(e) => {
        //     const arrow = e.target;
        //     const absPos = arrow.getAbsolutePosition(); // Lấy vị trí tuyệt đối của Arrow

        //     const arrowPoints = arrow.points();
        //     const startX = absPos.x + arrowPoints[0];
        //     const startY = absPos.y + arrowPoints[1];
        //     const endX = absPos.x + arrowPoints[2];
        //     const endY = absPos.y + arrowPoints[3];

        //     onUpdatePoints([startX, startY, endX, endY]);
        //     // Reset vị trí của Arrow về (0,0) để tránh bị lệch
        //     arrow.position({ x: 0, y: 0 });
        // }}
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
        // onDragStart={() => {
        //     onDragStart?.();
        // }}
      />
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
      <MyCircle //Contact Point
        x={contactPoint.x}
        y={contactPoint.y}
        radius={pointRadius}
        fill="white"
        stroke="blue"
        strokeWidth={strokeWidth}
        draggable={true}
        isVisible={hovered || selected}
        onDragEnd={onUpdateContactPoint}
        onDragMove={onUpdateContactPoint}
        dragBoundFunc={(pos) => {
          const dx = pos.x - arc.center.x;
          const dy = pos.y - arc.center.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Điều chỉnh vị trí để đảm bảo luôn nằm trên đường tròn
          const scale = arc.radius / distance;

          return {
            x: arc.center.x + dx * scale,
            y: arc.center.y + dy * scale,
          };
        }}
      />
    </Group>
  );
};
