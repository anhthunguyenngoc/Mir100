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

export const radiansToDegrees = (rad) => {
  if (!rad) return;
  return (rad * 180) / Math.PI;
};

export function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// kiểm tra giao cắt tường

export function pathCrossesWall(start, end, walls) {
  for (const wall of walls) {
    const points = wall.polygon;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      if (segmentsIntersect(start, end, a, b)) {
        return true;
      }
    }
  }
  return false;
}

export function isPathIntersectingPolygons(start, end, obstacles) {
  for (const item of obstacles) {
    const points = item.polygon;
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length]; // nối vòng
      if (segmentsIntersect(start, end, a, b)) {
        return true;
      }
    }
  }
  return false;
}

function segmentsIntersect(p1, p2, q1, q2) {
  function ccw(a, b, c) {
    return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
  }

  return (
    ccw(p1, q1, q2) !== ccw(p2, q1, q2) && ccw(p1, p2, q1) !== ccw(p1, p2, q2)
  );
}

export function pointInForbidden(point, zones) {
  return zones.some((polygon) => pointInPolygon(point, polygon.polygon));
}

/**
 * Tính khoảng cách từ điểm đến đoạn thẳng
 * @param {{x: number, y: number}} p - điểm cần đo
 * @param {{x: number, y: number}} v - điểm đầu đoạn
 * @param {{x: number, y: number}} w - điểm cuối đoạn
 * @returns {number} khoảng cách tối thiểu
 */
export function distancePointToLineSegment(p, v, w) {
  const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y); // đoạn thẳng là điểm
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projection = {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y),
  };
  return Math.hypot(p.x - projection.x, p.y - projection.y);
}

/**
 * Tính khoảng cách từ điểm đến polygon
 * @param {{x: number, y: number}} point - điểm cần đo
 * @param {{x: number, y: number}[]} polygon - mảng điểm định nghĩa polygon
 * @returns {number} khoảng cách tối thiểu từ point đến các cạnh polygon
 */
export function distancePointToPolygon(point, polygon) {
  let minDist = Infinity;
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];
    const dist = distancePointToLineSegment(point, p1, p2);
    if (dist < minDist) minDist = dist;
  }
  return minDist;
}

export function pointNearPolygon(point, polygons, threshold) {
  return polygons.some(
    (poly) => distancePointToPolygon(point, poly.polygon) < threshold
  );
}

export function pointNearLine(point, lines, threshold) {
  return lines.some(
    (line) =>
      distancePointToLineSegment(point, line.polygon[0], line.polygon[1]) <
      threshold
  );
}

/**
 * Tính khoảng cách Euclidean giữa hai điểm.
 * @param {{x: number, y: number}} a
 * @param {{x: number, y: number}} b
 * @returns {number}
 */
export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * So sánh hai điểm với sai số epsilon để tránh lỗi do số thực.
 *
 * @param {{x: number, y: number}} p1
 * @param {{x: number, y: number}} p2
 * @param {number} [epsilon=0.1] - Sai số cho phép
 * @returns {boolean}
 */
export function pointsEqual(p1, p2, epsilon = 0.1) {
  return (
    Math.abs(p1.x - p2.x) < epsilon &&
    Math.abs(p1.y - p2.y) < epsilon
  );
}

// Utils.js

/**
 * Tính khoảng cách từ một điểm đến một đoạn thẳng
 * @param {Object} point - Điểm cần kiểm tra {x, y}
 * @param {Object} line - Đoạn thẳng, có dạng {x1, y1, x2, y2}
 * @returns {number} - Khoảng cách từ điểm đến đoạn thẳng
 */
export function distancePointToLine(point, line) {
  const { x1, y1, x2, y2 } = line;
  const numerator = Math.abs((y2 - y1) * point.x - (x2 - x1) * point.y + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  return numerator / denominator;
}
