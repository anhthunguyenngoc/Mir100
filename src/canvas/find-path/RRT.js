import * as Utils from '../utils';
import { kdTree } from 'kd-tree-javascript';

export function rrtStar(
  start,
  goal,
  obstacles,
  mapWidth,
  mapHeight,
  maxNodes = 1000,
  stepSize = 20,
  threshold = 10,
  goalSampleRate = 0.05
) {
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const tree = [{ x: start.x, y: start.y, parent: null, cost: 0 }];
  const goalCandidates = [];
  const epsilon = 1e-3;
  const goalRadius = Math.min(50, Math.max(20, stepSize * 2));

  // Khởi tạo KD-Tree
  const kd = new kdTree(tree, distance, ["x", "y"]);

  const goalRegion = {
    x: Math.min(goal.x + goalRadius, mapWidth),
    y: Math.min(goal.y + goalRadius, mapHeight),
  };

  for (let i = 0; i < maxNodes; i++) {
    const rand = advancedSample(goal, tree, mapWidth, mapHeight, goalSampleRate, obstacles, threshold, stepSize, goalRegion);
    const nearest = kd.nearest(rand, 1)[0][0]; // nearest returns [[node, dist]]

    const newNode = stepToward(nearest, rand, stepSize);

    if (
      !isInObstacle(nearest, newNode, obstacles) &&
      !isEdgeTooCloseToObstacle(nearest, newNode, obstacles, threshold)
    ) {
      const radius = Math.max(
        30,
        Math.min(80, stepSize * 2 * Math.sqrt(Math.log(tree.length + 1) / (tree.length + 1)))
      );

      const nearNodes = tree.filter(
        (n) =>
          distance(n, newNode) <= radius &&
          !isInObstacle(n, newNode, obstacles) &&
          !isEdgeTooCloseToObstacle(n, newNode, obstacles, threshold)
      );

      let minCost = nearest.cost + distance(nearest, newNode);
      let bestParent = nearest;

      for (const node of nearNodes) {
        const cost = node.cost + distance(node, newNode);
        if (cost < minCost) {
          minCost = cost;
          bestParent = node;
        }
      }

      newNode.cost = minCost;
      newNode.parent = bestParent;
      tree.push(newNode);
      kd.insert(newNode); // thêm node vào KD-Tree

      for (const node of nearNodes) {
        const costThroughNew = newNode.cost + distance(node, newNode);
        if (costThroughNew < node.cost - epsilon) {
          node.parent = newNode;
          node.cost = costThroughNew;
        }
      }

      if (distance(newNode, goal) < goalRadius) {
        if (
          !isInObstacle(newNode, goal, obstacles) &&
          !isEdgeTooCloseToObstacle(newNode, goal, obstacles, threshold)
        ) {
          const goalNode = { ...goal, parent: newNode, cost: newNode.cost + distance(newNode, goal) };
          goalCandidates.push(goalNode);
        }
      }
    }
  }

  if (goalCandidates.length === 0) return null;
  const best = goalCandidates.reduce((a, b) => (a.cost < b.cost ? a : b));
  return buildPath(best);
}

// =================== Lấy mẫu nâng cao ===================

function advancedSample(goal, tree, w, h, goalRate, obstacles, threshold, stepSize, goalRegion) {
  const useGoal = Math.random() < goalRate;
  if (useGoal) return { ...goal };

  const rand = Math.random();
  const exploredDensityMap = createDensityMap(tree, w, h, 50);

  // Ưu tiên vùng ít node (informed region)
  for (let i = 0; i < 10; i++) {
    const pt = getRandomPoint(w, h, goalRegion); // Giới hạn vùng lấy mẫu gần mục tiêu
    const cellKey = getCellKey(pt, 50);
    if (exploredDensityMap[cellKey] <= 3 && isSafeSample(pt, obstacles, threshold)) return pt;
  }

  // Lấy mẫu dọc theo đường nối nearest → goal
  if (rand < 0.3) {
    const nearest = getNearest(tree, goal);
    const dir = stepToward(nearest, goal, stepSize * 2);
    if (isSafeSample(dir, obstacles, threshold)) return dir;
  }

  // Lấy mẫu ngẫu nhiên nhưng an toàn
  while (true) {
    const pt = getRandomPoint(w, h);
    if (isSafeSample(pt, obstacles, threshold)) return pt;
  }
}

function getRandomPoint(w, h, goalRegion = null) {
  if (goalRegion) {
    // Lấy mẫu gần mục tiêu trong vùng goalRegion
    const x = Math.random() * (goalRegion.x);
    const y = Math.random() * (goalRegion.y);
    return { x, y };
  } else {
    return { x: Math.random() * w, y: Math.random() * h };
  }
}

function isSafeSample(pt, obstacles, threshold) {
  return !isTooCloseToObstacle(pt, obstacles, threshold);
}

function createDensityMap(tree, w, h, cellSize) {
  const map = {};
  for (const pt of tree) {
    const key = getCellKey(pt, cellSize);
    map[key] = (map[key] || 0) + 1;
  }
  return map;
}

function getCellKey(pt, size) {
  const cx = Math.floor(pt.x / size);
  const cy = Math.floor(pt.y / size);
  return `${cx},${cy}`;
}

// =================== Các hàm phụ khác giữ nguyên ===================

function getNearest(tree, point) {
  return tree.reduce((a, b) =>
    distance(a, point) < distance(b, point) ? a : b
  );
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function stepToward(from, to, stepSize) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  return {
    x: from.x + stepSize * Math.cos(angle),
    y: from.y + stepSize * Math.sin(angle),
  };
}

function buildPath(goalNode) {
  const path = [];
  let node = goalNode;
  while (node) {
    path.push({ x: node.x, y: node.y });
    node = node.parent;
  }
  return path.reverse();
}

function isInObstacle(p1, p2, obstacles) {
  const [forbiddenZones, walls] = obstacles;
  return (
    isInForbiddenZone(p2, forbiddenZones) ||
    Utils.pathCrossesWall(p1, p2, walls)
  );
}

function isInForbiddenZone(point, zones) {
  return zones.some((polygon) => Utils.pointInPolygon(point, polygon.polygon));
}

function isTooCloseToObstacle(point, obstacles, threshold) {
  const [forbiddenZones, walls] = obstacles;
  return (
    Utils.pointNearPolygon(point, forbiddenZones, threshold) ||
    Utils.pointNearLine(point, walls, threshold)
  );
}

function isEdgeTooCloseToObstacle(p1, p2, obstacles, threshold) {
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p1.x + t * (p2.x - p1.x);
    const y = p1.y + t * (p2.y - p1.y);
    if (isTooCloseToObstacle({ x, y }, obstacles, threshold)) return true;
  }
  return false;
}
