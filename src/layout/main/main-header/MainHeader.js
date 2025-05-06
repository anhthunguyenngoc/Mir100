import { useState, useEffect } from 'react';
import './main-header.css';
import { ImageSrc } from '../../../constant/ImageSrc';
import * as Context from 'context';
import * as Icons from 'components/icons/Icons';

export const MainHeader = () => {
  const { robotStatus } = Context.useAppContext();

  return (
    <ul id="right-header-list">
      <li
        id="startRobot"
        className="header-button"
        onClick="toggleHidden('startRobot-section')"
      >
        <img
          className="header-btn-img"
          alt="Control"
          src={ImageSrc['start']}
          loading="lazy"
        />
        Paused
      </li>
      <li
        id="status"
        className="header-button"
        onClick="toggleHidden('status-section')"
      >
        <img
          className="header-btn-img"
          alt="Control"
          src={ImageSrc['tick']}
          loading="lazy"
        />
        All OK
      </li>
      <li
        id="loggedInUser"
        className="relative-pos header-button"
        onClick="toggleHidden('loggedInUser-section')"
      >
        <img
          className="plus-btn-img"
          alt="Change user data"
          src={ImageSrc['user']}
          loading="lazy"
        />
        <span className="nowrap">Distributor</span>
        <section className="header-section hidden" id="loggedInUser-section">
          <svg
            className="img-35px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-color-btn"
              d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
            ></path>
            <path
              className="fill-color-btn"
              d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
            ></path>
          </svg>

          <h3>Distributor</h3>

          <button>
            <img
              className="plus-btn-img"
              alt="Change user data"
              src={ImageSrc['user']}
              loading="lazy"
            />
            <span className="nowrap">Change user data</span>
          </button>

          <button className="del-btn">
            <img
              className="plus-btn-img"
              alt="Log out"
              src={ImageSrc['signout']}
              loading="lazy"
            />
            Log out
          </button>
        </section>
      </li>
      <li
        id="control"
        className="relative-pos header-button"
        onClick="toggleHidden('control-section')"
      >
        <img
          className="header-btn-img"
          alt="Control"
          src={ImageSrc['control']}
          loading="lazy"
        />
        <section className="header-section hidden" id="control-section">
          <svg
            width="150"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#DEF2F1"></circle>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4C7.58104 4 4 7.58328 4 11.9995C4 16.4177 7.58204 20 12 20C16.418 20 20 16.4167 20 11.9995C20 7.58328 16.418 4 12 4ZM7.5 13C7.257 13.1886 7.24394 13.1886 7 13L6.18155 12.3132C5.93948 12.1228 5.93948 11.8146 6.18155 11.6251L7 11C7.24394 10.8096 7.257 10.8096 7.5 11V13ZM11 7L11.6558 6.15027C11.8466 5.90724 12.1542 5.90724 12.3432 6.15027L13 7C13.1927 7.24396 13.1927 7.25792 13 7.5H11C10.8101 7.25792 10.811 7.24396 11 7ZM13 17L12.3444 17.768C12.1514 18.0107 11.8442 18.0107 11.655 17.768L11 17C10.8098 16.7574 10.8098 16.6459 11 16.4023H13C13.1911 16.645 13.1911 16.7574 13 17ZM17 13C16.7577 13.1901 16.7442 13.1901 16.5 13V11C16.7442 10.8099 16.7577 10.8099 17 11L17.8169 11.6242C18.061 11.8153 18.061 12.1235 17.8169 12.3127L17 13Z"
              fill="#00474F"
            ></path>
          </svg>
        </section>
      </li>
      <li id="battery" className="header-button">
        <Icons.Battery
          percentage={robotStatus?.battery_percentage}
          isCharging={false}
        />
        {Math.round(robotStatus?.battery_percentage)}%
      </li>
    </ul>
  );
};
