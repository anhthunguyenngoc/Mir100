import React, { useState, useEffect } from 'react';
import { Path, Group, Arrow, Line } from 'react-konva';

import { MyCircle } from './MyCircle';
import { LineDirection } from '../../constant/Line';
import { normalizeAbsolutePosition } from 'canvas/utils';

export const calculateEndPoint = (start, mid) => {
  const xEnd = 2 * mid.x - start.x;
  const yEnd = 2 * mid.y - start.y;
  return { x: xEnd, y: yEnd };
};

export const calculateMidPoint = (start, end) => {
  const xMid = (start.x + end.x) / 2;
  const yMid = (start.y + end.y) / 2;
  return { x: xMid, y: yMid };
};

export const getZigzagPathData = (points, radius) => {
  if (!points[0] || !points[1] || !points[2]) return '';
  return `
    M ${points[0].x} ${points[0].y} 
    L ${points[1].x + (points[0].x > points[2].x ? radius : -radius)} ${points[0].y} 
    Q ${points[1].x} ${points[0].y} ${points[1].x} ${points[0].y + (points[0].y < points[2].y ? radius : -radius)} 
    L ${points[1].x} ${points[2].y + (points[0].y > points[2].y ? radius : -radius)} 
    Q ${points[1].x} ${points[2].y} ${points[1].x + (points[0].x < points[2].x ? radius : -radius)} ${points[2].y} 
    L ${points[2].x} ${points[2].y}
  `;
};

export const MyZigzag = ({
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
  radius,
  startP,
  endP,
  midP,
  onDrag,
  direction,
  onUpdateShape,
  saveState,
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default';
  }, [hovered]);

  useEffect(() => {
    onUpdateShape({
      width: Math.abs(endP.x - startP.x),
      height: Math.abs(endP.y - startP.y),
    });
  }, [startP, endP]);

  return (
    <Group ref={(node) => ref?.(node)}>
      <Path
        name={name}
        data={getZigzagPathData([startP, midP, endP], radius)}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        fill="transparent"
        dash={dash}
        stroke={selected ? 'red' : hovered ? 'blue' : stroke}
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth}
        draggable={draggable}
        onDragStart={() => {
          saveState();
        }}
        onDragEnd={(e) => {
          const zigzag = e.target;
          const absPos = normalizeAbsolutePosition(
            zigzag.getAbsolutePosition()
          );

          const newPoints = [startP, midP, endP].map((point) => ({
            x: point.x + absPos.x,
            y: point.y + absPos.y,
          }));

          onUpdateShape({
            startP: newPoints[0],
            midP: newPoints[1],
            endP: newPoints[2],
          });
          zigzag.position({ x: 0, y: 0 });
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
      />

      {/* Thêm mũi tên hiển thị hướng đi của zigzag */}
      {startP && midP && endP && (
        <Arrow
          x={direction === LineDirection.START_TO_END ? endP.x : startP.x}
          y={direction === LineDirection.START_TO_END ? endP.y : startP.y}
          pointerAtBeginning={endP.x < midP.x}
          pointerAtEnding={endP.x >= midP.x}
          points={[-10, 0, 0, 0]}
          pointerLength={15}
          pointerWidth={10}
          stroke="black"
          fill="black"
        />
      )}

      {!isDrawing &&
        [startP, midP, endP].map((point, index) => (
          <MyCircle
            key={index}
            x={point.x}
            y={point.y}
            radius={6}
            fill="white"
            stroke="blue"
            strokeWidth={1}
            draggable={true}
            isVisible={!isDrawing && (hovered || selected)}
            onDragStart={() => {
              saveState();
            }}
            onDragEnd={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0
                  ? { startP: newPos }
                  : index === 1
                    ? { midP: newPos }
                    : { endP: newPos }
              );
            }}
            onDragMove={(x, y) => {
              const newPos = onDrag(x, y);
              onUpdateShape(
                index === 0
                  ? { startP: newPos }
                  : index === 1
                    ? { midP: newPos }
                    : { endP: newPos }
              );
            }}
            hitboxVisible={!isDrawing}
            dragBoundFunc={(p) => {
              if (index === 1) {
                return {
                  x: p.x,
                  y: point.y,
                };
              } else {
                return {
                  x: p.x,
                  y: p.y,
                };
              }
            }}
          />
        ))}
    </Group>
  );
};
