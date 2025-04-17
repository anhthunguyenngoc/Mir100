export const Direction = {
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none',
};

export const ShapeName = {
  ARC: 'arc',
  LINE: 'line',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  GROUP: 'group',
  POLYGON: 'polygon',
  RECTANGLE: 'rectangle',
  SPLINE: 'spline',
  TANGENT: 'tangent',
  ULINE: 'uline',
  ZIGZAG: 'zigzag',
  FREESHAPE: 'freeShape',
};

export const LineDirection = {
  START_TO_END: 'start_to_end',
  END_TO_START: 'end_to_start',
  NONE: 'none',
};

export const LineDirectionOption = [
  {
    id: LineDirection.END_TO_START,
    imgSrc: 'arrowLeft',
    alt: 'Start to End',
  },
  {
    id: LineDirection.START_TO_END,
    imgSrc: 'arrowRight',
    alt: 'End to Start',
  },
  {
    id: LineDirection.NONE,
    imgSrc: 'none',
    alt: 'Direction none',
  },
];

export const alignOption = [
  {
    id: 'alignLeft',
    imgSrc: 'alignLeft',
  },
  {
    id: 'alignHCenter',
    imgSrc: 'alignHCenter',
  },
  {
    id: 'alignRight',
    imgSrc: 'alignRight',
  },
  {
    id: 'alignTop',
    imgSrc: 'alignTop',
  },
  {
    id: 'alignVCenter',
    imgSrc: 'alignVCenter',
  },
  {
    id: 'alignBottom',
    imgSrc: 'alignBottom',
  },
];

export const transformOption = [
  {
    id: 'rotate',
    imgSrc: 'rotate',
  },
  {
    id: 'flipH',
    imgSrc: 'flipH',
  },
  {
    id: 'flipV',
    imgSrc: 'flipV',
  },
];

export const maxHistory = 50;