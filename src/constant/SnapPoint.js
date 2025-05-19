import * as Icons from '../components/icons';

export const snapModeInit = {
  grid: true,
  end: true,
  mid: true,
  nearest: true,
  geometricCenter: false,
  node: false,
  quadrant: false,
  intersection: false,
  perpendicular: false,
  tangent: false,
  parallel: false,
  extension: false,
};

export const snapMode = {
  grid: {
    id: 'grid',
    name: 'Grid',
    icon: <Icons.Grid />,
    pointIcon: Icons.GridPoint,
  },
  end: {
    id: 'end',
    name: 'Endpoint',
    icon: <Icons.StartEnd />,
    pointIcon: Icons.StartEndPoint,
  },
  mid: {
    id: 'mid',
    name: 'Middle',
    icon: <Icons.Mid />,
    pointIcon: Icons.MidPoint,
  },
  nearest: {
    id: 'nearest',
    name: 'Nearest',
    icon: <Icons.Nearest />,
    pointIcon: Icons.NearestPoint,
  },
  intersection: {
    id: 'intersection',
    name: 'Intersection',
    icon: <Icons.Intersection />,
    pointIcon: Icons.IntersectionPoint,
  },
  geometricCenter: {
    id: 'geometricCenter',
    name: 'Geometric Center',
    icon: <Icons.GeometricCenter />,
    pointIcon: Icons.GeometricCenterPoint,
  },
  node: {
    id: 'node',
    name: 'Node',
    icon: <Icons.Node />,
    pointIcon: Icons.NodePoint,
  },
  quadrant: {
    id: 'quadrant',
    name: 'Quadrant',
    icon: <Icons.Quadrant />,
    pointIcon: Icons.QuadrantPoint,
  },
  perpendicular: {
    id: 'perpendicular',
    name: 'Perpendicular',
    icon: <Icons.Perpendicular />,
    pointIcon: Icons.PerpendicularPoint,
  },
  tangent: {
    id: 'tangent',
    name: 'Tangent',
    icon: <Icons.Tangent />,
    pointIcon: Icons.TangentPoint,
  },
  parallel: {
    id: 'parallel',
    name: 'Parallel',
    icon: <Icons.Parallel />,
    pointIcon: Icons.ParallelPoint,
  },
  extension: {
    id: 'extension',
    name: 'Extension',
    icon: <Icons.Extension />,
    pointIcon: Icons.ExtensionPoint,
  },
};
