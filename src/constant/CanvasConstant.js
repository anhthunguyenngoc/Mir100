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
