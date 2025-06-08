import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import * as Const from '../../../constant';
import { PATH } from '../../../router';
import * as api from '../../../api';
import { CanvasView } from 'canvas';
import './map.css';

export const MapEdit = () => {
  const navigate = useNavigate();
  const { guid } = useParams();

  /** @type {[api.TGetMap, Function]} */
  const [map, setMap] = useState(null);

  const fetchMap = async (guid) => {
    if (!guid) return;

    try {
      const { statusCode, data } = await api.getMap(guid);
      setMap(data);
    } catch (err) {
      console.error('Error fetching map:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchMap(guid);
  }, [guid]);

  return (
    <div className="content">
      <div className="flex col full-width gap-frame">
        <div className="flex row full-width align-center space-between">
          <div className="flex col gap-5px">
            <h1>{map?.name}</h1>
            <div className="row-5px">
              Edit and draw map.
              <button className="button help-btn">
                <img
                  className="help-btn-img"
                  alt="Help"
                  src="../../../images/help.svg"
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          <button className="button" onClick={() => navigate(-1)}>
            <img
              className="plus-btn-img"
              alt="Go back"
              src="../../../images/go-back.svg"
              loading="lazy"
            />
            Go back
          </button>
        </div>

        <section id="map-canvas">
          <CanvasView mapId={guid} isSpeedVisible={false} />
        </section>
      </div>
    </div>
  );
};
