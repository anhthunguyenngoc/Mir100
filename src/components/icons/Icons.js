import { ImageSrc } from '../../constant/ImageSrc';
export const ClearFilter = ({ iconColorClass }) => {
  return (
    <svg
      className="plus-btn-img"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_271_514)">
        <path
          className={iconColorClass}
          d="M2.95485 4.63098C2.95485 4.63098 2.07617 5.25708 2.07617 6.75711V7.92868C2.07617 8.72433 2.39224 9.48739 2.95485 10.05L8.78328 15.8784C8.97081 16.066 9.07617 16.3203 9.07617 16.5855V22.0428C9.07617 23.5663 10.9182 24.3293 11.9955 23.252L14.1975 21.05C14.7601 20.4874 15.0762 19.7243 15.0762 18.9287V16.7571L2.95485 4.63098Z"
        />
        <path
          className={iconColorClass}
          d="M19.076 3.75708H9L17.9998 13L21.1973 10.05C21.7599 9.48736 22.076 8.7243 22.076 7.92865V6.75708C22.076 5.10023 20.7329 3.75708 19.076 3.75708Z"
        />
        <path
          className={iconColorClass}
          d="M2.94336 0.708536L23.2915 21.0568C25.0356 22.8009 23.2915 25.1264 20.966 23.3823L0.617792 3.03402C-1.12642 0.708553 1.19918 -1.03559 2.94336 0.708536Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_271_514">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GoBack = ({ iconColorClass }) => {
  return (
    <svg
      className={`plus-btn-img ${iconColorClass}`}
      height="24"
      width="24"
      viewBox="0 0 512 512"
    >
      <g stroke-width="0" />

      <g stroke-linecap="round" stroke-linejoin="round" />

      <g>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H179.499 l48.917,48.917c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 l-85.333-85.333c-1.963-1.963-3.52-4.309-4.608-6.933c-2.155-5.205-2.155-11.093,0-16.299c1.088-2.624,2.645-4.971,4.608-6.933 l85.333-85.333c8.341-8.341,21.824-8.341,30.165,0s8.341,21.824,0,30.165l-48.917,48.917H384c11.776,0,21.333,9.557,21.333,21.333 S395.776,277.333,384,277.333z" />{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
};

export const Expand = ({ width, height, color, style }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 10 7" style={style}>
      <path
        fill={color}
        d="M5.14139 5.17153L8.90118 1.41173C9.02718 1.28574 8.93794 1.07031 8.75976 1.07031H1.24017C1.06199 1.07031 0.972753 1.28574 1.09875 1.41173L4.85854 5.17153C4.93665 5.24964 5.06328 5.24964 5.14139 5.17153Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Battery = ({ percentage, isCharging }) => {
  if (isCharging)
    return (
      <img
        className="header-btn-img"
        alt="battery"
        src={ImageSrc.batteryCharging}
        loading="lazy"
      />
    );

  switch (true) {
    case percentage >= 75:
      return (
        <img
          className="header-btn-img"
          alt="battery"
          src={ImageSrc.battery100}
          loading="lazy"
        />
      );
    case percentage >= 50:
      return (
        <img
          className="header-btn-img"
          alt="battery"
          src={ImageSrc.battery75}
          loading="lazy"
        />
      );
    case percentage >= 20:
      return (
        <img
          className="header-btn-img"
          alt="battery"
          src={ImageSrc.battery50}
          loading="lazy"
        />
      );
    default:
      return (
        <img
          className="header-btn-img"
          alt="battery"
          src={ImageSrc.battery25}
          loading="lazy"
        />
      );
  }
};
