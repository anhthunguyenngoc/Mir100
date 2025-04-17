import { ImageSrc } from '../../constant';

export const ImageButton = ({ className, imageId, imageClass, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <img className={imageClass} src={ImageSrc[imageId]} loading="lazy" />
    </button>
  );
};
