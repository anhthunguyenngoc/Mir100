import { useState, useEffect } from 'react';
import { JoystickControl } from '../component/joystick';
import * as Context from '../../context';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as Comp from '../../components';

import { RosService } from '../../ros';
import * as api from '../../api';
import { getNextVelocity } from './PurePursuit';

export const PathControl = ({
  rosInstance,
  simPose,
  setSimPose,
  layers,
  metadata,
  obstacles,
  setSpeed,
}) => {
  /** @type { api.TGetStatus } */
  const { robotStatus, fetchRobotStatus } = Context.useAppContext();
  const { map, pathPoints, setPathPoints } = Context.useCanvasContext();

  const [isMoving, setIsMoving] = useState(false);
  const [joystickControl, setJoystickControl] = useState(null);
  const SPEED = 0.3;

  const joystickToggle = () => {
    if (!rosInstance) {
      console.error('joystickToggle: ROS not connected');
      return;
    }

    const joystickService = new RosService({
      rosInstance,
      serviceName: '/mirsupervisor/setRobotState',
      serviceType: 'mirSupervisor/SetState',
      requestData: { robotState: 4 },
      callback: (response) => {
        if (response.joystick_token && response.joystick_token !== '') {
          setJoystickControl(
            new JoystickControl({
              rosInstance,
              joystickToken: response.joystick_token,
            })
          );
          console.log('Joystick token:', response.joystick_token);
        }
      },
    });

    // Bạn có thể sửa lại request trước khi call
    if (robotStatus?.state_id !== Const.Robot_State_Id.MANUAL_CONTROL) {
      joystickService.setRequestData({
        robotState: Const.Robot_State_Id.MANUAL_CONTROL,
        web_session_id: 'user_session_id', // Hoặc token gì đó
      });
    }

    // Khi đã chỉnh sửa xong, mới thực sự gọi
    joystickService.callService();
  };

  const startPath = async () => {
    // if (!joystickControl) {
    //   joystickToggle();
    // }
    joystickToggle();
    setIsMoving(true);
  };

  const pausePath = async () => {
    setIsMoving((prev) => !prev);
  };

  const cancelPath = async () => {
    setIsMoving(false);
    joystickToggle();
  };

  //========================Giả lập

  const [selectedShapeId, setSelectedShapeId] = useState(null);

  useEffect(() => {
    if (!joystickControl) return;

    if (!pathPoints || pathPoints.length === 0 || !isMoving) {
      joystickControl.emergencyStop();
      return;
    }

    const result = getNextVelocity(
      {
        x: robotStatus.position.x,
        y: robotStatus.position.y,
        orientation: Utils.degreesToRadians(robotStatus.position.orientation),
      },
      [...pathPoints],
      SPEED,
      SPEED,
      map?.metadata.layers?.areaprefs_forbidden.shapes.map((wall) => ({
        ...wall,
        polygon: wall.polygon.map(
          (p) => Utils.getRealPosition(p.x, p.y, map) //!!!
        ),
      })),
      [],

      map?.metadata.layers?.walls.shapes.map((wall) => ({
        ...wall,
        polygon: wall.polygon.map(
          (p) => Utils.getRealPosition(p.x, p.y, map) //!!!
        ),
      })),
      0.1
    );

    if (!result) return;

    const { linear, angular, path: updatedPath } = result;

    setSpeed({ linear, angular });

    // if (linear === 0 && angular === 0) setIsMoving(false);

    if (updatedPath.length !== pathPoints.length) {
      setPathPoints(updatedPath);
    }

    joystickControl.sendMovementCommand(linear, angular);

    //Chờ cập nhật vị trí
    fetchRobotStatus();
  }, [joystickControl, robotStatus, isMoving, pathPoints]);

  //$$$ Test
  // useEffect(() => {
  //   if (!isMoving) return;

  //   const dt = 0.1; // bước thời gian mô phỏng (giây)
  //   const interval = setInterval(() => {
  //     //$$$ Test
  //     const result = getNextVelocity(
  //       {
  //         ...simPose,
  //         orientation: Utils.degreesToRadians(simPose.orientation),
  //       },
  //       [...pathPoints],
  //       0.5,
  //       0.5,
  //       metadata.forbiddenZone.map((wall) => ({
  //         ...wall,
  //         polygon: wall.polygon.map((p) =>
  //           Utils.getRealPosition(p.x, p.y, {
  //             metadata: { height: 568 },
  //             resolution: 0.05,
  //             origin_x: 0,
  //             origin_y: 0,
  //           })
  //         ),
  //       })),
  //       obstacles.map((p) =>
  //         Utils.getRealPosition(p.x, p.y, {
  //           metadata: { height: 568 },
  //           resolution: 0.05,
  //           origin_x: 0,
  //           origin_y: 0,
  //         })
  //       ),

  //       metadata.walls.map((wall) => ({
  //         ...wall,
  //         polygon: wall.polygon.map((p) =>
  //           Utils.getRealPosition(p.x, p.y, {
  //             metadata: { height: 568 },
  //             resolution: 0.05,
  //             origin_x: 0,
  //             origin_y: 0,
  //           })
  //         ),
  //       }))
  //     );

  //     if (!result) return;

  //     const { linear, angular, path: updatedPath } = result;

  //     if (linear === 0 && angular === 0) setIsMoving(false);

  //     setSpeed({ linear, angular });

  //     if (updatedPath.length !== pathPoints.length) {
  //       setPathPoints(updatedPath);
  //     }

  //     setSimPose((prev) => {
  //       const newThetaRad =
  //         Utils.degreesToRadians(prev.orientation) + angular * dt;
  //       const newThetaDeg = Utils.radiansToDegrees(newThetaRad) % 360;
  //       const normalizedTheta = (newThetaDeg + 360) % 360; // đảm bảo luôn dương

  //       return {
  //         x: prev.x + linear * Math.cos(newThetaRad) * dt,
  //         y: prev.y + linear * Math.sin(newThetaRad) * dt,
  //         orientation: normalizedTheta,
  //       };
  //     });
  //   }, dt * 100); // Chuyển dt từ giây sang mili giây

  //   return () => clearInterval(interval);
  // }, [simPose, isMoving, pathPoints]);

  return (
    <div className="flex row">
      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="start"
        onClick={startPath}
      />

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="pause"
        onClick={pausePath}
      />

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="cancel"
        onClick={cancelPath}
      />

      <select
        value={selectedShapeId || ''}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedShapeId(id);

          // Lấy ra shape tương ứng
          const shape = layers
            .flatMap((layer) => layer.shapes)
            .find((shape) => shape.id.toString() === id);

          if (shape) {
            const points = shape
              .getShapePoints(shape)
              .map((p) => {
                if (
                  p &&
                  typeof p.x === 'number' &&
                  typeof p.y === 'number' &&
                  !isNaN(p.x) &&
                  !isNaN(p.y)
                ) {
                  return Utils.getRealPosition(p.x, p.y, map); //!!!

                  // Test
                  // Utils.getRealPosition(p.x, p.y, {
                  //   metadata: { height: 568 },
                  //   resolution: 0.05,
                  //   origin_x: 0,
                  //   origin_y: 0,
                  // })
                }
                return null; // loại bỏ điểm không hợp lệ
              })
              .filter(Boolean); // lọc null

            setPathPoints(Utils.simplifyPathByAngleThreshold(points));
          }
        }}
      >
        <option value="">-- Chọn shape để chạy --</option>
        {layers.flatMap((layer) =>
          layer.shapes.map((shape) => (
            <option key={shape.id} value={shape.id}>
              {shape.name || `Shape ${shape.id}`}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
