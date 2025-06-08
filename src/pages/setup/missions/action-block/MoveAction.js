import { BaseAction, MissionGroupStyles } from './BaseAction';

const MoveAction = Object.create(BaseAction);
MoveAction.color = MissionGroupStyles.move.color;
MoveAction.icon = MissionGroupStyles.move.icon;

export const MoveToCoordinate = Object.create(MoveAction);
MoveToCoordinate.name = 'MoveToCoordinate';
MoveToCoordinate.type = 'move_to_position';
MoveToCoordinate.parameters = [];
MoveToCoordinate.describe = () => 'Move to coordinate';

export const AdjustLocalization = Object.create(MoveAction);
AdjustLocalization.name = 'AdjustLocalization';
AdjustLocalization.type = 'adjust_localization';
AdjustLocalization.parameters = [];
AdjustLocalization.describe = () => 'Adjust localization of robot';

export const SwitchMap = Object.create(MoveAction);
SwitchMap.name = 'SwitchMap';
SwitchMap.type = 'switch_map';
SwitchMap.parameters = ['entry_position'];
SwitchMap.describe = ({ entry_position }) =>
  `Switch map and start from position ${entry_position}`;

export const Docking = Object.create(MoveAction);
Docking.name = 'Docking';
Docking.type = 'docking';
Docking.parameters = ['marker'];
Docking.describe = ({ marker }) => `Dock to ${marker || 'current position'}`;

export const RelativeMove = Object.create(MoveAction);
RelativeMove.name = 'RelativeMove';
RelativeMove.type = 'relative_move';
RelativeMove.parameters = ['x', 'y', 'orientation'];
RelativeMove.describe = ({ x, y, orientation }) =>
  `Relative move: X=${x}, Y=${y}, Orientation=${orientation}`;

export const PlannerSettings = Object.create(MoveAction);
PlannerSettings.name = 'PlannerSettings';
PlannerSettings.type = 'planner_settings';
PlannerSettings.parameters = ['planner_params'];

PlannerSettings.describe = ({
  planner_params,
  desired_speed,
  path_timeout,
  path_deviation,
}) => {
  switch (planner_params) {
    case 'desired_speed_key':
      return `Set desired speed to ${desired_speed} m/s`;
    case 'path_timeout_key':
      return `Set path timeout to ${path_timeout} secs`;
    case 'path_deviation_key':
      return `Set maximum path deviation to ${path_deviation} m`;
    default:
      return 'Planner settings updated';
  }
};

export const CheckPose = Object.create(MoveAction);
CheckPose.name = 'CheckPose';
CheckPose.type = 'check_pose';
CheckPose.parameters = ['position', 'option', 'timeout'];

CheckPose.describe = ({ position, option, timeout, x, y, orientation }) => {
  if (!position) {
    return `Check whether X=${x}, Y=${y}, Orientation=${orientation} is ${option} with timeout ${timeout}`;
  }
  return `Check whether ${position} is ${option} with timeout ${timeout}`;
};

export const MoveToPosition = Object.create(MoveAction);
MoveToPosition.name = 'MoveToPosition';
MoveToPosition.type = 'move_to_position';
MoveToPosition.parameters = ['x', 'y', 'orientation'];
MoveToPosition.describe = ({ x, y, orientation }) =>
  `Move to X=${x}, Y=${y}, Orientation=${orientation}`;

export const SetFootprint = Object.create(MoveAction);
SetFootprint.name = 'SetFootprint';
SetFootprint.type = 'set_footprint';
SetFootprint.parameters = ['footprint'];
SetFootprint.describe = ({ footprint }) =>
  `Set footprint to ${footprint || 'default'}`;
