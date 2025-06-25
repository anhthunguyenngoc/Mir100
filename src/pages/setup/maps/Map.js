import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as Const from '../../../constant';
import { PATH } from '../../../router';
import * as api from '../../../api';
import * as Icons from '../../../components/icons/Icons';
import * as Comp from '../../../components';

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
      setMaps(Const.TestMaps);
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

  const verticalLineProps = {
    width: '2px',
    isVisible: true,
    height: '100%',
    color: Const.Color.WHITE,
    borderRadius: '5px',
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  return (
    <div id="map-content" className="content">
      <section className="gap-15px full-height">
        <div id="filter-container" className="flex space-between full-width">
          <div className="flex row gap-5px search-container">
            <input
              style={{ height: 'auto' }}
              placeholder="Write name to search by..."
              name="search"
              type="text"
            />
            <button className="button" onClick={() => {}}>
              <Icons.Search width="20px" height="20px" />
            </button>
          </div>
          <div className="flex row gap-5px">
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
              <span>Create map</span>
            </button>
          </div>
        </div>

        <div
          className="list-div flex col full-height"
          style={{ overflowY: 'auto' }}
        >
          <div className="map-card map-card-title flex row align-center radius-5px">
            <div className="map-icon padding-h-15px">
              <div className="fill-color-btn stroke-color-btn plus-btn-img" />
            </div>
            <Comp.VerticalLine {...verticalLineProps} />
            <div className="map-name width-70per padding-5px">
              <strong>Name</strong>
            </div>
            <Comp.VerticalLine {...verticalLineProps} />
            <div className="map-owner width-30per padding-5px flex justify-center">
              <span style={{ width: '70px', textAlign: 'center' }}>
                <strong>Created by</strong>
              </span>
            </div>
            <Comp.VerticalLine {...verticalLineProps} />
            <div className="map-actions flex row padding-15px gap-5px">
              <span style={{ width: '60px', textAlign: 'center' }}>
                <strong>Actions</strong>
              </span>
            </div>
          </div>
          {maps.map((map) => (
            <div
              className="map-card flex row align-center radius-5px"
              key={map.guid}
            >
              <div className="map-icon padding-h-15px">
                <Icons.MapItem className="fill-color-btn stroke-color-btn plus-btn-img" />
              </div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div className="map-name width-70per padding-5px">{map.name}</div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div className="map-owner width-30per padding-5px flex justify-center">
                <span className="map-owner-label">Created by:</span>
                <span style={{ minWidth: '70px', textAlign: 'center' }}>
                  {map.created_by_name}
                </span>
              </div>
              <Comp.VerticalLine {...verticalLineProps} />
              <div
                className="map-actions flex row padding-15px gap-10px flex justify-center"
                style={{ minWidth: '90px' }}
              >
                <Icons.Edit
                  width="25px"
                  height="25px"
                  onClick={() => navigate(PATH.edit_map(map.guid))}
                />
                <Icons.Delete
                  width="25px"
                  height="25px"
                  color={Const.Color.ERROR}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
