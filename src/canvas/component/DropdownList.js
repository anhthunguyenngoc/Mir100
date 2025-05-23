import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Constant from '../../constant';

const DropdownItem = ({ item, itemOnClick }) => {
  const [subOpen, setSubOpen] = useState(false);
  const isGroup = item.name === Constant.ShapeName.GROUP;

  return (
    <li
      className={`flex col gap-5px`}
      style={{ paddingLeft: '20px' }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isGroup) {
          itemOnClick(item.id, !item.selected);
        } else {
          setSubOpen(!subOpen);
        }
      }}
    >
      <div className={`flex row gap-5px layer-list-item align-center ${item.selected ? 'selected' : ''}`}> 
        {isGroup && (
          <img
            className="size-10px"
            alt="Toggle"
            src={Constant.ImageSrc['canvasExpand']}
            loading="lazy"
            style={{
              transform: subOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s',
            }}
          />
        )}
        <span style={{ textTransform: 'capitalize' }}>{item.itemName}</span>
      </div>

      {isGroup && subOpen && Array.isArray(item.shapes) && (
        <ul className="flex col gap-5px">
          {item.shapes.map((subItem) => (
            <DropdownItem
              key={subItem.id}
              item={{
              id: subItem.id,
              name: subItem.name,
              itemName: subItem.groupName + ' ' + subItem.id,
              selected: subItem.selected,
              shapes: subItem?.shapes,
            }}
              itemOnClick={itemOnClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const DropdownList = ({
  addBtnVisible,
  addBtnOnClick,
  title,
  datalist,
  itemOnClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex col gap-5px">
      <div className="flex row align-center space-between">
        <div className="flex row align-center gap-5px">
          <button
            className="left-sidebar-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="size-10px"
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
              alt="Add"
              src={Constant.ImageSrc['addLayer']}
              loading="lazy"
            />
          </button>
        )}
      </div>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="flex col gap-5px"
        >
          {datalist.map((item) => (
            <DropdownItem key={item.id} item={item} itemOnClick={itemOnClick} />
          ))}
        </motion.ul>
      )}
    </div>
  );
};
