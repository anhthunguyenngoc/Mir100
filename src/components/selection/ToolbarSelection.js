import OutsideClickHandler from 'react-outside-click-handler';
import './toolbar-selection.css';
import { VerticalLine } from '../VerticalLine';
import { ImageSrc } from '../../constant';

const verticalLine = {
  width: '2px',
  color: 'white',
  borderRadius: '2px',
};

export const ToolbarSelection = ({
  options,
  setOptions,
  showSelection,
  setShowSelection,
  toolOptionClick,
}) => {
  if (!Array.isArray(options)) return null;

  const toolBtnClick = (id) => {
    setShowSelection(false);

    const updatedOptions = options.map((option) => ({
      ...option,
      isActive: option.id === id, // Đánh dấu option được chọn là active
    }));

    setOptions(updatedOptions);
  };

  return showSelection ? (
    <OutsideClickHandler onOutsideClick={() => setShowSelection(false)}>
      <ul className="flex col toolbar-selection">
        {options.map((option) => {
          return (
            <li
              key={option.id}
              className={`flex row gap-10px align-center toolbar-option ${option.isActive ? 'selected' : ''}`}
              onClick={() => {
                toolBtnClick(option.id);
                toolOptionClick(option.id);
              }}
            >
              <VerticalLine
                {...verticalLine}
                height="15px"
                isVisible={option.isActive}
              />
              <img
                className="size-15px"
                alt={option.name}
                src={ImageSrc[option.imgSrc]}
                loading="lazy"
              />
              <span>{option.name}</span>
              <span style={{ marginLeft: 'auto' }}>{option.shortcut}</span>
            </li>
          );
        })}
      </ul>
    </OutsideClickHandler>
  ) : null;
};
