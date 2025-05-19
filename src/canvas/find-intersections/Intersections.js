import * as utils from '../utils';
/**
 * Line ∩ Line
 * @param {utils.Line} line1 - đoạn thẳng thứ nhất
 * @param {utils.Line} line2 - đoạn thẳng thứ hai
 * @returns {utils.Point[]} Mảng chứa điểm giao nếu tồn tại, rỗng nếu không có giao điểm hợp lệ
 */
function intersectLineLine(line1, line2) {
  const { startP: p1, endP: p2 } = line1;
  const { startP: q1, endP: q2 } = line2;
  const a1 = p2.y - p1.y;
  const b1 = p1.x - p2.x;
  const c1 = a1 * p1.x + b1 * p1.y;

  const a2 = q2.y - q1.y;
  const b2 = q1.x - q2.x;
  const c2 = a2 * q1.x + b2 * q1.y;

  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-6) return [];

  const x = (b2 * c1 - b1 * c2) / det;
  const y = (a1 * c2 - a2 * c1) / det;
  const pt = { x, y };

  if (utils.isPointOnSegment(pt, line1) && utils.isPointOnSegment(pt, line2))
    return [pt];
  return [];
}

function intersectLineArc(line, arc) {
  const dx = line.endP.x - line.startP.x;
  const dy = line.endP.y - line.startP.y;
  const fx = line.startP.x - arc.centerP.x;
  const fy = line.startP.y - arc.centerP.y;

  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - arc.radius * arc.radius;

  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];

  const sqrtD = Math.sqrt(discriminant);
  const t1 = (-b - sqrtD) / (2 * a);
  const t2 = (-b + sqrtD) / (2 * a);

  const candidates = [t1, t2].map((t) => ({
    x: line.startP.x + t * dx,
    y: line.startP.y + t * dy,
  }));

  return candidates.filter(
    (p) => utils.isPointOnSegment(p, line) && utils.isPointOnArc(p, arc)
  );
}

//mới xác định đc 1 giao điểm ??
function intersectArcArc(arc1, arc2) {
  const dx = arc2.centerP.x - arc1.centerP.x;
  const dy = arc2.centerP.y - arc1.centerP.y;
  const d = Math.hypot(dx, dy);

  if (d > arc1.radius + arc2.radius || d < Math.abs(arc1.radius - arc2.radius))
    return [];

  const a = (arc1.radius ** 2 - arc2.radius ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(arc1.radius ** 2 - a ** 2);

  const x2 = arc1.centerP.x + (a * dx) / d;
  const y2 = arc1.centerP.y + (a * dy) / d;
  const rx = -dy * (h / d);
  const ry = dx * (h / d);

  const p1 = { x: x2 + rx, y: y2 + ry };
  const p2 = { x: x2 - rx, y: y2 - ry };
  return [p1, p2].filter(
    (p) => utils.isPointOnArc(p, arc1) && utils.isPointOnArc(p, arc2)
  );
}

function intersectLineSpline(line, spline, alpha = 0.0, numSamples = 20) {
  if (spline.mode.includes('p-')) {
    return intersectLinePSpline(line, spline);
  } else if (spline.mode.includes('cv-')) {
    return intersectLineBSpline(line, spline); 
  }
  return [];
}

function intersectLinePSpline(line, spline, alpha = 0.0, numSamples = 20) {
  const flatPoints = spline.points;
  if (!flatPoints || flatPoints.length < 4) return [];

  const points = [];
  for (let i = 0; i < flatPoints.length; i += 2) {
    points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
  }

  const intersections = [];

  // const startTime = performance.now(); // ⏱️ Bắt đầu đo thời gian

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];

    for (let j = 0; j < numSamples; j++) {
      const t1 = j / numSamples;
      const t2 = (j + 1) / numSamples;

      const pt1 = utils.catmullRomPoint(p0, p1, p2, p3, t1, alpha);
      const pt2 = utils.catmullRomPoint(p0, p1, p2, p3, t2, alpha);

      // ✳️ Kiểm tra BOUNDING BOX trước
      if (!utils.isBoundingBoxesOverlap(pt1, pt2, line.startP, line.endP)) {
        continue;
      }

      const inter = intersectLineLine(line, { startP: pt1, endP: pt2 });
      if (inter.length > 0) intersections.push(inter[0]);
    }
  }

  // const endTime = performance.now(); // ⏱️ Kết thúc
  // console.log(`⏱️ Thời gian chạy (có bounding box): ${(endTime - startTime).toFixed(2)}ms`);

  return intersections;
}

