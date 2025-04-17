import react, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './main-layout.css';
import { MainHeader } from '../main-header';
import { Sidebar } from '../sidebar';
import { SubSidebar } from '../subsidebar';
import { sidebarControl } from '../../../constant';

export const MainLayout = ({ children, defaultIndex }) => {
  const location = useLocation();
  const { pathname } = location;

  const [sidebarSelectedIndex, setSidebarSelectedIndex] =
    useState(defaultIndex);

  const handleSidebarSelect = (index) => {
    setSidebarSelectedIndex(index);
  };

  // // Tách path dùng useMemo để tránh thay đổi liên tục
  // const [sidebarPath] = useMemo(() => {
  //   return pathname.split('/').filter(Boolean);
  // }, [pathname]);

  // useEffect(() => {
  //   const sidebarIndex = sidebarControl.findIndex(
  //     (item) => item.path === '/'+sidebarPath
  //   );
  // }, [sidebarPath]);

  return (
    <div className="main_layout">
      <Sidebar onSelect={handleSidebarSelect} defaultIndex={0} />
      <div className="right_sidebar">
        <MainHeader />
        <div className="below_header">
          <SubSidebar sidebarIndex={sidebarSelectedIndex} />
          <div className="content-container">
            <div id="overlay" className="hidden"></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
