import { getAPI, postAPI, deleteAPI, putAPI } from './BaseApi';
import { URL } from './Url';
import * as IApi from './api_interface';

//======================================           POST           ======================================

/**
 * POST /mission_queue
 *
 * Description
 * Add a new mission to the mission queue. The mission will always go to the end of the queue
 *
 * @param {IApi.TPostMission_queues} body - { mission_id*, message, parameters, priority }.
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission_queues}>}
 *   data: { id, state, url }
 */
export const postMissionQueue = async (body) => {
  const response = await postAPI(URL.postMissionQueue, body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * POST /missions
 *
 * Description
 * Add a new mission
 *
 * @param {IApi.TPostMissions} body - { group_id*, name*, created_by_id, description, guid, hidden, session_id }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetMissions}>}
 *   data: { guid, name, url }
 */
export const postMission = async (body) => {
  const response = await postAPI(URL.postMission, body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * POST /area_events
 *
 * Description
 * Add a new area event
 *
 * @param {IApi.TPostArea_events} body -
 *   { actions[], created_by_id, guid, map_id*, name, polygon*, type_id* }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetArea_events}>}
 *   data: { guid, map, name, type_id, url }
 */
export const postAreaEvents = async (body) => {
  const response = await postAPI(URL.postAreaEvents, body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * POST /positions
 *
 * Description
 * Add a new position
 *
 * @param {IApi.TPostPositions} body -
 *   { created_by_id, guid, map_id, name, orientation, parent_id, pos_x, pos_y, type_id }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetPositions}>}
 *   data: { guid, map, name, type_id, url }
 */
export const postPositions = async (body) => {
  const response = await postAPI(URL.postPositions, body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

//======================================           PUT           ======================================

/**
 * PUT /positions/{guid}
 *
 * Description
 * Modify the values of the position with the specified GUID
 *
 * @param {number} guid - ID vị trí cần cập nhật.
 * @param {IApi.TPutPosition} body - Dữ liệu vị trí mới để cập nhật.
 *   { map_id, name, orientation, parent_id, pos_x, pos_y, type_id }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetPosition}>}
 *   data: { created_by, created_by_id, docking_offsets, guid, help_positions, map, map_id, name, orientation, parent, parent_id, pos_x, pos_y, type, type_id }
 */
export const putPosition = async (guid, body) => {
  const response = await putAPI(URL.putPosition(guid), body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * PUT /maps/{guid}
 *
 * Description
 * Modify the values of the map with the specified GUID
 *
 * @param {number} guid - ID cần cập nhật.
 * @param {IApi.TPutMap} body - Dữ liệu bản đồ mới.
 *   { map, metadata, name, one_way_map, origin_theta, origin_x, origin_y, resolution }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetMap}>}
 *   data: { created_by, created_by_id, guid, map, metadata, name, one_way_map, origin_theta, origin_x, origin_y, path_guides, paths, positions, resolution, session_id }
 */
export const putMap = async (guid, body) => {
  const response = await putAPI(URL.putMap(guid), body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * PUT /missions/{guid}
 *
 * Description
 * Modify the values of the mission with the specified GUID
 *
 * @param {number} guid - ID cần cập nhật.
 * @param {IApi.TPutMission} body - Dữ liệu mission mới.
 *   { description, group_id, hidden, name, session_id }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission}>}
 *   data: { actions, created_by, created_by_id, definition, description, group_id, guid, has_user_parameters, hidden, name, session_id, valid }
 */
export const putMission = async (guid, body) => {
  const response = await putAPI(URL.putMission(guid), body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * PUT /mission_queue/{id}
 *
 * Description
 * Modify the values of the mission with the specified ID in the mission queue
 *
 * @param {number} guid - ID cần cập nhật.
 * @param {IApi.TPutMission_queue} body - Dữ liệu mission queue mới.
 *   { cmd, description, mission_id, priority }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission_queue}>}
 *   data: { actions, control_posid, control_state, created_by, created_by_id, description, finished, id, message, mission, mission_id, ordered, parameters, priority, started, state }
 */
export const putMissionQueue = async (id, body) => {
  const response = await putAPI(URL.putMissionQueue(id), body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * PUT /status
 *
 * Description
 * Modify the status
 *
 * @param {IApi.TPutStatus} body
 *   { answer, clear_error, datetime, guid, map_id, mode_id, name, position, serial_number, state_id, web_session_id }
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetStatus}>}
 *   // TGetStatus: { battery_percentage, battery_time_remaining, distance_to_next_target, errors, footprint, hook_status, joystick_low_speed_mode_enabled, joystick_web_session_id, map_id, mission_queue_id, mission_queue_url, mission_text, mode_id, mode_key_state, mode_text, moved, position, robot_model, robot_name, safety_system_muted, serial_number, session_id, state_id, state_text, unloaded_map_changes, uptime, user_prompt, velocity }
 *   // TError: { code, description, module }
 *   // THookStatus: { angle, available, braked, cart_attached, height, length, cart }
 *   // TCart: { height, id, length, offset_locked_wheels, width }
 *   // TPosition: { orientation, x, y }
 *   // TUserPrompt: { guid, options, question, timeout, user_group }
 *   // TVelocity: { angular, linear }
 */
export const putStatus = async (body) => {
  const response = await putAPI(URL.putStatus, body);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

//======================================           GET           ======================================

/**
 * GET /status
 *
 * Description
 * Retrieve the status
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetStatus}>}
 *   // TGetStatus: { battery_percentage, battery_time_remaining, distance_to_next_target, errors, footprint, hook_status, joystick_low_speed_mode_enabled, joystick_web_session_id, map_id, mission_queue_id, mission_queue_url, mission_text, mode_id, mode_key_state, mode_text, moved, position, robot_model, robot_name, safety_system_muted, serial_number, session_id, state_id, state_text, unloaded_map_changes, uptime, user_prompt, velocity }
 *   // TError: { code, description, module }
 *   // THookStatus: { angle, available, braked, cart_attached, height, length, cart }
 *   // TCart: { height, id, length, offset_locked_wheels, width }
 *   // TPosition: { orientation, x, y }
 *   // TUserPrompt: { guid, options, question, timeout, user_group }
 *   // TVelocity: { angular, linear }
 */
export const getStatus = async () => {
  const response = await getAPI(URL.getStatus);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /maps
 *
 * Description
 * Retrieve the list of maps
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetMaps>}>}
 *   data: { guid, name, url }
 */
export const getMaps = async () => {
  const response = await getAPI(URL.getMaps);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /maps/{guid}
 *
 * Description
 * Retrieve the details about the map with the specified GUID
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetMap}>}
 *   data: { created_by, created_by_id, guid, map, metadata, name, one_way_map, origin_theta, origin_x, origin_y, path_guides, paths, positions, resolution, session_id }
 */
export const getMap = async (mapId) => {
  const response = await getAPI(URL.getMap(mapId));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /mission_groups
 *
 * Description
 * Retrieve the list of mission groups
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetMission_groups>}>}
 *   data: { guid, name, url }
 */
