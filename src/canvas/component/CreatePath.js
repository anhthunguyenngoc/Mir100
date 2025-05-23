import { useEffect, useState } from 'react';

import * as Context from '../../context';
import * as Comps from '../../components';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as api from '../../api';
import { aStarWorkerCode } from 'canvas/find-path';

export const CreatPath = ({ isVisible, setVisible, positionId }) => {
  const { robotStatus } = Context.useAppContext();
  const { mapPositions, setPathPoints, map, fetchPosition, setIsLoading } =
    Context.useCanvasContext();

  const [formData, setFormData] = useState({
    goalId: positionId,
  });

  const handleChange = (props) => {
    setFormData((prev) => ({
      ...prev,
      ...props,
    }));
  };

  const [simPose, setSimPose] = useState({
    y: 13,
    x: 17,
    orientation: -171,
  });

  const getPositionFromId = async (posId) => {
    if (posId === 'robot-position') {
      //!!!
      return Utils.getCanvasPosition(
        robotStatus?.position.x,
        robotStatus?.position.y,
        map
      );

      //Test
      // return Utils.getCanvasPosition(simPose.x, simPose.y, {
      //   metadata: { height: 568 },
      //   resolution: 0.05,
      //   origin_x: 0,
      //   origin_y: 0,
      // });
    } else {
      //!!!
      const findPos = await fetchPosition(posId);
      return findPos
        ? Utils.getCanvasPosition(findPos.pos_x, findPos.pos_y, map)
        : null;

      //Test
      // const findPos = fakeMapPositions.find((pos) => pos.guid === posId);

      // return findPos ? Utils.getCanvasPosition(findPos.pos_x, findPos.pos_y, {
      //     metadata: { height: 568 },
      //     resolution: 0.05,
      //     origin_x: 0,
      //     origin_y: 0,
      //   }) : null;
    }
  };

  const fakeMapPositions = [
    {
      pos_x: 10,
      pos_y: 15,
      orientation: 0,
      type_id: 'dock',
      name: 'Docking Station A',
      guid: 'guid-001',
    },
    {
      pos_x: 20,
      pos_y: 25,
      orientation: 90,
      type_id: 'charging',
      name: 'Charging Point B',
      guid: 'guid-002',
    },
    {
      pos_x: 30,
      pos_y: 10,
      orientation: 180,
      type_id: 'checkpoint',
      name: 'Checkpoint C',
      guid: 'guid-003',
    },
    {
      pos_x: 40,
      pos_y: 30,
      orientation: 270,
      type_id: 'inspection',
      name: 'Inspection Zone D',
      guid: 'guid-004',
    },
  ];

  // const obstacles = Const.obstacles; //Test

  const obstacles = [
    map?.metadata.layers?.areaprefs_forbidden.shapes,
    map?.metadata.layers?.walls.shapes,
  ]; //!!!

  //  const metadata = {
  //   walls: map?.metadata.layers.walls.shapes,
  //   forbiddenZone: map?.metadata.layers.areaprefs_forbidden.shapes,
  // };

  useEffect(() => {
    if (positionId) {
      setFormData((prev) => ({
        ...prev,
        goalId: positionId,
      }));
    }
  }, [positionId]);

  async function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    setIsLoading(true);

    const start = await getPositionFromId(formData.startId);
    const goal = await getPositionFromId(formData.goalId);

    const blob = new Blob([aStarWorkerCode], {
      type: 'application/javascript',
    });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = function (e) {
      const path = Utils.simplifyPathByAngleThreshold(e.data);
      setPathPoints(
        path.map((p) => {
          return Utils.getRealPosition(p.x, p.y, map); //!!!

          // Test
          // return Utils.getRealPosition(p.x, p.y, {
          //   metadata: { height: 568 },
          //   resolution: 0.05,
          //   origin_x: 0,
          //   origin_y: 0,
          // });
        })
      );
      setIsLoading(false);
    };

    worker.postMessage({
      start: start,
      goal: goal,
      obstacles: obstacles,
      mapWidth: map?.metadata.width,
      mapHeight: map?.metadata.height,
    });

    worker.onerror = function (error) {
      setIsLoading(false);
    };

    setVisible(false);
  }

  return (
    isVisible && (
      <>
        <div className="overlay"></div>
        <form
          onSubmit={handleSubmit}
          action="/submit"
          method="POST"
          className="flex col width-50per height-fit-content radius-5px gap-frame padding-frame absolute-pos translate-center dialog-zindex"
        >
          <div>
            <h2>Create path</h2>
          </div>

          <div className="flex col full-width gap-frame">
            <div className="flex col full-width gap-5px">
              <label for="start">Start</label>
              <div className="flex row full-width gap-frame selection-dropdown">
                <Comps.SelectionDropdown
                  styleClass="full-height full-width align-center background"
                  containerStyleClass="full-width full-height"
                  options={[
                    { guid: 'robot-position', name: 'Robot position' },
                    ...mapPositions,
                  ]} // {mapPositions}
                  placeHolderText="Start position"
                  iconColor={Const.Color.BUTTON}
                  defaultValue={
                    formData.startId === 'robot-position'
                      ? { guid: 'robot-position', name: 'Robot position' }
                      : null
                  }
                  onChange={(value) => {
                    handleChange({ startId: value.guid });
                  }}
                />

                <Comps.Button
                  backgroundColor={Const.Color.BUTTON}
                  borderColor={Const.Color.BUTTON}
                  color={Const.Color.WHITE}
                  onClick={() =>
                    setFormData({
                      startId: 'robot-position',
                    })
                  }
                  text="Use robot position"
                  type="button"
                  style={{ whiteSpace: 'nowrap' }}
                />
              </div>
            </div>
          </div>

          <div className="flex col full-width gap-5px">
            <label for="end">End</label>
            <Comps.SelectionDropdown
              styleClass="full-height full-width align-center background"
              containerStyleClass="full-height"
              options={mapPositions} //{fakeMapPositions} // {mapPositions} !!!
              placeHolderText="Goal position"
              iconColor={Const.Color.BUTTON}
              defaultValue={mapPositions.find(
                //!!!
                (pos) => pos.guid === positionId
              )}
              onChange={(value) => {
                handleChange({ goalId: value.guid });
              }}
            />
          </div>

          <div className="flex row gap-10px">
            <Comps.Button
              backgroundColor={Const.Color.BUTTON}
              borderColor={Const.Color.BUTTON}
              color={Const.Color.WHITE}
              text="OK"
              type="submit"
            />

            <Comps.Button
              backgroundColor={Const.Color.LIGHT_BUTTON}
              borderColor={Const.Color.LIGHT_BUTTON}
              color={Const.Color.BLACK}
              onClick={() => setVisible(false)}
              text="Cancel"
              type="button"
            />
          </div>
        </form>
      </>
    )
  );
};
