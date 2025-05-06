import { useState } from 'react';
import { ImageSrc } from '../../constant';
import { ToolbarSelection } from '../selection';
import * as Context from '../../context';

export const SmallToolButton = ({
  id,
  imageSrc,
  alt,
  showExpand = true,
  toggleMode,
  options,
  setOptions,
  onClick,
  isActive = true,
}) => {
  const { drawingMode } = Context.useCanvasContext();
  const [showSelection, setShowSelection] = useState(false);

  return (
    <li className="flex row">
      <button
        id={id}
        className={`tool-btn icon-btn radius-5px center height-fit-content ${!isActive ? 'inactive' : ''} ${drawingMode === id ? 'selected' : ''}`}
        onClick={() => {
          if (drawingMode !== id) {
            if (isActive && id) toggleMode?.(id);
          } else {
            toggleMode?.(null);
          }
          onClick?.();
        }}
      >
        <img
          className="size-20px"
          alt={alt}
          src={ImageSrc[imageSrc]}
          loading="lazy"
        />
      </button>
      {showExpand && (
        <div className="flex col relative-pos expand-container">
          <button
            className={`tool-btn icon-btn radius-5px center full-height padding-4px ${showSelection ? 'selected' : ''} ${!isActive ? 'inactive' : ''}`}
            onClick={(e) => {
              if (isActive) {
                setShowSelection(!showSelection);
              }
            }}
          >
            <img
              className="size-7px"
              alt="Expand"
              src={ImageSrc['expand']}
              loading="lazy"
              style={{ transform: showSelection ? 'scaleY(-1)' : 'none' }}
            />
          </button>
          <ToolbarSelection
            options={options}
            setOptions={setOptions}
            showSelection={showSelection}
            setShowSelection={setShowSelection}
            toolOptionClick={(optionId) => {
              // Xóa tất cả các "selected" khác trước khi xử lý toggle
              document
                .querySelectorAll('.tool-btn')
                .forEach((btn) => btn.classList.remove('selected'));
              document.getElementById(id).classList.add('selected');
              if (isActive) {
                toggleMode?.(optionId);
              }
            }}
          />
        </div>
      )}
    </li>
  );
};
