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

import React, { useRef, useState } from 'react';

// Component HorizontalScrollContainer cải tiến - không giới hạn chiều rộng
const HorizontalScrollContainer = ({
  children,
  height = '200px',
  className = '',
  showScrollbar = true,
  dragToScroll = true,
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!dragToScroll) return;

    setIsDragging(true);
    const container = containerRef.current;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragToScroll) return;

    e.preventDefault();
    const container = containerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  // Style cho container - key changes
  const containerStyle = {
    width: '100%', // Cố định 100% width
    height: height,
    overflowX: 'auto',
    overflowY: 'hidden',
    cursor: dragToScroll ? (isDragging ? 'grabbing' : 'grab') : 'default',
    scrollbarWidth: showScrollbar ? 'auto' : 'none',
    msOverflowStyle: showScrollbar ? 'auto' : 'none',
    WebkitScrollbar: showScrollbar ? {} : { display: 'none' },
    // Đảm bảo container không co lại
    flexShrink: 0,
    minWidth: 0, // Cho phép shrink nhưng không dưới 0
  };

  // CSS để ẩn scrollbar trên webkit browsers
  const scrollbarHideCSS = !showScrollbar
    ? `
    .horizontal-scroll-container::-webkit-scrollbar {
      display: none;
    }
  `
    : '';

  return (
    <>
      {scrollbarHideCSS && <style>{scrollbarHideCSS}</style>}
      <div
        ref={containerRef}
        className={`horizontal-scroll-container ${className}`}
        style={containerStyle}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
    </>
  );
};

// Component demo với nhiều ví dụ khác nhau
const DemoApp = () => {
  // Data cho các demo khác nhau
  const colorCards = [
    { id: 1, title: 'Red Card', color: '#ef4444' },
    { id: 2, title: 'Blue Card', color: '#3b82f6' },
    { id: 3, title: 'Green Card', color: '#22c55e' },
    { id: 4, title: 'Purple Card', color: '#a855f7' },
    { id: 5, title: 'Yellow Card', color: '#eab308' },
    { id: 6, title: 'Pink Card', color: '#ec4899' },
    { id: 7, title: 'Indigo Card', color: '#6366f1' },
    { id: 8, title: 'Teal Card', color: '#14b8a6' },
    { id: 9, title: 'Orange Card', color: '#f97316' },
    { id: 10, title: 'Cyan Card', color: '#06b6d4' },
  ];

  const products = [
    { id: 1, name: 'MacBook Pro', price: '$2,499', image: '💻' },
    { id: 2, name: 'iPhone 15', price: '$999', image: '📱' },
    { id: 3, name: 'iPad Air', price: '$599', image: '📲' },
    { id: 4, name: 'AirPods Pro', price: '$249', image: '🎧' },
    { id: 5, name: 'Apple Watch', price: '$399', image: '⌚' },
    { id: 6, name: 'iMac', price: '$1,299', image: '🖥️' },
    { id: 7, name: 'Mac Mini', price: '$699', image: '⚡' },
    { id: 8, name: 'Studio Display', price: '$1,599', image: '🖨️' },
  ];

  // Styles
  const appStyle = {
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sectionStyle = {
    marginBottom: '48px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '8px',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '32px',
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#334155',
  };

  const cardContainerStyle = {
    display: 'flex',
    gap: '20px',
    paddingBottom: '16px', // Thêm padding để tránh cut-off
    // Key: Không set width để cho phép mở rộng không giới hạn
  };

  const cardStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    borderRadius: '12px',
    padding: '24px',
    minWidth: '200px', // Đảm bảo card có kích thước tối thiểu
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    flexShrink: 0, // Không cho phép card bị co lại
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  });

  const productCardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    minWidth: '180px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    flexShrink: 0,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  };

  const formContainerStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
  };

  const conditionRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    minWidth: '600px', // Đảm bảo form có độ rộng tối thiểu
    flexShrink: 0,
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    minWidth: '120px',
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '100px',
  };

  const buttonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  };

  const infoBoxStyle = {
    background: 'linear-gradient(to right, #dbeafe, #e0e7ff)',
    border: '1px solid #3b82f6',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '32px',
  };

  return (
    <div style={appStyle}>
      <div>
        {/* Demo 3: Complex Form */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>📝 Complex Form Demo</h2>
          <HorizontalScrollContainer
            height="140px"
            showScrollbar={true}
            dragToScroll={true}
          >
            <div style={formContainerStyle}>
              <div
                style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
              >
                {/* Condition 1 */}
                <div style={conditionRowStyle}>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>(</span>
                  <input
                    type="checkbox"
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#6b7280',
                    }}
                  >
                    !
                  </span>
                  <select style={selectStyle}>
                    <option value="">-- So sánh --</option>
                    <option value="battery">battery</option>
                    <option value="mission_queue_length">
                      mission_queue_length
                    </option>
                    <option value="plc_register">plc_register</option>
                    <option value="io_module">io_module</option>
                  </select>
                  <select style={selectStyle}>
                    <option value="">-- Toán tử --</option>
                    <option value="==">=</option>
                    <option value="!=">!=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    placeholder="Giá trị..."
                    type="text"
                    style={inputStyle}
                  />
                  <button style={buttonStyle}>Xóa</button>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>)</span>
                </div>

                {/* Logical Operator */}
                <div
                  style={{
                    padding: '8px 16px',
                    border: '2px solid #3b82f6',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    cursor: 'pointer',
                  }}
                >
                  &&
                </div>

                {/* Condition 2 */}
                <div style={conditionRowStyle}>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>(</span>
                  <input
                    type="checkbox"
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#6b7280',
                    }}
                  >
                    !
                  </span>
                  <select style={selectStyle}>
                    <option value="">-- So sánh --</option>
                    <option value="battery">battery</option>
                    <option value="mission_queue_length">
                      mission_queue_length
                    </option>
                    <option value="plc_register">plc_register</option>
                    <option value="io_module">io_module</option>
                  </select>
                  <select style={selectStyle}>
                    <option value="">-- Toán tử --</option>
                    <option value="==">=</option>
                    <option value="!=">!=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    placeholder="Giá trị..."
                    type="text"
                    style={inputStyle}
                  />
                  <button style={buttonStyle}>Xóa</button>
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>)</span>
                </div>

                {/* Add More Button */}
                <button
                  style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  + Thêm điều kiện
                </button>
              </div>
            </div>
          </HorizontalScrollContainer>
        </div>

        {/* Code Example */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>💻 Usage Example</h2>
          <div
            style={{
              background: '#1e293b',
              color: '#e2e8f0',
              padding: '20px',
              borderRadius: '12px',
              fontFamily: 'Monaco, Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              overflow: 'auto',
            }}
          >
            <pre>{`<HorizontalScrollContainer 
  height="200px" 
  showScrollbar={true}
  dragToScroll={true}
>
  <div style={{ display: 'flex', gap: '16px' }}>
    {/* Nội dung của bạn - có thể mở rộng không giới hạn */}
    {items.map(item => (
      <div key={item.id} style={{ minWidth: '200px', flexShrink: 0 }}>
        {item.content}
      </div>
    ))}
  </div>
</HorizontalScrollContainer>`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoApp;
