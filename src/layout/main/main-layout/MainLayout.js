import react, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './main-layout.css';
import { MainHeader } from '../main-header';
import { Sidebar } from '../sidebar';
import { sidebarControl } from 'constant';

export const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const [sidebarSelectedIndex, setSidebarSelectedIndex] = useState(() => {
    return (
      sidebarControl.findIndex((item) => pathname.startsWith(item.path)) || 0
    );
  });

  useEffect(() => {
    const index = sidebarControl.findIndex((item) =>
      pathname.startsWith(item.path)
    );
    if (index !== -1 && index !== sidebarSelectedIndex) {
      setSidebarSelectedIndex(index);
    }
  }, [pathname]);

  const handleSidebarSelect = (index) => {
    setSidebarSelectedIndex(index);
  };

  return (
    <div className="main_layout padding-10px gap-10px">
      <Sidebar
        onSelect={handleSidebarSelect}
        defaultIndex={sidebarSelectedIndex}
      />
      <div className="right_sidebar full-width full-height flex col radius-15px">
        <MainHeader pageInfo={sidebarControl[sidebarSelectedIndex]} />
        <div className="content-container">
          <div id="overlay" className="hidden"></div>
          {children}
        </div>
      </div>
    </div>
  );
};
