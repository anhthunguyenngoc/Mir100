import { BaseAction, MissionGroupStyles } from './BaseAction';

const ErrorHandlingAction = Object.create(BaseAction);
ErrorHandlingAction.color = MissionGroupStyles.error.color;
ErrorHandlingAction.icon = MissionGroupStyles.error.icon;

export const CreateLog = Object.create(ErrorHandlingAction);

export const ThrowError = Object.create(ErrorHandlingAction);

export const TryCatch = Object.create(ErrorHandlingAction);
