import { aStar } from './AStar';

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
