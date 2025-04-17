import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../router';
import * as api from '../../../api';

export const MissionCreate = () => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    const form = event.target;

    const name = form['create-mission-name'].value;
    const description = form['create-mission-description'].value;
    const group_id = form['mission-groups-list'].key;
    const session_id = form['site'].key;

    const { statusCode, data } = await api.postMission({
      group_id: group_id,
      name: name,
      description: description,
      session_id: session_id,
    });

    if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
      navigate(PATH.edit_mission(data.guid));
    } else {
      console.log('Error post mission');
    }
  }

  return (
    <div id="create-mission-content" className="content flex">
      <form className="flex col gap-frame" onSubmit={handleSubmit}>
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>Create mission</h1>
            <div className="row-5px">
              Create a new mision.
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

          <button className="button" onclick="goBack()">
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
          <input
            name="create-mission-name"
            placeholder="Enter the mission's name..."
            type="text"
          />
        </div>

        <div className="col-3px">
          <label for="description">Description</label>
          <input
            name="create-mission-description"
            placeholder="Enter the mission's description..."
            type="text"
          />
        </div>

        <div className="full-width flex row gap-frame">
          <div className="col-3px width-50per">
            <label for="name">Mission group</label>
            <div className="flex row gap-5px">
              <select
                className="full-width"
                name="mission-groups-list"
              ></select>

              <button className="button nowrap" style={{ height: 'auto' }}>
                Create / Edit
              </button>
            </div>
          </div>

          <div className="col-3px width-50per">
            <label for="name">Site</label>
            <select className="full-width" name="site">
              <option value="Back and forth">Back and forth</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
        <div className="row-5px">
          <button className="button flex row gap-5px" onclick="postMission()">
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
              type="submit"
            />
            Create mission
          </button>
          <button
            className="button flex row gap-5px outline-btn"
            onclick="goBack()"
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
      </form>
    </div>
  );
};
