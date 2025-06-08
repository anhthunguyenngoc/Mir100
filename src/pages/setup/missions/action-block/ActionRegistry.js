import { MissionGroupBlock } from './MissionGroupBlock';
import { BaseAction } from './BaseAction';
import * as Logic from './LogicAction';
import * as Move from './MoveAction';

const ActionRegistry = {
  if: Logic.IfAction,
  while: Logic.WhileAction,
  loop: Logic.LoopAction,
  break: Logic.BreakAction,
  return: Logic.ReturnAction,
  continue: Logic.ContinueAction,
  pause: Logic.PauseAction,
  prompt_user: Logic.PromptUserAction,
  wait: Logic.WaitAction,

  move: Move.MoveToPosition,
  check_pose: Move.CheckPose,
  adjust_localization: Move.AdjustLocalization,
  docking: Move.Docking,
  planner_settings: Move.PlannerSettings,
  relative_move: Move.RelativeMove,
  set_footprint: Move.SetFootprint,
  switch_map: Move.SwitchMap,
  move_to_position: Move.MoveToCoordinate,
};

export function convertMissionGroupFromApi(missionGroup, actions) {
  const group = Object.create(MissionGroupBlock);

  group.name = missionGroup.name;
  group.guid = missionGroup.guid;
  group.url = missionGroup.url;
  group.color = missionGroup.style?.color || '#ccc';
  group.icon = missionGroup.style?.icon || null;

  // Chuyển đổi từng action nếu cần
  group.actions = actions.map((item) => {
    const action = convertActionFromApi(item); // ← bạn đã có hàm này rồi
    return action;
  });

  return group;
}

function convertActionFromApi(apiAction) {
  const {
    action_type,
    name,
    parameters = [],
    description,
    descriptions,
  } = apiAction.detail;

  // Lấy prototype nếu có
  const prototype = ActionRegistry[action_type] || BaseAction;
  const action = Object.create(prototype);

  action.name = name;
  action.action_type = action_type;
  action.description = description;
  action.descriptions = descriptions;

  // Khởi tạo parameters rỗng
  action.parameters = parameters;

  return action;
}

export function convertAllActionsFromApi(apiResponse) {
  return apiResponse.map(convertActionFromApi);
}
