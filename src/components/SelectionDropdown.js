import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OutsideClickHandler from 'react-outside-click-handler';

import * as Icons from './icons/Icons';

export const SelectionDropdown = ({
  options,
  placeHolderText,
  onChange,
  styleClass,
  containerStyleClass,
  iconColor,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!selected) return;
    onChange?.(selected);
  }, [selected]);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div
        className={containerStyleClass}
        style={{ position: 'relative', width: '100%' }}
      >
        <button
          className={`flex row space-between gap-5px radius-5px padding-5px ${styleClass}`}
          onClick={toggleDropdown}
          style={{ cursor: 'pointer' }}
          type="button"
        >
          <span>{selected?.name || placeHolderText}</span>
          <Icons.Expand
            width={15}
            height={10}
            color={iconColor}
            style={{ transform: isOpen ? 'scaleY(-1)' : 'none' }}
          />
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
                top: '100%',
                overflow: 'hidden',
                transformOrigin: 'top',
                zIndex: '3',
              }}
            >
              {options?.map((option, index) => (
                <li
                  key={option.guid}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    background:
                      selected?.guid === option.guid ? '#f0f0f0' : 'white',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {option.name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
};
