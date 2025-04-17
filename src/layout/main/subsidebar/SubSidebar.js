import './subsidebar.css';
import { Navigation } from '../../navigation';
import { SUB_SIDEBAR_ROUTER } from '../../../router/router.js';
import { sidebarControl } from '../../../constant';

export const SubSidebar = ({ sidebarIndex }) => {
  const sidebarItem = sidebarControl[sidebarIndex];

  return (
    <div className="left-subsidebar-list">
      <h2 className="subsidebar-title">{sidebarItem.name}</h2>
      <Navigation
        navList={SUB_SIDEBAR_ROUTER[sidebarItem.key]}
        ulStyle="subsidebar-button-list"
        liStyle="subsidebar-button"
      />
    </div>
  );
};
