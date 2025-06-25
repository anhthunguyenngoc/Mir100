import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../../api';
import { PATH } from '../../../router';
import { useAppContext } from 'context';
import * as Const from '../../../constant';
import * as Icons from '../../../components/icons/Icons';
import * as Comp from '../../../components';

import './mission.css';

export const Mission = () => {
  const navigate = useNavigate();
  const { showDialog, robotStatus } = useAppContext();

  /** @type {[Array<api.TDetailedMissionGroup>, Function]} */
  const [missionGroups, setMissionGroups] = useState([]);

  /** @type {[Array<api.TDetailedMission>, Function]} */
  const [missions, setMissions] = useState([]);

  /** @type {[Array<api.TDetailedMissionQueue>, Function]} */
  const [missionQueues, setMissionQueues] = useState([]);

  const verticalLineProps = {
    width: '2px',
    isVisible: true,
    height: '100%',
    color: Const.Color.WHITE,
    borderRadius: '5px',
  };

  const fetchMissionGroups = async () => {
    try {
      const { statusCode, data } = await api.getMissionGroups();

      const detailedMissionGroup = await Promise.all(
        data.map(async (missionGroup) => {
          const detail = await fetchMissionGroup(missionGroup.guid);
          return {
            ...missionGroup,
            ...(detail || {}),
          };
        })
      );

      setMissionGroups(detailedMissionGroup);
    } catch (err) {
      setMissionGroups(Const.TestMissionGroup);
      console.error('Error fetching mission groups:', err);
    }
  };

  const fetchMissions = async () => {
    try {
      const { statusCode, data } = await api.getMissions();

      const detailedMission = await Promise.all(
        data.map(async (mission) => {
          const detail = await fetchMission(mission.guid);
          return {
            ...mission,
            ...(detail || {}),
          };
        })
      );

      setMissions(detailedMission);
    } catch (err) {
      setMissions(Const.TestMissions);
      console.error('Error fetching missions:', err);
    }
  };

  // useEffect

  const fetchMissionQueues = async () => {
    try {
      const { statusCode, data } = await api.getMissionQueues();

      const detailedQueues = await Promise.all(
        data
          .filter(
            (missionQueue) =>
              missionQueue.state != 'Done' &&
              missionQueue.state != 'Aborted' &&
              missionQueue.state != 'Abort'
          )
          .map(async (missionQueue) => {
            const detail = await fetchMissionQueue(missionQueue.id);
            const detailMision = await fetchMission(detail.mission_id);
            return {
              ...missionQueue,
              ...(detail || {}),
              ...(detailMision || {}),
            };
          })
      );

      // console.log(data.filter((missionQueue) => missionQueue.state != 'Done' && missionQueue.state != 'Aborted' && missionQueue.state != 'Abort'))

      setMissionQueues(detailedQueues);
    } catch (err) {
      console.error('Error fetching mission queues:', err);
    }
  };

  /**
   * @param {string} guid
   * @returns {Promise<api.TGetMission>}
   */
  const fetchMission = async (guid) => {
    try {
      const { statusCode, data } = await api.getMissionId(guid);
      return data;
    } catch (err) {
      console.error('Error fetching mission:', err);
      return null;
    }
  };

  /**
   * @param {string} id
   * @returns {Promise<api.TGetMission_queue>}
   */
  const fetchMissionQueue = async (id) => {
    try {
      const { statusCode, data } = await api.getMissionQueueId(id);
      return data;
    } catch (err) {
      console.error('Error fetching mission queue:', err);
      return null;
    }
  };

  /**
   * @param {string} guid
   * @returns {Promise<api.TGetMission_group>}
   */
  const fetchMissionGroup = async (guid) => {
    try {
      const { statusCode, data } = await api.getMissionGroupId(guid);
      return data;
    } catch (err) {
      console.error('Error fetching mission queue:', err);
      return null;
    }
  };

  useEffect(() => {
    //Test
    // setMissionQueues(Const.TestMissionQueue);

    //!!!
    fetchMissionGroups();
    fetchMissions();
    fetchMissionQueues();
  }, []);

  useEffect(() => {
    console.log(missionQueues);
  }, [missionQueues]);

  const deleteMission = (guid) => {
    console.log('Deleting mission:', guid);
    // hiện thông báo xác nhận xóa mission
    showDialog({
      title: 'Delete mission',
      content: 'You are about to delete the mission.',
      onConfirm: async () => {
        try {
          const { statusCode } = await api.deleteMission(guid);

          if (statusCode === api.STATUS_CODE.SUCCESS_DELETE) {
            // Xóa thành công => load lại danh sách mission
            console.log('Mission deleted successfully');
            fetchMissions(); // hoặc bất kỳ hàm nào bạn dùng để load lại danh sách
          } else {
            console.error('Failed to delete mission.');
          }
        } catch (error) {
          console.error('Error deleting mission:', error);
        }
      },
      onCancel: () => {
        // Không làm gì
      },
    });
  };

  const postMissionQueues = async (guid) => {
    console.log('Posting mission to queue:', guid);
    // gọi API thêm mission vào hàng đợi
    const { statusCode, data } = await api.postMissionQueue({
      mission_id: guid,
    });

    if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
      // Thêm vào hàng đợi thành công => load lại danh sách mission trong hàng đợi
      console.log('Add mission queue successfully');
      fetchMissionQueues();
    } else {
      console.error('Failed to add mission queue:', data);
    }
  };

  const deleteMissionQueue = async (id) => {
    console.log('Deleting mission queue:', id);

    const { statusCode } = await api.deleteMissionQueueId(id);

    if (statusCode === api.STATUS_CODE.SUCCESS_DELETE) {
      // Xóa khỏi hàng đợi thành công => load lại danh sách mission trong hàng đợi
      console.log('Delete mission queue successfully');
      fetchMissionQueues();
    } else {
      console.error('Failed to delete mission queue.');
    }
  };

  const getGroupNameByGuid = (groupId) => {
    const group = missionGroups.find((g) => g.guid === groupId);
    return group.name || 'undified';
  };

  return (
    <div id="mission-content" className="content flex">
      <div className="full-width flex row gap-frame">
        <section className="flex col gap-frame" id="mission-list-container">
          <div id="filter-container" className="flex space-between full-width">
            <div className="flex row gap-frame">
              <div className="row-5px">
                <select id="mission-groups-list" name="mission-groups-list">
                  {missionGroups.map((missionGroup) => (
                    <option key={missionGroup.guid} value={missionGroup.name}>
                      {missionGroup.name}
                    </option>
                  ))}
                </select>

                <button className="button">Create / Edit groups</button>
              </div>

              <div className="flex row gap-5px search-container">
                <input
                  style={{ height: 'auto' }}
                  placeholder="Write name to search by..."
                  name="search"
                  type="text"
                />
                <button className="button" onClick={() => {}}>
                  <Icons.Search width="20px" height="20px" />
                </button>
              </div>
            </div>

            <div className="flex row gap-5px">
              <button
                id="create-mission"
                className="button flex row gap-5px"
                onClick={() => {
                  navigate(PATH.create_mission);
                }}
              >
                <img
                  className="plus-btn-img"
                  alt="Create mission"
                  src={Const.ImageSrc.plus}
                  loading="lazy"
                />
                <span>Create mission</span>
              </button>
            </div>
          </div>

          <div
            className="list-div flex col full-height"
            style={{ overflowY: 'auto' }}
          >
            <div className="map-card map-card-title flex row align-center radius-5px">
              <div className="map-icon padding-h-15px">
                <div className="fill-color-btn stroke-color-btn plus-btn-img" />
              </div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div className="map-name width-70per padding-5px">
                <strong>Name</strong>
              </div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div className="map-owner width-30per padding-5px flex justify-center">
                <span style={{ width: '70px', textAlign: 'center' }}>
                  <strong>Created by</strong>
                </span>
              </div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div className="map-actions flex row padding-15px gap-5px">
                <span style={{ width: '95px', textAlign: 'center' }}>
                  <strong>Actions</strong>
                </span>
              </div>
            </div>
            {missions.map((mission) => (
              <div
                className="map-card flex row align-center radius-5px"
                key={mission.guid}
              >
                <div className="map-icon padding-h-15px">
                  <Icons.Mission
                    mainColor={Const.Color.BUTTON}
                    subColor={Const.Color.BUTTON}
                    className="plus-btn-img"
                  />
                </div>
                <Comp.VerticalLine {...verticalLineProps} />
                <div className="map-name width-70per padding-5px">
                  {mission.name}
                </div>
                <Comp.VerticalLine {...verticalLineProps} />
                <div className="map-owner width-30per padding-5px flex justify-center">
                  <span className="map-owner-label">Created by:</span>
                  <span style={{ minWidth: '70px', textAlign: 'center' }}>
                    {mission.created_by_name}
                  </span>
                </div>
                <Comp.VerticalLine {...verticalLineProps} />
                <div
                  className="map-actions flex row padding-15px gap-10px flex justify-center"
                  style={{ minWidth: '125px' }}
                >
                  <Icons.Edit
                    width="25px"
                    height="25px"
                    onClick={() => navigate(PATH.edit_mission(mission.guid))}
                  />
                  <Icons.QueueAdd
                    width="25px"
                    height="25px"
                    mainColor={Const.Color.BUTTON}
                    subColor="#93BFC2"
                    onClick={() => postMissionQueues(mission.guid)}
                  />
                  <Icons.Delete
                    width="25px"
                    height="25px"
                    color={Const.Color.ERROR}
                    onClick={() => deleteMission(mission.guid)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex col gap-frame" id="mission-queue-container">
          <div className="flex col" id="mission-list-top">
            <h2>Mission queue</h2>
          </div>

          <div>{robotStatus?.mission_text}</div>

          <ul className="flex col gap-5px" id="mission-queue-list">
            {missionQueues.length > 0 ? (
              missionQueues.map((missionQueue) => (
                <div
                  className="map-card flex row align-center radius-5px"
                  key={missionQueue.id}
                >
                  <div className="map-icon padding-h-15px">
                    <Icons.Queue
                      mainColor={Const.Color.BUTTON}
                      subColor="#93BFC2"
                      className="plus-btn-img"
                    />
                  </div>
                  <Comp.VerticalLine {...verticalLineProps} />
                  <div className="map-name width-70per padding-5px">
                    {missionQueue.name}
                  </div>
                  <Comp.VerticalLine {...verticalLineProps} />
                  <div className="map-owner width-30per padding-5px flex justify-center">
                    <span className="map-owner-label">State:</span>
                    <span style={{ minWidth: '70px', textAlign: 'center' }}>
                      {missionQueue.state}
                    </span>
                  </div>
                  <Comp.VerticalLine {...verticalLineProps} />
                  <div
                    className="map-actions flex row padding-15px gap-10px flex justify-center"
                    style={{ minWidth: '65px' }}
                  >
                    <Icons.QueueRemove
                      width="25px"
                      height="25px"
                      mainColor={Const.Color.ERROR}
                      subColor="#C7939B"
                      onClick={() => deleteMissionQueue(missionQueue.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>The queue contains no missions.</div>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};
