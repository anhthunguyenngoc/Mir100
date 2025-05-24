import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './sidebar.css';
import * as Icons from '../../../components/icons';
import { sidebarControl } from '../../../constant';

export const Sidebar = ({ defaultIndex, onSelect }) => {
  const navigate = useNavigate();

  const handleItemClick = (index, item) => {
    onSelect(index);
    navigate(item.path);
  };

  return (
    <div id="left-sidebar-list" className="padding-15px radius-15px">
      <Icons.Logo width="80px" />
      <ul className="flex col full-height gap-15px justify-center">
        {sidebarControl.map((item, index) => (
          <li
            key={item.key}
            className={`sidebar-button flex col gap-5px pointer padding-10px radius-5px justify-center align-center ${defaultIndex === index ? 'selected' : ''}`}
            style={{ fontSize: 'var(--sidebar-font-size)', color: '#ffffff' }}
            onClick={() => handleItemClick(index, item)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <div style={{ height: '80px' }}></div>
    </div>
  );
};
