import React, { useState } from 'react';

export const Button = ({
  backgroundColor,
  color,
  borderColor,
  text,
  onClick,
  type,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex row align-center justify-center gap-5px width-fit-content height-fit-content pointer radius-3px padding-7px"
      style={{
        backgroundColor: isHovered ? `${backgroundColor}CC` : backgroundColor,
        color,
        border: `2px solid ${isHovered ? `${borderColor}CC` : borderColor}`,
        transition: 'all 0.2s ease',
      }}
      onClick={() => onClick?.()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={type}
    >
      {text}
    </button>
  );
};
