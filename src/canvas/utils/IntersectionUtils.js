/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 *
 * @typedef {Object} Line
 * @property {Point} p1
 * @property {Point} p2
 *
 * @typedef {Object} Arc
 * @property {Point} center
 * @property {number} radius
 * @property {number} startAngle - in radians
 * @property {number} endAngle - in radians
 *
 * @typedef {Object} ZLine
 * @property {Line[]} segments
 *
 * @typedef {Object} ULine
 * @property {(Line|Arc)[]} segments
 *
 * @typedef {Object} Spline
 * @property {Point[]} controlPoints
 */

// Utility functions
export function isPointOnSegment(p, seg) {
  const cross =
    (seg.endP.x - seg.startP.x) * (p.y - seg.startP.y) -
    (seg.endP.y - seg.startP.y) * (p.x - seg.startP.x);
  if (Math.abs(cross) > 1e-6) return false;
  const dot =
    (p.x - seg.startP.x) * (seg.endP.x - seg.startP.x) +
    (p.y - seg.startP.y) * (seg.endP.y - seg.startP.y);
  const lenSq =
    Math.pow(seg.endP.x - seg.startP.x, 2) +
    Math.pow(seg.endP.y - seg.startP.y, 2);
  return dot >= 0 && dot <= lenSq;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function isPointOnArc(point, arc, tolerance = 1) {
  const { centerP, radius, startAngle, endAngle, clockwise } = arc;

  const dx = point.x - centerP.x;
  const dy = point.y - centerP.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Kiểm tra khoảng cách đến tâm
  if (Math.abs(dist - radius) > tolerance) return false;

  // Tính góc từ tâm đến điểm
  let angle = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI);
  let start = normalizeAngle(startAngle);
  let end = normalizeAngle(endAngle);

  // Tính sweep
  const sweep = getSweepAngle(start, end, clockwise);

  // Tính góc từ start đến point theo chiều
  const angleDiff = getSweepAngle(start, angle, clockwise);

  return angleDiff <= sweep;
}

function getSweepAngle(startAngle, endAngle, clockwise) {
  startAngle = normalizeAngle(startAngle);
  endAngle = normalizeAngle(endAngle);

  if (clockwise) {
    return (endAngle - startAngle + 360) % 360;
  } else {
    return (startAngle - endAngle + 360) % 360;
  }
}

function normalizeAngle(deg) {
  return (deg + 360) % 360;
}

// Approximate Spline with Line segments (De Casteljau)
export function approximateSpline(spline, steps = 100) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    points.push(deCasteljau(spline.points, i / steps));
  }
  return points.slice(0, -1).map((p, i) => ({ startP: p, endP: points[i + 1] }));
}

function deCasteljau(ctrlPts, t) {
  let pts = [...ctrlPts];
  while (pts.length > 1) {
    const next = [];
    for (let i = 0; i < pts.length - 1; i++) {
      next.push({
        x: (1 - t) * pts[i].x + t * pts[i + 1].x,
        y: (1 - t) * pts[i].y + t * pts[i + 1].y,
      });
    }
    pts = next;
  }
  return pts[0];
}

//Spline
// 📦 Hàm kiểm tra Bounding Box giao nhau
export function isBoundingBoxesOverlap(a1, a2, b1, b2) {
  const minAx = Math.min(a1.x, a2.x);
  const maxAx = Math.max(a1.x, a2.x);
  const minAy = Math.min(a1.y, a2.y);
  const maxAy = Math.max(a1.y, a2.y);

  const minBx = Math.min(b1.x, b2.x);
  const maxBx = Math.max(b1.x, b2.x);
  const minBy = Math.min(b1.y, b2.y);
  const maxBy = Math.max(b1.y, b2.y);

  const overlapX = maxAx >= minBx && maxBx >= minAx;
  const overlapY = maxAy >= minBy && maxBy >= minAy;

  return overlapX && overlapY;
}


