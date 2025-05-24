import * as Utils from '../utils';

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
  walls = [],
  lookAheadDist = 0.3
) {
  const K_linear = 1.0;
  const K_angular = 2.0;

  if (!originalPath || !originalPath.length) return null;

  const path = [...originalPath];

  // --- CHỈ XÓA ĐIỂM ĐÃ VƯỢT QUA ---
  // Khác với getNextVelocity, chúng ta không xóa điểm chỉ vì robot ở gần
  while (path.length > 1) {
    // Luôn giữ lại ít nhất 1 điểm
    // Kiểm tra xem robot đã vượt qua điểm chưa bằng phép chiếu vector
    const dx = path[1].x - path[0].x;
    const dy = path[1].y - path[0].y;
    const segmentLength = Math.hypot(dx, dy);

    if (segmentLength === 0) {
      path.shift(); // Loại bỏ điểm trùng
      continue;
    }

    // Vector hướng đoạn đường
    const ux = dx / segmentLength;
    const uy = dy / segmentLength;

    // Vector từ điểm đầu đến robot
    const rx = robotPos.x - path[0].x;
    const ry = robotPos.y - path[0].y;

    // Chiếu robot lên đoạn đường
    const projection = rx * ux + ry * uy;

    // Nếu chiếu dương và vượt qua độ dài đoạn đường, tức là đã vượt qua điểm tiếp theo
    if (projection > segmentLength) {
      path.shift(); // Xóa điểm đầu tiên vì đã đi qua
    } else {
      break; // Chưa vượt qua điểm tiếp theo
    }
  }

  if (!path.length) {
    return { linear: 0, angular: 0, path };
  }

  // --- TÌM ĐIỂM "LOOK-AHEAD" TRÊN ĐƯỜNG ĐI ---
  let targetPoint = null;
  let remainingDistance = lookAheadDist;
  let currentPos = { x: robotPos.x, y: robotPos.y };

  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i];
    const end = path[i + 1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const segmentLength = Math.hypot(dx, dy);

    if (segmentLength === 0) continue; // Bỏ qua đoạn không có độ dài

    // Vector hướng đoạn đường
    const ux = dx / segmentLength;
    const uy = dy / segmentLength;

    // Tìm điểm chiếu của robot lên đoạn đường
    const rx = currentPos.x - start.x;
    const ry = currentPos.y - start.y;
    const projection = rx * ux + ry * uy;
    const clampedProj = Math.max(0, Math.min(segmentLength, projection));

    // Điểm gần nhất trên đoạn đường
    const nearestPoint = {
      x: start.x + ux * clampedProj,
      y: start.y + uy * clampedProj,
    };

    // Khoảng cách từ robot đến điểm gần nhất
    const distToSegment = Math.hypot(
      currentPos.x - nearestPoint.x,
      currentPos.y - nearestPoint.y
    );

    // Nếu chúng ta quá xa đoạn đường, hãy nhắm vào điểm gần nhất
    if (distToSegment > 0.2) {
      targetPoint = nearestPoint;
      break;
    }

    // Khoảng cách còn lại trên đoạn đường từ điểm chiếu
    const distRemaining = segmentLength - clampedProj;

    if (distRemaining >= remainingDistance) {
      // Đủ khoảng cách trên đoạn này, tìm điểm look-ahead
      targetPoint = {
        x: nearestPoint.x + ux * remainingDistance,
        y: nearestPoint.y + uy * remainingDistance,
      };
      break;
    } else {
      // Không đủ khoảng cách, di chuyển sang đoạn tiếp theo
      remainingDistance -= distRemaining;
      currentPos = { x: end.x, y: end.y };
    }
  }

  // Nếu không tìm được điểm look-ahead, sử dụng điểm cuối cùng
  if (!targetPoint && path.length > 0) {
    targetPoint = path[path.length - 1];
  }

  // --- KIỂM TRA VẬT CẢN ---
  if (targetPoint) {
    if (
      isInForbiddenZone(targetPoint, forbiddenZones) ||
      Utils.pathCrossesWall(robotPos, targetPoint, walls)
    ) {
      console.log('Target in Forbidden Zone or Crosses Wall');

      // Tìm điểm an toàn đầu tiên trên đường đi
      for (const p of path) {
        if (
          !isInForbiddenZone(p, forbiddenZones) &&
          !Utils.pathCrossesWall(robotPos, p, walls)
        ) {
          targetPoint = p;
          break;
        }
      }

      if (
        isInForbiddenZone(targetPoint, forbiddenZones) ||
        Utils.pathCrossesWall(robotPos, targetPoint, walls)
      ) {
        return { linear: 0, angular: 0, path };
      }
    }

    if (pathCrossesObstacle(robotPos, targetPoint, obstacles, 0.5)) {
      console.log('Path Crosses Obstacle');
      targetPoint = adjustTargetNearObstacle(
        robotPos,
        targetPoint,
        obstacles,
        0.5
      );
    }
  }

  if (!targetPoint) {
    return { linear: 0, angular: 0, path };
  }

  // --- TÍNH TOÁN VẬN TỐC ---
  const dx = targetPoint.x - robotPos.x;
  const dy = targetPoint.y - robotPos.y;
  const angleToTarget = Math.atan2(dy, dx);
  let angleDiff = angleToTarget - robotPos.orientation;
  angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

  const distance = Math.hypot(dx, dy);

  // Kiểm tra xem đã đến đích chưa (chỉ khi điểm đích là điểm cuối cùng)
  const isLastPoint = targetPoint === path[path.length - 1];
  const isNearGoal = isLastPoint && distance < 0.1;

  if (isNearGoal) {
    // Đã đến đích, dừng lại
    return { linear: 0, angular: 0, path: [] };
  }

  // --- GIẢM TỐC KHI GÓC LỆCH LỚN ---
  const anglePenalty = Math.max(0.3, 1 - Math.abs(angleDiff) / Math.PI);
  const isSharpTurn = Math.abs(angleDiff) > Math.PI / 8;

  // Tính hệ số giảm tốc dựa trên góc lệch (càng lệch càng giảm)
  const turnPenalty = isSharpTurn
    ? Math.max(0.3, 1 - (Math.abs(angleDiff) - Math.PI / 8) / (Math.PI / 4))
    : 1;

  let linear = 0;

  // // Điều chỉnh vận tốc tuyến tính dựa trên góc lệch
  // if (Math.abs(angleDiff) < Math.PI / 6) {
  //   // Góc lệch nhỏ, có thể di chuyển và xoay đồng thời
  //   linear = clamp(
  //     K_linear * distance * anglePenalty * turnPenalty,
  //     0, // Không đi lùi
  //     linearBase
  //   );
  // } else if (Math.abs(angleDiff) < Math.PI / 3) {
  //   // Góc lệch trung bình, giảm tốc mạnh
  //   linear = clamp(
  //     K_linear * distance * 0.3 * turnPenalty,
  //     0,
  //     linearBase * 0.5
  //   );
  // } else {
  //   // Góc lệch lớn, chỉ xoay tại chỗ
  //   linear = 0;
  // }

  // Điều chỉnh vận tốc tuyến tính dựa trên góc lệch
  if (Math.abs(angleDiff) < Math.PI / 6) {
    // Góc lệch nhỏ, có thể di chuyển và xoay đồng thời
    linear = clamp(
      K_linear * distance * anglePenalty * turnPenalty,
      0,
      linearBase
    );
  } else if (Math.abs(angleDiff) < Math.PI / 3) {
    // Góc lệch trung bình, giảm tốc mạnh
    linear = clamp(
      K_linear * distance * 0.3 * turnPenalty,
      0,
      linearBase * 0.5
    );
  } else {
    // Góc lệch lớn, vẫn tiến chậm để tránh xoay tại chỗ
    linear = clamp(
      K_linear * distance * 0.1 * turnPenalty,
      0,
      linearBase * 0.2
    );
  }

  // Điều chỉnh hệ số góc dựa trên tốc độ tiến
  const angularGain = linear > 0 ? K_angular : K_angular * 1.5;

  const angular = clamp(angularGain * angleDiff, -angularBase, angularBase);

  return {
    linear,
    angular,
    path,
  };
}

// ==== Hỗ trợ ====

function isInForbiddenZone(point, zones) {
  return zones.some((polygon) => Utils.pointInPolygon(point, polygon.polygon));
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
