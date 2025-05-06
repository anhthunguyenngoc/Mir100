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
      <img className={imageClass} src={ImageSrc[imageId]} loading="lazy" />
    </button>
  );
};