function intersectLineBSpline(line, bspline, numSamples = 100) {
  const intersections = [];
  if (bspline.points < 4) return intersections;
  const flatPoints = bspline.points;

  const segments = [];
  for (let i = 0; i < flatPoints.length - 2; i += 2) {
    const pt1 = { x: flatPoints[i], y: flatPoints[i + 1] };
    const pt2 = { x: flatPoints[i + 2], y: flatPoints[i + 3] };
    segments.push({ startP: pt1, endP: pt2 });
  }

  for (const seg of segments) {
    // Optional: Bounding Box check
    const lineBox = utils.getBoundingBox(line.startP, line.endP);
    const segBox = utils.getBoundingBox(seg.startP, seg.endP);
    if (!utils.boxesIntersect(lineBox, segBox)) continue;

    const result = intersectLineLine(line, seg);
    if (result.length > 0) intersections.push(result[0]);
  }

  return intersections;
}

// function intersectSplineSpline(splineA, splineB, options = {}) {
//   const {
//     alpha = 0.5,
//     degree = 2,
//     numSamples = 20
//   } = options;

//   const flatA = utils.sampleSpline(splineA, alpha, degree, numSamples);
//   const flatB = utils.sampleSpline(splineB, alpha, degree, numSamples);

//   return intersectFlatSplines(flatA, flatB);
// }

//
function intersectSplineSpline(splineA, splineB) {
  const bezA = utils.convertSplineToBeziers(splineA.mode, splineA.points);
  const bezB = utils.convertSplineToBeziers(splineB.mode, splineB.points);
  const result = [];

  for (const b1 of bezA) {
    for (const b2 of bezB) {
      result.push(...utils.bezierClippingIntersect(b1, b2));
    }
  }

  return result;
}

function intersectLineZLine(line, zline) {
  const { startP, midP, endP, radius } = zline;
  if (!startP || !midP || !endP) return [];

  // Tính các điểm phụ theo code gốc
  const dx1 = startP.x > endP.x ? radius : -radius;
  const dy1 = startP.y < endP.y ? radius : -radius;
  const dy2 = startP.y > endP.y ? radius : -radius;
  const dx2 = startP.x < endP.x ? radius : -radius;

  // Các điểm trên đường zigzag
  const A = { x: midP.x + dx1, y: startP.y };
  const B = { x: midP.x, y: startP.y + dy1 };
  const C = { x: midP.x, y:endP.y + dy2 };
  const D = { x: midP.x + dx2, y:endP.y };

  let intersections = [];

  // Đoạn thẳng 1: P0 -> A
  let inter = intersectLineLine({ startP: startP, endP: A} , line);
  if (inter.length > 0) intersections.push(inter[0]);

  // Đường cong 1: Q1 từ A -> B, control: midP.x, startP.y
  inter = utils.intersectLineQuadBezier(line.startP, line.endP, A, { x: midP.x, y: startP.y }, B);
  intersections = intersections.concat(inter);

  // Đoạn thẳng 2: B -> C
  inter = intersectLineLine({ startP: B, endP: C}, line);
  if (inter.length > 0) intersections.push(inter[0]);

  // Đường cong 2: Q2 từ C -> D, control: midP.x,endP.y
  inter = utils.intersectLineQuadBezier(line.startP, line.endP, C, { x: midP.x, y:endP.y }, D);
  intersections = intersections.concat(inter);

  // Đoạn thẳng 3: D ->endP
  inter = intersectLineLine({ startP: D, endP: endP} , line);
  if (inter.length > 0) intersections.push(inter[0]);

  return intersections;
}

function intersectLineULine(line, uline) {
  const { startP, bottomP, endP } = uline;
  const results = [];

  const verticalLeft = [startP, { x: startP.x, y: bottomP.y }];
  const verticalRight = [{ x: endP.x, y: bottomP.y }, endP];

  // Kiểm tra giao nhau với 2 đoạn dọc
  const inter1 = intersectLineLine({startP: verticalLeft[0], endP: verticalLeft[1]}, line);
  const inter2 = intersectLineLine({startP: verticalRight[0], endP: verticalRight[1]}, line);
  if (inter1.length > 0) results.push(inter1[0]);
  if (inter2.length > 0) results.push(inter2[0]);

  // Kiểm tra giao nhau với cung tròn
  const arcResult = utils.intersectLineEllipseArc(
    line,
    uline
  );
  results.push(...arcResult);

  return results;
}

//ongoing
function intersectArcZLine(arc, zline) {
  return zline.segments.flatMap((seg) => intersectLineArc(seg, arc));
}

