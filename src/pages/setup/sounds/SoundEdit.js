export const SoundEdit = () => {
  return (
    <div className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Edit sound</h1>
            <div className="row-5px">
              Edit data of an existing sound.
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
          <label for="name">Name</label>
          <input
            id="create-sound-name"
            name="create-sound-name"
            placeholder="Enter the sound's name..."
            type="text"
          />
        </div>

        <div className="full-width flex row gap-frame">
          <div className="col-3px width-50per">
            <label for="volume">Volume (0 - 100)</label>
            <input
              id="create-sound-volume"
              name="create-sound-volume"
              placeholder="Enter volume..."
              type="number"
            />
          </div>

          <div className="col-3px width-50per">
            <label for="note">Note</label>
            <input
              id="create-sound-note"
              name="create-sound-note"
              placeholder="Enter a note about the sound..."
              type="text"
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
            Save changes
          </button>
          <button className="outline-btn">
            <svg
              className="plus-btn-img"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-color-btn"
                d="M3 11.9751V7.8147C3 2.6329 6.66214 0.51534 11.1464 3.10624L14.7587 5.19889L18.371 7.29154C22.8553 9.88244 22.8553 14.1176 18.371 16.7085L14.7587 18.8011L11.1464 20.8938C6.66214 23.4847 3 21.3671 3 16.1853V11.9751Z"
              />
            </svg>
            Play on robot
          </button>
          <button className="outline-btn">
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
                  d="M13.1807 11.8606C12.7807 11.8606 12.4207 11.6406 12.2507 11.2806L10.8007 8.39058L10.3807 9.17058C10.1507 9.60058 9.6907 9.87058 9.2007 9.87058H8.4707C8.0607 9.87058 7.7207 9.53058 7.7207 9.12058C7.7207 8.71058 8.0607 8.37058 8.4707 8.37058H9.1107L9.9007 6.91058C10.0907 6.57058 10.4707 6.34058 10.8307 6.36058C11.2207 6.36058 11.5707 6.59058 11.7507 6.93058L13.1807 9.79058L13.5207 9.10058C13.7507 8.64058 14.2007 8.36058 14.7207 8.36058H15.5307C15.9407 8.36058 16.2807 8.70058 16.2807 9.11058C16.2807 9.52058 15.9407 9.86058 15.5307 9.86058H14.8207L14.1107 11.2706C13.9307 11.6406 13.5807 11.8606 13.1807 11.8606Z"
                />
                <path
                  className="fill-color-btn"
                  d="M2.74982 18.6508C2.33982 18.6508 1.99982 18.3108 1.99982 17.9008V12.2008C1.94982 9.49078 2.95982 6.93078 4.83982 5.01078C6.71982 3.10078 9.23982 2.05078 11.9498 2.05078C17.4898 2.05078 21.9998 6.56078 21.9998 12.1008V17.8008C21.9998 18.2108 21.6598 18.5508 21.2498 18.5508C20.8398 18.5508 20.4998 18.2108 20.4998 17.8008V12.1008C20.4998 7.39078 16.6698 3.55078 11.9498 3.55078C9.63982 3.55078 7.49982 4.44078 5.90982 6.06078C4.30982 7.69078 3.45982 9.86078 3.49982 12.1808V17.8908C3.49982 18.3108 3.16982 18.6508 2.74982 18.6508Z"
                />
                <path
                  className="fill-color-btn"
                  d="M5.94 12.4492H5.81C3.71 12.4492 2 14.1592 2 16.2592V18.1392C2 20.2392 3.71 21.9492 5.81 21.9492H5.94C8.04 21.9492 9.75 20.2392 9.75 18.1392V16.2592C9.75 14.1592 8.04 12.4492 5.94 12.4492Z"
                />
                <path
                  className="fill-color-btn"
                  d="M18.19 12.4492H18.06C15.96 12.4492 14.25 14.1592 14.25 16.2592V18.1392C14.25 20.2392 15.96 21.9492 18.06 21.9492H18.19C20.29 21.9492 22 20.2392 22 18.1392V16.2592C22 14.1592 20.29 12.4492 18.19 12.4492Z"
                />
              </g>
            </svg>
            Listen
          </button>
          <button className="del-btn" onclick="confirmDelete('sound')">
            <img
              className="plus-btn-img"
              alt="Delete sound"
              src="../../../images/bin.svg"
              loading="lazy"
            />
            Delete
          </button>
          <button
            className="flex row gap-5px outline-btn"
            onclick="openWindow('setup/sounds/sound.html')"
          >
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
