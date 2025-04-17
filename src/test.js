import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

const MultiLayerCanvas = () => {
  const [layers, setLayers] = useState([{ id: 0, shapes: [] }]); // Danh sách layers
  const [activeLayer, setActiveLayer] = useState(0); // Layer đang active
  const stageRef = useRef(null);

  // Thêm một lớp mới
  const addLayer = () => {
    const newLayer = { id: layers.length, shapes: [] };
    setLayers([...layers, newLayer]);
  };

  // Thêm hình vào lớp hiện tại
  const addShape = (type) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === activeLayer
          ? {
              ...layer,
              shapes: [
                ...layer.shapes,
                type === 'rect'
                  ? {
                      id: Date.now(),
                      type: 'rect',
                      x: Math.random() * 400,
                      y: Math.random() * 400,
                    }
                  : {
                      id: Date.now(),
                      type: 'circle',
                      x: Math.random() * 400,
                      y: Math.random() * 400,
                    },
              ],
            }
          : layer
      )
    );
  };

  // Xử lý di chuyển shape
  const handleDragMove = (e, shapeId) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === activeLayer
          ? {
              ...layer,
              shapes: layer.shapes.map((shape) =>
                shape.id === shapeId
                  ? { ...shape, x: e.target.x(), y: e.target.y() }
                  : shape
              ),
            }
          : layer
      )
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={addLayer}>➕ Thêm Lớp</button>
        <button onClick={() => addShape('rect')}>🟦 Thêm Hình Chữ Nhật</button>
        <button onClick={() => addShape('circle')}>⚫ Thêm Hình Tròn</button>
        <span style={{ marginLeft: '10px' }}>Chọn Lớp:</span>
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            style={{
              marginLeft: '5px',
              fontWeight: activeLayer === layer.id ? 'bold' : 'normal',
            }}
          >
            Layer {layer.id}
          </button>
        ))}
      </div>

      <Stage
        width={600}
        height={400}
        ref={stageRef}
        style={{ border: '1px solid black' }}
      >
        {layers.map((layer) => (
          <Layer key={layer.id}>
            {layer.shapes.map((shape) =>
              shape.type === 'rect' ? (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={50}
                  height={50}
                  fill="blue"
                  draggable={layer.id === activeLayer} // Chỉ cho phép kéo khi layer active
                  onDragMove={(e) => handleDragMove(e, shape.id)}
                />
              ) : (
                <Circle
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  radius={25}
                  fill="red"
                  draggable={layer.id === activeLayer} // Chỉ cho phép kéo khi layer active
                  onDragMove={(e) => handleDragMove(e, shape.id)}
                />
              )
            )}
          </Layer>
        ))}
      </Stage>
    </div>
  );
};

export default MultiLayerCanvas;