function intersectArcULine(arc, uline) {
  return uline.segments.flatMap((seg) =>
    seg.radius ? intersectArcArc(arc, seg) : intersectLineArc(seg, arc)
  );
}

function intersectArcSpline(arc, spline) {
  const segments = utils.approximateSpline(spline);
  return segments.flatMap((seg) => intersectLineArc(seg, arc));
}

function intersectZLineZLine(z1, z2) {
  return z1.segments.flatMap((s1) =>
    z2.segments.flatMap((s2) => intersectLineLine(s1, s2))
  );
}

function intersectZLineULine(zline, uline) {
  return zline.segments.flatMap((seg) => intersectLineULine(seg, uline));
}

function intersectZLineSpline(zline, spline) {
  const segments = utils.approximateSpline(spline);
  return zline.segments.flatMap((seg) =>
    segments.flatMap((s) => intersectLineLine(seg, s))
  );
}

function intersectULineULine(u1, u2) {
  return u1.segments.flatMap((s1) => intersectLineULine(s1, u2));
}

function intersectULineSpline(uline, spline) {
  const segments = utils.approximateSpline(spline);
  return uline.segments.flatMap((seg) =>
    segments.flatMap((s) =>
      seg.radius
        ? intersectArcSpline(seg, { controlPoints: [s.p1, s.p2] })
        : intersectLineLine(seg, s)
    )
  );
}

/**
 * Tìm tất cả các điểm giao giữa các shapes
 * @param {any[]} shapes - Mảng các shapes (Line, Arc, ZLine, ULine, Spline, ...)
 * @returns {utils.Point[]} Mảng các điểm giao nhau
 */
export function getAllIntersections(shapes) {
  const result = [];

  // Duyệt tất cả các cặp không trùng lặp
  for (let i = 0; i < shapes.length - 1; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      const a = shapes[i];
      const b = shapes[j];

      // Dựa vào cặp kiểu shape => gọi hàm phù hợp
      const key = `${a.name}_${b.name}`;
      let points = [];

      switch (key) {
        case 'line_line':
          points = intersectLineLine(a, b);
          break;
        case 'line_arc':
          points = intersectLineArc(a, b);
          break;
        case 'arc_line':
          points = intersectLineArc(b, a);
          break;
        case 'arc_arc':
          points = intersectArcArc(a, b);
          break;
        case 'line_spline':
          points = intersectLineSpline(a, b);
          break;
        case 'spline_line':
          points = intersectLineSpline(b, a);
          break;
        case 'line_zigzag':
          points = intersectLineZLine(a, b);
          break;
        case 'zigzag_line':
          points = intersectLineZLine(b, a);
          break;
        case 'line_uline':
          points = intersectLineULine(a, b);
          break;
        case 'uline_line':
          points = intersectLineULine(b, a);
          break;
        case 'arc_zline':
          points = intersectArcZLine(a, b);
          break;
        case 'zline_arc':
          points = intersectArcZLine(b, a);
          break;
        case 'arc_uline':
          points = intersectArcULine(a, b);
          break;
        case 'uline_arc':
          points = intersectArcULine(b, a);
          break;
        case 'arc_spline':
          points = intersectArcSpline(a, b);
          break;
        case 'spline_arc':
          points = intersectArcSpline(b, a);
          break;
        case 'zline_zline':
          points = intersectZLineZLine(a, b);
          break;
        case 'zline_uline':
          points = intersectZLineULine(a, b);
          break;
        case 'uline_zline':
          points = intersectZLineULine(b, a);
          break;
        case 'zline_spline':
          points = intersectZLineSpline(a, b);
          break;
        case 'spline_zline':
          points = intersectZLineSpline(b, a);
          break;
        case 'uline_uline':
          points = intersectULineULine(a, b);
          break;
        case 'uline_spline':
          points = intersectULineSpline(a, b);
          break;
        case 'spline_uline':
          points = intersectULineSpline(b, a);
          break;
        case 'spline_spline':
          points = intersectSplineSpline(a, b);
          break;
        default:
          // console.warn('Chưa xử lý loại:', key);
          break;
      }

      if (points.length > 0) {
        result.push(...points);
      }
    }
  }

  return result;
}

export {
  intersectLineLine,
  intersectLineArc,
  intersectLineZLine,
  intersectLineULine,
  intersectLineSpline,
  intersectArcArc,
  intersectArcZLine,
  intersectArcULine,
  intersectArcSpline,
  intersectZLineZLine,
  intersectZLineULine,
  intersectZLineSpline,
  intersectULineULine,
  intersectULineSpline,
  intersectSplineSpline,
};
