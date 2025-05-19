import React, { useState, useEffect } from 'react';
import { Layer, Line, Rect, Text } from 'react-konva';
import * as CanvasConstant from '../../constant/CanvasConstant';

export const Ruler = ({
  stageSize,
  mousePos,
  zoom,
  setGridData,
  gridSize,
  setGridSize,
  gridLayerRef,
}) => {
  const [rulerData, setRulerData] = useState([]);

  useEffect(() => {
    generateGridAndRuler();
  }, [gridSize, zoom, stageSize]);

  useEffect(() => {
    if (gridLayerRef.current) {
      const newScale = zoom / 100;
      gridLayerRef.current.scale({ x: newScale, y: newScale });
    }

    setGridSize(
      Math.max(
        CanvasConstant.MIN_GRID_SIZE,
        Math.floor(CanvasConstant.INITIAL_GRID_SIZE * (100 / zoom))
      )
    );
  }, [zoom]);

  const generateGridAndRuler = () => {
    let gridLines = [];
    let rulerLines = [];
    let rulerMarks = [];

    const gridWidth = (stageSize.width * 100) / zoom;
    const gridHeight = (stageSize.height * 100) / zoom;
    const scale = 100 / zoom;
    const strokeWidth = 1 * scale;

    // Vẽ lưới
    for (let x = 0; x <= gridWidth; x += gridSize * scale) {
      gridLines.push({ points: [x, 0, x, gridHeight], strokeWidth });
    }
    for (let y = 0; y <= gridHeight; y += gridSize * scale) {
      gridLines.push({ points: [0, y, gridWidth, y], strokeWidth });
    }

    const majorTick = gridSize * (5 * Math.round(zoom / 100));
    const minorTick = gridSize;

    // Vẽ thước ngang và dọc
    for (let x = 0; x <= stageSize.width; x += minorTick) {
      let isMajor = x % majorTick === 0;
      rulerLines.push({
        points: [
          CanvasConstant.RULER_SIZE + x,
          0,
          CanvasConstant.RULER_SIZE + x,
          isMajor ? CanvasConstant.RULER_SIZE : CanvasConstant.RULER_SIZE / 2,
        ],
        strokeWidth: isMajor ? 3 : 1,
      });
      if (isMajor)
        rulerMarks.push({
          x: CanvasConstant.RULER_SIZE + x + 2,
          y: 15,
          text: `${Math.round(x * scale)}`,
        });
    }
    for (let y = 0; y <= stageSize.height; y += minorTick) {
      let isMajor = y % majorTick === 0;
      rulerLines.push({
        points: [
          0,
          CanvasConstant.RULER_SIZE + y,
          isMajor ? CanvasConstant.RULER_SIZE : CanvasConstant.RULER_SIZE / 2,
          CanvasConstant.RULER_SIZE + y,
        ],
        strokeWidth: isMajor ? 3 : 1,
      });
      if (isMajor)
        rulerMarks.push({
          x: 5,
          y: CanvasConstant.RULER_SIZE + y - 15,
          text: `${Math.round(y * scale)}`,
        });
    }

    setGridData(gridLines);
    setRulerData([...rulerLines, ...rulerMarks]);
  };

  return (
    <Layer listening={false}>
      <Rect
        x={0}
        y={0}
        width={stageSize.width}
        height={CanvasConstant.RULER_SIZE}
        fill="#ddd"
      />
      <Rect
        x={0}
        y={0}
        width={CanvasConstant.RULER_SIZE}
        height={stageSize.height + CanvasConstant.RULER_SIZE}
        fill="#ddd"
      />
      {rulerData.map((item, i) =>
        item.text ? (
          <Text
            key={i}
            x={item.x}
            y={item.y}
            text={item.text}
            fontSize={12}
            fill="black"
          />
        ) : (
          <Line
            key={i}
            points={item.points}
            stroke="black"
            strokeWidth={item.strokeWidth}
          />
        )
      )}
      <Text
        text={`(${mousePos.x}, ${mousePos.y})`}
        x={mousePos.xRuler + CanvasConstant.RULER_SIZE}
        y={mousePos.yRuler + CanvasConstant.RULER_SIZE}
        fontSize={14}
        fill="black"
      />
    </Layer>
  );
};

export default Ruler;