export function catmullRomPoint(p0, p1, p2, p3, t, alpha = 0.0) {
  const t0 = 0;
  const t1 = getT(t0, p0, p1, alpha);
  const t2 = getT(t1, p1, p2, alpha);
  const t3 = getT(t2, p2, p3, alpha);
  const tt = t1 + (t2 - t1) * t;

  const A1 = interpolate(p0, p1, (t1 - tt) / (t1 - t0), (tt - t0) / (t1 - t0));
  const A2 = interpolate(p1, p2, (t2 - tt) / (t2 - t1), (tt - t1) / (t2 - t1));
  const A3 = interpolate(p2, p3, (t3 - tt) / (t3 - t2), (tt - t2) / (t3 - t2));

  const B1 = interpolate(A1, A2, (t2 - tt) / (t2 - t0), (tt - t0) / (t2 - t0));
  const B2 = interpolate(A2, A3, (t3 - tt) / (t3 - t1), (tt - t1) / (t3 - t1));

  const C = interpolate(B1, B2, (t2 - tt) / (t2 - t1), (tt - t1) / (t2 - t1));
  return C;
}

function getT(ti, pi, pj, alpha) {
  const dx = pj.x - pi.x;
  const dy = pj.y - pi.y;
  return ti + Math.pow(Math.sqrt(dx * dx + dy * dy), alpha);
}

function interpolate(p1, p2, w1, w2) {
  return {
    x: p1.x * w1 + p2.x * w2,
    y: p1.y * w1 + p2.y * w2,
  };
}

//Bspline
export function getBoundingBox(p1, p2) {
  return {
    minX: Math.min(p1.x, p2.x),
    minY: Math.min(p1.y, p2.y),
    maxX: Math.max(p1.x, p2.x),
    maxY: Math.max(p1.y, p2.y)
  };
}

export function boxesIntersect(b1, b2) {
  return (
    b1.minX <= b2.maxX && b1.maxX >= b2.minX &&
    b1.minY <= b2.maxY && b1.maxY >= b2.minY
  );
}

export function sampleSpline(spline, alpha = 0.5, degree = 2, numSamples = 20) {
  if (!spline?.points || spline.points.length < 4) return [];

  if (spline.mode.includes('p-')) {
    const points = [];
    for (let i = 0; i < spline.points.length; i += 2) {
      points.push({ x: spline.points[i], y: spline.points[i + 1] });
    }

    const flatPoints = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      for (let j = 0; j < numSamples; j++) {
        const t = j / numSamples;
        const pt = catmullRomPoint(p0, p1, p2, p3, t, alpha);
        flatPoints.push(pt.x, pt.y);
      }
    }

    return flatPoints;
  }

  if (spline.mode.includes('cv-')) {
    return computeBSpline(spline.points, degree, numSamples);
  }

  return [];
}

export const computeBSpline = (flatPoints, degree = 2, numSamples = 100) => {
  if (flatPoints.length < (degree + 1) * 2) return flatPoints;

  const extendFactor = 0; // Giảm độ kéo dài để tránh vượt quá

  // Bước 1: Chuyển mảng phẳng thành mảng {x, y}
  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const extendedPoints = [];

  // Bước 2: Kéo dài điểm đầu
  const p0 = points[0];
  const p1 = points[1];
  const dx0 = p0.x - p1.x;
  const dy0 = p0.y - p1.y;
  extendedPoints.push({
    x: p0.x + dx0 * extendFactor,
    y: p0.y + dy0 * extendFactor,
  });

  // Thêm các điểm gốc
  extendedPoints.push(...points);

  // Bước 3: Kéo dài điểm cuối
  const pn = points[points.length - 1];
  const pn1 = points[points.length - 2];
  const dxn = pn.x - pn1.x;
  const dyn = pn.y - pn1.y;
  extendedPoints.push({
    x: pn.x + dxn * extendFactor,
    y: pn.y + dyn * extendFactor,
  });

  // Bước 4: Tạo knot vector đều
  const n = extendedPoints.length - 1;
  const knots = Array(n + degree + 2)
    .fill(0)
    .map((_, i) => i);

  // Bước 5: Tính điểm trên spline
  const curvePoints = [];
  for (let i = degree; i <= n; i++) {
    for (let j = 0; j < numSamples; j++) {
      const u = knots[i] + ((knots[i + 1] - knots[i]) * j) / numSamples;
      const point = deBoor(i, u, knots, extendedPoints, degree);
      if (point) curvePoints.push(point.x, point.y);
    }
  }

  return curvePoints;
};

