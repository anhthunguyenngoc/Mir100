export const Analytic = () => {
  return (
    <div id="mission-content" className="content flex">
      <div className="flex col gap-5px">
        <h1>Analytics</h1>
        <div className="row-5px">
          Watch charts and statistics for the robot.
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
          <div className="full-width flex row gap-frame">
            <div className="flex col">
              <span>Start date</span>
              <input type="datetime-local" />
            </div>

            <div className="flex col">
              <span>End date</span>
              <input type="datetime-local" />
            </div>

            <div className="flex col">
              <span>Grouping</span>
              <select>
                <option value="Day">Day</option>
              </select>
            </div>
          </div>

          <div className="full-width flex row space-between">
            <div className="flex row gap-5px">
              <button>Current week</button>
              <button>Last week</button>
            </div>

            <div className="flex row gap-5px">
              <button>Current month</button>
              <button>Last month</button>
            </div>

            <div className="flex row gap-5px">
              <button>Current year</button>
              <button>Last year</button>
            </div>

            <div className="flex row gap-5px">
              <button>Latest 7 days</button>
              <button>Latest 30 days</button>
              <button>Latest 365 days</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
