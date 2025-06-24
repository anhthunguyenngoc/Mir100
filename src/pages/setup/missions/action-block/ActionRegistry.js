import { MissionGroupBlock } from './MissionGroupBlock';
import { BaseAction } from './BaseAction';
import * as Logic from './LogicAction';
import * as Move from './MoveAction';
import * as Battery from './BatteryAction';
import * as SoundLight from './SoundLightAction';
import * as PLC from './PLCAction';
import * as Email from './EmailAction';
import * as IO from './IOAction';
import * as Error from './ErrorHandlingAction';
import * as mUtils from '../../../../utils/MissionEditUtils'

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

  charging: Battery.ChargingAction,

  sound_stop: SoundLight.StopSound,
  sound: SoundLight.Sound,
  light: SoundLight.Light,
  
  wait_for_plc_register: PLC.WaitForPlcRegister,
  set_reset_plc: PLC.SetResetPlc,
  set_plc_register: PLC.SetPlcRegister,

  email: Email.SendEmail,

  disconnect_bluetooth: IO.DisconnectBluetooth,
  connect_bluetooth: IO.ConnectBluetooth,
  wait_for_io: IO.WaitForIO,
  set_reset_io: IO.SetResetIO,
  set_io: IO.SetIO,

  create_autolog: Error.CreateLog,
  throw_error: Error.ThrowError,
  try_catch: Error.TryCatch,
};

export function convertMissionGroupFromApi(missionGroup, actions, realValue) {
  const group = Object.create(MissionGroupBlock);

  group.name = missionGroup.name;
  group.guid = missionGroup.guid;
  group.url = missionGroup.url;
  group.color = missionGroup.style?.color || '#ccc';
  group.icon = missionGroup.style?.icon || null;

  // Chuyển đổi từng action nếu cần
  group.actions = actions.map((item) => {
    const action = convertActionFromApi(item, realValue); // ← bạn đã có hàm này rồi
    return action;
  });

  return group;
}

function convertActionFromApi(apiAction, realValue) {
  const {
    action_type,
    name,
    parameters = [],
    description,
    descriptions,
  } = apiAction.detail;

  const { registerChoices } = realValue;

  // Lấy prototype nếu có
  const prototype = ActionRegistry[action_type] || BaseAction;
  const action = Object.create(prototype);

  const { description: newDescription, descriptions: newDescriptions } = mUtils.processDescriptions({parameters, description, descriptions}) || {}
  const newParameters = mUtils.updateRegisterChoices(parameters, registerChoices);

  action.name = name;
  action.action_type = action_type;
  action.description = newDescription ? newDescription : description;
  action.descriptions = newDescriptions ? newDescriptions : descriptions;
  action.parameters = newParameters ? newParameters : parameters;

  return action;
}

export function convertAllActionsFromApi(apiResponse) {
  return apiResponse.map(convertActionFromApi);
}
