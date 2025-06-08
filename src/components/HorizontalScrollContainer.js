import React, { useRef, useState } from 'react';

// Component HorizontalScrollContainer có thể tái sử dụng
export const HorizontalScrollContainer = ({
  children,
  width = '100%',
  height = '200px',
  className = '',
  showScrollbar = true,
  dragToScroll = true,
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!dragToScroll) return;

    setIsDragging(true);
    const container = containerRef.current;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragToScroll) return;

    e.preventDefault();
    const container = containerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const containerStyle = {
    width: width,
    height: height,
    overflowX: 'auto',
    overflowY: 'hidden',
    cursor: dragToScroll ? (isDragging ? 'grabbing' : 'grab') : 'default',
    scrollbarWidth: showScrollbar ? 'auto' : 'none',
    msOverflowStyle: showScrollbar ? 'auto' : 'none',
    minWidth: '0',
  };

  const scrollbarStyle = showScrollbar
    ? {}
    : {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      };

  return (
    <div
      ref={containerRef}
      className={`horizontal-scroll-container ${className}`}
      style={{ ...containerStyle, ...scrollbarStyle }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};
