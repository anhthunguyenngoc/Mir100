import { useEffect, useRef, useState } from 'react';
import './default-dashboard.css';
import { CanvasView } from 'canvas';
import * as Context from 'context';

export const DefaultDashboard = () => {
  const { robotStatus } = Context.useAppContext();

  return (
    <div id="content" className="content flex row">
      <div className="flex col gap-content height-fit-content">
        <section className="flex col height-fit-content">
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
                {robotStatus?.battery_percentage.toFixed(2) ?? '...'}
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
      </div>

      <section id="map-canvas">
        <CanvasView mapId={robotStatus?.map_id} />
      </section>
    </div>
  );
};
