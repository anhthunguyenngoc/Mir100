import { useEffect, useRef, useState } from 'react';
import './default-dashboard.css';
import Canvas from '../../../canvas/canvas';

import * as api from '../../../api';

export const DefaultDashboard = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /** @type {[Array<api.TGetStatus>, Function]} */
  const [robotStatus, setRobotStatus] = useState(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize(); // initial set
    window.addEventListener('resize', updateSize); // optional: for responsive

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const fetchRobotStatus = async () => {
      try {
        const { statusCode, data } = await api.getStatus();
        setRobotStatus(data);
      } catch (err) {
        console.error('Error fetching robot status:', err);
      }
    };

    fetchRobotStatus();
  }, []);

  return (
    <div id="content" className="content flex">
      <div className="content-header">
        <div className="row-5px">
          <div>Dashboard: Name</div>|<div>Contains: Number widget(s)</div>
        </div>

        <div className="row-5px">
          <div className="link">Open in DashboardDesigner</div>|
          <div className="link">Previous</div>|<div className="link">Next</div>
        </div>
      </div>

      <div className="top-content">
        <section id="robot-info">
          <ul>
            <li className="robot-info-title">
              <h2 id="robot-name">{robotStatus?.robot_name ?? '...'}</h2>
            </li>
            <li className="robot-info-text">
              Model
              <div id="robot-model">{robotStatus?.robot_model ?? '...'}</div>
            </li>
            <li className="robot-info-text">
              Serial number
              <div id="robot-serial">{robotStatus?.serial_number ?? '...'}</div>
            </li>
            <li className="robot-info-text">
              Battery percentage
              <div id="robot-battery">
                {robotStatus?.battery_percentage ?? '...'}
              </div>
            </li>
            <li className="robot-info-text">
              Remaining battery time
              <div id="robot-remaintime">
                {robotStatus?.battery_time_remaining ?? '...'}
              </div>
            </li>
            <li className="robot-info-text">
              Uptime
              <div id="robot-uptime">{robotStatus?.uptime ?? '...'}</div>
            </li>
            <li className="robot-info-text">
              Moved
              <div id="robot-moved">{robotStatus?.moved ?? '...'}</div>
            </li>
          </ul>
        </section>

        <section id="manual-control">
          <div className="manual-control-text">
            Select Manual control to control the robot manually.
          </div>
          <button id="control-btn" className="button" onClick="controlClick()">
            Manual control
          </button>
        </section>
      </div>

      <section ref={containerRef} id="map-canvas">
        <Canvas
          canvasW={dimensions.width - 50}
          canvasH={dimensions.height - 50 - 173.8 - 43.6}
          mapId={robotStatus?.map_id}
          // robotPosition={robotStatus?.position}
          robotPosition={{
            x: 100,
            y: 100,
          }}
        />
      </section>
    </div>
  );
};
