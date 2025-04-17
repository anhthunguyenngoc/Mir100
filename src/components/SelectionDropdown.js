import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const options = ['Mục 1', 'Mục 2', 'Mục 3', 'Mục 4'];

export const SelectionDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <button
        onClick={toggleDropdown}
        style={{
          width: '100%',
          padding: '10px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          background: '#fff',
          textAlign: 'left',
        }}
      >
        {selected || 'Chọn một mục'} ▼
      </button>

      <AnimatePresence>
        {isOpen && (
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
              marginTop: 5,
              overflow: 'hidden',
              transformOrigin: 'top',
            }}
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  background: selected === option ? '#f0f0f0' : 'white',
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
