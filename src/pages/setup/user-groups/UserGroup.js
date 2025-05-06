export const UserGroup = () => {
  return (
    <div id="mission-content" className="content flex">
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>User groups</h1>
          <div className="row-5px">
            Create and edit user groups.
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
            id="create-user"
            onClick="openWindow(getURLForItemID('create-user-group'))"
          >
            <img
              className="plus-btn-img"
              alt="Create user-groups"
              src="../../../images/plus.svg"
              loading="lazy"
            />
            Create user group
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
          <div className="row-5px">
            <label for="filter">Filter:</label>
            <input
              id="filter"
              placeholder="Write name to filter by..."
              name="filter"
              type="text"
            />
            <div id="number-of-item">Num item(s) found</div>
          </div>
        </div>

        <table id="user-groups-table">
          <thead>
            <tr>
              <th className="col-1"></th>
              <th className="col-2">Name</th>
              <th className="col-3">Users</th>
              <th className="user-groups-table-created">Created by</th>
              <th className="col-n">Functions</th>
            </tr>
          </thead>
          <tbody>
            <td className="col-1">
              <svg
                className="plus-btn-img"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-color-btn"
                  d="M17.53 7.77C17.46 7.76 17.39 7.76 17.32 7.77C15.77 7.72 14.54 6.45 14.54 4.89C14.54 3.3 15.83 2 17.43 2C19.02 2 20.32 3.29 20.32 4.89C20.31 6.45 19.08 7.72 17.53 7.77Z"
                />
                <path
                  className="fill-color-btn"
                  d="M20.79 14.7C19.67 15.45 18.1 15.73 16.65 15.54C17.03 14.72 17.23 13.81 17.24 12.85C17.24 11.85 17.02 10.9 16.6 10.07C18.08 9.86998 19.65 10.15 20.78 10.9C22.36 11.94 22.36 13.65 20.79 14.7Z"
                />
                <path
                  className="fill-color-btn"
                  d="M6.44003 7.77C6.51003 7.76 6.58003 7.76 6.65003 7.77C8.20003 7.72 9.43003 6.45 9.43003 4.89C9.43003 3.29 8.14003 2 6.54003 2C4.95003 2 3.66003 3.29 3.66003 4.89C3.66003 6.45 4.89003 7.72 6.44003 7.77Z"
                />
                <path
                  className="fill-color-btn"
                  d="M6.55 12.85C6.55 13.82 6.75999 14.74 7.14 15.57C5.73 15.72 4.26 15.42 3.18 14.71C1.6 13.66 1.6 11.95 3.18 10.9C4.25 10.18 5.75999 9.88998 7.18 10.05C6.77 10.89 6.55 11.84 6.55 12.85Z"
                />
                <path
                  className="fill-color-btn"
                  d="M12.12 15.87C12.04 15.86 11.95 15.86 11.86 15.87C10.02 15.81 8.55005 14.3 8.55005 12.44C8.56005 10.54 10.09 9 12 9C13.9 9 15.44 10.54 15.44 12.44C15.43 14.3 13.97 15.81 12.12 15.87Z"
                />
                <path
                  className="fill-color-btn"
                  d="M8.87005 17.94C7.36005 18.95 7.36005 20.61 8.87005 21.61C10.59 22.76 13.41 22.76 15.13 21.61C16.64 20.6 16.64 18.94 15.13 17.94C13.42 16.79 10.6 16.79 8.87005 17.94Z"
                />
              </svg>
            </td>
            <td className="col-2" id="user-groups-table-name">
              Name
            </td>
            <td className="col-3" id="user-groups-table-users">
              0
            </td>
            <td
              className="user-groups-table-created text-align-center"
              id="user-groups-table-created"
            >
              Created by
            </td>
            <td className="col-n" id="user-groups-table-functions">
              <div className="row-5px">
                <button onClick="openWindow(getURLForItemID('set-permission'))">
                  <img
                    className="plus-btn-img"
                    alt="Create mission"
                    src="../../../images/permission.svg"
                    loading="lazy"
                  />
                </button>
                <button onClick="openWindow(getURLForItemID('edit-user-group'))">
                  <img
                    className="plus-btn-img"
                    alt="Edit mission"
                    src="../../../images/edit.svg"
                    loading="lazy"
                  />
                </button>
                <button
                  className="del-btn"
                  onClick="openWindow(getURLForItemID('delete-user-group'))"
                >
                  <img
                    className="plus-btn-img"
                    alt="Create user groups"
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
