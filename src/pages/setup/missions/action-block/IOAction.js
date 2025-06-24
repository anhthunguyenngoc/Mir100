import { BaseAction, MissionGroupStyles } from './BaseAction';

const IOAction = Object.create(BaseAction);
IOAction.color = MissionGroupStyles.io.color;
IOAction.icon = MissionGroupStyles.io.icon;

export const DisconnectBluetooth = Object.create(IOAction);
export const ConnectBluetooth = Object.create(IOAction);
export const WaitForIO = Object.create(IOAction);
export const SetResetIO = Object.create(IOAction);
export const SetIO = Object.create(IOAction);