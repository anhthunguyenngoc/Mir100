import { useState, useEffect } from 'react';
import { JoystickControl } from '../../components';
import * as Context from '../../context';
import * as Const from '../../constant';
import * as Utils from '../utils';

import { RosService } from '../../ros';
import * as api from '../../api';
import { getNextVelocity } from './PurePursuit';

export const PathControl = ({
  rosInstance,
  simPose,
  setSimPose,
  layers,
  pathPoints,
  setPathPoints,
  metadata,
  obstacles,
}) => {
  /** @type { api.TGetStatus } */
  const { robotStatus, fetchRobotStatus } = Context.useAppContext();
  const { map } = Context.useCanvasContext();

  const [isMoving, setIsMoving] = useState(false);
  const [joystickControl, setJoystickControl] = useState(null);
  const SPEED = 0.1;

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
    joystickToggle();
    setIsMoving(true);
  };

  const pausePath = () => {
    setIsMoving(false);
  };

  const resumePath = () => {
    setIsMoving(true);
  };

  //========================Giả lập

  const [selectedShapeId, setSelectedShapeId] = useState(null);

  // useEffect(() => {
  //   if (!joystickControl) return;

  //   if (!pathPoints || pathPoints.length === 0 || !isMoving) {
  //     joystickControl.emergencyStop();
  //     return;
  //   }

  //   const result = getNextVelocity(
  //     {
  //       x: robotStatus.position.x,
  //       y: robotStatus.position.y,
  //       orientation: Utils.degreesToRadians(robotStatus.position.orientation),
  //     },
  //     [...pathPoints],
  //     SPEED,
  //     SPEED,
  //     map?.metadata.layers.areaprefs_forbidden.shapes.map((wall) => ({
  //       ...wall,
  //       polygon: wall.polygon.map(
  //         (p) => Utils.getRealPosition(p.x, p.y, map) //!!!
  //       ),
  //     })),
  //     [],

  //     map?.metadata.layers.walls.shapes.map((wall) => ({
  //       ...wall,
  //       polygon: wall.polygon.map(
  //         (p) => Utils.getRealPosition(p.x, p.y, map) //!!!
  //       ),
  //     }))
  //   );

  //   if (!result) return;

  //   const { linear, angular, path: updatedPath } = result;

  //   if (linear === 0 && angular === 0) setIsMoving(false);

  //   setPathPoints(updatedPath); // Cập nhật path đã loại bỏ điểm đã qua

  //   joystickControl.sendMovementCommand(linear, angular);

  //   //Chờ cập nhật vị trí
  //   fetchRobotStatus();
  // }, [joystickControl, robotStatus, isMoving, pathPoints]);

  //$$$ Test
  useEffect(() => {
    if (!isMoving) return;

    const dt = 0.1; // bước thời gian mô phỏng (giây)
    const interval = setInterval(() => {
      //$$$ Test
      const result = getNextVelocity(
        simPose,
        [...pathPoints],
        0.5,
        0.5,
        metadata.forbiddenZone.map((wall) => ({
          ...wall,
          polygon: wall.polygon.map(
            (p) => Utils.getRealPosition(p.x, p.y, {
              metadata: { height: 568 },
              resolution: 0.05,
              origin_x: 0,
              origin_y: 0,
            })
          ),
        })),
        obstacles.map(
          (p) => Utils.getRealPosition(p.x, p.y, {
            metadata: { height: 568 },
            resolution: 0.05,
            origin_x: 0,
            origin_y: 0,
          })
        ),

        metadata.walls.map((wall) => ({
          ...wall,
          polygon: wall.polygon.map(
            (p) => Utils.getRealPosition(p.x, p.y, {
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

      setPathPoints(updatedPath); // Cập nhật path đã loại bỏ điểm đã qua

      setSimPose((prev) => {
        const newTheta = prev.orientation + angular * dt;
        return {
          x: prev.x + linear * Math.cos(newTheta) * dt,
          y: prev.y + linear * Math.sin(newTheta) * dt,
          orientation: newTheta,
        };
      });
    }, dt * 100); // Chuyển dt từ giây sang mili giây

    return () => clearInterval(interval);
  }, [simPose, isMoving, pathPoints]);

  return (
    <div>
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
            const points = shape.getShapePoints(); // Gọi hàm lấy điểm
            setPathPoints(points);
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

      <button
        className="button"
        onClick={startPath}
        style={{ marginRight: 8 }}
        disabled={isMoving}
      >
        Start
      </button>

      <button className="button" onClick={pausePath} disabled={!isMoving}>
        Pause
      </button>

      <button className="button" onClick={resumePath} disabled={isMoving}>
        Resume Path
      </button>
    </div>
  );
};

const calculateAngularSpeed = (targetAngle, currentOrientation) => {
  const Kp = 0.1; // hệ số điều chỉnh, bạn có thể chỉnh nhỏ hoặc to tùy độ mượt mong muốn

  let error = targetAngle - currentOrientation;

  // Đảm bảo error luôn nằm trong khoảng [-pi, pi]
  if (error > Math.PI) error -= 2 * Math.PI;
  if (error < -Math.PI) error += 2 * Math.PI;

  const angularSpeed = Kp * error;
  return angularSpeed;
};

const degreesToRadians = (degrees) => {
  if (!degrees) return;
  return degrees * (Math.PI / 180);
};
