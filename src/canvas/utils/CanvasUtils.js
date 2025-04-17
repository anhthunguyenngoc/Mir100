import * as Const from '../../constant';
export const snapToGrid = (zoom, gridSize, value) => {
  return {
    x:
      Math.round(value.x / ((gridSize * 100) / zoom)) *
      ((gridSize * 100) / zoom),
    y:
      Math.round(value.y / ((gridSize * 100) / zoom)) *
      ((gridSize * 100) / zoom),
  };
};

export const adjustPointerForZoom = (zoom, pointer) => {
  const zoomScale = zoom / 100;
  return {
    x: (pointer.x - Const.RULER_SIZE) / zoomScale,
    y: (pointer.y - Const.RULER_SIZE) / zoomScale,
  };
};

export const normalizeAbsolutePosition = (point) => {
  return {
    x: point.x - Const.RULER_SIZE,
    y: point.y - Const.RULER_SIZE,
  }
}