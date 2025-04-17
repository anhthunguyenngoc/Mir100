import { useState } from 'react';
import { Group, Rect } from 'react-konva';

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

export const MyGroup = ({ id, ref, children, points, onUpdateGroupPoints }) => {
  const rectProps = getBoundingBox(points);

  return (
    <Group
      ref={(node) => {
        ref?.(node);
      }}
      draggable
      onDragEnd={(e) => {
        const groupNode = e.target;
        const absPos = groupNode.getAbsolutePosition(); // Lấy vị trí tuyệt đối của Group

        let updatedShapes = [];

        // Duyệt qua từng shape (Line/Arrow) để cập nhật points
        children.forEach((child) => {
          console.log(child);
          const oldPoints = child.props.points;
          let newPoints;

          if (Array.isArray(oldPoints)) {
            // Trường hợp `points` là mảng số [x1, y1, x2, y2, ...]
            if (typeof oldPoints[0] === 'number') {
              newPoints = oldPoints.map(
                (value, index) =>
                  value + (index % 2 === 0 ? absPos.x : absPos.y)
              );
            }
            // Trường hợp `points` là mảng object [{x, y}, {x, y}, ...]
            else if (
              typeof oldPoints[0] === 'object' &&
              oldPoints[0] !== null
            ) {
              newPoints = oldPoints.map((point) => ({
                x: point.x + absPos.x,
                y: point.y + absPos.y,
              }));
            }
          }

          // Lưu các shape đã cập nhật vào danh sách
          updatedShapes.push({ ...child, points: newPoints });

          // Cập nhật lại điểm của từng shape
          onUpdateGroupPoints(child.id, newPoints);
        });

        // Cập nhật points của group dựa trên vị trí mới của shapes
        const updatedGroupPoints = updatedShapes.flatMap(
          (shape) => shape.points
        );
        // console.log(updatedGroupPoints)
        onUpdateGroupPoints(id, updatedGroupPoints);

        // Reset vị trí của Group về (0,0) để tránh bị lệch
        groupNode.position({ x: 0, y: 0 });
      }}
    >
      {/* Rect hiển thị clientRect */}
      <Rect {...rectProps} stroke="red" strokeWidth={2} />

      {/* Các phần tử bên trên */}
      {children}
    </Group>
  );
};
