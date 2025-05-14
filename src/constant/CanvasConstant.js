import { ImageSrc } from './ImageSrc';

export const RULER_SIZE = 30;
export const INITIAL_GRID_SIZE = 20;
export const MIN_GRID_SIZE = 15;
export const MAX_GRID_SIZE = 50;
export const MIN_ZOOM = 50; // 50% zoom
export const MAX_ZOOM = 400; // 400% zoom
export const ZOOMSTEP = 1;
export const CANVAS_POS = {
  x: RULER_SIZE,
  y: RULER_SIZE,
};

export const PathOptions = [
  {
    guid: 'path',
    name: 'Path',
  },
  {
    guid: 'walls',
    name: 'Walls',
  },
];

export const ZoneOptions = [
  { guid: 'directional_zones', name: 'Directional zones' },
  { guid: 'preferred_zones', name: 'Preferred zones' },
  { guid: 'unpreferred_zones', name: 'Unpreferred zones' },
  { guid: 'forbidden_zones', name: 'Forbidden zones' },
  { guid: 'critical_zones', name: 'Critical zones' },
  { guid: 'speed', name: 'Speed' },
  { guid: 'sound_light_zones', name: 'Sound and light zones' },
  { guid: 'planner_zones', name: 'Planner zones' },
  { guid: 'io_module_zones', name: 'I/O module zones' },
  { guid: 'limit_robots_zones', name: 'Limit-robots zones (Fleet)' },
  { guid: 'evacuation_zones', name: 'Evacuation zones (Fleet)' },
];

export const MARKER_TYPE_ID = [22, 13, 7, 20, 18, 9, 11];

export const POSITION_TYPE_ID = [26, 25, 15, 0, 42];

export const getPositionImage = (id) => {
  switch (id) {
    case 7:
      return ImageSrc.position7;
    case 9:
      return ImageSrc.position9;
    case 11:
      return ImageSrc.position11;
    case 13:
      return ImageSrc.position13;
    default:
      return ImageSrc.position0;
  }
};

export const obstacles = [
  // ======= VÙNG CẤM =======
  [
    {
      polygon: [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 300, y: 200 },
        { x: 100, y: 200 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
    {
      polygon: [
        { x: 100, y: 260 },
        { x: 300, y: 260 },
        { x: 300, y: 360 },
        { x: 100, y: 360 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
    {
      polygon: [
        { x: 400, y: 100 },
        { x: 440, y: 100 },
        { x: 440, y: 140 },
        { x: 400, y: 140 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
    {
      polygon: [
        { x: 500, y: 250 },
        { x: 540, y: 250 },
        { x: 540, y: 290 },
        { x: 500, y: 290 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
    {
      polygon: [
        { x: 300, y: 400 },
        { x: 340, y: 400 },
        { x: 340, y: 440 },
        { x: 300, y: 440 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
    {
      polygon: [
        { x: 150, y: 200 },
        { x: 180, y: 200 },
        { x: 180, y: 230 },
        { x: 150, y: 230 },
      ],
      color: '#FFEBEE',
      brushsize: 1,
      type: 'shape',
    },
  ],

  // ======= TƯỜNG (BAO QUANH VÙNG CẤM + KHUNG PHÒNG) =======
  [
    // Tường bao quanh vùng cấm (mỗi vùng là 4 đoạn)
    // Vùng 1
    {
      polygon: [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 100, y: 100 },
        { x: 100, y: 200 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 300, y: 100 },
        { x: 300, y: 200 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 100, y: 200 },
        { x: 300, y: 200 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Vùng 2
    {
      polygon: [
        { x: 100, y: 260 },
        { x: 300, y: 260 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 300, y: 260 },
        { x: 300, y: 360 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 300, y: 360 },
        { x: 100, y: 360 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 100, y: 260 },
        { x: 100, y: 360 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Vùng 3
    {
      polygon: [
        { x: 400, y: 100 },
        { x: 440, y: 100 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 440, y: 100 },
        { x: 440, y: 140 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 440, y: 140 },
        { x: 400, y: 140 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 400, y: 140 },
        { x: 400, y: 100 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Vùng 4
    {
      polygon: [
        { x: 500, y: 250 },
        { x: 540, y: 250 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 540, y: 250 },
        { x: 540, y: 290 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 540, y: 290 },
        { x: 500, y: 290 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 500, y: 290 },
        { x: 500, y: 250 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Vùng 5
    {
      polygon: [
        { x: 300, y: 400 },
        { x: 340, y: 400 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 340, y: 400 },
        { x: 340, y: 440 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 340, y: 440 },
        { x: 300, y: 440 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 300, y: 440 },
        { x: 300, y: 400 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Vùng 6
    {
      polygon: [
        { x: 150, y: 200 },
        { x: 180, y: 200 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 180, y: 200 },
        { x: 180, y: 230 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 180, y: 230 },
        { x: 150, y: 230 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 150, y: 230 },
        { x: 150, y: 200 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },

    // Tường khung phòng (giả sử phòng rộng 700x500)
    {
      polygon: [
        { x: 50, y: 50 },
        { x: 650, y: 50 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 650, y: 50 },
        { x: 650, y: 500 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 650, y: 500 },
        { x: 50, y: 500 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
    {
      polygon: [
        { x: 50, y: 500 },
        { x: 50, y: 50 },
      ],
      color: '#000000',
      brushsize: 1,
      type: 'line',
    },
  ],
];

export const metadata = {
  walls: obstacles[1],
  forbiddenZone: obstacles[0],
};
