import * as utils from '../utils';
import { getAllIntersections } from 'canvas/find-intersections';

const SNAP_THRESHOLD = 10;
function getClosestSnapPoint(mouse, points, threshold) {
  let closest = null;
  let minDist = Infinity;
  for (const p of points) {
    const d = distance(mouse, p);
    if (d < threshold && d < minDist) {
      minDist = d;
      closest = p;
    }
  }
  return closest;
}

export const getSnapPoint = (
  enabledSnapModes,
  mouse,
  prevMouse,
  shapes,
  gridSize = 20
) => {
  // Tạo các mảng riêng biệt cho từng loại điểm theo thứ tự ưu tiên
  let midPointCandidates = [];
  let endPointCandidates = [];
  let intersectionCandidates = [];
  let nodePointCandidates = [];
  let quadrantPointCandidates = [];
  let perpendicularPointCandidates = [];
  let tangentPointCandidates = [];
  let nearestPointCandidates = [];
  let gridPointCandidates = [];

  // Thu thập tất cả các loại điểm từ shapes
  for (const shape of shapes) {
    const { id: shapeId, startP, endP, points } = shape;

    // Mid points (ưu tiên cao nhất)
    if (enabledSnapModes.mid && startP && endP) {
      midPointCandidates.push({
        x: (startP.x + endP.x) / 2,
        y: (startP.y + endP.y) / 2,
        type: 'mid',
        shapeId,
      });
    }

    // End points (ưu tiên thứ ba)
    if (enabledSnapModes.end && endP && startP) {
      endPointCandidates.push({ ...endP, type: 'end', shapeId });
      endPointCandidates.push({ ...startP, type: 'end', shapeId });
    }

    // Nearest points (ưu tiên thấp)
    if (enabledSnapModes.nearest && points?.length >= 2) {
      const nearest = getClosestPointOnPolyline(points, mouse);
      if (nearest) {
        nearestPointCandidates.push({ ...nearest, type: 'nearest', shapeId });
      }
    }

    // Node points (ưu tiên thứ năm)
    if (enabledSnapModes.node) {
      utils.convertToPointObjects(points).forEach((p) =>
            nodePointCandidates.push({ ...p, type: 'node', shapeId })
          );
    }

    if (enabledSnapModes.quadrant) {
      shapes.forEach((shape) => {
        if (shape.name.includes('arc') && shape.centerP) {
          const points = getQuadrantPoints(shape);
          points.forEach((p) =>
            quadrantPointCandidates.push({ ...p, type: 'quadrant', shapeId })
          );
        } else if (shape.name === 'uline') {
          const points = getEllipticalArcQuadrantPoints(shape);
          points.forEach((p) =>
            quadrantPointCandidates.push({ ...p, type: 'quadrant', shapeId })
          );
        }
      });
    }

    if (enabledSnapModes.perpendicular && prevMouse) {
      const perp =
        shape.name === 'line'
          ? getPerpendicularPoint(shape, prevMouse)
          : shape.name.includes('arc')
            ? getPerpendicularToArc(shape, prevMouse)
            : null;
      if (perp) {
        perpendicularPointCandidates.push({
          ...perp,
          type: 'perpendicular',
          shapeId,
        });
      }
    }

    if (enabledSnapModes.tangent && prevMouse) {
      if (shape.name.includes('arc') && shape.centerP) {
        const tangent = getTangentPoints(shape, prevMouse);
        if (tangent.length > 0) {
          tangent.forEach((p) =>
            tangentPointCandidates.push({ ...p, type: 'tangent', shapeId })
          );
        }
      }
    }
  }

  // Intersection points (ưu tiên thứ tư)
  if (enabledSnapModes.intersection) {
    const intersections = getAllIntersections(shapes);
    if (intersections && intersections.length > 0) {
      intersections.forEach((p) =>
        intersectionCandidates.push({ ...p, type: 'intersection' })
      );
    }
  }

  // Grid points (ưu tiên thấp nhất)
  if (enabledSnapModes.grid) {
    const gridP = getNearestGridPoint(mouse, gridSize);
    gridPointCandidates.push({ ...gridP, type: 'grid' });
  }

  // Kiểm tra theo thứ tự ưu tiên
  // 1. Mid points
  const closestMidPoint = getClosestSnapPoint(
    mouse,
    midPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestMidPoint) {
    return closestMidPoint;
  }

  // 3. End points
  const closestEndPoint = getClosestSnapPoint(
    mouse,
    endPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestEndPoint) {
    return closestEndPoint;
  }

  // 4. Intersection points
  const closestIntersection = getClosestSnapPoint(
    mouse,
    intersectionCandidates,
    SNAP_THRESHOLD
  );
  if (closestIntersection) {
    return closestIntersection;
  }

  // 5. Node points
  const closestNodePoint = getClosestSnapPoint(
    mouse,
    nodePointCandidates,
    SNAP_THRESHOLD
  );
  if (closestNodePoint) {
    return closestNodePoint;
  }

  // 5. Quadrant points
  const closestQuadrantPoint = getClosestSnapPoint(
    mouse,
    quadrantPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestQuadrantPoint) {
    return closestQuadrantPoint;
  }

  // 5. Perpendicular points
  const closestPerpendicularPoint = getClosestSnapPoint(
    mouse,
    perpendicularPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestPerpendicularPoint) {
    return closestPerpendicularPoint;
  }

  // 5. Tangent points
  const closestTangentPoint = getClosestSnapPoint(
    mouse,
    tangentPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestTangentPoint) {
    return closestTangentPoint;
  }

  // 5. Nearest points
  const closestNearestPoint = getClosestSnapPoint(
    mouse,
    nearestPointCandidates,
    SNAP_THRESHOLD
  );
  if (closestNearestPoint) {
    return closestNearestPoint;
  }

  // 6. Grid points (ưu tiên thấp nhất)
  return getClosestSnapPoint(mouse, gridPointCandidates, SNAP_THRESHOLD);
};

