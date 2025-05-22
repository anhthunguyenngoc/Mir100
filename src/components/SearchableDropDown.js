import React, { useState, useEffect } from 'react';

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
    <div className="dropdown-container">
      <div
        className={`dropdown-main ${active ? 'active' : ''}`}
        onClick={() => {
          toggleDropdown();
          handleDropdownOpen();
        }}
      >
        <span className="arrow">▶</span>
        <span>Chọn danh mục</span>
      </div>
      {active && (
        <div className="dropdown-content active">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm nhanh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filterData.every((menu) => !menu.hasMatches) && (
            <div className="no-results">Không tìm thấy kết quả nào!</div>
          )}

          {filterData.map((menu, index) =>
            menu.hasMatches ? (
              <div key={index}>
                <div
                  className={`submenu-item ${openSubmenus[index] ? 'active' : ''}`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className="arrow">▶</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: menu.title.replace(
                        new RegExp(`(${searchTerm})`, 'gi'),
                        '<span class="highlight">$1</span>'
                      ),
                    }}
                  />
                  {menu.items.length > 0 && (
                    <span className="match-count">{menu.items.length}</span>
                  )}
                </div>
                {openSubmenus[index] && (
                  <div className="submenu-content active">
                    {menu.items.map((item, i) => {
                      const label = item?.label || item?.toString?.() || ''; // đảm bảo là chuỗi
                      return (
                        <div
                          key={i}
                          className="clickable-content"
                          onClick={() => handleSelect(item)}
                            onMouseEnter={() => onHoverItem(item)}
                          dangerouslySetInnerHTML={{
                            __html: label.replace(
                              new RegExp(`(${searchTerm})`, 'gi'),
                              '<span class="highlight">$1</span>'
                            ),
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>
      )}

      {selected && (
        <div id="selected-item" className="selected-box">
          Bạn đã chọn:{' '}
          <span id="selected-text">{selected.label || selected}</span>
        </div>
      )}
    </div>
  );
};
