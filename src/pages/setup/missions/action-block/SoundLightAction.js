import { BaseAction, MissionGroupStyles } from './BaseAction';

const SoundLightAction = Object.create(BaseAction);
SoundLightAction.color = MissionGroupStyles.sound.color;
SoundLightAction.icon = MissionGroupStyles.sound.icon;

export const StopSound = Object.create(SoundLightAction);

export const Sound = Object.create(SoundLightAction);

export const Light = Object.create(SoundLightAction);
