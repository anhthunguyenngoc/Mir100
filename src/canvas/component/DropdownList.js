import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Constant from '../../constant';

export const DropdownList = ({
  addBtnVisible,
  addBtnOnClick,
  title,
  datalist,
  itemOnClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="form-input-row">
      <div className="flex row align-center space-between">
        <div className="flex row align-center gap-5px">
          <button
            className="left-sidebar-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="size-5px"
              alt="Hide left sidebar"
              src={Constant.ImageSrc['canvasExpand']}
              loading="lazy"
              style={{
                transform: !isOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>
          <span>{title}</span>
        </div>
        {addBtnVisible && (
          <button
            className="left-sidebar-btn"
            onClick={() => {
              addBtnOnClick?.();
              setIsOpen(true);
            }}
          >
            <img
              className="size-20px"
              alt="Hide left sidebar"
              src={Constant.ImageSrc['addLayer']}
              loading="lazy"
            />
          </button>
        )}
      </div>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="flex col"
        >
          {datalist.map((item) => {
            return (
              <li
                className={`layer-list-item ${item.selected ? 'selected' : ''}`}
                onClick={() => itemOnClick(item.id)}
              >
                <span style={{ textTransform: 'capitalize' }}>{item.name}</span>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};
