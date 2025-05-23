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

export const getSnapCandidates = (
  enabledSnapModes,
  mouse,
  prevMouse,
  shapes,
  gridSize = 20
) => {
  const mid = [];
  const end = [];
  const intersection = [];
  const node = [];
  const quadrant = [];
  const perpendicular = [];
  const tangent = [];
  const nearest = [];
  const grid = [];

  for (const shape of shapes) {
    const { groupId, startP, endP, points } = shape;

    if (enabledSnapModes.mid && startP && endP) {
      mid.push({
        x: (startP.x + endP.x) / 2,
        y: (startP.y + endP.y) / 2,
        type: 'mid',
        groupId,
      });
    }

    if (enabledSnapModes.end && endP && startP) {
      end.push({ ...endP, type: 'end', groupId });
      end.push({ ...startP, type: 'end', groupId });
    }

    if (enabledSnapModes.nearest && points?.length >= 2) {
      const nearestPoint = getClosestPointOnPolyline(points, mouse);
      if (nearestPoint) {
        nearest.push({ ...nearestPoint, type: 'nearest', groupId });
      }
    }

    if (enabledSnapModes.node) {
      utils
        .convertToPointObjects(points)
        .forEach((p) => node.push({ ...p, type: 'node', groupId }));
    }

    if (enabledSnapModes.quadrant) {
      if (shape.name.includes('arc') && shape.centerP) {
        getQuadrantPoints(shape).forEach((p) =>
          quadrant.push({ ...p, type: 'quadrant', groupId })
        );
      } else if (shape.name === 'uline') {
        getEllipticalArcQuadrantPoints(shape).forEach((p) =>
          quadrant.push({ ...p, type: 'quadrant', groupId })
        );
      }
    }

    if (enabledSnapModes.perpendicular && prevMouse) {
      const perp =
        shape.name === 'line'
          ? getPerpendicularPoint(shape, prevMouse)
          : shape.name.includes('arc')
            ? getPerpendicularToArc(shape, prevMouse)
            : null;
      if (perp) {
        perpendicular.push({ ...perp, type: 'perpendicular', groupId });
      }
    }

    if (enabledSnapModes.tangent && prevMouse) {
      if (shape.name.includes('arc') && shape.centerP) {
        getTangentPoints(shape, prevMouse).forEach((p) =>
          tangent.push({ ...p, type: 'tangent', groupId })
        );
      }
    }
  }

  if (enabledSnapModes.intersection) {
    getAllIntersections(shapes)?.forEach((p) =>
      intersection.push({ ...p, type: 'intersection' })
    );
  }

  if (enabledSnapModes.grid) {
    const gridP = getNearestGridPoint(mouse, gridSize);
    grid.push({ ...gridP, type: 'grid' });
  }

  return {
    mid,
    end,
    intersection,
    node,
    quadrant,
    perpendicular,
    tangent,
    nearest,
    grid,
  };
};

export const getSnapPoint = (
  enabledSnapModes,
  mouse,
  prevMouse,
  shapes,
  gridSize = 20
) => {
  const candidates = getSnapCandidates(
    enabledSnapModes,
    mouse,
    prevMouse,
    shapes,
    gridSize
  );

  return (
    getClosestSnapPoint(mouse, candidates.mid, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.end, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.intersection, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.node, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.quadrant, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.perpendicular, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.tangent, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.nearest, SNAP_THRESHOLD) ||
    getClosestSnapPoint(mouse, candidates.grid, SNAP_THRESHOLD)
  );
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
  const quadrantPoints = anglesDeg.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: bottomP.x + rx * Math.cos(rad),
      y: bottomP.y + ry * Math.sin(rad),
    };
  });

  //Lọc các điểm nằm trên Arc
  return quadrantPoints.filter((p) =>
    utils.isPointOnEllipseArc(p, segments[1])
  );
}
