import { useEffect, useState } from 'react';

import * as Context from '../../context';
import * as Comps from '../../components';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as api from '../../api';

export const PositionCreate = ({ isVisible, setVisible, value, mode }) => {
  const { positionTypes, mapId, fetchCurrentMapPosition } =
    Context.useCanvasContext();

  const [title, setTitle] = useState(null);
  const [typeOptions, setTypeOptions] = useState([]);

  /** @type {[Array<api.TPostPositions>, Function]} */
  const [formData, setFormData] = useState({
    guid: value?.guid,
    name: value?.name,
    orientation: value?.orientation,
    pos_x: value?.pos_x,
    pos_y: value?.pos_y,
  });

  const handleChange = (props) => {
    setFormData((prev) => ({
      ...prev,
      ...props,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    const form = event.target;

    handleChange({
      name: form['name']?.value,
      pos_x: Number(form['x-meter']?.value),
      pos_y: Number(form['y-meter']?.value),
      orientation: Number(form['orient']?.value),
      map_id: mapId,
      type_id: Number(formData.type_id),
    });

    if (mode === 1) {
      fetchPostPosition();
    } else if (mode === 2) {
      fetchPutPosition();
    }
  }

  const fetchPostPosition = async () => {
    try {
      const { statusCode, data } = await api.postPositions(formData);
      if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
        setVisible(false);
        fetchCurrentMapPosition();
        setFormData(null);
      }
    } catch (error) {
      console.log('Error post mission');
    }
  };

  const fetchPutPosition = async () => {
    try {
      const { statusCode, data } = await api.putPosition(
        formData.guid,
        formData
      );

      if (statusCode === api.STATUS_CODE.SUCCESS_GET) {
        setVisible(false);
        fetchCurrentMapPosition();
        setFormData(null);
      }
    } catch (error) {
      console.log('Error put mission');
    }
  };

  useEffect(() => {
    if (mode === 1) {
      setTitle('Create position');
    } else if (mode === 2) {
      setTitle('Edit position');
    }
  }, [mode]);

  useEffect(() => {
    handleChange({
      guid: value?.guid,
      name: value?.name,
      orientation: value?.orientation,
      pos_x: value?.pos_x,
      pos_y: value?.pos_y,
    });
  }, [value]);

  useEffect(() => {
    const filteredData = positionTypes.filter((item) =>
      Const.POSITION_TYPE_ID.includes(Number(item.id))
    );
    setTypeOptions(filteredData);
  }, [positionTypes]);

  return (
    isVisible && (
      <>
        <div className="overlay"></div>
        <form
          onSubmit={handleSubmit}
          action="/submit"
          method="POST"
          className="flex col width-50per height-fit-content radius-5px gap-frame padding-frame absolute-pos translate-center dialog-zindex"
        >
          <div>
            <h2>{title}</h2>
          </div>
          <div>
            <label for="name">Name</label>
            <input
              name="name"
              type="text"
              value={formData?.name}
              onChange={(e) => handleChange({ name: e.target.value })}
            />
          </div>
          <div className="flex row full-width gap-frame">
            <div className="flex col full-width gap-5px">
              <label for="type">Type</label>
              <Comps.SelectionDropdown
                styleClass="full-height full-width align-center background"
                containerStyleClass="full-height"
                options={typeOptions.map((item) => ({
                  guid: item.id,
                  name: item.name,
                }))}
                placeHolderText="Type"
                iconColor={Const.Color.BUTTON}
                onChange={(v) => {
                  handleChange({ type_id: v.guid });
                }}
                defaultValue={
                  value.type_id
                    ? (() => {
                        const matched = typeOptions.find(
                          (item) => item.guid === value.guid
                        );
                        return matched
                          ? { guid: matched.id, name: matched.name }
                          : null;
                      })()
                    : typeOptions.length > 0
                      ? { guid: typeOptions[0].id, name: typeOptions[0].name }
                      : null
                }
              />
            </div>
            <div className="flex col full-width gap-5px">
              <label for="orient">Orientation from X-asis</label>
              <input
                name="orient"
                type="number"
                value={formData?.orientation}
                onChange={(e) =>
                  handleChange({ orientation: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="flex row full-width gap-frame">
            <div className="flex col full-width gap-5px">
              <label for="x-meter">X coordinate in meters</label>
              <input
                name="x-meter"
                type="number"
                value={formData?.pos_x}
                onChange={(e) =>
                  handleChange({ pos_x: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex col full-width gap-5px">
              <label for="y-meter">Y coordinate in meters:</label>
              <input
                name="y-meter"
                type="number"
                value={formData?.pos_y}
                onChange={(e) =>
                  handleChange({ pos_y: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex row gap-10px">
            <Comps.Button
              backgroundColor={Const.Color.BUTTON}
              borderColor={Const.Color.BUTTON}
              color={Const.Color.WHITE}
              text="OK"
              type="submit"
            />
            <Comps.Button
              backgroundColor={Const.Color.BUTTON}
              borderColor={Const.Color.BUTTON}
              color={Const.Color.WHITE}
              onClick={() => setVisible(false)}
              text="Use robot position"
              type="button"
            />
            <Comps.Button
              backgroundColor={Const.Color.LIGHT_BUTTON}
              borderColor={Const.Color.LIGHT_BUTTON}
              color={Const.Color.BLACK}
              onClick={() => setVisible(false)}
              text="Cancel"
              type="button"
            />
          </div>
        </form>
      </>
    )
  );
};
