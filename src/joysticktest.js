import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';

export const DefaultDashboard = () => {
  const [ros, setRos] = useState(null); // ROS connection
  const [joystickToken, setJoystickToken] = useState(null); // Joystick token

  useEffect(() => {
    let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    let port = window.location.protocol === 'https:' ? '443' : '9090';
    let ip = '192.168.0.173';

    const rosInstance = new ROSLIB.Ros({
      url: `${protocol}${ip}:${port}`,
    });

    setRos(rosInstance);

    // Connect to ROS and set up services
    rosInstance.on('connection', () => {
      console.log('Connected to ROS');
    });

    return () => {
      if (rosInstance) {
        rosInstance.close();
      }
    };
  }, []);

  let robot_state_id = 4; // Ví dụ, giá trị trạng thái robot
  const MIR = {
    joystick: {
      session_user: 'user_session_id', // ID phiên người dùng
      claim: function (token) {
        console.log('Claiming joystick token:', token);
      },
      user_token: 'user_token_here', // Token của người dùng
    },
    constants: {
      MAPPING_ALGORITHM: {
        HECTOR: 'hector_mapping',
      },
    },
  };

  const joystickToggle = () => {
    if (ros) {
      const service = new ROSLIB.Service({
        ros: ros,
        name: '/mirsupervisor/setRobotState',
        serviceType: 'mirSupervisor/SetState',
      });

      const request = new ROSLIB.ServiceRequest({
        robotState: 4,
      });

      // Assuming robot_state_id is defined and accessible
      if (robot_state_id !== 11) {
        request.robotState = 11;
        request.web_session_id = MIR.joystick.session_user;
      }

      service.callService(request, (response) => {
        if (response.joystick_token && response.joystick_token !== '') {
          setJoystickToken(response.joystick_token);
          MIR.joystick.claim(response.joystick_token);
        }
      });
    }
  };

  const sendMovementCommand = (linearX, angularZ) => {
    const speedCommand = {
      joystick_token: joystickToken,
      speed_command: {
        linear: {
          x: linearX,
          y: 0,
          z: 0,
        },
        angular: {
          x: 0,
          y: 0,
          z: angularZ,
        },
      },
    };

    const rosCmdVel = new ROSLIB.Topic({
      ros: ros,
      name: '/joystick_vel',
      messageType: 'mirMsgs/JoystickVel',
    });

    const message = new ROSLIB.Message(speedCommand);
    rosCmdVel.publish(message);
  };

  const moveForward = () => {
    sendMovementCommand(0.5, 0); // Move forward
  };

  const moveBackward = () => {
    sendMovementCommand(-0.5, 0); // Move backward
  };

  const moveLeft = () => {
    sendMovementCommand(0, 0.5); // Turn left
  };

  const moveRight = () => {
    sendMovementCommand(0, -0.5); // Turn right
  };

  const moveForwardLeft = () => {
    sendMovementCommand(0.5, 0.5); // Move forward and turn left
  };

  const moveForwardRight = () => {
    sendMovementCommand(0.5, -0.5); // Move forward and turn right
  };

  const moveBackwardLeft = () => {
    sendMovementCommand(-0.5, 0.5); // Move backward and turn left
  };

  const moveBackwardRight = () => {
    sendMovementCommand(-0.5, -0.5); // Move backward and turn right
  };

  return (
    <div>
      <h1>Robot Movement Control</h1>
      <button onClick={joystickToggle}>Connect Joystick</button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridGap: '10px',
          marginTop: '20px',
        }}
      >
        <button onClick={moveForwardLeft}>↖️</button>
        <button onClick={moveForward}>⬆️</button>
        <button onClick={moveForwardRight}>↗️</button>
        <button onClick={moveLeft}>⬅️</button>
        <button></button>
        <button onClick={moveRight}>➡️</button>
        <button onClick={moveBackwardLeft}>↙️</button>
        <button onClick={moveBackward}>⬇️</button>
        <button onClick={moveBackwardRight}>↘️</button>
      </div>
    </div>
  );
};

    // const obstacles = [
    //   // ======= VÙNG CẤM =======
    //   [
    //     { polygon: [ { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 200 }, { x: 100, y: 200 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //     { polygon: [ { x: 100, y: 260 }, { x: 300, y: 260 }, { x: 300, y: 360 }, { x: 100, y: 360 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //     { polygon: [ { x: 400, y: 100 }, { x: 440, y: 100 }, { x: 440, y: 140 }, { x: 400, y: 140 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //     { polygon: [ { x: 500, y: 250 }, { x: 540, y: 250 }, { x: 540, y: 290 }, { x: 500, y: 290 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //     { polygon: [ { x: 300, y: 400 }, { x: 340, y: 400 }, { x: 340, y: 440 }, { x: 300, y: 440 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //     { polygon: [ { x: 150, y: 200 }, { x: 180, y: 200 }, { x: 180, y: 230 }, { x: 150, y: 230 } ],
    //     color: '#FFEBEE',
    //     brushsize: 1,
    //     type: 'shape' },
    //   ],
    
    //   // ======= TƯỜNG (BAO QUANH VÙNG CẤM + KHUNG PHÒNG) =======
    //   [
    //     // Tường bao quanh vùng cấm (mỗi vùng là 4 đoạn)
    //     // Vùng 1
    //     { polygon: [ { x: 100, y: 100 }, { x: 300, y: 100 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 100, y: 100 }, { x: 100, y: 200 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 300, y: 100 }, { x: 300, y: 200 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 100, y: 200 }, { x: 300, y: 200 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Vùng 2
    //     { polygon: [ { x: 100, y: 260 }, { x: 300, y: 260 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 300, y: 260 }, { x: 300, y: 360 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 300, y: 360 }, { x: 100, y: 360 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 100, y: 260 }, { x: 100, y: 360 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Vùng 3
    //     { polygon: [ { x: 400, y: 100 }, { x: 440, y: 100 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 440, y: 100 }, { x: 440, y: 140 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 440, y: 140 }, { x: 400, y: 140 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 400, y: 140 }, { x: 400, y: 100 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Vùng 4
    //     { polygon: [ { x: 500, y: 250 }, { x: 540, y: 250 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 540, y: 250 }, { x: 540, y: 290 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 540, y: 290 }, { x: 500, y: 290 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 500, y: 290 }, { x: 500, y: 250 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Vùng 5
    //     { polygon: [ { x: 300, y: 400 }, { x: 340, y: 400 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 340, y: 400 }, { x: 340, y: 440 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 340, y: 440 }, { x: 300, y: 440 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 300, y: 440 }, { x: 300, y: 400 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Vùng 6
    //     { polygon: [ { x: 150, y: 200 }, { x: 180, y: 200 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 180, y: 200 }, { x: 180, y: 230 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 180, y: 230 }, { x: 150, y: 230 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 150, y: 230 }, { x: 150, y: 200 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    
    //     // Tường khung phòng (giả sử phòng rộng 700x500)
    //     { polygon: [ { x: 50, y: 50 }, { x: 650, y: 50 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 650, y: 50 }, { x: 650, y: 500 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 650, y: 500 }, { x: 50, y: 500 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //     { polygon: [ { x: 50, y: 500 }, { x: 50, y: 50 } ],
    //     color: '#000000',
    //     brushsize: 1,
    //     type: 'line' },
    //   ],
    // ];  

    // const metadata = {
    //   walls: obstacles[1],
    //   forbiddenZone: obstacles[0],
    // };
