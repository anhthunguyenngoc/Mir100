import React, { useState } from 'react';

export const ToggleSwitch = ({ isOn, onToggle }) => {
  const toggle = () => {
    if (onToggle) onToggle(!isOn); // Gọi callback nếu có
  };

  return (
    <div
      onClick={toggle}
      style={{
        width: '50px',
        height: '25px',
        background: isOn ? '#4CAF50' : '#ccc',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        cursor: 'pointer',
        transition: 'background 0.3s',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          transform: isOn ? 'translateX(25px)' : 'translateX(0px)',
          transition: 'transform 0.3s',
        }}
      />
    </div>
  );
};
