import { useState } from 'react';
import { ImageSrc } from '../../constant';
import { ToolbarSelection } from '../selection';

export const SmallToolButton = ({
  id,
  imageSrc,
  alt,
  showExpand = true,
  toggleMode,
  options,
  setOptions,
  onClick,
}) => {
  const [showSelection, setShowSelection] = useState(false);

  const toolBtnClick = () => {
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
  };

  return (
    <li className="flex row">
      <button
        id={id}
        className="tool-btn icon-btn radius-5px center height-fit-content"
        onClick={() => {
          toolBtnClick();
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
            className={`tool-btn icon-btn radius-5px center full-height padding-4px ${showSelection ? 'selected' : ''}`}
            onClick={(e) => {
              setShowSelection(!showSelection);
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
              toggleMode(optionId);
            }}
          />
        </div>
      )}
    </li>
  );
};
