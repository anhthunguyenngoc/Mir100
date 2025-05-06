export const UserGroupEdit = () => {
  return (
    <div className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Edit user groups</h1>
            <div className="row-5px">
              Edit an existing user group.
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

          <button id="go-back" onClick="goBack()">
            <img
              className="plus-btn-img"
              alt="Go back"
              src="../../../images/go-back.svg"
              loading="lazy"
            />
            Go back
          </button>
        </div>

        <div className="col-3px">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" />
        </div>

        <div className="row-5px">
          <button>
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
            />
            Save changes
          </button>
          <button onClick="openWindow('setup/user-groups/set-permission.html')">
            <img
              className="plus-btn-img"
              alt="Create mission"
              src="../../../images/permission.svg"
              loading="lazy"
            />
            Set permissions
          </button>
          <button
            className="del-btn"
            onClick="openWindow('setup/user-groups/delete-user-group.html')"
          >
            <img
              className="plus-btn-img"
              alt="Delete user groups"
              src="../../../images/bin.svg"
              loading="lazy"
            />
            Delete
          </button>
          <button className="flex row gap-5px outline-btn" onClick="goBack()">
            <svg
              className="plus-btn-img fill-color-btn stroke-color-btn"
              viewBox="0 0 1024 1024"
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
                  d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                />
              </g>
            </svg>
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};