// Hàm tính toán B-Spline bằng thuật toán De Boor
const deBoor = (k, x, t, c, p) => {
  let d = c.map((point) => ({ ...point }));
  for (let r = 1; r <= p; r++) {
    for (let j = k; j > k - p + r - 1; j--) {
      let alpha = (x - t[j]) / (t[j + p - r + 1] - t[j]);
      d[j] = {
        x: (1 - alpha) * d[j - 1].x + alpha * d[j].x,
        y: (1 - alpha) * d[j - 1].y + alpha * d[j].y,
      };
    }
  }
  return d[k];
};

// ----------------------------
// Vector helpers
// ----------------------------
function lerp(p1, p2, t) {
  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// ----------------------------
// Convert Spline to Bezier
// ----------------------------
function convertCatmullRomToBezier(p0, p1, p2, p3, alpha = 0.5) {
  const b0 = p1;
  const b1 = {
    x: p1.x + (p2.x - p0.x) / 6,
    y: p1.y + (p2.y - p0.y) / 6
  };
  const b2 = {
    x: p2.x - (p3.x - p1.x) / 6,
    y: p2.y - (p3.y - p1.y) / 6
  };
  const b3 = p2;
  return [b0, b1, b2, b3];
}

function convertBSplineToBezier(p0, p1, p2, p3) {
  const b0 = {
    x: (1 / 6) * p0.x + (4 / 6) * p1.x + (1 / 6) * p2.x,
    y: (1 / 6) * p0.y + (4 / 6) * p1.y + (1 / 6) * p2.y
  };
  const b1 = {
    x: (4 / 6) * p1.x + (2 / 6) * p2.x,
    y: (4 / 6) * p1.y + (2 / 6) * p2.y
  };
  const b2 = {
    x: (2 / 6) * p1.x + (4 / 6) * p2.x,
    y: (2 / 6) * p1.y + (4 / 6) * p2.y
  };
  const b3 = {
    x: (1 / 6) * p1.x + (4 / 6) * p2.x + (1 / 6) * p3.x,
    y: (1 / 6) * p1.y + (4 / 6) * p2.y + (1 / 6) * p3.y
  };
  return [b0, b1, b2, b3];
}

export function convertSplineToBeziers(mode, flatPoints) {
  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const beziers = [];
  for (let i = 0; i <= points.length - 4; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    const p3 = points[i + 3];

    let bezier;
    if (mode.includes('p-')) {
      bezier = convertCatmullRomToBezier(p0, p1, p2, p3);
    } else if (mode.includes('cv-')) {
      bezier = convertBSplineToBezier(p0, p1, p2, p3);
    } else {
      throw new Error("Unsupported spline type: " + mode);
    }

    beziers.push(bezier);
  }

  return beziers;
}

// // ----------------------------
// // Bézier Clipping
// // ----------------------------
function bezierBoundingBox(controlPoints) {
  const xs = controlPoints.map(p => p.x);
  const ys = controlPoints.map(p => p.y);
  return {
    minX: Math.min(...xs), maxX: Math.max(...xs),
    minY: Math.min(...ys), maxY: Math.max(...ys)
  };
}

// function boxesIntersect(b1, b2) {
//   return !(b2.minX > b1.maxX || b2.maxX < b1.minX || b2.minY > b1.maxY || b2.maxY < b1.minY);
// }

function subdivideBezier(points) {
  const [p0, p1, p2, p3] = points;
  const p01 = lerp(p0, p1, 0.5);
  const p12 = lerp(p1, p2, 0.5);
  const p23 = lerp(p2, p3, 0.5);

  const p012 = lerp(p01, p12, 0.5);
  const p123 = lerp(p12, p23, 0.5);

  const p0123 = lerp(p012, p123, 0.5);

  return [
    [p0, p01, p012, p0123],
    [p0123, p123, p23, p3]
  ];
}

export function bezierClippingIntersect(bezier1, bezier2, depth = 0, maxDepth = 15, tolerance = 0.5) {
  const box1 = bezierBoundingBox(bezier1);
  const box2 = bezierBoundingBox(bezier2);

  if (!boxesIntersect(box1, box2)) return [];

  if (depth >= maxDepth || (Math.max(box1.maxX - box1.minX, box1.maxY - box1.minY) < tolerance &&
                            Math.max(box2.maxX - box2.minX, box2.maxY - box2.minY) < tolerance)) {
    // Return approximate intersection point at mid of bounding boxes
    const ix = (Math.max(box1.minX, box2.minX) + Math.min(box1.maxX, box2.maxX)) / 2;
    const iy = (Math.max(box1.minY, box2.minY) + Math.min(box1.maxY, box2.maxY)) / 2;
    return [{ x: ix, y: iy }];
  }

  const [left1, right1] = subdivideBezier(bezier1);
  const [left2, right2] = subdivideBezier(bezier2);

  return [
    ...bezierClippingIntersect(left1, left2, depth + 1, maxDepth, tolerance),
    ...bezierClippingIntersect(left1, right2, depth + 1, maxDepth, tolerance),
    ...bezierClippingIntersect(right1, left2, depth + 1, maxDepth, tolerance),
    ...bezierClippingIntersect(right1, right2, depth + 1, maxDepth, tolerance)
  ];
}


///Line-Zigzag
// Hàm tính vị trí điểm trên quadratic Bézier với tham số t
function quadBezierPoint(t, p0, p1, p2) {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return { x, y };
}

// Hàm tìm giao điểm đường thẳng với quadratic Bézier
export function intersectLineQuadBezier(lineP0, lineP1, bezP0, bezP1, bezP2) {
  // Chuyển đường thẳng về dạng: ax + by + c = 0
  const a = lineP1.y - lineP0.y;
  const b = lineP0.x - lineP1.x;
  const c = lineP1.x * lineP0.y - lineP0.x * lineP1.y;

  // Hàm biểu diễn quadratic Bézier: B(t) = (x(t), y(t))
  // Thay vào đường thẳng: a*x(t) + b*y(t) + c = 0
  // => phương trình 2 bậc về t: At^2 + Bt + C = 0

  const A = a * (bezP0.x - 2 * bezP1.x + bezP2.x) + b * (bezP0.y - 2 * bezP1.y + bezP2.y);
  const B = 2 * (a * (bezP1.x - bezP0.x) + b * (bezP1.y - bezP0.y));
  const C = a * bezP0.x + b * bezP0.y + c;

  // Giải phương trình bậc 2 At^2 + Bt + C = 0
  const discriminant = B * B - 4 * A * C;
  if (discriminant < 0) return []; // không có nghiệm thực

  const sqrtD = Math.sqrt(discriminant);
  const t1 = (-B + sqrtD) / (2 * A);
  const t2 = (-B - sqrtD) / (2 * A);

  const intersections = [];

  // Kiểm tra nghiệm trong khoảng [0,1]
  [t1, t2].forEach(t => {
    if (t >= 0 && t <= 1) {
      const pt = quadBezierPoint(t, bezP0, bezP1, bezP2);

      // Kiểm tra điểm giao có nằm trên đoạn thẳng line không (tham số u)
      const dx = lineP1.x - lineP0.x;
      const dy = lineP1.y - lineP0.y;
      const u = dx !== 0 ? (pt.x - lineP0.x) / dx : (pt.y - lineP0.y) / dy;
      if (u >= 0 && u <= 1) {
        intersections.push(pt);
      }
    }
  });

  return intersections;
}

export function intersectLineEllipseArc(line, ellipse) {
  const { startP: p1, endP: p2 } = line;
  const { rx, ry, bottomP } = ellipse;
  
  // Bước 1: Tìm giao điểm giữa đường thẳng và elip đầy đủ
  // Dịch chuyển bài toán để tâm elip nằm tại gốc tọa độ
  const p1Shifted = {
    x: p1.x - bottomP.x,
    y: p1.y - bottomP.y
  };
  
  const p2Shifted = {
    x: p2.x - bottomP.x,
    y: p2.y - bottomP.y
  };
  
  // Biểu diễn tham số của đường thẳng: p = p1 + t * (p2 - p1)
  const dx = p2Shifted.x - p1Shifted.x;
  const dy = p2Shifted.y - p1Shifted.y;
  
  // Đưa về phương trình bậc 2
  // Nếu đường thẳng là p1 + t*(p2-p1)
  // Và ellipse là (x/rx)^2 + (y/ry)^2 = 1
  // Thay x = p1.x + t*dx, y = p1.y + t*dy vào phương trình ellipse
  
  const a = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
  const b = 2 * ((p1Shifted.x * dx) / (rx * rx) + (p1Shifted.y * dy) / (ry * ry));
  const c = (p1Shifted.x * p1Shifted.x) / (rx * rx) + (p1Shifted.y * p1Shifted.y) / (ry * ry) - 1;
  
  // Giải phương trình bậc 2: a*t^2 + b*t + c = 0
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant < 0) {
    // Không có giao điểm
    return [];
  }
  
  const intersections = [];
  
  if (discriminant === 0) {
    // Một giao điểm (tiếp tuyến)
    const t = -b / (2 * a);
    if (t >= 0 && t <= 1) {  // Chỉ lấy giao điểm nằm trên đoạn thẳng
      intersections.push({
        x: p1.x + t * dx,
        y: p1.y + t * dy
      });
    }
  } else {
    // Hai giao điểm
    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
    if (t1 >= 0 && t1 <= 1) {  // Giao điểm nằm trên đoạn thẳng
      intersections.push({
        x: p1.x + t1 * (p2.x - p1.x),
        y: p1.y + t1 * (p2.y - p1.y)
      });
    }
    
    if (t2 >= 0 && t2 <= 1) {  // Giao điểm nằm trên đoạn thẳng
      intersections.push({
        x: p1.x + t2 * (p2.x - p1.x),
        y: p1.y + t2 * (p2.y - p1.y)
      });
    }
  }
    
  // Lọc các giao điểm nằm trên cung
  return filterPointOnEllipseArc(ellipse, intersections);
}

