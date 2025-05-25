import { useState, useRef, useEffect } from 'react';

// Styles for the components
const styles = {
  container: {
    position: 'relative',
    width: '20%',
    minWidth: 'fit-Content',
  },
  selector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    minHeight: '40px',
  },
  dropup: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    marginBottom: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '250px',
    overflowY: 'auto',
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  item: {
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  itemHover: {
    backgroundColor: '#f5f5f5',
  },
  chevron: {
    transition: 'transform 0.2s',
  },
  rotatedChevron: {
    transform: 'rotate(180deg)',
  },
  placeholder: {
    color: '#666',
  },
  selectedDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

// Generic reusable SelectionDropUp component
export const SelectionDropUp = ({
  items = [],
  renderItem,
  renderSelectedDisplay,
  onItemClick,
  placeholder = 'Chọn một mục',
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dropupRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropupRef.current && !dropupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropupRef} style={{ ...styles.container, ...style.container }}>
      <div
        style={{ ...styles.selector, ...style.selector }}
        onClick={toggleDropup}
        className='gap-5px'
      >
        {renderSelectedDisplay ? (
          renderSelectedDisplay()
        ) : (
          <div style={styles.placeholder}>{placeholder}</div>
        )}
        <div
          style={{
            ...styles.chevron,
            ...(isOpen ? styles.rotatedChevron : {}),
          }}
        >
          <ChevronIcon />
        </div>
      </div>

      {isOpen && (
        <div style={{ ...styles.dropup, ...style.dropup }}>
          {items.map((item, index) => (
            <div
              style={{
                ...styles.item,
                ...(hoveredIndex === index ? styles.itemHover : {}),
                ...style.item,
              }}
              onClick={() => {
                onItemClick(item, index);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple chevron icon component
const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);
