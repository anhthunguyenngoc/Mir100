function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

/**
 * Điều khiển robot theo đường đi đã chia nhỏ, tránh vật cản và tường
 * @param {Object} robotPos - Vị trí hiện tại của robot { x, y, orientation }
 * @param {Array<{x: number, y: number}>} path - Danh sách điểm theo thứ tự
 * @param {number} linearBase - Tốc độ tiến cơ bản (m/s)
 * @param {number} angularBase - Tốc độ quay cơ bản (rad/s)
 * @param {Array<Array<{x: number, y: number}>>} forbiddenZones - Các vùng cấm (polygon)
 * @param {Array<{x: number, y: number}>} obstacles - Danh sách điểm vật cản
 * @param {Array<Array<{x: number, y: number}>>} walls - Danh sách polyline biểu diễn tường
 * @returns {{ linear: number, angular: number, path: Array } | null}
 */
export function getNextVelocity(
  robotPos,
  originalPath,
  linearBase,
  angularBase,
  forbiddenZones = [],
  obstacles = [],
  walls = []
) {
  const K_linear = 1.0;
  const K_angular = 2.0;

  if (!originalPath.length) return null;

  // --- Thêm điểm đệm tại các góc cua ---
  // const path = insertCornerBufferPoints(originalPath);
  const path = originalPath;

  // Xoá các điểm quá gần
  while (path.length > 0) {
    const dx = path[0].x - robotPos.x;
    const dy = path[0].y - robotPos.y;
    if (Math.hypot(dx, dy) < 0.1) {
      path.shift();
    } else {
      break;
    }
  }

  if (!path.length) {
    return { linear: 0, angular: 0, path };
  }

  // Tìm điểm target hợp lệ
  let target = null;
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    const dist = Math.hypot(p.x - robotPos.x, p.y - robotPos.y);

    if (
      isInForbiddenZone(p, forbiddenZones) ||
      pathCrossesWall(robotPos, p, walls)
    ) {
      console.log('Forbidden Zone or Crosses Wall');
      return { linear: 0, angular: 0, path };
    }

    if (pathCrossesObstacle(robotPos, p, obstacles, 1)) {
      console.log('Crosses Obstacle');
      target = adjustTargetNearObstacle(robotPos, p, obstacles, 1);
      break;
    }

    if (dist > 0.1) {
      target = p;
      break;
    }
  }

  if (!target) {
    target = path[path.length - 1];
  }

  const dx = target.x - robotPos.x;
  const dy = target.y - robotPos.y;
  const angleToTarget = Math.atan2(dy, dx);
  let angleDiff = angleToTarget - robotPos.orientation;
  angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

  const distance = Math.hypot(dx, dy);

  // --- Giảm tốc nếu góc lệch lớn ---
  const anglePenalty = Math.max(0.2, 1 - Math.abs(angleDiff) / Math.PI);
  const isSharpTurn = Math.abs(angleDiff) > Math.PI / 6;
  const turnPenalty = isSharpTurn ? 0.5 : 1;
  const angularPenalty = isSharpTurn ? 0.5 : 1;

  const linear = clamp(
    K_linear *
      distance *
      anglePenalty *
      turnPenalty *
      (Math.abs(angleDiff) < Math.PI / 2 ? 1 : -0.5),
    -linearBase,
    linearBase
  );

  const angular = clamp(
    K_angular * angleDiff * angularPenalty,
    -angularBase,
    angularBase
  );

  return {
    linear,
    angular,
    path,
  };
}

// ==== Chèn điểm đệm tại góc cua ====
export function insertCornerBufferPoints(path, angleThreshold = Math.PI / 4) {
  if (path.length < 3) return path;

  const newPath = [path[0]];
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const next = path[i + 1];

    const a1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const a2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    const angleDiff = Math.abs(
      Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))
    );

    if (angleDiff > angleThreshold) {
      const ratio = 0.3;
      const bx = curr.x + ratio * (prev.x - curr.x);
      const by = curr.y + ratio * (prev.y - curr.y);
      const fx = curr.x + ratio * (next.x - curr.x);
      const fy = curr.y + ratio * (next.y - curr.y);

      newPath.push({ x: bx, y: by });
      newPath.push(curr);
      newPath.push({ x: fx, y: fy });
    } else {
      newPath.push(curr);
    }
  }
  newPath.push(path[path.length - 1]);
  return newPath;
}

// ==== Hỗ trợ ====

function isInForbiddenZone(point, zones) {
  return zones.some((polygon) => pointInPolygon(point, polygon.polygon));
}

function pathCrossesObstacle(start, end, obstacles, threshold = 0.25) {
  return obstacles.some((obs) => {
    const dist = pointToSegmentDistance(obs, start, end);
    return dist < threshold;
  });
}

function isNearWall(point, walls, threshold = 0.25) {
  return walls.some((line) => {
    for (let i = 0; i < line.polygon.length - 1; i++) {
      const dist = pointToSegmentDistance(
        point,
        line.polygon[i],
        line.polygon[i + 1]
      );
      if (dist < threshold) return true;
    }
    return false;
  });
}

function pointToSegmentDistance(p, v, w) {
  const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
  return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function pointInPolygon(point, polygon) {
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

// ==== MỚI: kiểm tra giao cắt tường ====

function pathCrossesWall(start, end, walls) {
  for (const wall of walls) {
    const points = wall.polygon;
    for (let i = 0; i < points.length - 1; i++) {
      if (segmentsIntersect(start, end, points[i], points[i + 1])) {
        console.log(start, end, points[i], points[i + 1]);
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

// ==== MỚI: cập nhật target nếu gần vật cản ====

function adjustTargetNearObstacle(start, target, obstacles, threshold = 0.25) {
  let closestObstacle = null;
  let minDist = Infinity;

  for (const obs of obstacles) {
    const dist = pointToSegmentDistance(obs, start, target);
    if (dist < threshold && dist < minDist) {
      closestObstacle = obs;
      minDist = dist;
    }
  }

  if (!closestObstacle) return target; // Không bị chắn → giữ nguyên

  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const len = Math.hypot(dx, dy);

  if (len === 0) return target;

  const ux = dx / len;
  const uy = dy / len;

  const obsProjDist =
    (closestObstacle.x - start.x) * ux + (closestObstacle.y - start.y) * uy;
  const safeDist = Math.max(0, obsProjDist - threshold * 1.1);

  return {
    x: start.x + ux * safeDist,
    y: start.y + uy * safeDist,
  };
}
