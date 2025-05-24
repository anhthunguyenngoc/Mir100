import { SIDEBAR_PATH } from '../router';
import * as Icons from '../components/icons';

export const sidebarControl = [
  {
    key: 'dashboards',
    icon: <Icons.Dashboard />,
    name: 'Dashboard',
    path: SIDEBAR_PATH.dashboards,
  },
  {
    key: 'maps',
    icon: <Icons.Map />,
    name: 'Map',
    path: SIDEBAR_PATH.maps,
  },
  {
    key: 'missions',
    icon: <Icons.Mission />,
    name: 'Mission',
    path: SIDEBAR_PATH.missions,
  },
];
