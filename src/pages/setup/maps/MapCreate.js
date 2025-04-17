export const MapCreate = () => {
  return (
    <div id="edit-map-content" className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Create map</h1>
            <div className="row-5px">
              Create a new map.
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

          <button id="go-back" onclick="goBack()">
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

        <div className="col-3px width-50per">
          <label for="name">Sites</label>
          <div className="full-width row-5px">
            <select
              className="full-width"
              id="mission-list-selection"
              name="mission-list-selection"
            >
              <option value="Back and forth">Back and forth</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

            <button className="nowrap">Create / Edit</button>
          </div>
        </div>
        <div className="row-5px">
          <button className="flex row gap-5px" onclick="editMapClick()">
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
            />
            Create map
          </button>
          <button className="flex row gap-5px outline-btn" onclick="goBack()">
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
