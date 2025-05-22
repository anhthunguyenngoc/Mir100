import React, { useState } from 'react';
import * as Constant from '../../constant';
import * as Components from '../../components';
import * as CanvasComponents from '../../canvas/component';

export const LeftSidebar = ({
  shapes,
  handleUpdateShape,
  layers,
  setLayers,
  sidebarHeight,
}) => {
  const [visible, setVisible] = useState(true);

  const handleLayerClick = (layerId) => {
    setLayers(
      layers.map((layer) =>
        layer.id === layerId
          ? { ...layer, selected: true }
          : { ...layer, selected: false }
      )
    );
  };

  const handleShapeClick = (shapeId) => {
    shapes.map((shape) => {
      handleUpdateShape(shape.id, { selected: false });
    });
    handleUpdateShape(shapeId, { selected: true });
  };

  // Thêm một lớp mới
  const addLayer = () => {
    const layersLength = layers.length;
    const newLayer = {
      id: layers.length,
      name: `New layer ${layersLength}`,
      selected: false,
      shapes: [],
    };
    setLayers([...layers, newLayer]);
  };

  return (
    <div className="left-info-container">
      {!visible && (
        <div
          className="left-info-showcontent border-right"
          style={{ height: sidebarHeight }}
        >
          <div className="flex col" style={{ alignItems: 'flex-end' }}>
            <button
              className="left-sidebar-btn"
              onClick={() => setVisible(true)}
            >
              <img
                className="size-20px"
                alt="Hide left sidebar"
                src={Constant.ImageSrc['hideLeftbar']}
                loading="lazy"
              />
            </button>
          </div>
          <CanvasComponents.DropdownList
            title="Layers"
            datalist={layers}
            addBtnVisible={true}
            addBtnOnClick={addLayer}
            itemOnClick={handleLayerClick}
          />
          <Components.HorizonLine
            height="1px"
            color="white"
            borderRadius="2px"
            isVisible={true}
          />
          <CanvasComponents.DropdownList
            title="Shapes"
            datalist={shapes.map((shape) => ({
              id: shape.id,
              name: shape.groupName + ' ' + shape.id,
              selected: shape.selected,
            }))}
            addBtnVisible={false}
            itemOnClick={handleShapeClick}
          />
        </div>
      )}

      {visible && (
        <div className="left-info-hidecontent border">
          <button
            className="left-sidebar-btn"
            onClick={() => setVisible(false)}
          >
            <img
              className="size-20px"
              alt="Show left sidebar"
              src={Constant.ImageSrc['showLeftbar']}
              loading="lazy"
            />
          </button>
        </div>
      )}
    </div>
  );
};
