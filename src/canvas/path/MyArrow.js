import React, { useState, useEffect } from 'react';
import { Arrow, Group } from 'react-konva';
import { MyCircle } from './MyCircle';
import { LineDirection } from '../../constant';
import { normalizeAbsolutePosition } from 'canvas/utils';

export const MyArrow = ({
  ref,
  name,
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
  direction,
  onDrag,
  startP,
  endP,
  onUpdateShape,
  saveState,
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
      <Arrow
        name={name}
        points={[startP.x, startP.y, endP.x, endP.y]}
        pointerAtBeginning={direction === LineDirection.END_TO_START}
        pointerAtEnding={direction === LineDirection.START_TO_END}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        fill={fill}
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke} // Đổi màu khi hover
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        onDragEnd={(e) => {
          const arrow = e.target;
          const absPos = normalizeAbsolutePosition(arrow.getAbsolutePosition()); // Lấy vị trí tuyệt đối của Arrow

          const arrowPoints = arrow.points();
          const startX = absPos.x + arrowPoints[0];
          const startY = absPos.y + arrowPoints[1];
          const endX = absPos.x + arrowPoints[2];
          const endY = absPos.y + arrowPoints[3];

          onUpdateShape({
            startP: { x: startX, y: startY },
            endP: { x: endX, y: endY },
          });
          // Reset vị trí của Arrow về (0,0) để tránh bị lệch
          arrow.position({ x: 0, y: 0 });
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
          saveState();
          onDragStart?.();
        }}
      />
      {!isDrawing &&
        [startP, endP].map((point, index) => (
          <MyCircle
            x={point.x}
            y={point.y}
            radius={2}
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
            onDragStart={() => {
              saveState();
            }}
            hitboxVisible={!isDrawing}
          />
        ))}
    </Group>
  );
};
