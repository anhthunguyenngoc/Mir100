export const SystemLog = () => {
  return (
    <div id="mission-content" className="content flex">
      <div className="flex col gap-5px">
        <h1>System log</h1>
        <div className="row-5px">
          Read the system log from the robot.
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

      <div className="full-width flex row gap-frame">
        <section className="full-width flex col gap-frame">
          <table id="map-table">
            <thead>
              <tr>
                <th
                  className="nowrap col-1 text-align-center"
                  style={{ width: '5%' }}
                >
                  State
                </th>
                <th
                  className="nowrap col-2 text-align-left"
                  style={{ width: '30%' }}
                >
                  Module
                </th>
                <th
                  className="nowrap col-3 text-align-left"
                  style={{ width: '60%' }}
                >
                  Message
                </th>
                <th className="nowrap col-4" style={{ width: '5%' }}>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              <td className="col-1 text-align-center" style={{ width: '5%' }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1222_5208)">
                    <path
                      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                      className="fill-color-btn"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1222_5208">
                      <rect width="24" height="24" className="fill-color-btn" />
                    </clipPath>
                  </defs>
                </svg>
              </td>
              <td className="col-2 text-align-left" style={{ width: '30%' }}>
                Module
              </td>
              <td className="col-3 text-align-left" style={{ width: '60%' }}>
                Message
              </td>
              <td className="col-4" style={{ width: '5%' }}>
                00:00:00
              </td>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
