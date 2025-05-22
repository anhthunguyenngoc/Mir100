import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from './icons/Icons';
import * as Const from '../constant';
import * as Comp from '../components';

export const SearchableDropDown = ({
  dropdownData,
  handleDropdownOpen,
  onSelectItem,
  onHoverItem,
}) => {
  const [active, setActive] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => setActive(!active);

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSelect = (item) => {
    setSelected(item.label || item); // fallback nếu item là string
    if (onSelectItem) {
      onSelectItem(item); // Gọi callback từ ngoài nếu có
    }
  };

  const filterData = dropdownData.map((menu, index) => {
    const filteredItems = menu.items.filter((item) => {
      const label = typeof item === 'string' ? item : item?.label || '';
      return label.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const titleMatch = menu.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return {
      ...menu,
      items: filteredItems,
      titleMatch,
      hasMatches: filteredItems.length > 0 || titleMatch,
    };
  });

  return (
    <div className="flex row type-dropdown" style={{ position: 'relative' }}>
      <div
        className={`flex row space-between gap-5px radius-5px padding-5px full-width align-center height-input background pointer`}
        onClick={() => {
          toggleDropdown();
          handleDropdownOpen();
        }}
      >
        <span>Select point</span>
        <Icons.Expand
          width={15}
          height={10}
          color={Const.Color.BUTTON}
          style={{ transform: active ? 'scaleY(-1)' : 'none' }}
        />
      </div>
      <AnimatePresence>
        {active && (
          <motion.ul
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              width: '100%',
              background: 'white',
              border: '1px solid #ccc',
              padding: 0,
              listStyle: 'none',
              top: '100%',
              overflow: 'hidden',
              transformOrigin: 'top',
              zIndex: '3',
              marginTop: '3px',
              overflowY: 'auto',
              maxHeight: '40vh',
            }}
          >
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filterData.every((menu) => !menu.hasMatches) && (
              <div className="no-results">No points found!</div>
            )}

            {filterData.map((menu, index) =>
              menu.hasMatches ? (
                <div key={index}>
                  <div
                    className="flex row align-center gap-5px pointer"
                    style={{ height: '45px', padding: '0 10px' }}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <button className="left-sidebar-btn">
                      <img
                        className="size-5px"
                        alt="Hide left sidebar"
                        src={Const.ImageSrc['canvasExpand']}
                        loading="lazy"
                        style={{
                          transform: openSubmenus[index]
                            ? 'rotate(-90deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: menu.title.replace(
                          new RegExp(`(${searchTerm})`, 'gi'),
                          '<span class="highlight">$1</span>'
                        ),
                      }}
                    />
                    {menu.items.length > 0 && (
                      <span className="match-count">({menu.items.length})</span>
                    )}
                  </div>

                  {openSubmenus[index] && (
                    <div className="submenu-content">
                      {menu.items.map((item, i) => {
                        const label = item?.label || item?.toString?.() || ''; // đảm bảo là chuỗi
                        return (
                          <div
                            key={i}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => onHoverItem(item)}
                            style={{ height: '45px' }}
                            className="flex layer-list-item align-center pointer"
                            dangerouslySetInnerHTML={{
                              __html: label.replace(
                                new RegExp(`(${searchTerm})`, 'gi'),
                                '<span>$1</span>'
                              ),
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                  <Comp.HorizonLine
                    width="100%"
                    height="1px"
                    color={Const.Color.BUTTON}
                    isVisible={true}
                  />
                </div>
              ) : null
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
