import { useState, useEffect } from 'react';
import { Group, Rect } from 'react-konva';
import { MyCircle } from './MyCircle';

const getBoundingBox = (points) => {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  if (Array.isArray(points) && typeof points[0] === 'number') {
    // Dạng [x1, y1, x2, y2, ...]
    for (let i = 0; i < points.length; i += 2) {
      const x = points[i];
      const y = points[i + 1];

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  } else if (Array.isArray(points) && typeof points[0] === 'object') {
    // Dạng [{ x, y }, { x, y }, ...]
    minX = Math.min(...points.map((p) => p.x));
    minY = Math.min(...points.map((p) => p.y));
    maxX = Math.max(...points.map((p) => p.x));
    maxY = Math.max(...points.map((p) => p.y));
  } else {
    throw new Error('Invalid points format');
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

export const MyGroup = ({
  id,
  ref,
  renderShape,
  points,
  onUpdateShape,
  shapes,
  sharedPoints,
  saveState,
  pointRadius,
  strokeWidth,
  isDrawing,
  selected,
  onDrag,
}) => {
  const rectProps = getBoundingBox(points);
  const [hovered, setHovered] = useState(false);

  // useEffect(() => {
  //   if (!Array.isArray(shapes)) return;

  //   const newSharedPoints = new Map();

  //   shapes.forEach((shape) => {
  //     if (!shape || !shape.points) return;

  //     const pointsArray =
  //       typeof shape.points[0] === 'number'
  //         ? // Dạng [x1, y1, x2, y2, ...]
  //           shape.points.reduce((acc, val, idx) => {
  //             if (idx % 2 === 0) {
  //               acc.push({ x: val, y: shape.points[idx + 1] });
  //             }
  //             return acc;
  //           }, [])
  //         : shape.points; // Dạng [{x, y}, ...]

  //     pointsArray.forEach((point, i) => {
  //       const key = `${point.x},${point.y}`;
  //       const existing = newSharedPoints.get(key) || [];
  //       existing.push({ id: shape.id, key: i });
  //       newSharedPoints.set(key, existing);
  //     });
  //   });

  //   onUpdateShape({ sharedPoints: newSharedPoints });
  // }, [shapes.length]);

  return (
    <Group
      ref={(node) => {
        ref?.(node);
      }}
      draggable={selected}
      onDragEnd={(e) => {
        const groupNode = e.target;
        const absPos = groupNode.getAbsolutePosition(); // Lấy vị trí tuyệt đối của Group
        let updatedShapes = [];
        console.log(absPos);
        // Duyệt qua từng shape (Line/Arrow) để cập nhật points
        // children.forEach((child) => {
        //   const oldPoints = child.props.points;
        //   let newPoints;
        //   if (Array.isArray(oldPoints)) {
        //     // Trường hợp `points` là mảng số [x1, y1, x2, y2, ...]
        //     if (typeof oldPoints[0] === 'number') {
        //       newPoints = oldPoints.map(
        //         (value, index) =>
        //           value + (index % 2 === 0 ? absPos.x : absPos.y)
        //       );
        //     }
        //     // Trường hợp `points` là mảng object [{x, y}, {x, y}, ...]
        //     else if (
        //       typeof oldPoints[0] === 'object' &&
        //       oldPoints[0] !== null
        //     ) {
        //       newPoints = oldPoints.map((point) => ({
        //         x: point.x + absPos.x,
        //         y: point.y + absPos.y,
        //       }));
        //     }
        //   }
        //   // Lưu các shape đã cập nhật vào danh sách
        //   updatedShapes.push({ ...child, points: newPoints });
        //   // Cập nhật lại điểm của từng shape
        //   onUpdateShape(child.id, newPoints);
        // });
        // // Cập nhật points của group dựa trên vị trí mới của shapes
        // const updatedGroupPoints = updatedShapes.flatMap(
        //   (shape) => shape.points
        // );
        // // console.log(updatedGroupPoints)
        // onUpdateShape(id, updatedGroupPoints);
        // // Reset vị trí của Group về (0,0) để tránh bị lệch
        // groupNode.position({ x: 0, y: 0 });
      }}
    >
      {/* Rect hiển thị clientRect */}
      <Rect
        {...rectProps}
        stroke="red"
        strokeWidth={hovered ? strokeWidth + 2 : strokeWidth + 1}
        dash={[10, 10]}
        visible={hovered || selected}
      />

      {/* Các phần tử bên trên */}
      {Array.isArray(shapes) ? shapes.map((s) => renderShape(s)) : null}

      {sharedPoints &&
        Array.from(sharedPoints.entries()).map(([posKey, refs], index) => {
          const [x, y] = posKey.split(',').map(Number);
          return (
            <MyCircle
              key={index}
              x={x}
              y={y}
              radius={pointRadius + 0.5}
              fill="white"
              stroke="red"
              strokeWidth={strokeWidth + 0.5}
              draggable={true}
              isVisible={true}
              onDragMove={(x, y) => {
                const newPos = onDrag(x, y);

                refs.forEach(({ id, key }) => {
                  const targetShape = shapes.find((s) => s.id === id);
                  if (targetShape?.onUpdateShape) {
                    targetShape.onUpdateShape({ [key]: newPos });
                  }
                });
              }}
              onDragEnd={(x, y) => {
                const newPos = onDrag(x, y);

                refs.forEach(({ id, key }) => {
                  const targetShape = shapes.find((s) => s.id === id);
                  if (targetShape?.onUpdateShape) {
                    targetShape.onUpdateShape({ [key]: newPos });
                  }
                });

                // Cập nhật lại sharedPoints
                sharedPoints.delete(posKey); // Xoá vị trí cũ
                const newKey = `${newPos.x},${newPos.y}`;
                const newRefs = sharedPoints.get(newKey) || [];
                sharedPoints.set(newKey, [...newRefs, ...refs]);
                onUpdateShape({ sharedPoints: sharedPoints });
              }}
              onDragStart={() => {
                saveState();
              }}
              hitboxVisible={!isDrawing}
            />
          );
        })}
    </Group>
  );
};
