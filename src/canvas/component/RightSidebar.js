import React, { useState } from 'react';
import * as Const from '../../constant';
import * as Comp from '../../components';

const getOptionByType = (type, name) => {
  const options = Object.values(Const.LineName).includes(name)
    ? Const.PathOptions
    : Object.values(Const.ZoneName).includes(name)
      ? Const.ZoneOptions
      : [];

  const option = type
    ? options.find((item) => item.guid === type)
    : { guid: null, name: 'Type unselect' };

  // Nếu không tìm thấy
  return { option, options };
};

const TypeSection = ({ name, type }) => {
  const { option, options } = getOptionByType(type, name);

  return (
    <div className="flex col gap-5px">
      <span>Type</span>
      <div className="flex row type-dropdown">
        <Comp.SelectionDropdown
          containerStyleClass="full-width"
          styleClass="full-width align-center height-input background"
          placeHolderText={option.name}
          options={options}
          iconColor={Const.Color.BUTTON}
        />
      </div>
    </div>
  );
};

const AlignmentSection = () => {
  return (
    <div className="flex col gap-15px">
      {/* ============ALIGNMENT============ */}
      <div className="flex col gap-5px">
        <span>Alignment</span>
        <div className="flex row gap-15px">
          <LeftSidebarBtnList arr={Const.alignOption.slice(0, 3)} />
          <LeftSidebarBtnList arr={Const.alignOption.slice(3, 6)} />
        </div>
      </div>

      {/* ============TRANSFORM============ */}
      <div className="flex col gap-5px">
        <span>Transform</span>
        <div className="flex row gap-15px">
          <Comp.InputNumber placeholder={'Rotation'} />
          <LeftSidebarBtnList arr={Const.transformOption} />
        </div>
      </div>
    </div>
  );
};

const PositionSection = ({
  shape,
  handleUpdateShape,
  saveState,
  dropdownData,
  handleDropdownOpen,
  onSelectItem,
  onHoverItem,
}) => {
  return (
    <div className="flex col gap-15px">
      {componentKeyList(shape.name).map((key) => {
        return (
          <ShapeComponent
            shape={shape}
            componentKey={key}
            handleUpdateShape={handleUpdateShape}
            saveState={saveState}
            dropdownData={dropdownData}
            handleDropdownOpen={handleDropdownOpen}
            onSelectItem={onSelectItem}
            onHoverItem={onHoverItem}
          />
        );
      })}
    </div>
  );
};

const DimensionsSection = ({ shape, handleUpdateShape, saveState }) => {
  return (
    <div className="flex col gap-5px">
      <span>Dimensions</span>
      <div className="flex row gap-15px">
        <Comp.InputNumber
          placeholder={'Width'}
          value={shape.width}
          onChange={(e) => {
            handleUpdateShape(shape.id, {
              width: Number(e.target.value),
            });
            saveState();
          }}
          imgSrc="letterW"
        />
        <Comp.InputNumber
          placeholder={'Height'}
          value={shape.height}
          onChange={(e) => {
            handleUpdateShape(shape.id, {
              height: Number(e.target.value),
            });
            saveState();
          }}
          imgSrc="letterH"
        />
      </div>
    </div>
  );
};

const DirectionSection = ({ shape, handleUpdateShape, saveState }) => {
  return (
    // ============DIRECTION============
    <div className="flex col gap-5px">
      <span>Direction</span>
      <div className="flex row gap-15px">
        <LeftSidebarBtnList
          arr={Const.LineDirectionOption}
          active={shape.direction}
          onClick={(id) => {
            handleUpdateShape(shape.id, { direction: id });
            saveState();
          }}
        />
        <div className="flex row gap-5px width-50per"></div>
      </div>
    </div>
  );
};

const horizonLineProps = {
  height: '1px',
  color: 'white',
  borderRadius: '2px',
  isVisible: true,
};

