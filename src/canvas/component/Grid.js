import React, { forwardRef } from 'react';
import { Layer, Line, Rect } from 'react-konva';

export const Grid = forwardRef(
  ({ gridData, canvasPos, width, height, snapPoint, gridSize }, ref) => {
    return (
      <Layer
        ref={ref}
        x={canvasPos.x}
        y={canvasPos.y}
        width={width}
        height={height}
      >
        {gridData.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            strokeWidth={line.strokeWidth}
            stroke="#ccc"
          />
        ))}
        {/* ================================================Điểm Snap================================================= */}
        {snapPoint && (
          <Rect
            x={snapPoint.x - 5}
            y={snapPoint.y - 5}
            width={gridSize / 4}
            height={gridSize / 4}
            fill="red"
            opacity={0.5}
          />
        )}
      </Layer>
    );
  }
);