function getNearestGridPoint({ x, y }, gridSize) {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
}

function getClosestPointOnPolyline(points, pos) {
  let closest = null;
  let minDist = Infinity;
  for (let i = 0; i < points.length - 1; i++) {
    const p = getClosestPointOnLine(points[i], points[i + 1], pos);
    const d = distance(p, pos);
    if (d < minDist) {
      minDist = d;
      closest = p;
    }
  }
  return closest;
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// Project point P lên đoạn thẳng AB
function getClosestPointOnLine(A, B, P) {
  const AB = { x: B.x - A.x, y: B.y - A.y };
  const AP = { x: P.x - A.x, y: P.y - A.y };
  const ab2 = AB.x * AB.x + AB.y * AB.y;
  const ap_ab = AP.x * AB.x + AP.y * AB.y;
  let t = Math.max(0, Math.min(1, ap_ab / ab2));
  return {
    x: A.x + t * AB.x,
    y: A.y + t * AB.y,
  };
}

function getQuadrantPoints(arc) {
  const { centerP, radius } = arc;
  return [
    { x: centerP.x + radius, y: centerP.y }, // 0°
    { x: centerP.x, y: centerP.y + radius }, // 90°
    { x: centerP.x - radius, y: centerP.y }, // 180°
    { x: centerP.x, y: centerP.y - radius }, // 270°
  ].filter((p) => utils.isPointOnArc?.(p, arc)); // nếu là arc thì cần lọc
}

/**
 * Tìm điểm vuông góc từ điểm A lên đường thẳng d: ax + by + c = 0
 * @param {{x: number, y: number}} pointA - điểm A cần tìm hình chiếu
 * @param {{a: number, b: number, c: number}} line - đường thẳng d: ax + by + c = 0
 * @returns {{x: number, y: number}} điểm H là hình chiếu vuông góc của A lên d
 */
function getPerpendicularPoint(line, pointA) {
  const { a, b, c } = convertToGeneralForm(line);
  const { x: xA, y: yA } = pointA;

  /* Giải theo phương pháp đại số:
   * 1. Điểm H thuộc đường thẳng d nên: a*xH + b*yH + c = 0      (1)
   * 2. Vector AH vuông góc với vector pháp tuyến n(a,b) của đường thẳng
   *    => b*(xH - xA) - a*(yH - yA) = 0                          (2)
   *
   * Giải hệ phương trình (1) và (2):
   */

  // Từ (2): b*xH - b*xA - a*yH + a*yA = 0
  //       => b*xH - a*yH = b*xA - a*yA

  // Thay b*xH - a*yH vào phương trình (1):
  // a*xH + b*yH + c = 0
  // => a*xH + b*yH = -c

  // Giải hệ:
  // b*xH - a*yH = b*xA - a*yA      (từ phương trình 2)
  // a*xH + b*yH = -c               (từ phương trình 1)

  // Nhân phương trình 1 với a: a²*xH + a*b*yH = -a*c
  // Nhân phương trình 2 với b: b²*xH - a*b*yH = b²*xA - a*b*yA
  // Cộng hai phương trình: (a² + b²)*xH = -a*c + b²*xA - a*b*yA

  const denominator = a * a + b * b;
  if (denominator === 0) return null; // Kiểm tra trường hợp đặc biệt

  // Tính xH
  const xH = (-a * c + b * b * xA - a * b * yA) / denominator;

  // Tính yH từ phương trình (1): a*xH + b*yH + c = 0
  // => yH = (-c - a*xH) / b
  let yH;
  if (Math.abs(b) > 0.0001) {
    // Nếu b không quá nhỏ
    yH = (-c - a * xH) / b;
  } else {
    // Nếu b ≈ 0, dùng phương trình (2): b*(xH - xA) - a*(yH - yA) = 0
    // Với b ≈ 0: -a*(yH - yA) ≈ 0 => yH ≈ yA (vì a ≠ 0, nếu không line không phải đường thẳng)
    yH = (-a * c - a * a * xA - a * b * yA) / denominator;
  }

  return { x: xH, y: yH };
}

/**
 * Chuyển đổi từ biểu diễn đoạn thẳng qua 2 điểm sang phương trình tổng quát ax + by + c = 0
 * @param {{p1: {x, y}, p2: {x, y}}} segment - đoạn thẳng định nghĩa bởi 2 điểm
 * @returns {{a: number, b: number, c: number}} hệ số của phương trình đường thẳng
 */
function convertToGeneralForm(segment) {
  const { x: x1, y: y1 } = segment.startP;
  const { x: x2, y: y2 } = segment.endP;

  // Phương trình đường thẳng qua 2 điểm:
  // (y - y1)(x2 - x1) = (x - x1)(y2 - y1)
  // => (y2 - y1)*x - (x2 - x1)*y + (x2 - x1)*y1 - (y2 - y1)*x1 = 0

  const a = y2 - y1;
  const b = x1 - x2;
  const c = (x2 - x1) * y1 - (y2 - y1) * x1;

  return { a, b, c };
}

/**
 * Tìm điểm tiếp xúc từ điểm ngoài đường tròn đến đường tròn
 * @param {{x: number, y: number}} center - Tâm đường tròn
 * @param {number} radius - Bán kính đường tròn
 * @param {{x: number, y: number}} externalPoint - Điểm ngoài đường tròn
 * @returns {{x: number, y: number}[] | null} - Danh sách điểm tiếp xúc (1 hoặc 2 điểm), hoặc null nếu không tồn tại
 */
function getTangentPoints(arc, externalPoint) {
  const { centerP, radius } = arc;
  const dx = externalPoint.x - centerP.x;
  const dy = externalPoint.y - centerP.y;
  const distSq = dx * dx + dy * dy;
  const rSq = radius * radius;

  // Nếu điểm nằm trong hoặc trên đường tròn => không có tiếp tuyến thực
  if (distSq <= rSq) return null;

  const dist = Math.sqrt(distSq);
  const angleToP = Math.atan2(dy, dx);
  const angleOffset = Math.acos(radius / dist);

  const angles = [angleToP + angleOffset, angleToP - angleOffset];

  return angles.map((angle) => ({
    x: centerP.x + radius * Math.cos(angle),
    y: centerP.y + radius * Math.sin(angle),
  }));
}

function getPerpendicularToArc(arc, mouse) {
  const { x: xA, y: yA } = mouse;
  const { centerP, radius, startAngle, endAngle, clockwise } = arc;
  const xC = centerP.x,
    yC = centerP.y;

  const dx = xA - xC;
  const dy = yA - yC;
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return null; // Tránh chia 0

  const scale = radius / dist;
  const xH = xC + dx * scale;
  const yH = yC + dy * scale;

  const angle = (Math.atan2(yH - yC, xH - xC) * 180) / Math.PI;

  // Normalize angle trong khoảng [0, 360)
  const normalize = (a) => (a + 360) % 360;
  const a = normalize(angle);
  const start = normalize(startAngle);
  const end = normalize(endAngle);

  const isBetween = clockwise
    ? start > end
      ? a <= end || a >= start
      : a >= start && a <= end
    : start < end
      ? a <= end && a >= start
      : a <= end || a >= start;

  if (!isBetween) return null; // Không nằm trên cung

  return { x: xH, y: yH };
}

function getEllipticalArcQuadrantPoints(uline) {
  const { rx, ry, bottomP } = uline;
  const { segments } = utils.getULineSegments(uline);

  // Tạo các điểm quadrant
  const anglesDeg = [0, 90, 180, 270];
  const quadrantPoints = anglesDeg.map(deg => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: bottomP.x + rx * Math.cos(rad),
      y: bottomP.y + ry * Math.sin(rad),
    };
  });

  //Lọc các điểm nằm trên Arc
  return quadrantPoints.filter(p => 
     utils.isPointOnEllipseArc(p, segments[1])
);
}