export const RightSidebar = ({
  shape,
  handleUpdateShape,
  saveState,
  sidebarHeight,
  dropdownData,
  handleDropdownOpen,
  onSelectItem,
  onHoverItem,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="right-info-container">
      {!visible &&
        (shape ? (
          <div
            className="right-info-showcontent border-left"
            style={{ height: sidebarHeight }}
          >
            <div className="flex col">
              <Comp.ImageButton
                className="left-sidebar-btn"
                imageId={'hideRightbar'}
                imageclassName={'size-20px'}
                onClick={() => setVisible(true)}
              />
            </div>
            {shape.type && shape.name && (
              <>
                <TypeSection name={shape.name} type={shape.type} />
                <Comp.HorizonLine {...horizonLineProps} />
              </>
            )}
            {shape.startP && shape.endP && shape.isDrawing && (
              <>
                <AlignmentSection />
                <Comp.HorizonLine {...horizonLineProps} />
              </>
            )}

            {shape.startP && (
              <>
                <PositionSection
                  shape={shape}
                  handleUpdateShape={handleUpdateShape}
                  saveState={saveState}
                  dropdownData={dropdownData}
                  handleDropdownOpen={handleDropdownOpen}
                  onSelectItem={onSelectItem}
                  onHoverItem={onHoverItem}
                />

                <Comp.HorizonLine {...horizonLineProps} />
              </>
            )}

            {shape.width && shape.height && (
              <>
                <DimensionsSection
                  shape={shape}
                  handleUpdateShape={handleUpdateShape}
                  saveState={saveState}
                />

                <Comp.HorizonLine {...horizonLineProps} />
              </>
            )}
            {shape.type == 'path' && (
              <>
                <DirectionSection
                  shape={shape}
                  handleUpdateShape={handleUpdateShape}
                  saveState={saveState}
                />
              </>
            )}
          </div>
        ) : (
          <div className="right-info-showcontent">
            <div className="flex col">
              <Comp.ImageButton
                className="left-sidebar-btn"
                imageId={'hideRightbar'}
                imageclassName={'size-20px'}
                onClick={() => setVisible(true)}
              />
            </div>
          </div>
        ))}

      {visible && (
        <div className="right-info-hidecontent border">
          <Comp.ImageButton
            className="left-sidebar-btn"
            onClick={() => setVisible(false)}
            imageId={'showRightbar'}
            imageclassName={'size-20px'}
          />
        </div>
      )}
    </div>
  );
};

const LeftSidebarBtnList = ({ arr, active, onClick }) => {
  return (
    <div className="flex row width-50per gap-5px">
      {arr.map((item) => {
        return (
          <Comp.ImageButton
            className={`tool-info-btn icon-btn radius-5px center height-40px full-width ${active === item.id ? `selected` : ``}`}
            imageId={item.imgSrc}
            imageclassName={'size-20px'}
            onClick={() => onClick?.(item.id)}
          />
        );
      })}
    </div>
  );
};

//SHAPE_COMPONENT_KEY
const SCK = {
  STARTP: 'startP',
  ENDP: 'endP',
  CENTERP: 'centerP',
  MIDP: 'midP',
  RADIUS: 'radius',
  ANGLE: 'angle',
  CLOCKWISE: 'clockwise',
  START_END_ANGLE: 'start-end-Angle',
  CONTACT_POINT: 'contactPoint',
};

const componentKeyList = (name) => {
  switch (name) {
    case Const.ShapeName.LINE:
      return [SCK.STARTP, SCK.ENDP];
    case Const.ShapeName.ARC:
      return [
        SCK.STARTP,
        SCK.ENDP,
        SCK.CENTERP,
        SCK.MIDP,
        SCK.RADIUS,
        SCK.ANGLE,
        SCK.CLOCKWISE,
        SCK.START_END_ANGLE,
      ];
    case Const.ShapeName.ZIGZAG:
      return [SCK.STARTP, SCK.MIDP, SCK.ENDP, SCK.RADIUS];
    case Const.ShapeName.TANGENT:
      return [SCK.CONTACT_POINT];
    case Const.ShapeName.ULINE:
      return [SCK.STARTP, SCK.ENDP, SCK.RXY];
    case Const.ShapeName.SPLINE:
      return [SCK.STARTP, SCK.ENDP];
    case Const.ShapeName.CIRCLE:
      return [SCK.STARTP, SCK.ENDP];
    default:
      return [SCK.STARTP, SCK.ENDP];
  }
};

