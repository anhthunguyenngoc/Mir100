import React, { useState } from 'react';
import { Path, Group, Arrow } from 'react-konva';
import { MyCircle } from './MyCircle';
import { LineDirection } from '../../constant';

export const getUlinePathData = (start, bottom, ry) => {
  const end = { x: 2 * bottom.x - start.x, y: start.y };
  const rx = Math.abs(start.x - bottom.x);
  const isLeft = start.x < bottom.x;
  const isRight = start.x > bottom.x;
  const isTop = start.y < bottom.y;
  const isBottom = start.y > bottom.y;
  const clockwise = (isLeft && isBottom) || (isRight && isTop) ? 1 : 0;

  return `
    M ${start.x} ${start.y}  
    L ${start.x} ${bottom.y} 
    A ${rx} ${ry} 0 0 ${clockwise} ${end.x} ${bottom.y} 
    L ${end.x} ${end.y}
  `;
};

const findParallelPoints = (start, end, A) => {
  // Tính vector chỉ phương của đường thẳng qua start và end
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Tính độ dài đoạn thẳng start-end
  const length = Math.sqrt(dx * dx + dy * dy);

  // Đơn vị hóa vector chỉ phương
  const ux = dx / length;
  const uy = dy / length;

  // Dịch chuyển A theo hai hướng của vector chỉ phương một khoảng bằng với đoạn start-end
  const B = { x: A.x - (ux * length) / 2, y: A.y - (uy * length) / 2 };
  const C = { x: A.x + (ux * length) / 2, y: A.y + (uy * length) / 2 };

  return { B, C };
};

const getArrowRotation = (points, direction) => {
  const { B, C } = findParallelPoints(points[0], points[2], points[1]);

  const start = direction === LineDirection ? C : B;
  const end = direction === LineDirection ? points[2] : points[0];

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

const getULine = (startP, bottomP, ry) => {
  return {
    data: getUlinePathData(startP, bottomP, ry),
  };
};

export const MyULine = ({
  ref,
  name,
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
  direction,
  ry,
  onDrag,
  onUpdateShape,
  startP,
  bottomP,
  endP,
}) => {
  const [hovered, setHovered] = useState(false);

  const uline = getULine(startP, bottomP, ry);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Path
        name={name}
        data={uline.data}
        fill="transparent"
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        onDragEnd={(e) => {
          const uline = e.target;
          const absPos = uline.getAbsolutePosition();

          const newPoints = [startP, bottomP, endP].map((point) => ({
            x: point.x + absPos.x,
            y: point.y + absPos.y,
          }));

          onUpdateShape({
            startP: newPoints[0],
            midP: newPoints[1],
            endP: newPoints[2],
          });
          // Reset vị trí của Arrow về (0,0) để tránh bị lệch
          uline.position({ x: 0, y: 0 });
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

      {startP && endP && direction !== LineDirection.NONE && (
        <Arrow
          x={direction === LineDirection.START_TO_END ? endP.x : startP.x}
          y={direction === LineDirection.START_TO_END ? endP.y : startP.y}
          points={[-10, 0, 0, 0]}
          pointerLength={pointerLength}
          pointerWidth={pointerWidth}
          strokeWidth={strokeWidth}
          stroke={selected ? 'red' : hovered ? 'blue' : stroke}
          fill={fill}
          rotation={getArrowRotation([startP, bottomP, endP], direction)}
        />
      )}

      {!isDrawing &&
        [startP, bottomP, endP].map((point, index) => (
          <MyCircle
            x={point.x}
            y={point.y}
            radius={pointRadius}
            fill="white"
            stroke="blue"
            strokeWidth={strokeWidth}
            draggable={true}
            isVisible={!isDrawing && (hovered || selected)}
            onDragEnd={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0
                  ? { startP: newPos }
                  : index === 1
                    ? { bottomP: newPos }
                    : { endP: newPos }
              );
            }}
            onDragMove={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0
                  ? { startP: newPos }
                  : index === 1
                    ? { bottomP: newPos }
                    : { endP: newPos }
              );
            }}
            hitboxVisible={!isDrawing}
          />
        ))}
    </Group>
  );
};
