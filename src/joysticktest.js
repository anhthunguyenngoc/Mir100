// import React, { useState, useEffect } from 'react';
// import ROSLIB from 'roslib';

// export const DefaultDashboard = () => {
//   const [ros, setRos] = useState(null); // ROS connection
//   const [joystickToken, setJoystickToken] = useState(null); // Joystick token

//   useEffect(() => {
//     let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
//     let port = window.location.protocol === 'https:' ? '443' : '9090';
//     let ip = '172.20.10.2';

//     const rosInstance = new ROSLIB.Ros({
//       url: `${protocol}${ip}:${port}`,
//     });

//     setRos(rosInstance);

//     // Connect to ROS and set up services
//     rosInstance.on('connection', () => {
//       console.log('Connected to ROS');
//     });

//     return () => {
//       if (rosInstance) {
//         rosInstance.close();
//       }
//     };
//   }, []);

//   let robot_state_id = 4; // Ví dụ, giá trị trạng thái robot
//   const MIR = {
//     joystick: {
//       session_user: 'user_session_id', // ID phiên người dùng
//       claim: function (token) {
//         console.log('Claiming joystick token:', token);
//       },
//       user_token: 'user_token_here', // Token của người dùng
//     },
//     constants: {
//       MAPPING_ALGORITHM: {
//         HECTOR: 'hector_mapping',
//       },
//     },
//   };

//   const joystickToggle = () => {
//     if (ros) {
//       const service = new ROSLIB.Service({
//         ros: ros,
//         name: '/mirsupervisor/setRobotState',
//         serviceType: 'mirSupervisor/SetState',
//       });

//       const request = new ROSLIB.ServiceRequest({
//         robotState: 4,
//       });

//       // Assuming robot_state_id is defined and accessible
//       if (robot_state_id !== 11) {
//         request.robotState = 11;
//         request.web_session_id = MIR.joystick.session_user;
//       }

//       service.callService(request, (response) => {
//         if (response.joystick_token && response.joystick_token !== '') {
//           setJoystickToken(response.joystick_token);
//           MIR.joystick.claim(response.joystick_token);
//         }
//       });
//     }
//   };

//   const sendMovementCommand = (linearX, angularZ) => {
//     const speedCommand = {
//       joystick_token: joystickToken,
//       speed_command: {
//         linear: {
//           x: linearX,
//           y: 0,
//           z: 0,
//         },
//         angular: {
//           x: 0,
//           y: 0,
//           z: angularZ,
//         },
//       },
//     };

//     const rosCmdVel = new ROSLIB.Topic({
//       ros: ros,
//       name: '/joystick_vel',
//       messageType: 'mirMsgs/JoystickVel',
//     });

//     const message = new ROSLIB.Message(speedCommand);
//     rosCmdVel.publish(message);
//   };

//   const moveForward = () => {
//     sendMovementCommand(0.5, 0); // Move forward
//   };

//   const moveBackward = () => {
//     sendMovementCommand(-0.5, 0); // Move backward
//   };

//   const moveLeft = () => {
//     sendMovementCommand(0, 0.5); // Turn left
//   };

//   const moveRight = () => {
//     sendMovementCommand(0, -0.5); // Turn right
//   };

//   const moveForwardLeft = () => {
//     sendMovementCommand(0.5, 0.5); // Move forward and turn left
//   };

//   const moveForwardRight = () => {
//     sendMovementCommand(0.5, -0.5); // Move forward and turn right
//   };

//   const moveBackwardLeft = () => {
//     sendMovementCommand(-0.5, 0.5); // Move backward and turn left
//   };

//   const moveBackwardRight = () => {
//     sendMovementCommand(-0.5, -0.5); // Move backward and turn right
//   };

//   return (
//     <div>
//       <h1>Robot Movement Control</h1>
//       <button onClick={joystickToggle}>Connect Joystick</button>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 100px)',
//           gridGap: '10px',
//           marginTop: '20px',
//         }}
//       >
//         <button onClick={moveForwardLeft}>↖️</button>
//         <button onClick={moveForward}>⬆️</button>
//         <button onClick={moveForwardRight}>↗️</button>
//         <button onClick={moveLeft}>⬅️</button>
//         <button></button>
//         <button onClick={moveRight}>➡️</button>
//         <button onClick={moveBackwardLeft}>↙️</button>
//         <button onClick={moveBackward}>⬇️</button>
//         <button onClick={moveBackwardRight}>↘️</button>
//       </div>
//     </div>
//   );
// };

// // setTooltipContent(<>
// //           <div className="flex col gap-10px" style={{backgroundColor: Const.Color.BUTTON, padding: '8px 4px'}}>
// //             {[
// //               actionList.GOTO,
// //               actionList.CREATE_PATH,
// //               actionList.MOVE,
// //               actionList.EDIT,
// //               actionList.DELETE,
// //             ].map((action) => {
// //               return (
// //                   <button
// //                       className="button full-width"
// //                       style={{
// //                         backgroundColor: action.buttonColor,
// //                         color: action.textColor,
// //                         borderColor: action.buttonColor,
// //                       }}
// //                       onClick={() => action?.onClick()}
// //                     >
// //                       {action.buttonText.toUpperCase()}
// //                     </button>
// //               );
// //             })}
// //           </div>
// //       </>);

// src/App.jsx
import React, { useState } from 'react';

const robots = [
  {
    id: 'mir100-01',
    status: 'Idle',
    battery: 87,
    position: { x: 23.2, y: 45.1 },
    currentTask: 'Waiting for new mission',
  },
  {
    id: 'mir100-02',
    status: 'Error',
    battery: 32,
    position: { x: 58.7, y: 12.3 },
    currentTask: 'Docking failed',
  },
  {
    id: 'mir100-03',
    status: 'Moving',
    battery: 74,
    position: { x: 12.0, y: 9.5 },
    currentTask: 'Going to station A',
  },
];

const statusColor = {
  Idle: 'bg-green-100 text-green-800 border-green-200',
  Moving: 'bg-blue-100 text-blue-800 border-blue-200',
  Error: 'bg-red-100 text-red-800 border-red-200',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('robots');

  const handleRefresh = (robotId) => {
    console.log(`Refreshing status for ${robotId}`);
    // Add refresh logic here
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">MiR Monitoring Dashboard</h1>

      {/* Tabs */}
      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'robots'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Robots
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'robots' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {robots.map((robot) => (
            <div
              key={robot.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{robot.id}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColor[robot.status]}`}
                  >
                    {robot.status}
                  </span>
                </div>
                <p className="mb-1">
                  <strong>Battery:</strong> {robot.battery}%
                </p>
                <p className="mb-1">
                  <strong>Position:</strong> ({robot.position.x},{' '}
                  {robot.position.y})
                </p>
                <p className="mt-2 text-sm italic text-gray-600">
                  {robot.currentTask}
                </p>
                <button
                  onClick={() => handleRefresh(robot.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 text-gray-600 font-mono text-sm space-y-1">
            <p>[10:12] mir100-01: Mission complete</p>
            <p>[10:14] mir100-02: Docking failed</p>
            <p>[10:17] mir100-03: Started mission to Station A</p>
            <p>[10:20] mir100-02: Retrying docking procedure...</p>
          </div>
        </div>
      )}
    </div>
  );
}
