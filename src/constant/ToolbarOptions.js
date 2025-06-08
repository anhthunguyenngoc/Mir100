export const select = [
  {
    id: 'rect-selection',
    imgSrc: 'selection',
    name: 'Rectangle',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'free-selection',
    imgSrc: 'selection',
    name: 'Free form',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'selectAll',
    imgSrc: 'selection',
    name: 'Select all',
    shortcut: 'Ctrl + A',
    isActived: false,
  },
];

export const line = [
  {
    id: 'line',
    imgSrc: 'line',
    name: 'Start, End',
    shortcut: '',
    isActived: false,
  },
];

export const zline = [
  {
    id: 'se-zigzag',
    imgSrc: 'zigzag',
    name: 'Start, End',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'sm-zigzag',
    imgSrc: 'zigzag',
    name: 'Start, Mid',
    shortcut: '',
    isActived: false,
  },
];

export const arc = [
  {
    id: '3p-sme-arc',
    imgSrc: 'arc',
    name: 'Start, Mid, End',
    shortcut: '',
    isActived: false,
  },
  {
    id: '3p-sce-arc',
    imgSrc: 'arc',
    name: 'Start, Center, End',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'sca-arc',
    imgSrc: 'arc',
    name: 'Start, Center, Angle',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'sea-arc',
    imgSrc: 'arc',
    name: 'Start, End, Angle',
    shortcut: '',
    isActived: false,
  },
  {
    id: '3p-cse-arc',
    imgSrc: 'arc',
    name: 'Center, Start, End',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'ser-arc',
    imgSrc: 'arc',
    name: 'Start, End, Radius',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'csa-arc',
    imgSrc: 'arc',
    name: 'Center, Start, Angle',
    shortcut: '',
    isActived: false,
  },
];

export const tangent = [
  {
    id: 'tangent',
    imgSrc: 'tangent',
    name: '',
    shortcut: '',
    isActived: false,
  },
];

export const spline = [
  {
    id: 'p-spline',
    imgSrc: 'spline',
    name: 'Points',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'cv-spline',
    imgSrc: 'spline',
    name: 'Control vertices',
    shortcut: '',
    isActived: false,
  },
];

export const uline = [
  {
    id: 'se-uline',
    imgSrc: 'uline',
    name: 'Start, End, Height',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'sm-uline',
    imgSrc: 'uline',
    name: 'Start, Mid',
    shortcut: '',
    isActived: false,
  },
];

export const path = [
  {
    ...(line.find((item) => item.isActived) || line[0]),
    alt: 'Line',
    showExpand: false,
    options: [],
  },
  {
    ...(zline.find((item) => item.isActived) || zline[0]),
    alt: 'Zline',
    showExpand: true,
    options: zline,
  },
  {
    ...(arc.find((item) => item.isActived) || arc[0]),
    alt: 'Arc',
    showExpand: true,
    options: arc,
  },
  // {
  //   ...(tangent.find((item) => item.isActived) || tangent[0]),
  //   alt: 'Tangent',
  //   showExpand: false,
  // },
  {
    ...(spline.find((item) => item.isActived) || spline[0]),
    alt: 'Spline',
    showExpand: true,
    options: spline,
  },
  {
    ...(uline.find((item) => item.isActived) || uline[0]),
    alt: 'Uline',
    showExpand: true,
    options: uline,
  },
  {
    id: 'freeDraw',
    imgSrc: 'freeDraw',
    alt: 'Free draw',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
];

export const selection = [
  {
    id: 'defaultCursor',
    imgSrc: 'defaultCursor',
    alt: 'Default cursor',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    id: 'move',
    imgSrc: 'move',
    alt: 'Move',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  // {
  //   id: 'trim',
  //   imgSrc: 'trim',
  //   alt: 'Trim',
  //   name: '',
  //   shortcut: '',
  //   isActived: false,
  //   showExpand: false,
  // },
];

export const clipBoard = [
  {
    id: 'copy',
    imgSrc: 'copy',
    alt: 'Copy',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    id: 'cut',
    imgSrc: 'cut',
    alt: 'Cut',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    id: 'remove',
    imgSrc: 'bin',
    alt: 'Remove',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
];

export const elip = [
  {
    id: 'cr-elip',
    imgSrc: 'elip',
    name: 'Center, Rx, Ry',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'r-elip',
    imgSrc: 'elip',
    name: '2Rx, Ry',
    shortcut: '',
    isActived: false,
  },
];

export const circle = [
  {
    id: 'cr-circle',
    imgSrc: 'circle',
    name: 'Center, Radius',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'cd-circle',
    imgSrc: 'circle',
    name: 'Center, Diameter',
    shortcut: '',
    isActived: false,
  },
  {
    id: '2p-circle',
    imgSrc: 'circle',
    name: '2 Points',
    shortcut: '',
    isActived: false,
  },
  {
    id: '3p-circle',
    imgSrc: 'circle',
    name: '3 Points',
    shortcut: '',
    isActived: false,
  },
];

export const freeShape = [
  {
    id: 'p-freeShape',
    imgSrc: 'freeShape',
    name: 'Points',
    shortcut: '',
    isActived: false,
  },
  {
    id: 'cv-freeShape',
    imgSrc: 'freeShape',
    name: 'Control vertices',
    shortcut: '',
    isActived: false,
  },
];

export const zone = [
  {
    id: 'rectangle',
    imgSrc: 'rectangle',
    alt: 'Rectangle',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    ...(circle.find((item) => item.isActived) || circle[0]),
    alt: 'Circle',
    showExpand: true,
    options: circle,
  },
  {
    id: 'polygon',
    imgSrc: 'polygon',
    alt: 'Polygon',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    ...(elip.find((item) => item.isActived) || elip[0]),
    alt: 'Elip',
    showExpand: true,
    options: elip,
  },
  {
    ...(freeShape.find((item) => item.isActived) || freeShape[0]),
    alt: 'Free shape',
    showExpand: true,
    options: freeShape,
  },
];

export const group = [
  {
    id: 'group',
    imgSrc: 'group',
    alt: 'Group',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
  {
    id: 'ungroup',
    imgSrc: 'ungroup',
    alt: 'Ungroup',
    name: '',
    shortcut: '',
    isActived: false,
    showExpand: false,
  },
];
