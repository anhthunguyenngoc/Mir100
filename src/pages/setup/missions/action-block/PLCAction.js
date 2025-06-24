import { BaseAction, MissionGroupStyles } from './BaseAction';

const PLCAction = Object.create(BaseAction);
PLCAction.color = MissionGroupStyles.plc.color;
PLCAction.icon = MissionGroupStyles.plc.icon;

export const WaitForPlcRegister = Object.create(PLCAction);

export const SetResetPlc = Object.create(PLCAction);

export const SetPlcRegister = Object.create(PLCAction);