const ShapeComponent = ({
  shape,
  componentKey,
  handleUpdateShape,
  saveState,
  dropdownData,
  handleDropdownOpen,
  onSelectItem,
  onHoverItem,
}) => {
  switch (componentKey) {
    case SCK.STARTP:
      return (
        shape.startP && (
          <div className="flex col gap-5px">
            Start
            <div className="flex col gap-5px">
              <Comp.SearchableDropDown
                dropdownData={dropdownData}
                handleDropdownOpen={handleDropdownOpen}
                onSelectItem={(item) => {
                  if (item?.value) {
                    onSelectItem(item.value, {
                      startP: { x: item.value.x, y: item.value.y },
                    });
                  }
                }}
                onHoverItem={(item) => {
                  if (item?.value) {
                    onHoverItem(item.value, {
                      startP: { x: item.value.x, y: item.value.y },
                    });
                  }
                }}
              />
              <div className="flex row gap-5px">
                <Comp.InputNumber
                  placeholder="Start X"
                  value={shape.startP.x}
                  onChange={(e) => {
                    handleUpdateShape(shape.id, {
                      startP: { ...shape.startP, x: Number(e.target.value) },
                    });
                    saveState();
                  }}
                  imgSrc="letterX"
                />
                <Comp.InputNumber
                  placeholder="Start Y"
                  value={shape.startP.y}
                  onChange={(e) => {
                    handleUpdateShape(shape.id, {
                      startP: { ...shape.startP, y: Number(e.target.value) },
                    });
                    saveState();
                  }}
                  imgSrc="letterY"
                />
              </div>
            </div>
          </div>
        )
      );

    case SCK.ENDP:
      return (
        <div className="flex col gap-5px">
          End
          <div className="flex col gap-5px">
            <Comp.SearchableDropDown
              dropdownData={dropdownData}
              handleDropdownOpen={handleDropdownOpen}
              onSelectItem={(item) => {
                if (item?.value) {
                  onSelectItem(item.value, {
                    endP: { x: item.value.x, y: item.value.y },
                  });
                }
              }}
              onHoverItem={(item) => {
                if (item?.value) {
                  onHoverItem(item.value, {
                    endP: { x: item.value.x, y: item.value.y },
                  });
                }
              }}
            />
            <div className="flex row gap-5px">
              <Comp.InputNumber
                placeholder="End X"
                value={shape.endP?.x}
                onChange={(e) => {
                  if (shape.endP) {
                    handleUpdateShape(shape.id, {
                      endP: { ...shape.endP, x: Number(e.target.value) },
                    });
                    saveState();
                  }
                }}
                imgSrc="letterX"
              />
              <Comp.InputNumber
                placeholder="End Y"
                value={shape.endP?.y}
                onChange={(e) => {
                  if (shape.endP) {
                    handleUpdateShape(shape.id, {
                      endP: { ...shape.endP, y: Number(e.target.value) },
                    });
                    saveState();
                  }
                }}
                imgSrc="letterY"
              />
            </div>
          </div>
        </div>
      );

    case SCK.CENTERP:
      return (
        shape.centerP && (
          <div className="flex col gap-5px">
            Center
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="Center X"
                value={shape.centerP.x}
                imgSrc="letterX"
              />
              <Comp.InputNumber
                placeholder="Center Y"
                value={shape.centerP.y}
                imgSrc="letterY"
              />
            </div>
          </div>
        )
      );

    case SCK.MIDP:
      return (
        shape.midP && (
          <div className="flex col gap-5px">
            Middle
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="Mid X"
                value={shape.midP.x}
                imgSrc="letterX"
              />
              <Comp.InputNumber
                placeholder="Mid Y"
                value={shape.midP.y}
                imgSrc="letterY"
              />
            </div>
          </div>
        )
      );

    case SCK.RADIUS:
      return (
        shape.radius && (
          <div className="flex col gap-5px">
            Radius
            <div className="flex row gap-15px">
              <Comp.InputNumber placeholder="Radius" value={shape.radius} />
            </div>
          </div>
        )
      );

    case SCK.ANGLE:
      return (
        <div className="flex col gap-5px">
          Angle
          <div className="flex row gap-15px">
            <Comp.InputNumber placeholder="Angle" value={shape.angle} />
          </div>
        </div>
      );

    case SCK.CLOCKWISE:
      return (
        shape.clockwise && (
          <div className="flex col gap-5px">
            Clockwise
            <div className="flex row gap-15px">
              <Comp.ToggleSwitch isOn={shape.clockwise} />
            </div>
          </div>
        )
      );

    case SCK.START_END_ANGLE:
      return (
        shape.startAngle &&
        shape.endAngle && (
          <div className="flex col gap-5px">
            Start Angle - End Angle
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="startAngle"
                value={shape.startAngle}
              />
              <Comp.InputNumber placeholder="endAngle" value={shape.endAngle} />
            </div>
          </div>
        )
      );

    case SCK.CONTACT_POINT:
      return (
        shape.contactPoint && (
          <div className="flex col gap-5px">
            Clockwise
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="ContactPoint X"
                value={shape.contactPoint.x}
                imgSrc="letterX"
              />
              <Comp.InputNumber
                placeholder="ContactPoint Y"
                value={shape.contactPoint.y}
                imgSrc="letterY"
              />
            </div>
          </div>
        )
      );

    case SCK.RXY:
      return (
        shape.rx &&
        shape.ry && (
          <div className="flex col gap-5px">
            Radius
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="Rx"
                value={shape.rx}
                imgSrc="letterX"
              />
              <Comp.InputNumber
                placeholder="Ry"
                value={shape.ry}
                imgSrc="letterY"
              />
            </div>
          </div>
        )
      );
  }
};
