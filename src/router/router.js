import {
  LoginByPass,
  LoginByCode,
  DefaultDashboard,
  Map,
  MapCreate,
  MapEdit,
  Mission,
  MissionCreate,
  MissionEdit,
} from '../pages';

import { PATH } from './Path';

import Test from 'joysticktest';

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

const MISSION_ROUTER = [
  {
    key: 'mission',
    path: PATH.missions,
    element: <Mission />,
    name: 'Missions',
  },
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
];

const MAP_ROUTER = [
  {
    key: 'map',
    path: PATH.maps,
    element: <Map />,
    name: 'Maps',
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

export const PRIVATE_ROUTER = {
  dashboards: DASHBOARD_ROUTER,
  mission: MISSION_ROUTER,
  map: MAP_ROUTER,
};
