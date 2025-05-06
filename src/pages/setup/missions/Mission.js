import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../../api';
import { PATH } from '../../../router';
import { useAppContext } from 'context';
import * as Const from '../../../constant';

import './mission.css';

export const Mission = () => {
  const navigate = useNavigate();
  const { showDialog } = useAppContext();

  /** @type {[Array<api.TDetailedMissionGroup>, Function]} */
  const [missionGroups, setMissionGroups] = useState([]);

  /** @type {[Array<api.TDetailedMission>, Function]} */
  const [missions, setMissions] = useState([]);

  /** @type {[Array<api.TDetailedMissionQueue>, Function]} */
  const [missionQueues, setMissionQueues] = useState([]);

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
      console.error('Error fetching missions:', err);
    }
  };

  const fetchMissionQueues = async () => {
    try {
      const { statusCode, data } = await api.getMissionQueues();

      const detailedQueues = await Promise.all(
        data
          .filter((missionQueue) => missionQueue.state === 'Executing')
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
    fetchMissionGroups();
    fetchMissions();
    fetchMissionQueues();
  }, []);

  function createMissionClick() {
    //chuyển hướng sang trang tạo mission mới
    navigate(PATH.create_mission);
  }

  function editMissionClick(guid) {
    //chuyển hướng sang trang edit mission, truyền vào guid vào path
    navigate(PATH.edit_mission(guid));
  }

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
      setMissionQueues(data);
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
      <div className="flex row full-width align-center space-between">
        <div className="flex col gap-5px">
          <h1>Missions</h1>
          <div className="row-5px">
            Create and edit missions.
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

        <button
          id="create-mission"
          className="flex row gap-5px button"
          onClick={() => createMissionClick()}
        >
          <img
            className="size-20px"
            alt="Create mission"
            src={Const.ImageSrc.plus}
            loading="lazy"
          />
          Create mission
        </button>
      </div>

      <div className="full-width flex row gap-frame">
        <section className="flex col gap-frame" id="mission-list-container">
          <div id="mission-list-top">
            <div>Show missions:</div>
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
          </div>

          <ul className="flex col gap-5px" id="mission-list">
            {missions.map((mission) => (
              <li
                className="mission"
                id={`mission-${mission.guid}`}
                key={mission.guid}
              >
                <div className="mission-icon">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-color-btn"
                      d="M22.3 10.4V6.2L26.65 2L28.1 4.8L31 6.2L26.65 10.4H22.3ZM22.3 10.4L16.5 15.9999M31 16C31 23.7319 24.5081 30 16.5 30C8.49187 30 2 23.7319 2 16C2 8.26801 8.49187 2 16.5 2M23.75 16C23.75 19.866 20.504 23 16.5 23C12.4959 23 9.25 19.866 9.25 16C9.25 12.134 12.4959 9 16.5 9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="mission-content">
                  <div className="mission-info">
                    <div id="mission-name">{mission.name}</div>
                    <div id="mission-group">
                      {/* {getGroupNameByGuid(mission.group_id)} */}
                    </div>
                  </div>

                  <div className="row-5px">
                    <button
                      className="button"
                      onClick={() => editMissionClick(mission.guid)}
                    >
                      <img
                        className="size-20px"
                        alt="Edit mission"
                        src={Const.ImageSrc.edit}
                        loading="lazy"
                      />
                    </button>

                    <button
                      className="del-btn button"
                      onClick={() => deleteMission(mission.guid)}
                    >
                      <img
                        className="size-20px"
                        alt="Delete mission"
                        src={Const.ImageSrc.delete}
                        loading="lazy"
                      />
                    </button>

                    <button
                      className="button"
                      onClick={() => postMissionQueues(mission.guid)}
                    >
                      <img
                        className="size-20px"
                        alt="Add to queue"
                        src={Const.ImageSrc.addQueue}
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex col gap-frame" id="mission-queue-container">
          <div className="flex col" id="mission-list-top">
            <h2>Mission queue</h2>
          </div>

          <div></div>

          <ul className="flex col gap-5px" id="mission-queue-list">
            {missionQueues.map((missionQueue) => (
              <li
                className="full-width flex row align-center border"
                id={`mission-queue-${missionQueue.id}`}
                key={missionQueue.id}
              >
                <div className="flex row align-center padding-7px mission-queue-icon">
                  <svg
                    className="plus-btn-img"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1924 5.65683C16.5829 5.2663 16.5829 4.63314 16.1924 4.24261L13.364 1.41419C12.5829 0.633139 11.3166 0.633137 10.5355 1.41419L7.70711 4.24261C7.31658 4.63314 7.31658 5.2663 7.70711 5.65683C8.09763 6.04735 8.73079 6.04735 9.12132 5.65683L11 3.77812V11.0503H3.72784L5.60655 9.17157C5.99707 8.78104 5.99707 8.14788 5.60655 7.75735C5.21602 7.36683 4.58286 7.36683 4.19234 7.75735L1.36391 10.5858C0.582863 11.3668 0.582859 12.6332 1.36391 13.4142L4.19234 16.2426C4.58286 16.6332 5.21603 16.6332 5.60655 16.2426C5.99707 15.8521 5.99707 15.219 5.60655 14.8284L3.8284 13.0503H11V20.2219L9.12132 18.3432C8.73079 17.9526 8.09763 17.9526 7.7071 18.3432C7.31658 18.7337 7.31658 19.3669 7.7071 19.7574L10.5355 22.5858C11.3166 23.3669 12.5829 23.3669 13.364 22.5858L16.1924 19.7574C16.5829 19.3669 16.5829 18.7337 16.1924 18.3432C15.8019 17.9526 15.1687 17.9526 14.7782 18.3432L13 20.1213V13.0503H20.071L18.2929 14.8284C17.9024 15.219 17.9024 15.8521 18.2929 16.2426C18.6834 16.6332 19.3166 16.6332 19.7071 16.2426L22.5355 13.4142C23.3166 12.6332 23.3166 11.3668 22.5355 10.5858L19.7071 7.75735C19.3166 7.36683 18.6834 7.36683 18.2929 7.75735C17.9024 8.14788 17.9024 8.78104 18.2929 9.17157L20.1716 11.0503H13V3.87867L14.7782 5.65683C15.1687 6.04735 15.8019 6.04735 16.1924 5.65683Z" />
                  </svg>
                </div>

                <div className="full-width flex row align-center padding-7px">
                  <div className="full-width flex col">
                    <div id="mission-queue-title">{missionQueue.name}</div>
                  </div>
                  <div className="row-5px">
                    <div>{missionQueue.state}</div>
                    <button
                      className="del-btn button"
                      id="del-mission-queue"
                      onClick={() => deleteMissionQueue(missionQueue.id)}
                    >
                      <img
                        className="size-20px"
                        alt="Delete mission from queue"
                        src={Const.ImageSrc.delete}
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
