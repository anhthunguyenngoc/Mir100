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

export const getSmartSnap = (pointer, customSnapPoints, gridSize, zoom) => {
  const SNAP_DISTANCE = 10; // khoảng cách cho phép snap vào shape

  // Tìm customSnap gần nhất
  let nearest = null;
  let minDist = Infinity;

  for (const pt of customSnapPoints) {
    const d = getDistance(pt, pointer);
    if (d < SNAP_DISTANCE && d < minDist) {
      minDist = d;
      nearest = pt;
    }
    console.log(d);
  }

  if (nearest) return nearest;

  // Nếu không gần shape nào thì snap to grid
  return snapToGrid(zoom, gridSize, pointer);
};

// Tính điểm vuông góc từ chuột đến đoạn thẳng AB
export function getSnapPoint(mouse, A, B) {
  const AB = { x: B.x - A.x, y: B.y - A.y };
  const AM = { x: mouse.x - A.x, y: mouse.y - A.y };
  const ab2 = AB.x ** 2 + AB.y ** 2;
  const am_dot_ab = AM.x * AB.x + AM.y * AB.y;
  const t = am_dot_ab / ab2;

  if (t < 0)
    return A; // ngoài đoạn về phía A
  else if (t > 1) return B; // ngoài đoạn về phía B

  // Điểm nằm trên đoạn AB
  return {
    x: A.x + AB.x * t,
    y: A.y + AB.y * t,
  };
}

export const getDistance = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const adjustPointerForZoom = (zoom, pointer) => {
  const zoomScale = zoom / 100;
  return {
    x: (pointer.x - Const.RULER_SIZE) / zoomScale,
    y: (pointer.y - Const.RULER_SIZE) / zoomScale,
  };
};

