// import React, { useState, useEffect } from 'react';
// import ROSLIB from 'roslib';

// export const DefaultDashboard = () => {
//   const [ros, setRos] = useState(null); // ROS connection
//   const [joystickToken, setJoystickToken] = useState(null); // Joystick token

//   useEffect(() => {
//     let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
//     let port = window.location.protocol === 'https:' ? '443' : '9090';
//     let ip = '192.168.0.172';

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
