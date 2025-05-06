import * as Const from '../../constant';
import { svgPathProperties } from 'svg-path-properties';

export const snapToGrid = (zoom, gridSize, value) => {
  return {
    x:
      Math.round(value.x / ((gridSize * 100) / zoom)) *
      ((gridSize * 100) / zoom),
    y:
      Math.round(value.y / ((gridSize * 100) / zoom)) *
      ((gridSize * 100) / zoom),
  };
};

export const adjustPointerForZoom = (zoom, pointer) => {
  const zoomScale = zoom / 100;
  return {
    x: (pointer.x - Const.RULER_SIZE) / zoomScale,
    y: (pointer.y - Const.RULER_SIZE) / zoomScale,
  };
};

export const normalizeAbsolutePosition = (point) => {
  return {
    x: point.x - Const.RULER_SIZE,
    y: point.y - Const.RULER_SIZE,
  };
};

export const worldToPixel = (
  x,
  y,
  origin_x,
  origin_y,
  origin_theta,
  resolution,
  mapHeight
) => {
  // Dịch tọa độ theo origin
  let relX = (x - origin_x) / resolution;
  let relY = (y - origin_y) / resolution;

  // Chuyển góc sang radian
  let theta = (origin_theta * Math.PI) / 180;

  // Xoay tọa độ quanh origin
  let rotatedX = relX * Math.cos(theta) + relY * Math.sin(theta);
  let rotatedY = -relX * Math.sin(theta) + relY * Math.cos(theta);

  // Lật trục Y (vì ảnh map gốc (0,0) ở góc trên trái)
  let pixelX = rotatedX;
  let pixelY = mapHeight - rotatedY;

  return { pixelX, pixelY };
};

export function getAngleSigned(centerX, centerY, mouseX, mouseY) {
  const deltaX = mouseX - centerX;
  const deltaY = centerY - mouseY;

  let angleInRadians = Math.atan2(deltaY, deltaX);
  let angleInDegrees = (angleInRadians * 180) / Math.PI;

  return angleInDegrees;
}

export function getRealPosition(canvasX, canvasY, map) {
  const x = canvasX * map?.resolution + map?.origin_x;
  const y = (map?.metadata.height - canvasY) * map?.resolution + map?.origin_y;

  return { x, y };
}

export function getCanvasPosition(realX, realY, map) {
  const x = (realX - map?.origin_x) / map?.resolution;
  const y = map?.metadata.height - (realY - map?.origin_y) / map?.resolution;

  return { x, y };
}

/**
 * Trả về các điểm trên đường path zigzag với khoảng cách đều nhau.
 *
 * @param {string} pathData - Chuỗi SVG path (from getPathData)
 * @param {number} step - Khoảng cách giữa các điểm (pixel)
 * @returns {Array<{x: number, y: number}>} Mảng các điểm
 */
export const getPointsOnPath = (pathData, step) => {
  const properties = new svgPathProperties(pathData);
  const length = properties.getTotalLength();
  const points = [];

  for (let i = 0; i <= length; i += step) {
    const { x, y } = properties.getPointAtLength(i);
    points.push({ x, y });
  }

  return points;
};

export const processLidarData = (lidar, transforms) => {
  if (!lidar || !transforms) return;

  const points = [];
  for (let i = 0; i < lidar.ranges.length; i++) {
    const r = lidar.ranges[i];
    const angle = i * lidar.angle_increment + lidar.angle_min;
    if (lidar.range_min < r && r < lidar.range_max) {
      // Tính toán tọa độ LiDAR ban đầu
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      const point = { x, y };

      // Kiểm tra nếu transform từ 'base_footprint' sang 'map' có sẵn
      const transform = transforms[0];
      if (transform) {
        // Áp dụng xoay từ quaternion
        const q = transform.transform.rotation; // quaternion: {x, y, z, w}

        // Tính toán góc xoay từ quaternion
        const angle = 2 * Math.acos(q.w); // Góc từ quaternion (theo radian)
        const sinAngle = Math.sqrt(1 - q.w * q.w); // sin(θ)

        // Xoay điểm LiDAR
        const rotatedX = point.x * Math.cos(angle) - point.y * Math.sin(angle);
        const rotatedY = point.x * Math.sin(angle) + point.y * Math.cos(angle);

        // Áp dụng dịch chuyển từ translation
        const transformedX = rotatedX + transform.transform.translation.x;
        const transformedY = rotatedY + transform.transform.translation.y;

        // Lưu điểm đã được chuyển đổi
        points.push({ x: transformedX, y: transformedY });
      }
    }
  }
  return points; // Trả về các điểm đã xử lý
};

/**
 * Tính toán các điểm nằm trên đường thẳng từ startP đến endP,
 * với khoảng cách giữa các điểm là `step`.
 *
 * @param {Object} startP - Điểm bắt đầu {x, y}
 * @param {Object} endP - Điểm kết thúc {x, y}
 * @param {number} step - Khoảng cách giữa các điểm (đơn vị pixel)
 * @returns {Array} - Mảng các điểm dạng [{x, y}, {x, y}, ...]
 */
export const getPointsAlongLine = (startP, endP, step) => {
  const dx = endP.x - startP.x;
  const dy = endP.y - startP.y;
  const distance = Math.hypot(dx, dy);

  const numPoints = Math.floor(distance / step);
  const points = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = startP.x + dx * t;
    const y = startP.y + dy * t;
    points.push({ x, y });
  }

  return points;
};

export const degreesToRadians = (degrees) => {
  if (!degrees) return;
  return degrees * (Math.PI / 180);
};
