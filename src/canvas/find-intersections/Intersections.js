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
function isPointOnSegment(p, seg) {
  const cross = (seg.p2.x - seg.p1.x) * (p.y - seg.p1.y) - (seg.p2.y - seg.p1.y) * (p.x - seg.p1.x);
  if (Math.abs(cross) > 1e-6) return false;
  const dot = (p.x - seg.p1.x) * (seg.p2.x - seg.p1.x) + (p.y - seg.p1.y) * (seg.p2.y - seg.p1.y);
  const lenSq = Math.pow(seg.p2.x - seg.p1.x, 2) + Math.pow(seg.p2.y - seg.p1.y, 2);
  return dot >= 0 && dot <= lenSq;
}

function isPointOnArc(p, arc) {
  const dx = p.x - arc.center.x;
  const dy = p.y - arc.center.y;
  const distSq = dx * dx + dy * dy;
  const angle = Math.atan2(dy, dx);
  return Math.abs(distSq - arc.radius * arc.radius) < 1e-6 &&
         angle >= arc.startAngle && angle <= arc.endAngle;
}

function intersectLineLine(line1, line2) {
  const { p1, p2 } = line1;
  const { p1: q1, p2: q2 } = line2;
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
  if (isPointOnSegment(pt, line1) && isPointOnSegment(pt, line2)) return [pt];
  return [];
}

function intersectLineArc(line, arc) {
  const dx = line.p2.x - line.p1.x;
  const dy = line.p2.y - line.p1.y;
  const fx = line.p1.x - arc.center.x;
  const fy = line.p1.y - arc.center.y;

  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - arc.radius * arc.radius;

  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];

  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

  const pts = [t1, t2].map(t => ({ x: line.p1.x + t * dx, y: line.p1.y + t * dy }))
                     .filter(p => isPointOnSegment(p, line) && isPointOnArc(p, arc));
  return pts;
}

function intersectLineZLine(line, zline) {
  return zline.segments.flatMap(seg => intersectLineLine(line, seg));
}

function intersectLineULine(line, uline) {
  return uline.segments.flatMap(seg => seg.radius ? intersectLineArc(line, seg) : intersectLineLine(line, seg));
}

function intersectLineSpline(line, spline) {
  const segments = approximateSpline(spline);
  return segments.flatMap(seg => intersectLineLine(line, seg));
}

function intersectArcArc(arc1, arc2) {
  const dx = arc2.center.x - arc1.center.x;
  const dy = arc2.center.y - arc1.center.y;
  const d = Math.hypot(dx, dy);

  if (d > arc1.radius + arc2.radius || d < Math.abs(arc1.radius - arc2.radius)) return [];

  const a = (arc1.radius ** 2 - arc2.radius ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(arc1.radius ** 2 - a ** 2);

  const x2 = arc1.center.x + a * dx / d;
  const y2 = arc1.center.y + a * dy / d;
  const rx = -dy * (h / d);
  const ry = dx * (h / d);

  const p1 = { x: x2 + rx, y: y2 + ry };
  const p2 = { x: x2 - rx, y: y2 - ry };
  return [p1, p2].filter(p => isPointOnArc(p, arc1) && isPointOnArc(p, arc2));
}

function intersectArcZLine(arc, zline) {
  return zline.segments.flatMap(seg => intersectLineArc(seg, arc));
}

function intersectArcULine(arc, uline) {
  return uline.segments.flatMap(seg => seg.radius ? intersectArcArc(arc, seg) : intersectLineArc(seg, arc));
}

function intersectArcSpline(arc, spline) {
  const segments = approximateSpline(spline);
  return segments.flatMap(seg => intersectLineArc(seg, arc));
}

function intersectZLineZLine(z1, z2) {
  return z1.segments.flatMap(s1 => z2.segments.flatMap(s2 => intersectLineLine(s1, s2)));
}

function intersectZLineULine(zline, uline) {
  return zline.segments.flatMap(seg => intersectLineULine(seg, uline));
}

function intersectZLineSpline(zline, spline) {
  const segments = approximateSpline(spline);
  return zline.segments.flatMap(seg => segments.flatMap(s => intersectLineLine(seg, s)));
}

function intersectULineULine(u1, u2) {
  return u1.segments.flatMap(s1 => intersectLineULine(s1, u2));
}

function intersectULineSpline(uline, spline) {
  const segments = approximateSpline(spline);
  return uline.segments.flatMap(seg => segments.flatMap(s => seg.radius ? intersectArcSpline(seg, { controlPoints: [s.p1, s.p2] }) : intersectLineLine(seg, s)));
}

function intersectSplineSpline(s1, s2) {
  const seg1 = approximateSpline(s1);
  const seg2 = approximateSpline(s2);
  return seg1.flatMap(a => seg2.flatMap(b => intersectLineLine(a, b)));
}

// Approximate Spline with Line segments (De Casteljau)
function approximateSpline(spline, steps = 20) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    points.push(deCasteljau(spline.controlPoints, i / steps));
  }
  return points.slice(0, -1).map((p, i) => ({ p1: p, p2: points[i + 1] }));
}

function deCasteljau(ctrlPts, t) {
  while (ctrlPts.length > 1) {
    const next = [];
    for (let i = 0; i < ctrlPts.length - 1; i++) {
      next.push({
        x: (1 - t) * ctrlPts[i].x + t * ctrlPts[i + 1].x,
        y: (1 - t) * ctrlPts[i].y + t * ctrlPts[i + 1].y
      });
    }
    ctrlPts = next;
  }
  return ctrlPts[0];
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
  intersectSplineSpline
};
