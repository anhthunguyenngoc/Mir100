import { DefaultDashboard } from '../pages';

export const SIDEBAR_PATH = {
  dashboards: '/dashboards',
  setup: '/setup',
  monitoring: '/monitoring',
  system: '/system',
  help: '/help',
  signout: '/signout',
};

export const SUB_SIDEBAR_PATH = {
  defaultDashboard: '/default-dashboard',

  missions: '/missions',
  maps: '/maps',
};

export const PATH = {
  defaultDashboard: SIDEBAR_PATH.dashboards + SUB_SIDEBAR_PATH.defaultDashboard,
  missions: SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.missions,
  maps: SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.maps,

  create_mission:
    SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.missions + '/create-mission',
  edit_mission: (guid) =>
    guid
      ? SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.missions + `/edit-mission/${guid}`
      : SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.missions + '/edit-mission/:guid',

  create_map: SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.maps + '/create-map',
  edit_map: (guid) =>
    guid
      ? SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.maps + `/edit-map/${guid}`
      : SIDEBAR_PATH.setup + SUB_SIDEBAR_PATH.maps + '/edit-map/:guid',
};
