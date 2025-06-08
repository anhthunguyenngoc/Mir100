import React, { useEffect, useState, useRef } from 'react';

export const DraggableSection = ({
  children,
  initialPosition = { x: 0, y: 0 },
  style,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseDown = (e) => {
    // Chỉ cho phép kéo khi click vào header hoặc khu vực trống
    if (
      e.target.closest('input') ||
      e.target.closest('select') ||
      e.target.closest('button')
    ) {
      return;
    }

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Giới hạn trong viewport
    const maxX = window.innerWidth - (sectionRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (sectionRef.current?.offsetHeight || 0);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStart]);

  return (
    <section
      ref={sectionRef}
      className="flex col"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 10 : 1,
        ...style,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag handle indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '8px',
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: '30px',
            height: '4px',
            backgroundColor: '#999',
            borderRadius: '2px',
          }}
        ></div>
      </div>

      {children}
    </section>
  );
};
