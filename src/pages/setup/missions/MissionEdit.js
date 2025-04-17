import { useParams } from 'react-router-dom';

export const MissionEdit = () => {
  const { guid } = useParams();

  return (
    <div>
      <ul
        className="full-width flex row sidebar-background-color"
        id="mission-groups-list"
      >
        <li>
          <div
            class="flex row gap-5px nowrap pointer mission-group-btn"
            onclick="toggleHidden('${guid}-actions-list')"
          >
            <img
              class="plus-btn-img"
              alt="${name}"
              src="/Mir/images/mission-group-${index}.svg"
              loading="lazy"
            />
            name
          </div>
          <ul
            class="flex col absolute-pos action-list hidden"
            id="${guid}-actions-list"
          ></ul>
        </li>
      </ul>

      <div id="create-mission-content" className="content flex">
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Mission's name</h1>
            <div className="row-5px">
              Watch and edit the mission.
              <button className="button help-btn">
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
            <button className="button" id="go-back" onclick="goBack()">
              <img
                className="plus-btn-img"
                alt="Go back"
                src="../../../images/go-back.svg"
                loading="lazy"
              />
              Go back
            </button>
            <button className="button flex row gap-5px">
              <img
                className="plus-btn-img"
                alt="Save mission"
                src="../../../images/tick.svg"
                loading="lazy"
              />
              Save
            </button>
            <button className="button flex row gap-5px">
              <img
                className="plus-btn-img"
                alt="Save as mission"
                src="../../../images/more.svg"
                loading="lazy"
              />
              Save as
            </button>
            <button className="button del-btn" onclick="deleteMission()">
              <img
                className="plus-btn-img"
                alt="Delete mission"
                src="../../../images/x.svg"
                loading="lazy"
              />
              Delete
            </button>
          </div>
        </div>

        <div className="full-width flex row gap-15px">
          <section className="full-width">
            <ul className="full-width flex col gap-5px">
              <li className="full-width flex row subsidebar-background-color">
                <div className="padding-7px align-center">
                  <img
                    className="plus-btn-img"
                    alt="Action"
                    src="../../../images/action.svg"
                    loading="lazy"
                  />
                </div>

                <div className="full-width flex row align-center">
                  <div className="full-width align-center padding-7px">
                    Action's name
                  </div>
                  <div className="flex row align-center">
                    <button className="button radius-none">
                      <img
                        className="plus-btn-img"
                        alt="Edit mission"
                        src="../../../images/edit.svg"
                        loading="lazy"
                      />
                    </button>

                    <button
                      className="button radius-none"
                      onclick="toggleHidden('edit-action-description')"
                    >
                      <img
                        className="plus-btn-img"
                        alt="Edit action"
                        src="../../../images/setting.svg"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section id="edit-action-description" className="width-30per hidden">
            <div className="row-5px">
              <h3>Move</h3>
              <button className="button help-btn">
                <img
                  className="help-btn-img"
                  alt="Help"
                  src="../../../images/help.svg"
                  loading="lazy"
                />
              </button>
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="position">Position</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>

              <select className="full-width">
                <option value="p1">p1</option>
              </select>
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="retries">Retries (Blocked Path)</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>
              <input className="full-width" type="text" />
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="distance">Distance threshold</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>

              <input className="full-width" type="text" />
            </div>

            <button className="button full-width">Validate and close</button>

            <button className="button full-width outline-btn">
              Undo and close
            </button>

            <button className="button full-width del-btn">Remove action</button>

            <div className="row-5px">
              <h3>Prompt user</h3>
              <button className="button help-btn">
                <img
                  className="help-btn-img"
                  alt="Help"
                  src="../../../images/help.svg"
                  loading="lazy"
                />
              </button>
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="question">Question</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>
              <input className="full-width" type="text" />
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="user-group">User group</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>

              <select className="full-width">
                <option value="User">User</option>
              </select>
            </div>

            <div className="col-3px">
              <div className="row-5px">
                <label for="timeout">Timeout (seconds)</label>
                <button className="button help-btn">
                  <img
                    className="help-btn-img-7px"
                    alt="Help"
                    src="../../../images/help.svg"
                    loading="lazy"
                  />
                </button>
              </div>

              <div className="row-5px">
                <div className="flex col align-center">
                  <input type="number" />
                  <div className="full-width flex col sidebar-background-color padding-7px align-center white-text">
                    HRS
                  </div>
                </div>

                <div className="flex col align-center">
                  <input type="number" />
                  <div className="full-width flex col sidebar-background-color padding-7px align-center white-text">
                    MIN
                  </div>
                </div>

                <div className="flex col align-center">
                  <input type="number" />
                  <div className="full-width flex col sidebar-background-color padding-7px align-center white-text">
                    SEC
                  </div>
                </div>
              </div>
            </div>

            <button className="button full-width">Validate and close</button>

            <button className="button full-width outline-btn">
              Undo and close
            </button>

            <button className="button full-width del-btn">Remove action</button>
          </section>
        </div>
      </div>
    </div>
  );
};
