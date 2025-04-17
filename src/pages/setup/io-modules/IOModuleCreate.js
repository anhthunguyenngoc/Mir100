export const IOModuleCreate = (
  <div id="edit-map-content" className="content">
    <section>
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Create I/O connection</h1>
          <div>Enter the properties of the I/O connection.</div>
        </div>

        <div className="row-5px">
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
      </div>

      <div className="col-3px">
        <label for="io-module-type">I/O module type</label>
        <select className="full-width">
          <option value="Bluetooth module">Bluetooth module</option>
        </select>
      </div>

      <div className="col-3px">
        <label for="name">I/O connection name</label>
        <input placeholder="Enter I/O connection name..." type="text" />
      </div>

      <div className="col-3px">
        <label for="name">I/O module MAC address</label>
        <input placeholder="Enter I/O module MAC address..." type="text" />
      </div>

      <div className="row-5px">
        <button className="flex row gap-5px">
          <img
            className="plus-btn-img"
            alt="Save io-module groups"
            src="../../../images/tick.svg"
            loading="lazy"
          />
          Create I/O connection
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
