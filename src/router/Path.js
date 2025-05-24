import { DefaultDashboard } from '../pages';

export const SIDEBAR_PATH = {
  dashboards: '/dashboards',
  maps: '/maps',
  missions: '/missions',
};

export const PATH = {
  defaultDashboard: SIDEBAR_PATH.dashboards,
  missions: SIDEBAR_PATH.missions,
  maps: SIDEBAR_PATH.maps,

  create_mission: SIDEBAR_PATH.missions + '/create-mission',
  edit_mission: (guid) =>
    guid
      ? SIDEBAR_PATH.missions + `/edit-mission/${guid}`
      : SIDEBAR_PATH.missions + '/edit-mission/:guid',

  create_map: SIDEBAR_PATH.maps + '/create-map',
  edit_map: (guid) =>
    guid
      ? SIDEBAR_PATH.maps + `/edit-map/${guid}`
      : SIDEBAR_PATH.maps + '/edit-map/:guid',
};
