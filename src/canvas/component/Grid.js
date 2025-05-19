import React, { forwardRef } from 'react';
import { Layer, Line, Rect, Image } from 'react-konva';
import * as Snap from '../snap-point/SnapPoint';
import { SnapPointIcon } from './SnapPointIcon';
import * as Const from '../../constant';

export const Grid = forwardRef(
  ({ gridData, canvasPos, snapPoint, gridSize }, ref) => {
    return (
      <Layer ref={ref} x={canvasPos.x} y={canvasPos.y}>
        {gridData.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            strokeWidth={line.strokeWidth}
            stroke="#ccc"
          />
        ))}
        {/* ================================================Điểm Snap================================================= */}
        {snapPoint && snapPoint.type && (
          <SnapPointIcon
            x={snapPoint.x}
            y={snapPoint.y}
            width={gridSize / 2}
            height={gridSize / 2}
            Icon={Const.snapMode[snapPoint.type].pointIcon}
          />
        )}
      </Layer>
    );
  }
);
