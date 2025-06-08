import {
  deletePosition,
  getPositionTypes,
  postPositions,
  putMap,
  putMission,
  putPosition,
  putStatus,
} from './Api';

export const URL = {
  postAreaEvents: '/area_events',
  postMissionQueue: '/mission_queue',
  postMission: '/missions',
  postPositions: '/positions',
  postMissionsActions: (mission_id) => `/missions/${mission_id}/actions`,

  putStatus: '/status',
  putPosition: (guid) => `/positions/${guid}`,
  putMap: (guid) => `/maps/${guid}`,
  putMissionQueue: (id) => `/mission_queue/${id}`,
  putMission: (guid) => `/missions/${guid}`,
  putMissionAction: (mission_id, guid) =>
    `/missions/${mission_id}/actions/${guid}`,

  getAreaEvents: '/area_events',
  getActions: '/actions',
  getAction: (action_type) => `/actions/${action_type}`,
  getStatus: '/status',
  getMap: (guid) => `/maps/${guid}`,
  getMaps: '/maps',
  getMissionGroups: '/mission_groups',
  getMissionGroupId: (guid) => `/mission_groups/${guid}`,
  getMissions: '/missions',
  getMissionId: (guid) => `/missions/${guid}`,
  getMissionQueues: '/mission_queue',
  getMissionQueueId: (id) => `/mission_queue/${id}`,
  getMapPositions: (map_id) => `/maps/${map_id}/positions`,
  getPositionTypes: '/position_types',
  getPositionType: (id) => `/position_types/${id}`,
  getPositions: '/positions',
  getPositionId: (guid) => `/positions/${guid}`,
  getMission_groupsActions: (mission_group_id) =>
    `/mission_groups/${mission_group_id}/actions`,
  getMission_definition: (guid) => `/missions/${guid}/definition`,
  getMission_actions: (mission_id) => `/missions/${mission_id}/actions`,
  getMission_action: (mission_id, guid) =>
    `/missions/${mission_id}/actions/${guid}`,

  deleteMission: (guid) => `/missions/${guid}`,
  deleteMissionQueue: '/mission_queue',
  deleteMissionQueueId: (id) => `/mission_queue/${id}`,
  deletePositionId: (guid) => `/positions/${guid}`,
  deleteMissionAction: (mission_id, guid) =>
    `/missions/${mission_id}/actions/${guid}`,
};
