import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../../router';
import * as api from '../../../api';
import * as Const from '../../../constant';
import * as Icons from '../../../components/icons/Icons';
import * as Comps from '../../../components';

export const MissionCreate = () => {
  const navigate = useNavigate();

  /** @type {[Array<api.TGetMission_groups>, Function]} */
  const [missionGroups, setMissionGroups] = useState([]);

  /** @type {[Array<api.TPostMissions>, Function]} */
  const [formData, setFormData] = useState({});

  const handleChange = (props) => {
    setFormData((prev) => ({
      ...prev,
      ...props,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    const form = event.target;

    handleChange({
      name: form['create-mission-name']?.value,
      description: form['create-mission-description']?.value,
    });

    try {
      const { statusCode, data } = await api.postMission(formData);

      if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
        navigate(PATH.edit_mission(data.guid));
      }
    } catch (error) {
      console.log('Error post mission');
    }

    // navigate(PATH.edit_mission());
  }

  const fetchMissionGroups = async () => {
    try {
      const { statusCode, data } = await api.getMissionGroups();
      setMissionGroups(data);
    } catch (err) {
      console.error('Error fetching mission groups:', err);
    }
  };

  useEffect(() => {
    fetchMissionGroups();
  }, []);

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
                  src={Const.ImageSrc.help}
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          <button className="button" onClick={() => navigate(PATH.missions)}>
            <img
              className="plus-btn-img"
              alt="Go back"
              src={Const.ImageSrc.goBack}
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
              <Comps.SelectionDropdown
                options={missionGroups}
                placeHolderText={'Mission group'}
                onChange={(value) => handleChange({ group_id: value.guid })}
              />

              <button className="button nowrap" style={{ height: 'auto' }}>
                Create / Edit
              </button>
            </div>
          </div>

          <div className="col-3px width-50per">
            <label for="name">Site</label>
            <Comps.SelectionDropdown
              options={missionGroups}
              placeHolderText={'Site'}
              onChange={(value) => handleChange({ session_id: value.guid })}
            />
          </div>
        </div>
        <div className="row-5px">
          <button className="button flex row gap-5px" type="submit">
            <img
              className="plus-btn-img"
              alt="Save user groups"
              src="../../../images/tick.svg"
              loading="lazy"
            />
            Create mission
          </button>
          <button
            className="button flex row gap-5px outline-btn"
            onClick={() => navigate(PATH.missions)}
          >
            <Icons.GoBack iconColorClass={'fill-color-btn'} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
