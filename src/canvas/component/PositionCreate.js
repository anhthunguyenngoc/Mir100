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

  /** @type {[api.TPostPositions, Function]} */
  const [formData, setFormData] = useState({
    guid: value?.guid || null,
    name: value?.name || '',
    orientation: value?.orientation || 0,
    pos_x: value?.pos_x || 0,
    pos_y: value?.pos_y || 0,
    type_id: value?.type_id || null,
  });

  const handleChange = (props) => {
    setFormData((prev) => ({
      ...prev,
      ...props,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;

    const updatedData = {
      name: form['name']?.value,
      pos_x: Number(form['x-meter']?.value),
      pos_y: Number(form['y-meter']?.value),
      orientation: Number(form['orient']?.value),
      map_id: mapId,
      type_id: Number(formData.type_id),
    };

    // Update form data with the submitted values
    handleChange(updatedData);

    // Determine which API call to make based on mode
    if (mode === 1) {
      await fetchPostPosition(updatedData);
    } else if (mode === 2) {
      await fetchPutPosition(updatedData);
    }
  }

  const fetchPostPosition = async (data) => {
    try {
      const payload = {
        ...formData,
        ...data,
      };

      const { statusCode, data: responseData } =
        await api.postPositions(payload);
      if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
        setVisible(false);
        fetchCurrentMapPosition();
        setFormData({
          guid: null,
          name: '',
          orientation: 0,
          pos_x: 0,
          pos_y: 0,
          type_id: null,
        });
      }
    } catch (error) {
      console.log('Error post position:', error);
    }
  };

  const fetchPutPosition = async (data) => {
    try {
      const payload = {
        ...formData,
        ...data,
      };

      const { statusCode } = await api.putPosition(formData.guid, payload);

      if (statusCode === api.STATUS_CODE.SUCCESS_GET) {
        setVisible(false);
        fetchCurrentMapPosition();
        setFormData({
          guid: null,
          name: '',
          orientation: 0,
          pos_x: 0,
          pos_y: 0,
          type_id: null,
        });
      }
    } catch (error) {
      console.log('Error put position:', error);
    }
  };

  // Set the title based on mode
  useEffect(() => {
    if (mode === 1) {
      setTitle('Create position');
    } else if (mode === 2) {
      setTitle('Edit position');
    }
  }, [mode]);

  // Update form data when value prop changes
  useEffect(() => {
    if (!value) return;

    setFormData({
      guid: value.guid || null,
      name: value.name || '',
      orientation: value.orientation || 0,
      pos_x: value.pos_x || 0,
      pos_y: value.pos_y || 0,
      type_id: value.type_id || null,
    });
  }, [value]);

  // Setup position type options
  useEffect(() => {
    const filteredData = positionTypes.filter((item) =>
      Const.POSITION_TYPE_ID.includes(Number(item.id))
    );
    setTypeOptions(filteredData);
  }, [positionTypes]);

  // Find the default type value
  const getDefaultTypeValue = () => {
    if (formData.type_id) {
      const matched = typeOptions.find(
        (item) => Number(item.id) === Number(formData.type_id)
      );
      return matched ? { guid: matched.id, name: matched.name } : null;
    }

    return typeOptions.length > 0
      ? { guid: typeOptions[0].id, name: typeOptions[0].name }
      : null;
  };

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
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange({ name: e.target.value })}
            />
          </div>
          <div className="flex row full-width gap-frame">
            <div className="flex col full-width gap-5px">
              <label htmlFor="type">Type</label>
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
                defaultValue={getDefaultTypeValue()}
              />
            </div>
            <div className="flex col full-width gap-5px">
              <label htmlFor="orient">Orientation from X-axis</label>
              <input
                name="orient"
                type="number"
                value={formData.orientation || 0}
                onChange={(e) =>
                  handleChange({ orientation: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="flex row full-width gap-frame">
            <div className="flex col full-width gap-5px">
              <label htmlFor="x-meter">X coordinate in meters</label>
              <input
                name="x-meter"
                type="number"
                value={formData.pos_x || 0}
                onChange={(e) =>
                  handleChange({ pos_x: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex col full-width gap-5px">
              <label htmlFor="y-meter">Y coordinate in meters:</label>
              <input
                name="y-meter"
                type="number"
                value={formData.pos_y || 0}
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
