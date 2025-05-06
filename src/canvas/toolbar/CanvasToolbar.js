import { useState } from 'react';

import './toolbar.css';
import { VerticalLine } from '../../components/VerticalLine';
import {
  SmallToolButton,
  BigToolButton,
  SelectionDropdown,
} from '../../components';
import * as Const from '../../constant';

const verticalLine = {
  width: '1px',
  color: 'white',
  borderRadius: '2px',
};

export const CanvasToolbar = ({
  toggleMode,
  copyShape,
  cutShape,
  removeShape,
  groupShape,
  ungroupShape,
  defaultCursor,
  pasteShape,
  undo,
  redo,
  undoActive,
  redoActive,
  setLineType,
  setZoneType,
  lineType,
  zoneType,
  copyActive,
  hasShapeSelected,
  editable,
  setEditable,
}) => {
  const [selectOptions, setSelectOptions] = useState(Const.select);
  const [lineOptions, setLineOptions] = useState(Const.line);
  const [zlineOptions, setZlineOptions] = useState(Const.zline);
  const [arcOptions, setArcOptions] = useState(Const.arc);
  const [tangentOptions, setTangentOptions] = useState(Const.tangent);
  const [splineOptions, setSplineOptions] = useState(Const.spline);
  const [ulineOptions, setUlineOptions] = useState(Const.uline);
  const [pathOptions, setPathOptions] = useState(Const.path);
  const [selectionOptions, setSelectionOptions] = useState(Const.selection);
  const [clipBoardOptions, setClipBoardOptions] = useState(Const.clipBoard);
  const [elipOptions, setElipOptions] = useState(Const.elip);
  const [circleOptions, setCircleOptions] = useState(Const.circle);
  const [freeShapeOptions, setFreeShapeOptions] = useState(Const.freeShape);
  const [zoneOptions, setZoneOptions] = useState(Const.zone);
  const [groupOptions, setGroupOptions] = useState(Const.group);

  const activeSelectOption =
    selectOptions.find((item) => item.isActived) || selectOptions[0];

  const setOptionsMap = {
    copy: copyShape,
    cut: cutShape,
    remove: removeShape,
    line: setLineOptions,
    zline: setZlineOptions,
    arc: setArcOptions,
    tangent: setTangentOptions,
    spline: setSplineOptions,
    uline: setUlineOptions,
    elip: setElipOptions,
    circle: setCircleOptions,
    freeShape: setFreeShapeOptions,
    group: groupShape,
    ungroup: ungroupShape,
    defaultCursor: defaultCursor,
  };

  return editable ? (
    <div>
      <div className="flex row" style={{ marginBottom: '1px', gap: '1px' }}>
        <button
          className="icon-btn"
          style={{
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            width: '79.9px',
          }}
          onClick={() => setEditable(false)}
        >
          <img className="size-20px" src={Const.ImageSrc['save']}></img>
        </button>
        <button
          className={`icon-btn ${!undoActive ? 'inactive' : ''}`}
          style={{ width: '79.9px' }}
          onClick={undo}
        >
          <img className="size-20px" src={Const.ImageSrc['undo']}></img>
        </button>
        <button
          className={`icon-btn ${!redoActive ? 'inactive' : ''}`}
          style={{
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            width: '79.9px',
          }}
          onClick={redo}
        >
          <img className="size-20px" src={Const.ImageSrc['redo']}></img>
        </button>
      </div>
      <div
        className="toolbar-container sidebar_background radius-5px"
        style={{ marginBottom: '5px' }}
      >
        <div className="height-fit-content width-fit-content flex col gap-15px">
          <div className="height-fit-content width-fit-content flex row gap-10px">
            <ul className="center col padding-10px gap-5px">
              <BigToolButton
                id={activeSelectOption.id}
                alt={activeSelectOption.alt}
                imgSrc={activeSelectOption.imgSrc}
                options={selectOptions}
                toggleMode={toggleMode}
                setOptions={setSelectOptions}
              />
            </ul>

            <ul className="height-fit-content width-fit-content flex col gap-5px">
              {selectionOptions.map((option) => {
                const setOptionFunc = setOptionsMap[option.id] || (() => {});

                return (
                  <SmallToolButton
                    id={option.id}
                    alt={option.alt}
                    imageSrc={option.imgSrc}
                    showExpand={option.showExpand}
                    setOptions={setSelectionOptions}
                    onClick={setOptionFunc}
                  />
                );
              })}
            </ul>
          </div>
          <span className="light-text center">Selection</span>
        </div>

        <VerticalLine {...verticalLine} />

        <div className="height-fit-content width-fit-content flex col gap-15px">
          <div className="height-fit-content width-fit-content flex row gap-10px">
            <ul className="center col padding-10px gap-5px">
              <BigToolButton
                id="paste"
                alt="Paste"
                imgSrc="paste"
                onClick={pasteShape}
                options={selectOptions}
                isActive={copyActive}
              />
            </ul>

            <ul className="height-fit-content width-fit-content flex col gap-5px">
              {clipBoardOptions.map((option) => {
                const setOptionFunc = setOptionsMap[option.id] || (() => {}); // Nếu không có thì dùng function rỗng

                return (
                  <SmallToolButton
                    id={option.id}
                    alt={option.alt}
                    imageSrc={option.imgSrc}
                    showExpand={option.showExpand}
                    setOptions={setClipBoardOptions}
                    onClick={setOptionFunc}
                    isActive={hasShapeSelected}
                  />
                );
              })}
            </ul>
          </div>
          <span className="light-text center">Clipboard</span>
        </div>

        <VerticalLine {...verticalLine} />

        <div className="width-fit-content flex col gap-15px">
          <ul className="oneline-width full-height width-fit-content gap-5px">
            {pathOptions.map((option) => {
              const setOptionFunc = setOptionsMap[option.id] || (() => {}); // Nếu không có thì dùng function rỗng

              return (
                <SmallToolButton
                  key={option.id}
                  id={option.id}
                  alt={option.alt}
                  imageSrc={option.imgSrc}
                  toggleMode={toggleMode}
                  showExpand={option.showExpand}
                  options={option.options}
                  setOptions={setOptionFunc} // Truyền hàm set tương ứng
                  isActive={!!lineType}
                />
              );
            })}
          </ul>
          <SelectionDropdown
            onChange={(value) => setLineType(value.guid)}
            placeHolderText="No type selected"
            options={Const.PathOptions}
            containerStyleClass="flex justify-center"
            styleClass="path-zone-dropdown"
            iconColor={Const.Color.WHITE}
          />
        </div>

        <VerticalLine {...verticalLine} />

        <div className="flex col gap-15px" style={{ width: '175px' }}>
          <ul className="col2-oneline-width full-height width-fit-content gap-5px">
            {zoneOptions.map((option) => {
              const setOptionFunc = setOptionsMap[option.id] || (() => {}); // Nếu không có thì dùng function rỗng

              return (
                <SmallToolButton
                  key={option.id}
                  id={option.id}
                  alt={option.alt}
                  imageSrc={option.imgSrc}
                  toggleMode={toggleMode}
                  showExpand={option.showExpand}
                  options={option.options}
                  setOptions={setOptionFunc} // Truyền hàm set tương ứng
                  isActive={!!zoneType}
                />
              );
            })}
          </ul>
          <SelectionDropdown
            onChange={(value) => setZoneType(value.guid)}
            placeHolderText="No type selected"
            options={Const.ZoneOptions}
            containerStyleClass="flex justify-center"
            styleClass="path-zone-dropdown"
            iconColor={Const.Color.WHITE}
          />
        </div>

        <VerticalLine {...verticalLine} />

        <div className="width-fit-content flex col gap-15px">
          <ul className="oneline-width full-height width-fit-content gap-5px">
            {groupOptions.map((option) => {
              const onOptionClick = setOptionsMap[option.id] || (() => {});

              return (
                <SmallToolButton
                  id={option.id}
                  alt={option.alt}
                  imageSrc={option.imgSrc}
                  showExpand={option.showExpand}
                  setOptions={setGroupOptions}
                  onClick={onOptionClick}
                />
              );
            })}
          </ul>
          <span className="light-text center">Group</span>
        </div>

        <VerticalLine {...verticalLine} />

        <div className="width-fit-content flex col gap-15px">
          <ul className="oneline-width full-height width-fit-content gap-5px"></ul>
          <span className="light-text center">Import</span>
        </div>

        <VerticalLine {...verticalLine} />

        <div className="width-fit-content flex col gap-15px">
          <ul className="oneline-width full-height width-fit-content gap-5px"></ul>
          <span className="light-text center">Export</span>
        </div>

        {/* <button onClick={() => toggleDrawingMode("line")}>
                {drawingMode === "line" ? "Hủy vẽ Line" : "Vẽ Line"}
            </button>
            <button onClick={() => toggleDrawingMode("arc")}>
                {drawingMode === "arc" ? "Hủy vẽ Arc" : "Vẽ Arc"}
            </button> */}
      </div>
    </div>
  ) : (
    <div className="flex row">
      <SmallToolButton
        imageSrc="search"
        showExpand={false}
        alt="Search position"
      />
      <SmallToolButton
        id="add-marker"
        imageSrc="addMarker"
        showExpand={false}
        alt="Draw a new marker"
        onClick={() => {
          toggleMode('add-marker');
        }}
      />
      <SmallToolButton
        id="add-pos"
        imageSrc="addPos"
        showExpand={false}
        alt="Draw a new position"
        onClick={() => {
          toggleMode('add-pos');
        }}
      />
      <SmallToolButton
        imageSrc="edit"
        showExpand={false}
        alt="Edit map"
        onClick={() => setEditable(true)}
      />
    </div>
  );
};
