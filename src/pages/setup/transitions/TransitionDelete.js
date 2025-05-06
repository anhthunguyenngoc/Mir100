export const TransitionCreate = () => {
  return (
    <div className="content">
      <section>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Delete transition</h1>
            <div className="row-5px">
              Delete the selected transition.
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
        You are about to delete the transition with the following details.
        <table className="rev-border-space" id="map-table">
          <tbody>
            <tr>
              <td className="sidebar-background-color" id="map-table-icon">
                <img
                  className="help-btn-img"
                  alt="Delete transition"
                  src="../../../images/next2.svg"
                  loading="lazy"
                />
              </td>
              <td className="text-align-left width-15per" id="transition">
                Start position
              </td>
              <td
                className="text-align-left full-width"
                id="transition-table-start"
              >
                A
              </td>
            </tr>
            <tr>
              <td className="sidebar-background-color" id="map-table-icon">
                <img
                  className="help-btn-img"
                  alt="Delete transition"
                  src="../../../images/next2.svg"
                  loading="lazy"
                />
              </td>
              <td className="text-align-left width-15per" id="transition">
                Goal position
              </td>
              <td
                className="text-align-left full-width"
                id="transition-table-goal"
              >
                B
              </td>
            </tr>
            <tr>
              <td className="sidebar-background-color" id="map-table-icon">
                <img
                  className="help-btn-img"
                  alt="Delete transition"
                  src="../../../images/next2.svg"
                  loading="lazy"
                />
              </td>
              <td className="text-align-left width-15per" id="transition">
                Mission
              </td>
              <td
                className="text-align-left full-width"
                id="transition-table-mission"
              >
                Move
              </td>
            </tr>
            <tr>
              <td className="sidebar-background-color" id="map-table-icon">
                <img
                  className="help-btn-img"
                  alt="Delete transition"
                  src="../../../images/next2.svg"
                  loading="lazy"
                />
              </td>
              <td className="text-align-left width-15per" id="transition">
                Created by
              </td>
              <td
                className="text-align-left full-width"
                id="transition-table-username"
              >
                Username
              </td>
            </tr>
          </tbody>
        </table>
        <div className="row-5px">
          <button className="del-btn">
            <img
              className="plus-btn-img"
              alt="Delete transition"
              src="../../../images/bin.svg"
              loading="lazy"
            />
            Delete transition
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
