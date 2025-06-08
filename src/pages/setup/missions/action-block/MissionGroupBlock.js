export const MissionGroupBlock = {
  name: '',
  guid: '',
  url: '',
  color: '',
  icon: null,
  actions: [],

  toJSON() {
    return {
      name: this.name,
      guid: this.guid,
      color: this.color,
      icon: this.icon,
      actions: this.actions,
    };
  },
};
