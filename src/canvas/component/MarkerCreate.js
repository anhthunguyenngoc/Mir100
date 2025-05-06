import { useState } from 'react';

import * as Context from '../../context';
import * as Comps from '../../components';
import * as Const from '../../constant';
import * as Utils from '../utils';
import * as api from '../../api';

export const MarkerCreate = ({ isVisible, setVisible, value }) => {
  const { positionTypes, mapId, map } = Context.useCanvasContext();

  /** @type {[Array<api.TPostPositions>, Function]} */
  const [formData, setFormData] = useState({});

  const handleChange = (props) => {
    setFormData((prev) => ({
      ...prev,
      ...props,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành vi gửi mặc định

    const form = event.target;

    const realPos = Utils.getRealPosition(
      Number(form['x-meter']?.value),
      Number(form['y-meter']?.value),
      map
    );

    handleChange({
      name: form['name']?.value,
      pos_x: realPos.x,
      pos_y: realPos.y,
      orientation: Number(form['orient']?.value),
      map_id: mapId,
      type_id: Number(formData.type_id),
    });

    try {
      const { statusCode, data } = await api.postPositions(formData);
      if (statusCode === api.STATUS_CODE.SUCCESS_POST) {
        setVisible(false);
      }
    } catch (error) {
      console.log('Error post mission');
    }
  }

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
            <h2>Create maker</h2>
          </div>
          <div>
            <label for="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div className="flex row full-width gap-frame">
            <div className="full-width">
              <label for="type">Type</label>
              <Comps.SelectionDropdown
                styleClass="full-height full-width align-center background"
                containerStyleClass="full-height"
                options={positionTypes.map((item) => ({
                  guid: item.id,
                  name: item.name,
                }))}
                placeHolderText="Type"
                iconColor={Const.Color.BUTTON}
                onChange={(value) => {
                  handleChange({ type_id: value.guid });
                }}
              />
            </div>
            <div className="full-width">
              <label for="orient">Orientation from X-asis</label>
              <input name="orient" type="text" value={value.orientation} />
            </div>
          </div>
          <div className="flex row full-width gap-frame">
            <div className="full-width">
              <label for="x-meter">X coordinate in meters</label>
              <input name="x-meter" type="text" value={value.x} />
            </div>
            <div className="full-width">
              <label for="y-meter">Y coordinate in meters:</label>
              <input name="y-meter" type="text" value={value.y} />
            </div>
          </div>
          <div className="flex row full-width gap-frame">
            <div className="full-width">
              <label for="x-offset">X offset:</label>
              <input id="x-offset" name="x-offset" type="text" />
            </div>
            <div className="full-width">
              <label for="y-offset">Y offset</label>
              <input id="y-offset" name="y-offset" type="text" />
            </div>
          </div>
          <div>
            <label for="orient-offset">Orientation offset</label>
            <input id="orient-offset" name="orient-offset" type="text" />
          </div>
          <div>
            <label for="bar-length">Bar length</label>
            <input id="bar-length" name="bar-length" type="text" />
          </div>
          <div>
            <label for="bar-distance">Bar distance</label>
            <input id="bar-distance" name="bar-distance" type="text" />
          </div>
          <div className="flex row gap-10px">
            <Comps.Button
              backgroundColor={Const.Color.BUTTON}
              borderColor={Const.Color.BUTTON}
              color={Const.Color.WHITE}
              onClick={() => setVisible(false)}
              text="OK"
              type="submit"
            />
            <Comps.Button
              backgroundColor={Const.Color.BUTTON}
              borderColor={Const.Color.BUTTON}
              color={Const.Color.WHITE}
              onClick={() => setVisible(false)}
              text="Detect maker"
            />
            <Comps.Button
              backgroundColor={Const.Color.LIGHT_BUTTON}
              borderColor={Const.Color.LIGHT_BUTTON}
              color={Const.Color.BLACK}
              onClick={() => setVisible(false)}
              text="Cancel"
            />
          </div>
        </form>
      </>
    )
  );
};
