import { useState } from 'react';
import { ImageSrc } from '../../constant';
import { ToolbarSelection } from '../selection';

export const BigToolButton = ({
  id,
  imgSrc,
  alt,
  showExpand = true,
  toggleMode,
  options,
  setOptions,
  onClick,
  isActive = true,
}) => {
  const [showSelection, setShowSelection] = useState(false);

  const toolBtnClick = () => {
    if (!isActive) return;

    const currentButton = document.getElementById(id);
    const isSelected = currentButton.classList.contains('selected');

    // Xóa tất cả các "selected" khác trước khi xử lý toggle
    document
      .querySelectorAll('.tool-btn')
      .forEach((btn) => btn.classList.remove('selected'));

    if (!isSelected) {
      // Nếu button chưa được chọn, thêm class 'selected'
      currentButton.classList.add('selected');
      toggleMode?.(id);
    } else {
      // Nếu button đã được chọn, bỏ chọn
      toggleMode?.(null); // Gửi giá trị null hoặc undefined nếu cần
    }

    onClick?.();
  };

  return (
    <li className="flex col full-height">
      <button
        id={id}
        className={`padding-15px tool-btn icon-btn radius-5px full-height center ${!isActive ? 'inactive' : ''}`}
        onClick={() => {
          toolBtnClick();
        }}
      >
        <img
          className="size-40px"
          alt={alt}
          src={ImageSrc[imgSrc]}
          loading="lazy"
        />
      </button>
      {showExpand && (
        <div className="flex col relative-pos expand-container">
          <button
            className={`tool-btn icon-btn radius-5px center height-fit-content full-width ${showSelection ? 'selected' : ''} ${!isActive ? 'inactive' : ''}`}
            onClick={(e) => {
              if (isActive) setShowSelection(!showSelection);
            }}
          >
            <img
              className="size-10px"
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
              toggleMode(optionId);
            }}
          />
        </div>
      )}
    </li>
  );
};
