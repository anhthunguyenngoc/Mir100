export const Map = () => {
  return (
    <div id="map-content" className="content">
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Maps</h1>
          <div className="row-5px">
            Create and edit maps.
            <button className="help-btn">
              <img
                className="help-btn-img"
                alt="Help"
                src="../../images/help.svg"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        <div className="row-5px">
          <button
            id="create-map"
            className="flex row gap-5px"
            onclick="createMapClick()"
          >
            <img
              className="plus-btn-img"
              alt="Create map"
              src="../../images/plus.svg"
              loading="lazy"
            />
            Create map
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
              <th className="col-1"></th>
              <th className="col-2">Name</th>
              <th className="col-3">Created by</th>
              <th className="col-n">Functions</th>
            </tr>
          </thead>
          <tbody id="list-map">
            <td className="col-1" id="map-table-icon">
              <svg
                className="fill-color-btn stroke-color-btn plus-btn-img"
                width="64px"
                height="64px"
                viewBox="0 -32 576 576"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z" />
                </g>
              </svg>
            </td>
            <td className="col-2" id="map-table-name">
              Name
            </td>
            <td className="col-3" id="map-table-mapname">
              Username
            </td>
            <td className="col-n" id="map-table-functions">
              <div className="row-5px">
                <button id="edit-map">
                  <img
                    className="plus-btn-img"
                    alt="Edit mission"
                    src="../../images/edit.svg"
                    loading="lazy"
                  />
                </button>
                <button className="del-btn" id="del-map">
                  <img
                    className="plus-btn-img"
                    alt="Create map groups"
                    src="../../images/x.svg"
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
