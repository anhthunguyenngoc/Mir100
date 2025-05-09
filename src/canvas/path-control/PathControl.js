import { useState, useEffect } from 'react';
import { JoystickControl } from '../component/joystick';
import * as Context from '../../context';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as Comp from '../../components';

import { RosService } from '../../ros';
import * as api from '../../api';
import { getNextVelocity, insertCornerBufferPoints } from './PurePursuit';
import { rrtStar, smoothPath, aStar } from '../find-path';

export const PathControl = ({
  rosInstance,
  simPose,
  setSimPose,
  layers,
  pathPoints,
  setPathPoints,
  metadata,
  obstacles,
  setTP,
  setSps,
  setSpeed,
}) => {
  /** @type { api.TGetStatus } */
  const { robotStatus, fetchRobotStatus } = Context.useAppContext();
  const { map } = Context.useCanvasContext();

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

  //   setSpeed({linear, angular})

  //   if (linear === 0 && angular === 0) setIsMoving(false);

  //   if (updatedPath.length !== pathPoints.length) {
  //     setPathPoints(updatedPath);
  //   }

  //   setPathPoints(updatedPath);

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
        {
          ...simPose,
          orientation: Utils.degreesToRadians(simPose.orientation),
        },
        [...pathPoints],
        0.5,
        0.5,
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

  const start = { x: 360, y: 120 };
  const goal = { x: 100, y: 75 };
  const mapWidth = 700;
  const mapHeight = 500;

  return (
    <div className="flex row">
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
            const points = shape.getShapePoints().map((p) => {
              return Utils.getRealPosition(p.x, p.y, map); //!!!

              // Test
              // return Utils.getRealPosition(p.x, p.y, {
              //   metadata: { height: 568 },
              //   resolution: 0.05,
              //   origin_x: 0,
              //   origin_y: 0,
              // });
            });
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

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="start"
        imageclassName="size-20px"
        onClick={startPath}
      />

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="pause"
        imageclassName="size-20px"
        onClick={pausePath}
      />

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="cancel"
        imageclassName="size-20px"
        onClick={cancelPath}
      />

      <Comp.ImageButton
        className="icon-btn height-fit-content"
        imageId="start"
        imageclassName="size-20px"
        onClick={() => {
          console.time('RRT*');
          // const ps = rrtStar(
          //   start, goal, obstacle, mapWidth, mapHeight
          // );

          const workerCode = `
  self.onmessage = function(e) {
    const { start, goal, obstacles, mapWidth, mapHeight } = e.data;
    const result = aStar(start, goal, obstacles, mapWidth, mapHeight);
    postMessage(result);
  };
          
  function calculateManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function pointNearPolygon(point, polygons, threshold) {
    return polygons.some(
      (poly) => distancePointToPolygon(point, poly.polygon) < threshold
    );
  }
  
  function pointNearLine(point, lines, threshold) {
    return lines.some(
      (line) =>
        distancePointToLineSegment(point, line.polygon[0], line.polygon[1]) <
        threshold
    );
  }

  function distancePointToLineSegment(p, v, w) {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y); // đoạn thẳng là điểm
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projection = {
      x: v.x + t * (w.x - v.x),
      y: v.y + t * (w.y - v.y),
    };
    return Math.hypot(p.x - projection.x, p.y - projection.y);
  }

  function distancePointToPolygon(point, polygon) {
    let minDist = Infinity;
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      const dist = distancePointToLineSegment(point, p1, p2);
      if (dist < minDist) minDist = dist;
    }
    return minDist;
  }

  function isPointInObstacle(point, obstacles, threshold = 10) {
      const [forbiddenZones, walls] = obstacles;
      return (
          pointNearPolygon(point, forbiddenZones, threshold) ||
          pointNearLine(point, walls, threshold)
      );
  }

  class PriorityQueue {
    constructor() { this.queue = []; }
    enqueue(item, priority) {
      this.queue.push({ item, priority });
      this.queue.sort((a, b) => a.priority - b.priority);
    }
    dequeue() { return this.queue.shift().item; }
    isEmpty() { return this.queue.length === 0; }
  }

  ${aStar.toString()}
`;

          const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));

          worker.onmessage = function(e) {
              const path = e.data;
              setTP(path);
              setPathPoints(
                path.map((p) => {
                  // return Utils.getRealPosition(p.x, p.y, map); !!!
    
                  // Test
                  return Utils.getRealPosition(p.x, p.y, {
                    metadata: { height: 568 },
                    resolution: 0.05,
                    origin_x: 0,
                    origin_y: 0,
                  });
                })
              );

              console.log('Path found:', path);
              // Hiển thị đường đi lên UI
          };

          worker.postMessage({
            start: start,
            goal: goal,
            obstacles: obstacles,
            mapWidth: mapWidth,
            mapHeight: mapHeight
          });
                      
  // Gọi hàm A* và in kết quả
  // const ps = aStar(start, goal, obstacle, mapWidth, mapHeight);
  
          console.timeEnd('RRT*');
          // const sps = smoothPath(ps, obstacle);

          
          // setSps(sps);
          
        }}
      />
    </div>
  );
};
