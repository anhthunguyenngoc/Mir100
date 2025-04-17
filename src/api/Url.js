import {
  deletePosition,
  getPositionTypes,
  postPositions,
  putMap,
  putMission,
  putPosition,
} from './Api';

export const URL = {
  postAreaEvents: '/area_events',
  postMissionQueue: '/mission_queue',
  postMission: '/missions',
  postPositions: '/positions',

  putPosition: (guid) => `/positions/${guid}`,
  putMap: (guid) => `/maps/${guid}`,
  putMissionQueue: (id) => `/mission_queue/${id}`,
  putMission: (guid) => `/missions/${guid}`,

  getAreaEvents: '/area_events',
  getActions: '/actions',
  getAction: (action_type) => `/actions/${action_type}`,
  getStatus: '/status',
  getMap: (guid) => `/maps/${guid}`,
  getMissionGroups: '/mission_groups',
  getMissionGroupId: (guid) => `/mission_groups/${guid}`,
  getMissions: '/missions',
  getMissionId: (guid) => `/missions/${guid}`,
  getMissionQueues: '/mission_queue',
  getMissionQueueId: (id) => `/mission_queue/${id}`,
  getMapPositions: (map_id) => `GET /maps/${map_id}/positions`,
  getPositionTypes: '/position_types',
  getPositionType: (id) => `/position_types/${id}`,
  getPositions: '/positions',
  getPositionId: (guid) => `/positions/${guid}`,

  deleteMission: (guid) => `/missions/${guid}`,
  deleteMissionQueue: '/mission_queue',
  deleteMissionQueueId: (id) => `/mission_queue/${id}`,
  deletePositionId: (guid) => `/positions/${guid}`,
};
