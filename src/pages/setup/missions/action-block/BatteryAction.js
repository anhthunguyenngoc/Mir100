import { BaseAction, MissionGroupStyles } from './BaseAction';

const BatteryAction = Object.create(BaseAction);
BatteryAction.color = MissionGroupStyles.battery.color;
BatteryAction.icon = MissionGroupStyles.battery.icon;

export const ChargingAction = Object.create(BatteryAction);
ChargingAction.name = 'ChargingAction';
ChargingAction.type = 'charging';
ChargingAction.parameters = [];
