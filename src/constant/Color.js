import * as Icons from '../components/icons';

export const Color = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BUTTON: '#006d75',
  SELECTED_BUTTON: '#08979c',
  ERROR: '#820014',
  GRAY: '#F5F5F5',
  DARKGRAY: '#DDDDDD',
  LIGHT_BUTTON: '#D9E4E5',
  LIGHT_ERROR: '#E74C3C',
};

export const MissionGroupStyles = {
  '0000-0001': {
    icon: <Icons.Move />,
    color: '#2563EB',
  },
  '0000-0002': {
    icon: <Icons.BatteryCharging />,
    color: '#2A7378',
  },
  '0000-0003': {
    icon: <Icons.Logic />,
    color: '#9333EA',
  },
  '0000-0013': {
    icon: <Icons.ErrorHandling />,
    color: '#E74C3C',
  },
  '0000-0004': {
    icon: <Icons.SoundLight />,
    color: '#F59E0B',
  },
  '0000-0005': {
    icon: <Icons.PLC />,
    color: '#A16207',
  },
  '0000-0006': {
    icon: <Icons.Email />,
    color: '#0891B2',
  },
  '0000-0007': {
    icon: <Icons.IOModule />,
    color: '#374151',
  },
  '0000-0011': {
    icon: (
      <Icons.Mission
        mainColor="#EA580C"
        subColor="#EA580C66"
        width="20px"
        height="20px"
      />
    ),
    color: '#EA580C',
  },
};
