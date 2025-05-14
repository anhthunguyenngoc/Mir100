import { useState, useRef, useEffect } from 'react';
import * as Const from '../constant';

// Component Tooltip chính với hiệu ứng nhảy lên khi xuất hiện
export const PositionTooltip = ({
  children,
  hoverContent,
  clickContent,
  position = 'top',
  style = {},
  tooltipPosition,
  isHoverVisible,
  isClickVisible,
  setIsClickVisible,
}) => {
  // Xác định tooltip nào nên hiển thị
  const shouldShowHover = isHoverVisible && !isClickVisible && hoverContent;
  const shouldShowClick = isClickVisible && clickContent;

  // Styles cho các vị trí khác nhau
  const positions = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px',
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '8px',
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: '8px',
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: '8px',
    },
  };

  // Styles cho mũi tên
  const arrowPositions = {
    top: {
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderTop: `6px solid ${Const.Color.SELECTED_BUTTON}`,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
    },
    bottom: {
      top: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderBottom: `6px solid ${Const.Color.SELECTED_BUTTON}`,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
    },
    left: {
      right: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      borderRight: `6px solid ${Const.Color.SELECTED_BUTTON}`,
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
    },
    right: {
      left: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      borderLeft: `6px solid ${Const.Color.SELECTED_BUTTON}`,
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
    },
  };

  // Tạo các style animation tùy theo vị trí
  const getAnimationStyle = (pos) => {
    const animations = {
      top: {
        opacity: 0,
        animation: 'tooltip-bounce-up 0.3s ease-out forwards',
      },
      bottom: {
        opacity: 0,
        animation: 'tooltip-bounce-down 0.3s ease-out forwards',
      },
      left: {
        opacity: 0,
        animation: 'tooltip-bounce-right 0.3s ease-out forwards',
      },
      right: {
        opacity: 0,
        animation: 'tooltip-bounce-left 0.3s ease-out forwards',
      },
    };
    return animations[pos];
  };

  // Thêm các animation keyframes vào document nếu chưa có
  useEffect(() => {
    const styleId = 'tooltip-animation-styles';

    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement('style');
      styleSheet.id = styleId;
      styleSheet.textContent = `
        @keyframes tooltip-bounce-down {
          0% { opacity: 0; transform: translate(-50%, -10px); }
          70% { transform: translate(-50%, 0px); }
          100% { opacity: 1; transform: translate(-50%, -2px); }
        }
        @keyframes tooltip-bounce-up {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          70% { transform: translate(-50%, 0px); }
          100% { opacity: 1; transform: translate(-50%, 2px); }
        }
        @keyframes tooltip-bounce-right {
          0% { opacity: 0; transform: translate(10px, -50%); }
          70% { transform: translate(0px, -50%); }
          100% { opacity: 1; transform: translate(2px, -50%); }
        }
        @keyframes tooltip-bounce-left {
          0% { opacity: 0; transform: translate(-10px, -50%); }
          70% { transform: translate(0px, -50%); }
          100% { opacity: 1; transform: translate(-2px, -50%); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        display: 'inline-block',
        left: tooltipPosition.x,
        top: tooltipPosition.y,
      }}
      onMouseLeave={() => setIsClickVisible(false)}
    >
      {children}

      {/* Tooltip khi hover */}
      {shouldShowHover && (
        <div
          style={{
            position: 'absolute',
            zIndex: 4,
            backgroundColor: Const.Color.WHITE,
            color: 'white',
            borderRadius: '4px',
            minWidth: 'max-content',
            maxWidth: '20rem',
            ...positions[position],
            ...getAnimationStyle(position),
            ...style,
          }}
        >
          {hoverContent}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderWidth: '6px',
              ...arrowPositions[position],
            }}
          />
        </div>
      )}

      {/* Tooltip khi click */}
      {shouldShowClick && (
        <div
          style={{
            position: 'absolute',
            zIndex: 4,
            backgroundColor: Const.Color.WHITE,
            color: 'white',
            borderRadius: '4px',
            minWidth: 'max-content',
            maxWidth: '20rem',
            ...positions[position],
            ...getAnimationStyle(position),
            ...style,
          }}
        >
          {clickContent}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderWidth: '6px',
              ...arrowPositions[position],
            }}
          />
        </div>
      )}
    </div>
  );
};
