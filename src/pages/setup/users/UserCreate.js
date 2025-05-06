export const UserCreate = () => {
  return (
    <div className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Create user</h1>
            <div className="row-5px">
              Create a new user.
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
        </div>

        <div className="col-3px">
          <label for="name">Name</label>
          <input placeholder="Enter name..." type="text" />
        </div>

        <div className="full-width flex row gap-frame">
          <div className="col-3px width-50per">
            <label for="username">Username</label>
            <input placeholder="Enter username..." type="text" />
          </div>

          <div className="col-3px width-50per">
            <label for="password">Password</label>
            <input placeholder="Enter password..." type="password" />
          </div>
        </div>

        <div className="full-width flex row gap-frame">
          <div className="col-3px width-50per">
            <label for="email-adress">Email adress</label>
            <input placeholder="Enter email adress..." type="text" />
          </div>

          <div className="col-3px width-50per">
            <label for="user-group">User group</label>
            <select className="full-width">
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="full-width row-5px justify-left">
          <input className="plus-btn-img pointer" type="checkbox" />
          <div>This is a SingleDashboard user</div>
        </div>

        <div className="full-width row-5px justify-left">
          <input
            className="plus-btn-img pointer"
            type="checkbox"
            onClick="toggleHidden('create-pincode')"
          />
          <div>Allow this user to log in by PIN code</div>
        </div>

        <div id="create-pincode" className="col-3px hidden">
          <label for="pincode">PIN code</label>
          <div className="flex row gap-2per">
            <input
              className="full-height code padding-15px"
              id="code-01"
              name="code-01"
              type="password"
            />
            <input
              className="full-height code padding-15px"
              id="code-02"
              name="code-02"
              type="password"
            />
            <input
              className="full-height code padding-15px"
              id="code-03"
              name="code-03"
              type="password"
            />
            <input
              className="full-height code padding-15px"
              id="code-04"
              name="code-04"
              type="password"
            />
          </div>
        </div>
        <div className="row-5px">
          <button className="flex row gap-5px">
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
            />
            Create user
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