//Ellipse arc
export function filterPointOnEllipseArc(uline, points) {
  const { rx, ry, bottomP, startP, endP } = uline;

  // Bước 1: Tính góc bắt đầu và kết thúc
  const startAngle = getAngleOnEllipse(startP, bottomP.x, bottomP.y, rx, ry);
  const endAngle = getAngleOnEllipse(endP, bottomP.x, bottomP.y, rx, ry);

  // Bước 2: Xác định hướng cung elip
  let delta = endAngle - startAngle;
  if (delta < 0) delta += 2 * Math.PI;
  const isClockwise = delta > Math.PI;

    // Bước 4: Lọc các điểm nằm trên cung
  return points.filter(p => {
    const pointAngle = getAngleOnEllipse(p, bottomP.x, bottomP.y, rx, ry);
    return isPointOnEllipseArc(pointAngle, startAngle, endAngle, isClockwise)
});
}

function getAngleOnEllipse(p, cx, cy, rx, ry) {
  // Tính góc của điểm p đối với tâm elip
  const dx = (p.x - cx) / rx;
  const dy = (p.y - cy) / ry;
  let angle = Math.atan2(dy, dx); // radian
  if (angle < 0) angle += 2 * Math.PI;
  return angle; // radian từ 0 đến 2π
}

function isPointOnEllipseArc(angle, startAngle, endAngle, isClockwise) {
  // Chuẩn hóa các góc để đảm bảo chúng nằm trong phạm vi [0, 2π]
  angle = (angle + 2 * Math.PI) % (2 * Math.PI);
  startAngle = (startAngle + 2 * Math.PI) % (2 * Math.PI);
  endAngle = (endAngle + 2 * Math.PI) % (2 * Math.PI);

  if (!isClockwise) {
    // Thuận chiều kim đồng hồ
    if (startAngle > endAngle) {
      return angle >= endAngle && angle <= startAngle;
    } else {
      return angle >= endAngle || angle <= startAngle;
    }
  } else {
    // Ngược chiều kim đồng hồ
    if (startAngle < endAngle) {
      return angle >= startAngle && angle <= endAngle;
    } else {
      return angle >= startAngle || angle <= endAngle;
    }
  }
}
