import { SIDEBAR_PATH } from '../router';

export const sidebarControl = [
  {
    key: 'dashboards',
    imgSrcKey: 'dashboard',
    name: 'Dashboards',
    path: SIDEBAR_PATH.dashboards,
  },
  {
    key: 'setup',
    imgSrcKey: 'setup',
    name: 'Setup',
    path: SIDEBAR_PATH.setup,
  },
  {
    key: 'monitoring',
    imgSrcKey: 'monitoring',
    name: 'Monitoring',
    path: SIDEBAR_PATH.monitoring,
  },
  {
    key: 'system',
    imgSrcKey: 'setting',
    name: 'System',
    path: SIDEBAR_PATH.system,
  },
  {
    key: 'help',
    imgSrcKey: 'helpCircle',
    name: 'Help',
    path: SIDEBAR_PATH.help,
  },
  {
    key: 'signout',
    imgSrcKey: 'signout',
    name: 'Sign out',
    path: SIDEBAR_PATH.signout,
  },
];
