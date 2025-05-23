import { aStar } from './AStar';
import { extractPolygons } from 'canvas/utils';

export const aStarWorkerCode = `
  self.onmessage = function(e) {
    const { start, goal, obstacles, mapWidth, mapHeight } = e.data;
    const result = aStar(start, goal, obstacles, mapWidth, mapHeight);
    postMessage(result);
  };
          
  function calculateManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function pointNearPolygon(point, polygons, threshold) {
    return polygons.some(
      (poly) => distancePointToPolygon(point, poly.polygon) < threshold
    );
  }
  
  function pointNearLine(point, lines, threshold) {
    return lines.some(
      (line) =>
        distancePointToLineSegment(point, line.polygon[0], line.polygon[1]) <
        threshold
    );
  }

  function distancePointToLineSegment(p, v, w) {
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

  function distancePointToPolygon(point, polygon) {
    let minDist = Infinity;
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      const dist = distancePointToLineSegment(point, p1, p2);
      if (dist < minDist) minDist = dist;
    }
    return minDist;
  }

  function isPointInObstacle(point, obstacles, threshold = 10) {
      const [forbiddenZones, walls] = obstacles;
      return (
          pointNearPolygon(point, forbiddenZones, threshold) ||
          pointNearLine(point, walls, threshold)
      );
  }

  class PriorityQueue {
    constructor() { this.queue = []; }
    enqueue(item, priority) {
      this.queue.push({ item, priority });
      this.queue.sort((a, b) => a.priority - b.priority);
    }
    dequeue() { return this.queue.shift().item; }
    isEmpty() { return this.queue.length === 0; }
  }

  ${aStar.toString()}
`;

export const mapWorkerCode = `
  self.onmessage = function (e) {
  const { mapData, rows, cols, targetValues, resolution } = e.data;

  // Kết quả sẽ lưu polygons cho từng targetValue
  const results = {};

  for (const targetValue of targetValues) {
    const polygons = extractPolygons(mapData, rows, cols, targetValue, resolution);
    results[targetValue] = polygons;
  }

  postMessage(results);
};
          
  // Chuyển mảng 1D ROS thành ma trận 2D
const DIRS = [
  [0, 1],   // phải
  [1, 0],   // xuống
  [0, -1],  // trái
  [-1, 0],  // lên
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

  ${extractPolygons.toString()}
`;
