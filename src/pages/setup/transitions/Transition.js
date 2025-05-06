export const Transition = () => {
  return (
    <div id="mission-content" className="content flex">
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Transition</h1>
          <div className="row-5px">
            Create and edit transitions.
            <button className="help-btn">
              <img
                className="help-btn-img"
                alt="Help"
                src="../../../images/help.svg"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        <div className="row-5px">
          <button
            id="create-transition"
            className="flex row gap-5px"
            onClick="openWindow('setup/transitions/create-transition.html')"
          >
            <img
              className="plus-btn-img"
              alt="Create transition"
              src="../../../images/plus.svg"
              loading="lazy"
            />
            Create transition
          </button>
          <button className="flex row gap-5px outline-btn">
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
                  className="fill-color-btn"
                  d="M2.95485 4.63098C2.95485 4.63098 2.07617 5.25708 2.07617 6.75711V7.92868C2.07617 8.72433 2.39224 9.48739 2.95485 10.05L8.78328 15.8784C8.97081 16.066 9.07617 16.3203 9.07617 16.5855V22.0428C9.07617 23.5663 10.9182 24.3293 11.9955 23.252L14.1975 21.05C14.7601 20.4874 15.0762 19.7243 15.0762 18.9287V16.7571L2.95485 4.63098Z"
                />
                <path
                  className="fill-color-btn"
                  d="M19.076 3.75708H9L17.9998 13L21.1973 10.05C21.7599 9.48736 22.076 8.7243 22.076 7.92865V6.75708C22.076 5.10023 20.7329 3.75708 19.076 3.75708Z"
                />
                <path
                  className="fill-color-btn"
                  d="M2.94336 0.708536L23.2915 21.0568C25.0356 22.8009 23.2915 25.1264 20.966 23.3823L0.617792 3.03402C-1.12642 0.708553 1.19918 -1.03559 2.94336 0.708536Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_271_514">
                  <rect width="24" height="24" />
                </clipPath>
              </defs>
            </svg>
            Clear filters
          </button>
        </div>
      </div>

      <section>
        <div id="filter-container">
          <div id="number-of-item">Num item(s) found</div>
        </div>

        <table id="map-table">
          <thead>
            <tr>
              <th className="nowrap col-1"></th>
              <th className="nowrap col-2">Start</th>
              <th className="nowrap col-3">Goal</th>
              <th className="nowrap col-4">Mission</th>
              <th className="nowrap col-5">Created by</th>
              <th className="nowrap col-n">Functions</th>
            </tr>
          </thead>
          <tbody>
            <td className="col-1" id="map-table-icon">
              <svg
                className="plus-btn-img stroke-color-btn"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    className="fill-color-btn"
                    d="M8.88003 4.59875C8.08003 1.13875 2.87002 1.12875 2.07002 4.59875C1.60002 6.62875 2.89003 8.34875 4.01003 9.41875C4.83003 10.1888 6.12003 10.1888 6.94003 9.41875C8.06003 8.34875 9.34003 6.62875 8.88003 4.59875ZM5.51003 6.19875C4.96003 6.19875 4.51003 5.74875 4.51003 5.19875C4.51003 4.64875 4.95003 4.19875 5.50003 4.19875H5.51003C6.07003 4.19875 6.51003 4.64875 6.51003 5.19875C6.51003 5.74875 6.07003 6.19875 5.51003 6.19875Z"
                  />
                  <path
                    className="fill-color-btn"
                    d="M21.91 16.5988C21.11 13.1388 15.88 13.1288 15.07 16.5988C14.6 18.6288 15.89 20.3488 17.02 21.4188C17.84 22.1888 19.14 22.1888 19.96 21.4188C21.09 20.3488 22.38 18.6288 21.91 16.5988ZM18.53 18.1988C17.98 18.1988 17.53 17.7488 17.53 17.1988C17.53 16.6488 17.97 16.1988 18.52 16.1988H18.53C19.08 16.1988 19.53 16.6488 19.53 17.1988C19.53 17.7488 19.08 18.1988 18.53 18.1988Z"
                  />
                  <path
                    className="fill-color-btn"
                    d="M11.9995 19.75H9.31945C8.15945 19.75 7.14945 19.05 6.74945 17.97C6.33945 16.89 6.63945 15.7 7.50945 14.93L15.4995 7.94C15.9795 7.52 15.9895 6.95 15.8495 6.56C15.6995 6.17 15.3195 5.75 14.6795 5.75H11.9995C11.5895 5.75 11.2495 5.41 11.2495 5C11.2495 4.59 11.5895 4.25 11.9995 4.25H14.6795C15.8395 4.25 16.8495 4.95 17.2495 6.03C17.6595 7.11 17.3595 8.3 16.4895 9.07L8.49945 16.06C8.01945 16.48 8.00945 17.05 8.14945 17.44C8.29945 17.83 8.67945 18.25 9.31945 18.25H11.9995C12.4095 18.25 12.7495 18.59 12.7495 19C12.7495 19.41 12.4095 19.75 11.9995 19.75Z"
                  />
                </g>
              </svg>
            </td>
            <td className="col-2" id="transition">
              A
            </td>
            <td className="col-3" id="transition-table-goal">
              B
            </td>
            <td className="col-4" id="transition-table-mission">
              Move
            </td>
            <td className="col-5" id="transition-table-username">
              Username
            </td>
            <td className="col-n" id="transition-table-functions">
              <div className="row-5px">
                <button
                  id="edit-transition"
                  onClick="openWindow('setup/transitions/edit-transition.html')"
                >
                  <img
                    className="plus-btn-img"
                    alt="Edit transition"
                    src="../../../images/edit.svg"
                    loading="lazy"
                  />
                </button>
                <button
                  className="del-btn"
                  onClick="openWindow('setup/transitions/delete-transition.html')"
                >
                  <img
                    className="plus-btn-img"
                    alt="Delete transition"
                    src="../../../images/bin.svg"
                    loading="lazy"
                  />
                </button>
              </div>
            </td>
          </tbody>
        </table>
      </section>
    </div>
  );
};
