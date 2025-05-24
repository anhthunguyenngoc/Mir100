import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as Const from '../../../constant';
import { PATH } from '../../../router';
import * as api from '../../../api';
import * as Icons from '../../../components/icons/Icons';

export const Map = () => {
  const navigate = useNavigate();

  /** @type {[Array<api.TDetailedMap>, Function]} */
  const [maps, setMaps] = useState([]);

  const fetchMaps = async () => {
    try {
      const { statusCode, data } = await api.getMaps();

      const detailMaps = await Promise.all(
        data.map(async (map) => {
          const detailMap = await fetchMap(map.guid);
          return {
            ...map,
            ...(detailMap || {}),
          };
        })
      );

      setMaps(detailMaps);
    } catch (err) {
      console.error('Error fetching list map:', err);
    }
  };

  const fetchMap = async (guid) => {
    if (!guid) return;

    try {
      const { statusCode, data } = await api.getMap(guid);
      return data;
    } catch (err) {
      console.error('Error fetching map:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  return (
    <div id="map-content" className="content">
      <section>
        <div id="filter-container" className="flex space-between full-width">
          <div className="row-5px">
            <div className="row-5px">
              <label for="filter">Filter:</label>
              <input
                id="filter"
                placeholder="Write name to filter by..."
                name="filter"
                type="text"
              />
            </div>
            <div id="number-of-item">Num item(s) found</div>
          </div>
          <div className="flex row align-center">
            <div className="row-5px">
              <button
                id="create-map"
                className="button flex row gap-5px"
                onClick={() => {
                  navigate(PATH.create_map);
                }}
              >
                <img
                  className="plus-btn-img"
                  alt="Create map"
                  src={Const.ImageSrc.plus}
                  loading="lazy"
                />
                Create map
              </button>
              <button className="button flex row gap-5px outline-btn">
                <Icons.ClearFilter iconColorClass={'fill-color-btn'} />
                Clear filters
              </button>
            </div>
          </div>
        </div>

        <table id="map-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}></th>
              <th style={{ width: '70%' }}>Name</th>
              <th style={{ width: '200px' }}>Created by</th>
              <th style={{ width: '200px' }}>Functions</th>
            </tr>
          </thead>
          <tbody id="list-map">
            {maps.map((map) => (
              <tr>
                <td>
                  <svg
                    className="fill-color-btn stroke-color-btn plus-btn-img"
                    width="64px"
                    height="64px"
                    viewBox="0 -32 576 576"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z" />
                    </g>
                  </svg>
                </td>
                <td>{map.name}</td>
                <td style={{ textAlign: 'center' }}>Username</td>
                <td>
                  <div className="row-5px">
                    <button
                      id="edit-map"
                      className="button"
                      onClick={() => navigate(PATH.edit_map(map.guid))}
                    >
                      <img
                        className="size-20px"
                        alt="Edit mission"
                        src={Const.ImageSrc.edit}
                        loading="lazy"
                      />
                    </button>
                    <button className="button del-btn" id="del-map">
                      <img
                        className="size-20px"
                        alt="Create map groups"
                        src={Const.ImageSrc.delete}
                        loading="lazy"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
