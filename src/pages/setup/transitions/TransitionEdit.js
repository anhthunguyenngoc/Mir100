export const TransitionEdit = () => {
  return (
    <div className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Edit transition</h1>
            <div className="row-5px">
              Edit an existing transition.
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
          <label for="site">Site</label>
          <select className="full-width">
            <option value="Site">Site</option>
          </select>
        </div>

        <div className="full-width flex row gap-frame">
          <div className="col-3px width-50per">
            <label for="volume">Start position</label>
            <select className="full-width">
              <option value="A">A</option>
            </select>
          </div>

          <div className="col-3px width-50per">
            <label for="note">Goal position</label>
            <select className="full-width">
              <option value="B">B</option>
            </select>
          </div>
        </div>

        <div className="col-3px">
          <label for="site">Mission</label>
          <select className="full-width">
            <option value="Move">Move</option>
          </select>
        </div>

        <div className="row-5px">
          <button className="flex row gap-5px">
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
            />
            Save changes
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
