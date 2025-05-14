import { ImageSrc } from '../../constant';

export const ImageButton = ({
  className,
  imageId,
  imageClass,
  onClick,
  style,
}) => {
  return (
    <button className={className} style={style} onClick={onClick}>
      <img className="size-20px" src={ImageSrc[imageId]} loading="lazy" />
    </button>
  );
};
