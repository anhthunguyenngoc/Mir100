import { BaseAction, MissionGroupStyles } from './BaseAction';

const EmailAction = Object.create(BaseAction);
EmailAction.color = MissionGroupStyles.email.color;
EmailAction.icon = MissionGroupStyles.email.icon;

export const SendEmail = Object.create(EmailAction);