export const getMissionGroups = async () => {
  const response = await getAPI(URL.getMissionGroups);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /mission_groups/{guid}
 *
 * Description
 * Retrieve the details about the mission group with the specified GUID
 *
 * @param {String} guid
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission_group}>}
 *   data: { created_by, created_by_id, feature, guid, icon, name, priority }
 */
export const getMissionGroupId = async (guid) => {
  const response = await getAPI(URL.getMissionGroupId(guid));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /missions
 *
 * Description
 * Retrieve the list of missions
 *
 * @param - none.
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetMissions>}>}
 *   data: { guid, name, url }
 */
export const getMissions = async () => {
  const response = await getAPI(URL.getMissions);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /missions/{guid}
 *
 * Description
 * Retrieve the details about the mission with the specified GUID
 *
 * @param {string} guid
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission}>}
 *   data: { actions, created_by, created_by_id, definition, description, group_id, guid, has_user_parameters, hidden, name, session_id, valid }
 */
export const getMissionId = async (guid) => {
  const response = await getAPI(URL.getMissionId(guid));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /mission_queue
 *
 * Description
 * Retrieve the list of missions in the queue. Finished, failed, pending and executing missions will be displayed here
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetMission_queues>}>}
 *   data: { id, state, url }
 */

export const getMissionQueues = async () => {
  const response = await getAPI(URL.getMissionQueues);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /mission_queue/{id}
 *
 * Description
 * Retrieve the details about the mission with the specified ID in the mission queue
 *
 * @param {Number} id
 * @returns {Promise<{statusCode: number, data: IApi.TGetMission_queue}>}
 *   data: { actions, control_posid, control_state, created_by, created_by_id, description, finished, id, message, mission, mission_id, ordered, parameters, priority, started, state }
 */
export const getMissionQueueId = async (id) => {
  const response = await getAPI(URL.getMissionQueueId(id));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /actions
 *
 * Description
 * Retrieve the list of action definitions
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetAction_definitions}>}
 *   data: { action_type, description, descriptions, help, mission_group_id, name, parameters }
 */
