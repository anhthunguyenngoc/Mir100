export const MissionActionLog = () => {
  return (
    <div className="content flex">
      <div className="flex col gap-5px">
        <h1>Mission log</h1>
        <div className="row-5px">
          View the mission log.
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
          <table id="map-table">
            <thead>
              <tr>
                <th
                  className="nowrap col-1 text-align-center"
                  style="width: 5%"
                ></th>
                <th className="nowrap col-2 text-align-left" style="width: 20%">
                  Mission
                </th>
                <th
                  className="nowrap col-3 text-align-center"
                  style="width: 10%"
                >
                  State
                </th>
                <th className="nowrap col-4 text-align-left" style="width: 20%">
                  Message
                </th>
                <th
                  className="nowrap col-5 text-align-center"
                  style="width: 20%"
                >
                  Start time
                </th>
                <th
                  className="nowrap col-6 text-align-center"
                  style="width: 10%"
                >
                  Ran for
                </th>
                <th
                  className="nowrap col-7 text-align-center"
                  style="width: 10%"
                >
                  Started by
                </th>
                <th className="nowrap col-8 text-align-right" style="width: 5%">
                  Function
                </th>
              </tr>
            </thead>
            <tbody>
              <td className="col-1 text-align-center" style="width: 5%">
                <svg
                  className="plus-btn-img fill-color-btn"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <g id="Security_alert">
                      <path d="M80.9175,377.0605H202V439.16H139a9.8965,9.8965,0,1,0,0,19.7929H373a9.8965,9.8965,0,1,0,0-19.7929H310V377.0605H431.0869A49.9019,49.9019,0,0,0,480.64,332.9351H31.36A49.9094,49.9094,0,0,0,80.9175,377.0605Z" />
                      <path d="M431.0836,53.0474H80.9175A49.9174,49.9174,0,0,0,31,102.9648V313.1421H481V102.9637A49.9163,49.9163,0,0,0,431.0836,53.0474ZM171.5252,239.4111l65.0274-112.6322a22.4559,22.4559,0,0,1,38.8948,0l65.0274,112.6322a22.4558,22.4558,0,0,1-19.4473,33.6836H190.9725A22.4558,22.4558,0,0,1,171.5252,239.4111Z" />
                      <circle cx="256" cy="235.8676" r="11.25" />
                      <path d="M246.1079,166.3208v37.2305a9.8965,9.8965,0,0,0,19.793,0V166.3208a9.8965,9.8965,0,0,0-19.793,0Z" />
                    </g>
                  </g>
                </svg>
              </td>
              <td className="col-2 text-align-left" style="width: 20%">
                Mission
              </td>
              <td className="col-3 text-align-center" style="width: 10%">
                Done
              </td>
              <td className="col-4 text-align-left" style="width: 20%">
                Message
              </td>
              <td className="nowrap col-5 text-align-center" style="width: 20%">
                00:00:00
              </td>
              <td className="nowrap col-6 text-align-center" style="width: 10%">
                1:1:5
              </td>
              <td className="nowrap col-7 text-align-center" style="width: 10%">
                Distributor
              </td>
              <td className="col-8 text-align-center" style="width: 5%">
                <div className="full-width row-5px justify-right">
                  <button>
                    <img
                      className="plus-btn-img"
                      alt="View error log"
                      src="../../../images/view.svg"
                      loading="lazy"
                    />
                  </button>
                </div>
              </td>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
