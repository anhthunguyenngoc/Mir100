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
  path,
  linearBase,
  angularBase,
  forbiddenZones = [],
  obstacles = [],
  walls = []
) {
  const K_linear = 1.0;
  const K_angular = 2.0;

  if (!path.length) return null;

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
      console.log(
        'Forbidden Zone or Crosses Wall',
        isInForbiddenZone(p, forbiddenZones),
        pathCrossesWall(robotPos, p, walls)
      );
      return { linear: 0, angular: 0, path };
    }

    // Nếu gần vật cản, cập nhật target gần vật cản
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
  const linear =
    K_linear * distance * (Math.abs(angleDiff) < Math.PI / 2 ? 1 : -0.5);
  const angular = K_angular * angleDiff;

  return {
    linear: clamp(linear, -linearBase, linearBase),
    angular: clamp(angular, -angularBase, angularBase),
    path,
  };
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

    if (intersect) console.log(point, xi, yi, xj, yj);
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

