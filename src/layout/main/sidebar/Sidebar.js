import React, { useState } from 'react';
import './sidebar.css';
import { ImageSrc } from '../../../constant';
import { sidebarControl } from '../../../constant';

export const Sidebar = ({ defaultIndex, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex); // Quản lý trạng thái selected

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    onSelect(index);
  };

  return (
    <ul id="left-sidebar-list">
      <li id="back-forward" className="back-forward-button">
        <img
          className="sidebar-btn-img"
          alt="Back forward"
          src={ImageSrc['backForward']}
          loading="lazy"
        />
      </li>
      {sidebarControl.map((item, index) => (
        <li
          key={item.key}
          className={`sidebar-button ${selectedIndex === index ? 'selected' : ''}`}
          onClick={() => handleItemClick(index)}
        >
          <img
            className="sidebar-btn-img"
            alt={item.name}
            src={ImageSrc[item.imgSrcKey]}
            loading="lazy"
          />
          {item.name}
        </li>
      ))}
    </ul>
  );
};
