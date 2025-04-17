export const User = () => {
  return (
    <div className="content">
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Users</h1>
          <div className="row-5px">
            Create and edit users.
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
            onclick="openWindow(getURLForItemID('create-user'))"
          >
            <img
              className="plus-btn-img"
              alt="Create user"
              src="../../../images/plus.svg"
              loading="lazy"
            />
            Create user
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
          <div className="row-5px">
            <label for="user-groups-select">Groups:</label>
            <select id="user-groups-select" name="user-groups-select">
              <option value="Show all">Show all</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div id="number-of-item">Num item(s) found</div>
        </div>

        <table id="user-table">
          <thead>
            <tr>
              <th className="col-1"></th>
              <th className="col-2">Name</th>
              <th className="col-3">Username</th>
              <th className="col-4">Email</th>
              <th className="col-n">Functions</th>
            </tr>
          </thead>
          <tbody>
            <td className="col-1" id="user-table-icon">
              <svg
                className="plus-btn-img"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-color-btn"
                  d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                />
                <path
                  className="fill-color-btn"
                  d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
                />
              </svg>
            </td>
            <td className="col-2" id="user-table-name">
              Name
            </td>
            <td className="col-3" id="user-table-username">
              Username
            </td>
            <td className="col-4" id="user-table-email">
              Email
            </td>
            <td className="col-n" id="user-table-functions">
              <div className="row-5px">
                <button
                  id="edit-user"
                  onclick="openWindow(getURLForItemID('edit-user'))"
                >
                  <img
                    className="plus-btn-img"
                    alt="Edit mission"
                    src="../../../images/edit.svg"
                    loading="lazy"
                  />
                </button>
                <button
                  className="del-btn"
                  onclick="openWindow(getURLForItemID('delete-user'))"
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
