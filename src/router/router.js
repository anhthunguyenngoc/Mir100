import {
  LoginByPass,
  LoginByCode,
  DefaultDashboard,
  IOModule,
  IOModuleCreate,
  IOModuleEdit,
  Map,
  MapCreate,
  MapEdit,
  Mission,
  MissionCreate,
  MissionEdit,
  Sound,
  SoundEdit,
  Transition,
  TransitionCreate,
  TransitionDelete,
  TransitionEdit,
  SetPermission,
  UserGroup,
  UserGroupCreate,
  UserGroupDelete,
  UserGroupEdit,
  User,
  UserCreate,
  UserDelete,
  UserEdit,
  Path,
  PathGuide,
  Analytic,
  ErrorLog,
  HardwareHealth,
  MissionLog,
  SafetySystem,
  SystemLog,
} from '../pages';

import { PATH } from './Path';

export const PUBLIC_ROUTER = [
  {
    key: 'login-by-pass',
    path: '/', //'/login-by-pass',
    element: <LoginByPass />,
    name: 'Username and password',
  },
  {
    key: 'login-by-code',
    path: '/login-by-code',
    element: <LoginByCode />,
    name: 'PIN code',
  },
];

const DASHBOARD_ROUTER = [
  {
    key: 'default-dashboard',
    path: PATH.defaultDashboard,
    element: <DefaultDashboard />,
    name: 'Default Dashboard',
  },
];

const SUB_SETUP_ROUTER = [
  {
    key: 'missions',
    path: PATH.missions,
    element: <Mission />,
    name: 'Missions',
  },
  {
    key: 'maps',
    path: PATH.maps,
    element: <Map />,
    name: 'Maps',
  },
  {
    key: 'sounds',
    path: '/sounds',
    element: <Sound />,
    name: 'Sounds',
  },
  {
    key: 'transitions',
    path: '/transitions',
    element: <Transition />,
    name: 'Transitions',
  },
  {
    key: 'io-modules',
    path: '/io-modules',
    element: <IOModule />,
    name: 'I/O Modules',
  },
  {
    key: 'users',
    path: '/users',
    element: <User />,
    name: 'Users',
  },
  {
    key: 'user-groups',
    path: '/user-groups',
    element: <UserGroup />,
    name: 'User Groups',
  },
  {
    key: 'paths',
    path: '/paths',
    element: <Path />,
    name: 'Paths',
  },
  {
    key: 'path-guides',
    path: '/path-guides',
    element: <PathGuide />,
    name: 'Path Guides',
  },
];

const SETUP_ROUTER = [
  ...SUB_SETUP_ROUTER,
  {
    key: 'create-mission',
    path: PATH.create_mission,
    element: <MissionCreate />,
    name: 'Create Mission',
  },
  {
    key: 'edit-mission',
    path: PATH.edit_mission(),
    element: <MissionEdit />,
    name: 'Edit Mission',
  },
  {
    key: 'create-map',
    path: PATH.create_map,
    element: <MapCreate />,
    name: 'Create Map',
  },
  {
    key: 'edit-map',
    path: PATH.edit_map(),
    element: <MapEdit />,
    name: 'Edit Map',
  },
];

const SUB_MONITORING_ROUTER = [
  {
    key: 'analytics',
    path: '/analytics',
    element: <Analytic />,
    name: 'Analytics',
  },
  {
    key: 'system-log',
    path: '/system-log',
    element: <SystemLog />,
    name: 'System Log',
  },
  {
    key: 'error-logs',
    path: '/error-logs',
    element: <ErrorLog />,
    name: 'Error Logs',
  },
  {
    key: 'hardware-health',
    path: '/hardware-health',
    element: <HardwareHealth />,
    name: 'Hardware Health',
  },
  {
    key: 'safety-system',
    path: '/safety-system',
    element: <SafetySystem />,
    name: 'Safety System',
  },
  {
    key: 'mission-log',
    path: '/mission-log',
    element: <MissionLog />,
    name: 'Mission Log',
  },
];

const MONITORING_ROUTER = [...SUB_MONITORING_ROUTER];

const SYSTEM_ROUTER = [];

const HELP_ROUTER = [];

export const PRIVATE_ROUTER = {
  dashboards: DASHBOARD_ROUTER,
  setup: SETUP_ROUTER,
  monitoring: MONITORING_ROUTER,
  system: SYSTEM_ROUTER,
  help: HELP_ROUTER,
  signout: [],
};

export const SUB_SIDEBAR_ROUTER = {
  dashboards: DASHBOARD_ROUTER,
  setup: SUB_SETUP_ROUTER,
  monitoring: SUB_MONITORING_ROUTER,
  system: SYSTEM_ROUTER,
  help: HELP_ROUTER,
  signout: [],
};
