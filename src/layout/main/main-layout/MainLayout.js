import react, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import './main-layout.css';
import { MainHeader } from '../main-header';
import { Sidebar } from '../sidebar';
import { sidebarControl } from 'constant';
import * as Context from 'context';

export const MainLayout = ({ children }) => {
  const { pathname } = Context.useAppContext();

  const [sidebarSelectedIndex, setSidebarSelectedIndex] = useState(() => {
    return (
      sidebarControl.findIndex((item) => pathname.startsWith(item.path)) || 0
    );
  });

  const [delayedPageInfo, setDelayedPageInfo] = useState(
    sidebarControl[sidebarSelectedIndex]
  );

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
      <div
        className="right_sidebar full-width full-height flex col radius-15px"
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MainHeader pageInfo={delayedPageInfo} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname} // key để nhận diện khi chuyển trang
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // nếu bạn không muốn fade out, có thể xóa dòng này
            transition={{ duration: 0.5 }}
            className="content-container"
            onAnimationComplete={() => {
              setDelayedPageInfo(sidebarControl[sidebarSelectedIndex]);
            }}
          >
            <div id="overlay" className="hidden"></div>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
