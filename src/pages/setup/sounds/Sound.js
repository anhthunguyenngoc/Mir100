export const Sound = () => {
  return (
    <div id="mission-content" className="content flex">
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Sounds</h1>
          <div className="row-5px">
            Upload and edit sounds.
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
          <button className="flex row gap-5px outline-btn">
            <svg
              className="plus-btn-img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_271_514)">
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
          <div className="row-5px">
            <label for="filter">Filter:</label>
            <input
              id="filter"
              placeholder="Write name to filter by..."
              name="filter"
              type="text"
            />
          </div>
          <div id="number-of-item">Num item(s) found</div>
        </div>

        <table id="map-table">
          <thead>
            <tr>
              <th className="nowrap col-1"></th>
              <th className="nowrap col-2">Name</th>
              <th className="nowrap col-3">Duration</th>
              <th className="nowrap col-4">Note</th>
              <th className="nowrap col-5">Volume</th>
              <th className="nowrap col-6">Created by</th>
              <th className="nowrap col-n">Functions</th>
            </tr>
          </thead>
          <tbody>
            <td className="col-1" id="map-table-icon">
              <svg
                className="plus-btn-img fill-color-btn icon glyph"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="sound-max"
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
                    d="M18.36,19.36a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41,8,8,0,0,0,0-11.32,1,1,0,0,1,1.41-1.41,10,10,0,0,1,0,14.14A1,1,0,0,1,18.36,19.36Z"
                  />
                  <path
                    className="fill-color-btn"
                    d="M15.54,16.54a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41,4,4,0,0,0,0-5.66,1,1,0,0,1,1.41-1.41,6,6,0,0,1,0,8.48A1,1,0,0,1,15.54,16.54Z"
                  />
                  <path
                    className="fill-color-btn"
                    d="M11.38,4.08a1,1,0,0,0-1.09.21L6.59,8H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H6.59l3.7,3.71A1,1,0,0,0,11,20a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,19V5A1,1,0,0,0,11.38,4.08Z"
                  />
                </g>
              </svg>
            </td>
            <td className="col-2" id="sound-table-name">
              Name
            </td>
            <td className="col-3" id="sound-table-duration">
              Duration
            </td>
            <td className="col-4" id="sound-table-note">
              Note
            </td>
            <td className="col-5" id="sound-table-volume">
              Volume
            </td>
            <td className="col-6" id="sound-table-username">
              Username
            </td>
            <td className="col-n" id="sound-table-functions">
              <div className="row-5px">
                <button>
                  <img
                    className="plus-btn-img"
                    alt="Edit sound"
                    src="../../../images/start.svg"
                    loading="lazy"
                  />
                </button>
                <button>
                  <img
                    className="plus-btn-img"
                    alt="Delete sound"
                    src="../../../images/listen.svg"
                    loading="lazy"
                  />
                </button>
                <button onclick="openWindow('setup/sounds/edit-sound.html')">
                  <img
                    className="plus-btn-img"
                    alt="Edit sound"
                    src="../../../images/edit.svg"
                    loading="lazy"
                  />
                </button>
                <button className="del-btn" onclick="confirmDelete('sound')">
                  <img
                    className="plus-btn-img"
                    alt="Delete sound"
                    src="../../../images/x.svg"
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