export const revertPointerFromZoom = (zoom, adjustedPointer) => {
  const zoomScale = zoom / 100;
  return {
    x: adjustedPointer.x * zoomScale + Const.RULER_SIZE,
    y: adjustedPointer.y * zoomScale + Const.RULER_SIZE,
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

export function transformPointsToCanvas(points, map) {
  const canvasPoints = [];
  for (let i = 0; i < points.length; i += 2) {
    const realX = points[i];
    const realY = points[i + 1];
    const { x: canvasX, y: canvasY } = getCanvasPosition(realX, realY, map);
    canvasPoints.push(canvasX, canvasY);
  }
  return canvasPoints;
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

// export const processLidarData = (lidar, transforms) => {
//   if (!lidar || !transforms) return;

//   const points = [];
//   for (let i = 0; i < lidar.ranges.length; i++) {
//     const r = lidar.ranges[i];
//     const angle = i * lidar.angle_increment + lidar.angle_min;
//     if (lidar.range_min < r && r < lidar.range_max) {
//       // Tính toán tọa độ LiDAR ban đầu
//       const x = r * Math.cos(angle);
//       const y = r * Math.sin(angle);
//       const point = { x, y };

//       // Kiểm tra nếu transform từ 'base_footprint' sang 'map' có sẵn
//       const transform = transforms[0];
//       if (transform) {
//         // Áp dụng xoay từ quaternion
//         const q = transform.transform.rotation; // quaternion: {x, y, z, w}

//         // Tính toán góc xoay từ quaternion
//         const angle = 2 * Math.acos(q.w); // Góc từ quaternion (theo radian)
//         const sinAngle = Math.sqrt(1 - q.w * q.w); // sin(θ)

//         // Xoay điểm LiDAR
//         const rotatedX = point.x * Math.cos(angle) - point.y * Math.sin(angle);
//         const rotatedY = point.x * Math.sin(angle) + point.y * Math.cos(angle);

//         // Áp dụng dịch chuyển từ translation
//         const transformedX = rotatedX + transform.transform.translation.x;
//         const transformedY = rotatedY + transform.transform.translation.y;

//         // Lưu điểm đã được chuyển đổi
//         points.push({ x: transformedX, y: transformedY });
//       }
//     }
//   }
//   return points; // Trả về các điểm đã xử lý
// };

export const processLidarData = (lidar, position, lidarPosition = 'front') => {
  if (!lidar || !position) return [];

  const points = [];
  const angleRobotRad = position.orientation * Math.PI / 180;

  // Offset lidar theo dọc robot
  const offsetY = (lidarPosition === 'front') ? 0.445 : -0.445;

  for (let i = 0; i < lidar.ranges.length; i++) {
    const r = lidar.ranges[i];
    const angle = i * lidar.angle_increment + lidar.angle_min;

    if (lidar.range_min < r && r < lidar.range_max) {
      // Điểm local của lidar
      const xLocal = r * Math.cos(angle);
      const yLocal = r * Math.sin(angle);

      // Lidar đặt lệch trục dọc, cộng offset
      const xLidar = xLocal;
      const yLidar = yLocal + offsetY;

      // Xoay theo góc robot
      const xRot = xLidar * Math.cos(angleRobotRad) - yLidar * Math.sin(angleRobotRad);
      const yRot = xLidar * Math.sin(angleRobotRad) + yLidar * Math.cos(angleRobotRad);

      // Dịch theo vị trí robot
      const xMap = xRot + position.x;
      const yMap = yRot + position.y;

      points.push({ x: xMap, y: yMap });
    }
  }

  return points;
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
  return Math.abs(p1.x - p2.x) < epsilon && Math.abs(p1.y - p2.y) < epsilon;
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
  const numerator = Math.abs(
    (y2 - y1) * point.x - (x2 - x1) * point.y + x2 * y1 - y2 * x1
  );
  const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  return numerator / denominator;
}

export function toPosKey({ x, y }) {
  return `${x.toFixed(4)},${y.toFixed(4)}`;
}

export const getPositionTypeName = (positionTypes, positionTypeId) => {
  const foundType = positionTypes.find((type) => type.id === positionTypeId);
  return foundType?.name || null;
};

export function simplifyPathByAngleThreshold(
  path,
  angleThreshold = (Math.PI / 180) * 5
) {
  if (path.length <= 2) return path;

  const simplified = [path[0]];

  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const next = path[i + 1];

    const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    const angleDiff = Math.atan2(
      Math.sin(angle2 - angle1),
      Math.cos(angle2 - angle1)
    );

    if (Math.abs(angleDiff) > angleThreshold) {
      simplified.push(curr);
    }
  }

  simplified.push(path[path.length - 1]);
  return simplified;
}

/**
 * Tính trung điểm giữa hai điểm A và B
 * @param {{x: number, y: number}} p1 - Điểm đầu
 * @param {{x: number, y: number}} p2 - Điểm cuối
 * @returns {{x: number, y: number}} Trung điểm giữa p1 và p2
 */
export function getMidPoint(p1, p2) {
  if (!p1 || !p2) return;

  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

export function getAllShapesFromLayers(layers) {
  const result = [];

  function extractShapes(shapes) {
    for (const item of shapes) {
      if (item.name === 'group' && Array.isArray(item.shapes)) {
        // Nếu là group, đệ quy vào shapes con
        extractShapes(item.shapes);
      } else {
        // Nếu không phải group, thêm vào kết quả
        result.push(item);
      }
    }
  }

  for (const layer of layers) {
    if (Array.isArray(layer.shapes)) {
      extractShapes(layer.shapes);
    }
  }

  return result;
}

export const getAllGroupsFromLayers = (layers) => {
  const allGroups = [];

  const findGroupsInShapes = (shapes) => {
    for (const shape of shapes) {
      if (shape.name === Const.ShapeName.GROUP) {
        allGroups.push(shape);
        // Đệ quy tiếp nếu group chứa shapes
        if (Array.isArray(shape.shapes)) {
          findGroupsInShapes(shape.shapes);
        }
      }
    }
  };

  for (const layer of layers) {
    if (Array.isArray(layer.shapes)) {
      findGroupsInShapes(layer.shapes);
    }
  }

  return allGroups;
};

/**
 * Chuyển mảng số dạng [x, y, x, y, ...] thành mảng đối tượng [{x, y}, ...]
 * Chỉ thực hiện nếu mảng hợp lệ (có độ dài chẵn và toàn số)
 * @param {any[]} flatArray - Mảng đầu vào
 * @returns {{x: number, y: number}[] | null} - Mảng đối tượng tọa độ
 */
export function convertToPointObjects(flatArray) {
  if (
    !Array.isArray(flatArray) ||
    flatArray.length % 2 !== 0 ||
    !flatArray.every((n) => typeof n === 'number' && isFinite(n))
  ) {
    return flatArray;
  }

  const result = [];
  for (let i = 0; i < flatArray.length; i += 2) {
    result.push({ x: flatArray[i], y: flatArray[i + 1] });
  }
  return result;
}

// Chuyển mảng 1D ROS thành ma trận 2D
const DIRS = [
  [0, 1], // phải
  [1, 0], // xuống
  [0, -1], // trái
  [-1, 0], // lên
];

// Tạo lưới nhị phân hiệu suất cao (dạng Uint8Array)
function convertTo2D(mapData, rows, cols, targetValue) {
  const grid = new Uint8Array(rows * cols);
  for (let i = 0; i < mapData.length; i++) {
    grid[i] = mapData[i] === targetValue ? 1 : 0;
  }
  return grid;
}

// Tìm polygon biên dựa trên Marching Squares đơn giản
function marchingSquares(grid, rows, cols) {
  const visited = new Uint8Array(rows * cols);
  const polygons = [];

  function traceBoundary(sr, sc) {
    let x = sr;
    let y = sc;
    let dir = 0;
    const path = [];

    do {
      path.push([y, x]); // lưu theo (x, y)
      let found = false;

      for (let i = 0; i < 4; i++) {
        const newDir = (dir + i) % 4;
        const [dr, dc] = DIRS[newDir];
        const nr = x + dr;
        const nc = y + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const index = nr * cols + nc;
          if (grid[index] === 1 && visited[index] === 0) {
            visited[index] = 1;
            x = nr;
            y = nc;
            dir = (newDir + 3) % 4;
            found = true;
            break;
          }
        }
      }

      if (!found) break; // không đi tiếp được
    } while (!(x === sr && y === sc));

    return path;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      if (grid[index] === 1 && visited[index] === 0) {
        visited[index] = 1;
        const poly = traceBoundary(r, c);
        if (poly.length > 2) {
          polygons.push(poly);
        }
      }
    }
  }

  return polygons;
}

// Hàm chính: Trích xuất polygons từ ROS map data
export function extractPolygons(
  mapData,
  rows,
  cols,
  targetValue,
  resolution = 1
) {
  const grid = convertTo2D(mapData, rows, cols, targetValue);
  const rawPolygons = marchingSquares(grid, rows, cols);

  // Tối ưu chuyển điểm + flatten
  const polygons = [];
  for (const poly of rawPolygons) {
    const flat = [];
    for (const [x, y] of poly) {
      flat.push(x * resolution, y * resolution);
    }
    polygons.push(flat);
  }

  return polygons;
}

export function filterMirconstMissionGroups(missionGroups) {
  return missionGroups.filter((group) => group.guid.startsWith('mirconst'));
}

export function extractMentionedParameters(actionDetail) {
  const { description, parameters } = actionDetail;
  if (!description || !Array.isArray(parameters)) return [];

  // Tìm tất cả các chuỗi dạng %(parameter_id) trong description
  const regex = /%\(([^)]+)\)/g;
  const mentionedIds = [];
  let match;

  while ((match = regex.exec(description)) !== null) {
    mentionedIds.push(match[1]); // match[1] là parameter_id
  }

  // Lọc các parameter có id nằm trong danh sách mentioned
  return parameters.filter((param) => mentionedIds.includes(param.id));
}

export function getMissionGroupIdFromGuid(guid) {
  // Giả sử guid dạng "mirconst-guid-0000-0001-missiongroup"
  const matches = guid.match(/(\d{4}-\d{4})/);
  return matches ? matches[1] : null;
}