export const getActions = async () => {
  const response = await getAPI(URL.getActions);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /actions/{action_type}
 * 
 * Description
 * Retrieve the details about the action. It displays the parameters of the action and the limits for the
 values among others
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetAction_definition}>}
 *   data: { action_type, description, descriptions, help, mission_group_id, name, parameters }
 */
export const getAction = async (action_type) => {
  const response = await getAPI(URL.getAction(action_type));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /area_events
 *
 * Description
 * Retrieve the list of area events
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetArea_events>}>}
 *   data: [{ guid, map, name, type_id, url }]
 */
export const getAreaEvents = async () => {
  const response = await getAPI(URL.getAreaEvents);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /position_types
 *
 * Description
 * Retrieve a list of possible position types
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetPosition_types>}>}
 *   data: [{ id, name, url }]
 */
export const getPositionTypes = async () => {
  const response = await getAPI(URL.getPositionTypes);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /position_types/{id}
 *
 * Description
 * Retrieve the details about the position type with the specified ID
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetPosition_type>}>}
 *   data: [{ hidden, id, name, reachable_for_robot }]
 */
export const getPositionType = async (id) => {
  const response = await getAPI(URL.getPositionType(id));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /positions
 *
 * Description
 * Retrieve the list of positions
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetPositions>}>}
 *   data: [{ guid, map, name, type_id, url }]
 */
export const getPositions = async () => {
  const response = await getAPI(URL.getPositions);
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /positions/{guid}
 *
 * Description
 * Retrieve the details about the position with the specified GUID
 *
 * @returns {Promise<{statusCode: number, data: IApi.TGetPosition}>}
 *   data: { created_by, created_by_id, docking_offsets, guid, help_positions, map, map_id, name, orientation, parent, parent_id, pos_x, pos_y, type, type_id }
 *
 */
export const getPosition = async (guid) => {
  const response = await getAPI(URL.getPositionId(guid));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

/**
 * GET /maps/{map_id}/positions
 *
 * Description
 * Retrieve the list of positions that belong to the map with the specified map ID
 *
 * @returns {Promise<{statusCode: number, data: Array<IApi.TGetMap_positions>}>}
 *   data: [{ guid, map, name, type_id, url }]
 */
export const getMapPositions = async (map_id) => {
  const response = await getAPI(URL.getMapPositions(map_id));
  return {
    statusCode: response.statusCode,
    data: response.rawData,
  };
};

//====================================           DELETE           ====================================

/**
 * DELETE /missions/{guid}
 *
 * Description
 * Erase the mission with the specified GUID
 *
 * @param {String} guid
 * @returns {Promise<{statusCode: number}>}
 */
export const deleteMission = async (guid) => {
  const response = await deleteAPI(URL.deleteMission(guid));
  return {
    statusCode: response.statusCode,
  };
};

/**
 * DELETE /mission_queue
 *
 * Description
 * Abort all the pending and executing missions from the mission queue
 *
 * @returns {Promise<{statusCode: number}>}
 */
export const deleteMissionQueue = async () => {
  const response = await deleteAPI(URL.deleteMissionQueue);
  return {
    statusCode: response.statusCode,
  };
};

/**
 * DELETE /mission_queue/{id}
 *
 * Description
 * Abort the mission with the specified ID in the mission queue
 *
 * @param {Number} id
 * @returns {Promise<{statusCode: number}>}
 */
export const deleteMissionQueueId = async (id) => {
  const response = await deleteAPI(URL.deleteMissionQueueId(id));
  return {
    statusCode: response.statusCode,
  };
};

/**
 * DELETE /positions/{guid}
 *
 * Description
 * Erase the position with the specified GUID
 *
 * @param {Number} guid
 * @returns {Promise<{statusCode: number}>}
 */
export const deletePosition = async (guid) => {
  const response = await deleteAPI(URL.deletePositionId(guid));
  console.log(response);
  return {
    statusCode: response.statusCode,
  };
};
