import * as Utils from '../utils';

export function smoothPath(path, obstacles, threshold = 20) {
  if (path.length <= 2) return path;

  const smoothedPath = [];
  let startIdx = 0;

  while (startIdx < path.length - 1) {
    let found = false;
    const maxStep = path.length - 1;

    // Tăng dần bước nhảy kiểm tra
    for (let step = maxStep; step > 0; step--) {
      const endIdx = startIdx + step;
      if (endIdx >= path.length) continue;

      const p1 = path[startIdx];
      const p2 = path[endIdx];

      if (
        !lineCrossesObstacle(p1, p2, obstacles) &&
        !isEdgeTooCloseToObstacle(p1, p2, obstacles, threshold)
      ) {
        const adjusted = adjustPointToObstacle(p1, p2, obstacles, threshold);
        pushIfNotDuplicate(smoothedPath, p1);
        pushIfNotDuplicate(smoothedPath, adjusted);
        startIdx = endIdx;
        found = true;
        break;
      }
    }

    if (!found) {
      pushIfNotDuplicate(smoothedPath, path[startIdx]);
      startIdx++;
    }
  }

  pushIfNotDuplicate(smoothedPath, path.at(-1));

  return repeatedPrune(smoothedPath, obstacles, threshold);
}

function repeatedPrune(path, obstacles, threshold, maxIterations = 3) {
  let current = path;
  for (let i = 0; i < maxIterations; i++) {
    const pruned = prunePath(current, obstacles, threshold);
    if (pruned.length === current.length) break; // dừng nếu không còn gì để cải thiện
    current = pruned;
  }
  return current;
}

function prunePath(path, obstacles, threshold) {
  const pruned = [];
  let i = 0;

  while (i < path.length) {
    pruned.push(path[i]);
    let nextIdx = i + 2;
    while (nextIdx < path.length) {
      const p1 = path[i];
      const p2 = path[nextIdx];
      if (
        lineCrossesObstacle(p1, p2, obstacles) ||
        isEdgeTooCloseToObstacle(p1, p2, obstacles, threshold)
      ) break;
      nextIdx++;
    }
    i = nextIdx - 1;
  }

  if (!Utils.pointsEqual(pruned.at(-1), path.at(-1))) {
    pruned.push(path.at(-1));
  }

  return pruned;
}

function adjustPointToObstacle(p1, p2, obstacles, threshold) {
  const directions = 8;
  const radius = 15;
  const step = 3;
  let bestPoint = p2;
  let minDist = Infinity;

  for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / directions) {
    for (let r = 0; r <= radius; r += step) {
      const candidate = {
        x: p2.x + r * Math.cos(angle),
        y: p2.y + r * Math.sin(angle)
      };

      let minObstacleDist = Infinity;
      for (const poly of obstacles[0]) {
        minObstacleDist = Math.min(minObstacleDist, Utils.distancePointToPolygon(candidate, poly.polygon));
      }

      for (const wall of obstacles[1]) {
        minObstacleDist = Math.min(
          minObstacleDist,
          Utils.distancePointToLineSegment(candidate, wall.polygon[0], wall.polygon[1])
        );
      }

      if (minObstacleDist >= threshold && minObstacleDist < minDist) {
        bestPoint = candidate;
        minDist = minObstacleDist;
      }
    }
  }

  return bestPoint;
}

function isEdgeTooCloseToObstacle(p1, p2, obstacles, threshold) {
  const dist = Utils.distance(p1, p2);
  const step = Math.max(5, threshold / 2);
  const sampleCount = Math.ceil(dist / step);

  for (let i = 0; i <= sampleCount; i++) {
    const t = i / sampleCount;
    const x = p1.x + t * (p2.x - p1.x);
    const y = p1.y + t * (p2.y - p1.y);
    const point = { x, y };

    for (const poly of obstacles[0]) {
      if (Utils.distancePointToPolygon(point, poly.polygon) < threshold) return true;
    }

    if (Utils.pointNearLine(point, obstacles[1], threshold)) return true;
  }

  return false;
}

function isPointTooCloseToObstacle(point, obstacles, threshold) {
  for (const poly of obstacles[0]) {
    // Kiểm tra khoảng cách từ điểm đến đa giác
    if (Utils.distancePointToPolygon(point, poly.polygon) < threshold) {
      return true;
    }
  }

  for (const line of obstacles[1]) {
    // Kiểm tra khoảng cách từ điểm đến đoạn thẳng
    if (Utils.distancePointToLine(point, line) < threshold) {
      return true;
    }
  }

  return false;
}

function pushIfNotDuplicate(path, point) {
  if (path.length === 0 || !Utils.pointsEqual(path[path.length - 1], point)) {
    path.push(point);
  }
}

function lineCrossesObstacle(p1, p2, obstacles) {
  return (
    Utils.isPathIntersectingPolygons(p1, p2, obstacles[0]) ||
    Utils.pathCrossesWall(p1, p2, obstacles[1])
  );
}