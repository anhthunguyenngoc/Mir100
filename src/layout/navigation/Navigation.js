import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = ({ navList, ulStyle, liStyle, defaultIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleNavClick = (index) => {
    setSelectedIndex(index); // Cập nhật chỉ số của li được chọn
  };

  return (
    <nav>
      <ul className={ulStyle}>
        {navList &&
          Object.entries(navList).map(([key, link], index) => (
            <li
              key={key}
              className={`${liStyle} ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleNavClick(index)}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};
