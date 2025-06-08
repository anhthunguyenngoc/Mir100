import { useState, useEffect } from 'react';
import { JoystickControl } from '../component/joystick';
import * as Context from '../../context';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as Comp from '../../components';
import * as Icons from '../../components/icons';

import { RosService } from '../../ros';
import * as api from '../../api';
import { getNextVelocity } from './PurePursuit';

export const PathControl = ({
  baseSpeed,
  setSpeed,
  layers,
  simPose,
  setSimPose,
  metadata,
  obstacles,
}) => {
  /** @type { api.TGetStatus } */
  const { robotStatus, fetchRobotStatus, ros } = Context.useAppContext();
  const { map, pathPoints, setPathPoints } = Context.useCanvasContext();
  const [isMoving, setIsMoving] = useState(false);
  const [joystickControl, setJoystickControl] = useState(null);
  const [selectedShapeId, setSelectedShapeId] = useState(null);

  // useEffect(() => {
  //   if (!joystickControl || !pathPoints || !map || !isMoving) {
  //     joystickControl?.emergencyStop?.();
  //     return;
  //   }

  //   const result = getNextVelocity(
  //     {
  //       x: robotStatus.position.x,
  //       y: robotStatus.position.y,
  //       orientation: Utils.degreesToRadians(robotStatus.position.orientation),
  //     },
  //     [...pathPoints],
  //     baseSpeed,
  //     baseSpeed,
  //     map?.metadata.layers?.areaprefs_forbidden.shapes.map((wall) => ({
  //       ...wall,
  //       polygon: wall.polygon.map((p) => Utils.getRealPosition(p.x, p.y, map)),
  //     })) ?? [],
  //     [],
  //     map?.metadata.layers?.walls.shapes.map((wall) => ({
  //       ...wall,
  //       polygon: wall.polygon.map((p) => Utils.getRealPosition(p.x, p.y, map)),
  //     })) ?? [],
  //     0.1
  //   );

  //   if (!result) return;

  //   const { linear, angular, path: updatedPath } = result;
  //   setSpeed({ linear, angular });

  //   if (updatedPath.length !== pathPoints.length) {
  //     setPathPoints(updatedPath);
  //   }

  //   joystickControl.sendMovementCommand(linear, angular);
  //   fetchRobotStatus();
  // }, [joystickControl, robotStatus, isMoving, pathPoints, map]);

  const joystickToggle = () => {
    if (!ros) {
      console.error('joystickToggle: ROS not connected');
      return;
    }

    const joystickService = new RosService({
      rosInstance: ros,
      serviceName: '/mirsupervisor/setRobotState',
      serviceType: 'mirSupervisor/SetState',
      requestData: { robotState: 4 },
      callback: (response) => {
        if (response.joystick_token && response.joystick_token !== '') {
          setJoystickControl(
            new JoystickControl({
              rosInstance: ros,
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
    setSpeed({ linear: 0, angular: 0 });
  };

  const cancelPath = async () => {
    setIsMoving(false);
    joystickToggle();
    setSpeed({ linear: 0, angular: 0 });
  };

  //========================Giả lập

  //$$$ Test
  useEffect(() => {
    if (!isMoving) return;

    const dt = 0.1; // bước thời gian mô phỏng (giây)
    const interval = setInterval(() => {
      //$$$ Test
      const result = getNextVelocity(
        {
          ...simPose,
          orientation: Utils.degreesToRadians(simPose.orientation),
        },
        [...pathPoints],
        baseSpeed,
        baseSpeed,
        metadata.forbiddenZone.map((wall) => ({
          ...wall,
          polygon: wall.polygon.map((p) =>
            Utils.getRealPosition(p.x, p.y, {
              metadata: { height: 568 },
              resolution: 0.05,
              origin_x: 0,
              origin_y: 0,
            })
          ),
        })),
        obstacles.map((p) =>
          Utils.getRealPosition(p.x, p.y, {
            metadata: { height: 568 },
            resolution: 0.05,
            origin_x: 0,
            origin_y: 0,
          })
        ),

        metadata.walls.map((wall) => ({
          ...wall,
          polygon: wall.polygon.map((p) =>
            Utils.getRealPosition(p.x, p.y, {
              metadata: { height: 568 },
              resolution: 0.05,
              origin_x: 0,
              origin_y: 0,
            })
          ),
        }))
      );

      if (!result) return;

      const { linear, angular, path: updatedPath } = result;

      if (linear === 0 && angular === 0) setIsMoving(false);

      setSpeed({ linear, angular });

      if (updatedPath.length !== pathPoints.length) {
        setPathPoints(updatedPath);
      }

      setSimPose((prev) => {
        const newThetaRad =
          Utils.degreesToRadians(prev.orientation) + angular * dt;
        const newThetaDeg = Utils.radiansToDegrees(newThetaRad) % 360;
        const normalizedTheta = (newThetaDeg + 360) % 360; // đảm bảo luôn dương

        return {
          x: prev.x + linear * Math.cos(newThetaRad) * dt,
          y: prev.y + linear * Math.sin(newThetaRad) * dt,
          orientation: normalizedTheta,
        };
      });
    }, dt * 100); // Chuyển dt từ giây sang mili giây

    return () => clearInterval(interval);
  }, [simPose, isMoving, pathPoints]);

  return (
    <div className="selection-dropdown flex row gap-15px">
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
                  // return Utils.getRealPosition(p.x, p.y, map); //!!!

                  // Test
                  return Utils.getRealPosition(p.x, p.y, {
                    metadata: { height: 568 },
                    resolution: 0.05,
                    origin_x: 0,
                    origin_y: 0,
                  });
                }
                return null; // loại bỏ điểm không hợp lệ
              })
              .filter(Boolean); // lọc null
            console.log(shape.getShapePoints(shape), points);
            setPathPoints(Utils.simplifyPathByAngleThreshold(points));
          }
        }}
        className="width-50per"
      >
        <option value="">Select shape...</option>
        {layers.flatMap((layer) =>
          layer.shapes.map((shape) => (
            <option key={shape.id} value={shape.id}>
              {shape.name || `Shape ${shape.id}`}
            </option>
          ))
        )}
      </select>

      <div className="flex row" style={{ gap: '1px' }}>
        <button
          className="button"
          onClick={startPath}
          style={{
            borderRadius: '0',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <Icons.Start height="20px" width="20px" />
        </button>

        <Comp.ImageButton
          className="button"
          imageId="pause"
          onClick={pausePath}
          style={{ borderRadius: '0' }}
        />

        <button
          className="button"
          onClick={cancelPath}
          style={{
            borderRadius: '0',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
          }}
        >
          <Icons.Cancel size="20px" />
        </button>
      </div>
    </div>
  );
};
