import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';

import './canvas.css';
import * as CanvasComponent from './component';
import * as Const from '../constant';
import * as Utils from './utils';
import * as ShapeComp from '../canvas/path';
import * as Context from '../context';
import * as Comp from '../components';
import * as Snap from './snap-point/SnapPoint';
import { PathControl } from './path-control';

//Api
import * as api from '../api';
import { useRosTopic } from 'ros';

import { mapWorkerCode } from './find-path';

const Canvas = ({ isSpeedVisible }) => {
  /** @type { api.TGetStatus } */
  const { robotStatus, ros } = Context.useAppContext();
  const {
    setPositionDialog,
    openCreatePosition,
    openCreateMarker,
    map,
    setDrawingMode,
    drawingMode,
    mapPositions,
    actionList,
    pathPoints,
    enabledSnapModes,
  } = Context.useCanvasContext();
  const [speed, setSpeed] = useState({
    baseSpeed: 0.1,
    linearSpeed: 0,
    angularSpeed: 0,
  });
  const [layers, setLayers] = useState([
    {
      id: 0,
      name: `Default layer`,
      selected: true,
      shapes: [],
    },
    {
      id: 1,
      name: `Map`,
      selected: false,
      shapes: [],
    },
  ]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    xRuler: 0,
    yRuler: 0,
  });

  const [mapArray, setMapArray] = useState(null);
  const [editable, setEditable] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [clipboard, setClipboard] = useState([]);

  const [newLine, setNewLine] = useState(null);
  const [newPath, setNewPath] = useState([]);
  const [isContinuosLine, setIsContinuosLine] = useState(false);
  const [sharedPoints, setSharedPoints] = useState(new Map());

  const [newCircle, setNewCircle] = useState(null);
  const [newRectangle, setNewRectangle] = useState(null);
  const [newElip, setNewElip] = useState(null);
  const [newPolygon, setNewPolygon] = useState(null);
  const [newFreeShape, setNewFreeShape] = useState(null);

  const [adjustingRadius, setAdjustingRadius] = useState(false);

  const [lineType, setLineType] = useState(null);
  const [zoneType, setZoneType] = useState(null);

  const [lidarMapPoints, setLidarMapPoints] = useState([]);

  const stageRef = useRef(null);
  const gridLayerRef = useRef(null);
  const layerRefs = useRef([]);
  const [zoom, setZoom] = useState(100);
  const [gridSize, setGridSize] = useState(Const.INITIAL_GRID_SIZE);
  const [gridData, setGridData] = useState([]);
  const [snapPoint, setSnapPoint] = useState(null);

  //Selection
  const groupRefs = useRef({});
  const [selectionBox, setSelectionBox] = useState(null);
  const [selectionPoints, setSelectionPoints] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [createPos, setCreatePos] = useState(null);
  const [createMarker, setCreateMarker] = useState(null);

  const selectedLayer = useMemo(() => {
    return layers.find((layer) => layer.selected) || null;
  }, [layers]);

  // Lấy ra tất cả shape (bao gồm cả trong group) được chọn
  const selectedShapes = useMemo(() => {
    const flattenSelectedShapes = (shapes) => {
      return shapes.flatMap((shape) => {
        if (
          shape.name === Const.ShapeName.GROUP &&
          Array.isArray(shape.shapes)
        ) {
          return flattenSelectedShapes(shape.shapes); // đệ quy vào group con
        }
        return shape.selected ? [shape] : [];
      });
    };

    return flattenSelectedShapes(selectedLayer.shapes);
  }, [selectedLayer.shapes]);

  // Nếu chỉ có đúng 1 shape được chọn, lấy ra shape đó
  const selectedShape = useMemo(() => {
    return selectedShapes.length === 1 ? selectedShapes[0] : null;
  }, [selectedShapes]);

  useEffect(() => {
    const container = stageRef.current?.container();
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const { offsetWidth } = container;

      // Lấy chiều cao header
      const header = document.getElementById('main-header');
      const headerHeight = header?.offsetHeight || 0;

      const vw = window.innerWidth;

      // Tính chiều cao còn lại
      const height =
        window.innerHeight - headerHeight - 5 * 0.016 * vw - 45 - 37.6; // - 200;

      setDimensions({ width: offsetWidth, height });
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (editable) {
      setLineType(null);
    } else {
      setLineType('path');
    }
  }, [editable]);

  useEffect(() => {
    if (!stageRef.current) return;

    layerRefs.current.forEach((layerRef, index) => {
      if (layerRef?.current) {
        const isSelected = layers[index]?.selected; // Kiểm tra xem layer có được chọn không
        layerRef.current.listening(isSelected); // Tắt toàn bộ sự kiện của layer

        // Tắt sự kiện của từng shape trong layer không được chọn
        layerRef.current.children.forEach((shape) => {
          shape.listening(isSelected); // Nếu layer không được chọn, shape cũng không thể tương tác
        });
      }
    });

    stageRef.current.batchDraw(); // Cập nhật lại Stage
  }, [selectedLayer, layers]);

  const addShapeToLayer = (layerId, shape) => {
    saveState();
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === layerId
          ? { ...layer, shapes: [...layer.shapes, shape] }
          : layer
      )
    );
  };

  const removeShapeFromLayer = (layerId) => {
    saveState();

    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== layerId) return layer;

        const newShapes = layer.shapes
          .map(removeSelectedShapesRecursive)
          .filter(Boolean); // loại bỏ null

        return {
          ...layer,
          shapes: newShapes,
        };
      })
    );
  };

  const removeSelectedShapesRecursive = (shape) => {
    // Trường hợp shape thường
    if (!shape.name || shape.name !== Const.ShapeName.GROUP) {
      return shape.selected ? null : shape;
    }

    // Trường hợp là group
    if (Array.isArray(shape.shapes)) {
      const filteredInnerShapes = shape.shapes
        .map(removeSelectedShapesRecursive)
        .filter(Boolean); // loại bỏ null

      // Nếu không còn shape con nào, xóa cả group
      if (filteredInnerShapes.length === 0) return null;

      return { ...shape, shapes: filteredInnerShapes };
    }

    return shape;
  };

  const handleUpdateShape = (layerId, shapeId, newProps) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== layerId) return layer;

        const updateShapeRecursive = (shape) => {
          // Nếu là shape thường và khớp id, cập nhật
          if (shape.id === shapeId) {
            return { ...shape, ...newProps };
          }

          // Nếu là group, xử lý đệ quy các shape con
          if (
            shape.name === Const.ShapeName.GROUP &&
            Array.isArray(shape.shapes)
          ) {
            const updatedShapes = shape.shapes.map(updateShapeRecursive);
            return { ...shape, shapes: updatedShapes };
          }

          // Trường hợp không thay đổi
          return shape;
        };

        return {
          ...layer,
          shapes: layer.shapes.map(updateShapeRecursive),
        };
      })
    );
  };

  const renderShapes = (array) => {
    return array.map((line) => {
      return renderShape(line);
    });
  };

  const renderShape = (line) => {
    if (!line) return;

    switch (line.name) {
      case Const.ShapeName.LINE:
        return <ShapeComp.MyArrow {...shapeProps(line)} />;

      case Const.ShapeName.ARC:
        return <ShapeComp.ThreePointArc {...shapeProps(line)} />;

      case Const.ShapeName.ZIGZAG:
        return <ShapeComp.MyZigzag {...shapeProps(line)} />;

      case Const.ShapeName.TANGENT:
        return <ShapeComp.MyTangent {...shapeProps(line)} />;

      case Const.ShapeName.ULINE:
        return <ShapeComp.MyULine {...shapeProps(line)} />;

      case Const.ShapeName.SPLINE:
        return <ShapeComp.MySpline {...shapeProps(line)} />;

      case Const.ShapeName.RECTANGLE:
        return <ShapeComp.MyRectangle {...shapeProps(line)} />;

      case Const.ShapeName.CIRCLE:
        return (
          <ShapeComp.MyCircle
            {...shapeProps(line)}
            isVisible={true}
            hitboxVisible={false}
          />
        );

      case Const.ShapeName.POLYGON:
        return (
          <ShapeComp.MyPolygon
            {...shapeProps(line)}
            isComplete={line.isComplete}
          />
        );

      case Const.ShapeName.ELLIPSE:
        return <ShapeComp.MyElip {...shapeProps(line)} />;

      case 'freeShape':
        return <ShapeComp.MySpline {...shapeProps(line)} />;

      case Const.ShapeName.GROUP:
        return <ShapeComp.MyGroup {...shapeProps(line)} />;

      default:
        return null;
    }
  };

  const renderMetadata = () => {
    // Mảng để lưu các phần tử Line
    const lines = [];

    //!!!!
    // Lặp qua các zones trong layers
    for (const zones in map?.metadata.layers) {
      // Lấy shapes của từng zone
      if (!map?.metadata.layers[zones]) continue;
      const shapes = map?.metadata.layers[zones].shapes;
      // Nếu có shapes, lặp qua các shape để tạo các Line
      for (let i = 0; i < shapes.length; i++) {
        const zone = shapes[i];
        if (!zone) continue;

        lines.push(
          <Line
            points={zone.polygon.flatMap((point) => [point.x, point.y])}
            stroke={zone.color}
            strokeWidth={zone.brushsize}
            closed={shapes[0]?.type === 'shape'} // Giữ `false` nếu không muốn tạo đa giác kín
            fill={zone.color}
          />
        );
      }
    }

    //$$$Test */
    // Object.entries(Const.metadata).forEach(([key, zones]) => {
    //   zones.forEach((zone) => {
    //     lines.push(
    //       <Line
    //         points={zone.polygon.flatMap((point) => [point.x, point.y])}
    //         stroke={zone.color}
    //         strokeWidth={zone.brushsize}
    //         closed={zone.type === 'shape'}
    //         fill={zone.color}
    //       />
    //     );
    //   });
    // });

    // Trả về mảng các phần tử Line
    return lines;
  };

  const fakeMapPositions = [
    {
      pos_x: 10,
      pos_y: 15,
      orientation: 0,
      type_id: 'dock',
      name: 'Docking Station A',
      guid: 'guid-001',
    },
    {
      pos_x: 20,
      pos_y: 25,
      orientation: 90,
      type_id: 'charging',
      name: 'Charging Point B',
      guid: 'guid-002',
    },
    {
      pos_x: 30,
      pos_y: 10,
      orientation: 180,
      type_id: 'checkpoint',
      name: 'Checkpoint C',
      guid: 'guid-003',
    },
    {
      pos_x: 40,
      pos_y: 30,
      orientation: 270,
      type_id: 'inspection',
      name: 'Inspection Zone D',
      guid: 'guid-004',
    },
  ];

  const renderPositions = () => {
    //!!!
    if (!mapPositions) return;

    return mapPositions.map((position) => {
      const p = Utils.getCanvasPosition(position.pos_x, position.pos_y, map);
      return (
        <ShapeComp.MyImage
          x={p.x}
          y={p.y}
          rotation={position.orientation}
          imageSrc={Const.getPositionImage(position.type_id)}
          width={10}
          height={10}
          onDblClick={(e, x, y) => {
            setPositionDialog({
              isVisible: true,
              name: position.name,
              type_id: position.type_id,
              id: position.guid,
            });
            setIsClickVisible(false);
          }}
          onClick={(e, x, y) => {
            setPositionDialog({
              isVisible: false,
              name: position.name,
              type_id: position.type_id,
              id: position.guid,
            });
            handlePositionClick(e, x, y);
            setTooltipContent(
              <div className="flex row" style={{ gap: '2px' }}>
                {[
                  actionList.GOTO,
                  actionList.CREATE_PATH,
                  actionList.MOVE,
                  actionList.EDIT,
                  actionList.DELETE,
                ].map((action, index) => {
                  return (
                    <Comp.Tooltip hoverContent={action.alt}>
                      <Comp.SmallToolButton
                        imageSrc={action.imageSrc}
                        showExpand={false}
                        alt={action.alt}
                        onClick={() => action?.onClick(position.guid)}
                        buttonStyle={{
                          borderRadius: '0',
                          ...(index === 0 && {
                            borderTopLeftRadius: '5px',
                            borderBottomLeftRadius: '5px',
                          }),
                          ...(index === 4 && {
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px',
                          }),
                        }}
                      />
                    </Comp.Tooltip>
                  );
                })}
              </div>
            );
          }}
          onMouseEnter={(e, x, y) => {
            handlePositionHover(e, x, y);
            setTooltipContent(
              <div
                className="radius-5px"
                style={{
                  padding: '5px 10px',
                  backgroundColor: Const.Color.BUTTON,
                }}
              >
                {position.name}
              </div>
            );
          }}
          onMouseLeave={() => {
            setIsHoverVisible(false);
          }}
        />
      );
    });

    //Test
    // return fakeMapPositions.map((position) => {
    //   const p = Utils.getCanvasPosition(position.pos_x, position.pos_y, {
    //     metadata: { height: 568 },
    //     resolution: 0.05,
    //     origin_x: 0,
    //     origin_y: 0,
    //   });
    //   return (
    //     <ShapeComp.MyImage
    //       ref={imageRef}
    //       x={p.x}
    //       y={p.y}
    //       rotation={position.orientation}
    //       imageSrc={Const.getPositionImage(position.type_id)}
    //       width={20}
    //       height={20}
    //       onDblClick={(e, x, y) => {
    //         setPositionDialog({
    //           isVisible: true,
    //           name: position.name,
    //           type_id: position.type_id,
    //           id: position.guid,
    //         });
    //         setIsClickVisible(false);
    //       }}
    //       onClick={(e, x, y) => {
    //         handlePositionClick(e, x, y);
    //         setPositionDialog({
    //           isVisible: false,
    //           name: position.name,
    //           type_id: position.type_id,
    //           id: position.guid,
    //         });
    //         setTooltipContent(
    //           <div className="flex row" style={{ gap: '2px' }}>
    //             {[
    //               actionList.GOTO,
    //               actionList.CREATE_PATH,
    //               actionList.MOVE,
    //               actionList.EDIT,
    //               actionList.DELETE,
    //             ].map((action, index) => {
    //               return (
    //                 <Comp.Tooltip hoverContent={action.alt}>
    //                   <Comp.SmallToolButton
    //                     imageSrc={action.imageSrc}
    //                     showExpand={false}
    //                     alt={action.alt}
    //                     onClick={action?.onClick}
    //                     buttonStyle={{
    //                       borderRadius: '0',
    //                       ...(index === 0 && {
    //                         borderTopLeftRadius: '5px',
    //                         borderBottomLeftRadius: '5px',
    //                       }),
    //                       ...(index === 4 && {
    //                         borderTopRightRadius: '5px',
    //                         borderBottomRightRadius: '5px',
    //                       }),
    //                     }}
    //                   />
    //                 </Comp.Tooltip>
    //               );
    //             })}
    //           </div>
    //         );
    //       }}
    //       onMouseEnter={(e, x, y) => {
    //         handlePositionHover(e, x, y);
    //         setTooltipContent(
    //           <div
    //             className="radius-5px"
    //             style={{
    //               padding: '5px 10px',
    //               backgroundColor: Const.Color.BUTTON,
    //             }}
    //           >
    //             {position.name}
    //           </div>
    //         );
    //       }}
    //       onMouseLeave={() => {
    //         setIsHoverVisible(false);
    //       }}
    //     />
    //   );
    // });
  };

  const renderCreatePosition = () => {
    if (!createPos) return;

    return (
      <ShapeComp.MyImage
        x={createPos.pos_x}
        y={createPos.pos_y}
        rotation={createPos?.orientation}
        imageSrc={Const.ImageSrc.position0}
        width={20}
        height={20}
      />
    );
  };

  const renderCreateMarker = () => {
    if (!createMarker) return;

    return (
      <ShapeComp.MyImage
        x={createMarker.pos_x}
        y={createMarker.pos_y}
        rotation={createMarker?.orientation}
        imageSrc={Const.ImageSrc.marker}
        width={20}
        height={20}
      />
    );
  };

  useEffect(() => {
    console.log(layers);
  }, [layers]);

  const renderlidarMapPoints = () => {
    if (!lidarMapPoints) return;

    return lidarMapPoints.map((point, index) => {
      if (!point || !point.x || !point.y) return;

      return (
        // <Circle key={index} x={point.x + 233} y={point.y - 132} radius={0.5} fill={'red'} />
        <Circle key={index} x={point.x} y={point.y} radius={0.5} fill={'red'} />
      );
    });
  };

  const fillColors = {
    floor: '#fff',
    wall: '#000',
  };

  function renderMapArray() {
    if (!mapArray) return null;

    return (
      <>
        {Object.entries(mapArray).flatMap(([key, polygons]) =>
          polygons.map((points, i) => {
            const canvasPoints = Utils.transformPointsToCanvas(points, map);

            return (
              <Line
                key={`${key}-${i}`}
                points={canvasPoints}
                closed={key == 'floor'}
                fill={fillColors[key] || '#888'}
                stroke={key == 'walls' ? '#000' : ''}
                strokeWidth={1}
                listening={false}
              />
            );
          })
        )}
      </>
    );
  }

  const renderedMapArray = React.useMemo(
    () => renderMapArray(),
    [layers, zoom, mapArray]
  );

  const getLineComponent = (line) => {
    switch (line.name) {
      case Const.ShapeName.LINE:
        return <ShapeComp.MyArrow {...shapeProps(line)} />;

      case Const.ShapeName.ARC:
        return <ShapeComp.ThreePointArc {...shapeProps(line)} />;

      case Const.ShapeName.ZIGZAG:
        return <ShapeComp.MyZigzag {...shapeProps(line)} />;

      case Const.ShapeName.TANGENT:
        return <ShapeComp.MyTangent {...shapeProps(line)} />;

      case Const.ShapeName.ULINE:
        return <ShapeComp.MyULine {...shapeProps(line)} />;

      case Const.ShapeName.SPLINE:
        return <ShapeComp.MySpline {...shapeProps(line)} />;
    }
  };

  const renderNewPath = () => {
    if (!newPath) return;

    return newPath.map((line) => {
      return getLineComponent(line);
    });
  };

  const drawSelection = () => {
    if (selectionBox) {
      return (
        <Rect
          {...selectionBox}
          fill="rgba(0, 0, 255, 0.3)"
          stroke="blue"
          dash={[10, 5]}
        />
      );
    }

    if (selectionPoints.length > 2) {
      return (
        <Line
          points={selectionPoints}
          stroke="blue"
          strokeWidth={2}
          closed
          fill="rgba(0,0,255,0.2)"
          dash={[10, 5]}
        />
      );
    }
  };

  const resetAllShapes = () => {
    setNewLine(null);

    setNewCircle(null);
    setNewRectangle(null);
    setNewElip(null);
    setNewPolygon(null);
    setNewFreeShape(null);

    setCreateMarker(null);
    setCreatePos(null);
  };

  const toggleDrawingMode = (mode) => {
    setDrawingMode(drawingMode === mode ? null : mode);
  };

  const initLine = (startP) => {
    switch (true) {
      case drawingMode === 'line':
        setNewLine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.LINE,
          }),
          width: null,
          height: null,
          startP: startP,
          endP: null,
        });
        break;

      case drawingMode.includes('arc'):
        setNewLine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.ARC,
            points: [startP],
          }),
          startP: startP,
          endP: null,
          centerP: null,
          midP: null,
          startAngle: null,
          endAngle: null,
          clockwise: null,
        });
        break;

      case drawingMode.includes('zigzag'):
        setNewLine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.ZIGZAG,
          }),
          radius: 0,
          direction: Const.LineDirection.START_TO_END,
          startP: startP,
        });
        break;

      case drawingMode === 'tangent':
        break;

      case drawingMode.includes('uline'):
        // Chọn điểm bắt đầu
        setNewLine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.ULINE,
          }),
          rx: 0.1,
          ry: 0.1,
          startP: startP,
        });

        break;

      case drawingMode.includes('spline'):
        const { x, y } = startP;
        setNewLine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.SPLINE,
            points: [x, y],
          }),
          startP: startP,
        });
        break;
    }
  };

  useEffect(() => {
    if (!newLine || !isContinuosLine) return;
    initLine(newLine.startP);
  }, [drawingMode]);

  const defaultCursor = () => {
    toggleDrawingMode(null);
  };

  const onDrag = (x, y) => {
    return Utils.snapToGrid(zoom, gridSize, { x, y });
  };

  //Clipboard
  const copyShape = () => {
    const copiedShapes = selectedLayer.shapes.filter((shape) => shape.selected);
    const now = Date.now();
    setClipboard(
      copiedShapes.map((shape, index) => ({ ...shape, id: now + index }))
    );
  };

  const pasteShape = () => {
    if (clipboard) {
      addShapeToLayer(selectedLayer.id, clipboard);
    }
    setClipboard(null);
  };

  const removeShape = () => {
    removeShapeFromLayer(
      selectedLayer.id,
      selectedLayer.shapes.filter((shape) => shape.selected === true)
    );
  };

  const groupShape = () => {
    // if (selectedShapes.length === 0) return;
    // const newGroup = {
    //   ...lineProps({
    //     name: Const.ShapeName.GROUP,
    //     points: selectedShapes.flatMap((shape) => shape.points),
    //   }),
    //   shapes: selectedShapes,
    // };
    // setLines((prevLines) => [
    //   ...prevLines.filter((line) => !line.selected), // Loại bỏ các shape đã chọn
    //   newGroup, // Thêm group mới
    // ]);
  };

  const ungroupShape = () => {
    // const groupIndex = selectedLayer.shapes.findIndex(
    //   (line) => line.selected && line.name === Const.ShapeName.GROUP
    // );
    // console.log('ungroup', groupIndex);
    // setLines((prevLines) => {
    //   const groupIndex = prevLines.findIndex(
    //     (line) => line.selected && line.name === Const.ShapeName.GROUP
    //   );
    //   if (groupIndex === -1) return prevLines;
    //   const groupShapes = prevLines[groupIndex].shapes;
    //   return [
    //     ...prevLines.slice(0, groupIndex),
    //     ...groupShapes,
    //     ...prevLines.slice(groupIndex + 1),
    //   ];
    // });
  };

  const selectLine = (id, event) => {
    const isShiftPressed = event?.shiftKey;

    const updateSelection = (shapes) => {
      shapes.forEach((shape) => {
        if (
          shape.name === Const.ShapeName.GROUP &&
          Array.isArray(shape.shapes)
        ) {
          updateSelection(shape.shapes); // đệ quy với group
        } else {
          if (shape.id === id) {
            handleUpdateShape(selectedLayer.id, shape.id, {
              selected: !shape.selected,
            });
          } else if (!isShiftPressed) {
            handleUpdateShape(selectedLayer.id, shape.id, { selected: false });
          }
        }
      });
    };

    updateSelection(selectedLayer.shapes);
  };

  const replaceShapesInLayer = (layerId, newShapes) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id === layerId) {
          // Thay thế shapes trong layer
          return { ...layer, shapes: newShapes };
        }
        return layer; // Nếu không phải layer cần thay đổi, trả lại layer không thay đổi
      })
    );
  };

  const resetSelection = () => {
    const newLines = selectedLayer.shapes.map((line) => {
      if (line.selected) {
        if (line.name === Const.ShapeName.GROUP && Array.isArray(line.shapes)) {
          // Reset tất cả các shapes trong group
          const newShapes = line.shapes.map((shape) => ({
            ...shape,
            selected: false,
          }));
          return { ...line, shapes: newShapes, selected: false };
        }

        return { ...line, selected: false };
      }

      return line;
    });

    replaceShapesInLayer(selectedLayer.id, newLines);
  };

  const lineProps = ({ type, name, points }) => ({
    id: Date.now(),
    name: name,
    points: points,
    selected: false,
    mode: drawingMode,
    direction: Const.LineDirection.START_TO_END,
    type: type,
  });

  const baseShapeProps = (line) => ({
    ref: (node) => (groupRefs.current[line.id] = node),
    id: line.id,
    groupId: line.groupId,
    name: line.name,
    type: line.type,
    groupName: line.name,
    points: line.points ? line.points : [line.startP, line.endP],
    pointerLength: 4,
    pointerWidth: 4,
    pointRadius: 2,
    fill: '#ACACAC',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true,
    mode: line.mode,
    reversed: line.reversed,
    direction: line.direction,
    selected: line.selected,
    startP: line.startP,
    endP: line.endP,
    width: line.width
      ? line.width
      : line.endP && line.startP && Math.abs(line.endP.x - line.startP.x),
    height: line.height
      ? line.height
      : line.endP && line.startP && Math.abs(line.endP.y - line.startP.y),
    isDrawing: drawing,
    onClick: (e) => {
      selectLine(line.id, e);
    },
    onDrag: (x, y) => onDrag(x, y),
    onUpdateShape: (newProps) =>
      handleUpdateShape(selectedLayer.id, line.id, newProps),
    saveState: () => saveState(),
    isNew: true,
  });

  const shapeProps = (line) => {
    switch (line.name) {
      case Const.ShapeName.LINE:
        return {
          ...baseShapeProps(line),
          getShapePoints: (l) => {
            return Utils.getPointsAlongLine(l.startP, l.endP, 10);
          },
        };
      case Const.ShapeName.ARC:
        return {
          ...baseShapeProps(line),
          angle: line.angle,
          radius: line.radius,
          centerP: line.centerP,
          midP: line.midP,
          startAngle: line.startAngle,
          endAngle: line.endAngle,
          clockwise: line.clockwise,
        };
      case Const.ShapeName.ZIGZAG:
        return {
          ...baseShapeProps(line),
          radius: line.radius,
          midP: line.midP,
          getShapePoints: (l) => {
            const pathData = ShapeComp.getZigzagPathData(
              [l.startP, l.midP, l.endP],
              l.radius
            );
            return Utils.getPointsOnPath(pathData, 10);
          },
        };
      case Const.ShapeName.SPLINE:
        return {
          ...baseShapeProps(line),
          isComplete: line.isComplete,
          getShapePoints: (l) => {
            let pointPairs = [];

            if (l.mode.includes('p-')) {
              // Dữ liệu gốc, không dùng spline
              const sampled = ShapeComp.samplePSplineByDistance(l.points, 10);
              for (let i = 0; i < sampled.length; i += 2) {
                pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
              }
            } else if (l.mode.includes('cv-')) {
              // Dữ liệu spline được lấy mẫu đều
              const sampled = ShapeComp.sampleBSplineByDistance(l.points, 10);
              for (let i = 0; i < sampled.length; i += 2) {
                pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
              }
            }

            return pointPairs;
          },
        };
      case Const.ShapeName.ULINE:
        return {
          ...baseShapeProps(line),
          rx: line.rx,
          ry: line.ry,
          bottomP: line.bottomP,
          getShapePoints: (l) => {
            const pathData = ShapeComp.getUlinePathData(
              l.startP,
              l.bottomP,
              l.ry
            );

            return Utils.getPointsOnPath(pathData, 10);
          },
        };
      case Const.ShapeName.TANGENT:
        return {
          ...baseShapeProps(line),
          contactPoint: line.contactPoint,
          arc: line.arc,
        };
      case Const.ShapeName.RECTANGLE:
        return {
          ...baseShapeProps(line),
          direction: Const.LineDirection.NONE,
        };
      case Const.ShapeName.CIRCLE:
        return {
          ...baseShapeProps(line),
          direction: Const.LineDirection.NONE,
        };
      case Const.ShapeName.ELLIPSE:
        return {
          ...baseShapeProps(line),
          direction: Const.LineDirection.NONE,
        };

      case Const.ShapeName.POLYGON:
        return {
          ...baseShapeProps(line),
          direction: Const.LineDirection.NONE,
        };

      case Const.ShapeName.FREESHAPE:
        return {
          ...baseShapeProps(line),
          direction: Const.LineDirection.NONE,
        };

      case Const.ShapeName.GROUP:
        return {
          ...baseShapeProps(line),
          getShapePoints: (l) => {
            return l.shapes.flatMap((shape) => {
              return shape.getShapePoints(shape);
            });
          },
          shapes: line.shapes,
          sharedPoints: line.sharedPoints,
          renderShape: (s) => renderShape(s),
        };
    }
  };

  const addLineToPath = (line) => {
    setNewPath((prev) => [...prev, line]);

    const { id, startP, endP } = line;

    const entries = [
      { point: startP, key: 'startP' },
      { point: endP, key: 'endP' },
    ];

    for (const { point, key } of entries) {
      const posKey = Utils.toPosKey(point);

      if (!sharedPoints.has(posKey)) {
        sharedPoints.set(posKey, []);
      }

      const refs = sharedPoints.get(posKey);

      // Tránh trùng lặp id-key
      const exists = refs.some((ref) => ref.id === id && ref.key === key);
      if (!exists) {
        refs.push({ id, key });
      }
    }

    // Gọi lại setSharedPoints nếu bạn dùng local state để render
    setSharedPoints(new Map(sharedPoints));

    if (isContinuosLine) {
      initLine(line.endP);
    } else {
      setNewLine(null);
    }
  };

  const addLineToExistedGroup = (newShape, groupId) => {
    for (const layer of layers) {
      const findAndUpdateGroup = (shapes) => {
        for (const shape of shapes) {
          if (shape.name === Const.ShapeName.GROUP && shape.id === groupId) {
            const updatedGroup = {
              ...shape,
              shapes: [...shape.shapes, { ...newShape, groupId: groupId }],
              points: [...shape.points, ...newShape.points], // nếu muốn group gom điểm của tất cả shape
            };
            handleUpdateShape(layer.id, groupId, updatedGroup);
            return true;
          }

          // Đệ quy nếu trong group có group con
          if (
            shape.name === Const.ShapeName.GROUP &&
            Array.isArray(shape.shapes)
          ) {
            const found = findAndUpdateGroup(shape.shapes);
            if (found) return true;
          }
        }
        return false;
      };

      if (Array.isArray(layer.shapes)) {
        const updated = findAndUpdateGroup(layer.shapes);
        if (updated) break;
      }
    }

    if (isContinuosLine) {
      initLine(newShape.endP);
    } else {
      setNewLine(null);
    }
  };

  useEffect(() => {
    if (!isContinuosLine && newPath && newPath.length > 0) {
      addPathToLayer();
    }
  }, [newPath]);

  const addLine = (foundGroup) => {
    if (foundGroup || newLine.groupId) {
      addLineToExistedGroup(
        { ...shapeProps(newLine) },
        foundGroup?.id || newLine.groupId
      );
    } else {
      addLineToPath({ ...shapeProps(newLine) });
    }
  };

  const drawShape = (pointer) => {
    let foundGroup;
    if (pointer.groupId) {
      foundGroup = Utils.getAllGroupsFromLayers(layers).find(
        (shape) =>
          shape.name === Const.ShapeName.GROUP && shape.id === pointer.groupId
      );
    }

    switch (true) {
      case drawingMode === 'line':
        if (!newLine) {
          setNewLine({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.LINE,
            }),
            width: null,
            height: null,
            startP: { x: pointer.x, y: pointer.y },
            endP: { x: pointer.x, y: pointer.y },
            groupId: foundGroup ? foundGroup.id : undefined,
          });
        } else {
          addLine(foundGroup);
          setDrawing(true);
        }
        break;

      case drawingMode.includes('arc'):
        if (!newLine) {
          setNewLine({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.ARC,
              points: [pointer],
            }),
            startP: pointer,
            endP: null,
            centerP: null,
            midP: null,
            startAngle: null,
            endAngle: null,
            clockwise: null,
          });
          setDrawing(true);
        } else if (newLine.points.length < 2) {
          setNewLine({
            ...newLine,
            points: [...newLine.points, pointer],
            endP: pointer,
          });
        } else {
          addLine(foundGroup);
        }
        break;

      case drawingMode.includes('zigzag'):
        if (!newLine) {
          // Lưu điểm đầu tiên
          setNewLine({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.ZIGZAG,
            }),
            radius: 0,
            direction: Const.LineDirection.START_TO_END,
            startP: pointer,
          });
        } else if (newLine.startP && !adjustingRadius) {
          if (drawingMode === 'sm-zigzag') {
            const start = newLine.startP;
            const mid = pointer;
            setNewLine({
              ...newLine,
              midP: mid,
              endP: ShapeComp.calculateEndPoint(start, mid),
              radius: newLine.radius,
            });
          } else if (drawingMode === 'se-zigzag') {
            const start = newLine.startP;
            const end = pointer;
            setNewLine({
              ...newLine,
              midP: ShapeComp.calculateMidPoint(start, end),
              endP: end,
              radius: newLine.radius,
            });
          }
          setAdjustingRadius(true); // Cho phép điều chỉnh radius sau khi chọn trung điểm
        } else if (
          newLine.startP &&
          newLine.midP &&
          newLine.endP &&
          adjustingRadius
        ) {
          addLine(foundGroup);
          setAdjustingRadius(false); // Ngừng điều chỉnh radius
        }
        break;

      case drawingMode === 'tangent':
        if (newLine) {
          addLine(foundGroup);
        }
        break;

      case drawingMode.includes('uline'):
        if (!newLine) {
          // Chọn điểm bắt đầu
          setNewLine({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.ULINE,
            }),
            rx: 0.1,
            ry: 0.1,
            startP: pointer,
          });
        } else if (newLine.startP && !adjustingRadius) {
          // Chọn điểm bottom
          setNewLine({
            ...newLine,
            bottomP: pointer,
            endP: Utils.calculateUlineEndPoint(newLine.startP, pointer),
            rx: Math.abs(newLine.startP.x - pointer.x), //drawingMode.includes('sm-') ? Math.abs(newLine.startP.x - pointer.x) : (Math.abs(newLine.startP.x - pointer.x) / 2), !!!
          });
          setAdjustingRadius(true);
        } else {
          // Khi click lần thứ 3, lưu đường U vào danh sách
          addLine(foundGroup);
          setAdjustingRadius(false);
        }
        break;

      case drawingMode.includes('spline'):
        const { x, y } = pointer;
        if (!newLine) {
          setNewLine({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.SPLINE,
              points: [x, y],
            }),
            startP: { x, y },
          });
        } else {
          setNewLine({ ...newLine, points: [...newLine.points, x, y] });
        }
        break;

      case drawingMode.includes('circle'):
        if (!newCircle) {
          setNewCircle({
            ...lineProps({
              type: zoneType,
              name: Const.ShapeName.CIRCLE,
              points: [pointer],
            }),
          });
        } else if (newCircle.points.length === 2) {
          if (
            drawingMode === 'cr-circle' ||
            drawingMode === 'cd-circle' ||
            drawingMode === '2p-circle'
          ) {
            addShapeToLayer(selectedLayer.id, { ...shapeProps(newCircle) });
            setNewCircle(null);
          }
        } else if (newCircle.points.length === 3) {
          if (drawingMode === '3p-circle') {
            addShapeToLayer(selectedLayer.id, { ...shapeProps(newCircle) });
            setNewCircle(null);
          }
        }
        break;

      case drawingMode.includes('rectangle'):
        if (!newRectangle) {
          setNewRectangle({
            ...lineProps({
              type: zoneType,
              name: Const.ShapeName.RECTANGLE,
            }),
            startP: pointer,
          });
        } else if (newRectangle.startP && newRectangle.endP) {
          addShapeToLayer(selectedLayer.id, { ...shapeProps(newRectangle) });
          setNewRectangle(null);
        }
        break;

      case drawingMode.includes('elip'):
        if (!newElip) {
          setNewElip({
            ...lineProps({
              type: zoneType,
              name: Const.ShapeName.ELLIPSE,
              points: [pointer],
            }),
            clicked: false,
          });
        } else if (newElip.points.length === 2) {
          if (drawingMode === 'cr-elip') {
            addShapeToLayer(selectedLayer.id, { ...shapeProps(newElip) });
            setNewElip(null);
          } else if (drawingMode === 'r-elip') {
            setNewElip({ ...newElip, clicked: true });
          }
        } else if (newElip.points.length === 3) {
          if (drawingMode === 'r-elip') {
            addShapeToLayer(selectedLayer.id, { ...shapeProps(newElip) });
            setNewElip(null);
          }
        }
        break;

      case drawingMode.includes('polygon'):
        if (!newPolygon) {
          setNewPolygon({
            ...lineProps({
              type: zoneType,
              name: Const.ShapeName.POLYGON,
              points: [pointer],
            }),
            isComplete: true,
          });
        } else {
          setNewPolygon({
            ...newPolygon,
            points: [...newPolygon.points, pointer],
          });
        }
        break;

      case drawingMode.includes('freeShape'):
        if (!newFreeShape) {
          setNewFreeShape({
            ...lineProps({
              type: zoneType,
              name: Const.ShapeName.FREESHAPE,
              points: [pointer.x, pointer.y],
            }),
            isComplete: true,
          });
        } else {
          setNewFreeShape({
            ...newFreeShape,
            points: [...newFreeShape.points, pointer.x, pointer.y],
          });
        }
        break;
    }
  };

  const drawHoverShape = (smartSnap, target) => {
    //Vẽ đường thẳng
    if (drawing && newLine && drawingMode === 'line') {
      setNewLine({
        ...newLine,
        endP: { x: smartSnap.x, y: smartSnap.y },
      });
    }

    //Vẽ đường arc
    if (drawingMode && drawingMode.includes('arc')) {
      if (newLine && newLine.points.length >= 2) {
        if (drawingMode.includes('3p')) {
          setNewLine({
            ...newLine,
            points: [...newLine.points.slice(0, 2), smartSnap],
          });
        } else if (drawingMode === 'sca-arc' || drawingMode === 'csa-arc') {
          const angle = ShapeComp.arcCalculateAngle(
            newLine.points[1],
            smartSnap
          );
          setNewLine({
            ...newLine,
            angle: angle,
            points: [...newLine.points.slice(0, 2), smartSnap],
          });
        } else if (drawingMode === 'sea-arc') {
          const angle = ShapeComp.arcCalculateAngle(
            newLine.points[0],
            smartSnap
          );
          setNewLine({
            ...newLine,
            angle: angle,
            points: [...newLine.points.slice(0, 2), smartSnap],
          }); //start, end
        } else if (drawingMode === 'ser-arc') {
          const radius = ShapeComp.calculateDistance(
            newLine.points[1],
            smartSnap
          );
          setNewLine({
            ...newLine,
            radius: radius,
            points: [...newLine.points.slice(0, 2), smartSnap],
          }); //start, end
        }
      }
    }

    if (drawingMode && drawingMode.includes('zigzag')) {
      //Vẽ đường zigzag
      if (newLine && newLine.startP && !adjustingRadius) {
        if (drawingMode === 'sm-zigzag') {
          const start = newLine.startP;
          const mid = smartSnap;
          setNewLine({
            ...newLine,
            midP: mid,
            endP: ShapeComp.calculateEndPoint(start, mid),
            radius: newLine.radius,
          });
        } else if (drawingMode === 'se-zigzag') {
          const start = newLine.startP;
          const end = smartSnap;
          setNewLine({
            ...newLine,
            midP: ShapeComp.calculateMidPoint(start, end),
            endP: end,
            radius: newLine.radius,
          });
        }
      } else if (adjustingRadius && newLine) {
        const radius = newLine.radius;
        const [tp0, tp1, tp2] = [newLine.startP, newLine.midP, newLine.endP];
        const p0 = tp1.x + (tp0.x > tp2.x ? radius : -radius);
        const p1 = tp0.y + (tp0.y < tp2.y ? radius : -radius);

        const deltaX = smartSnap.x - tp1.x;

        // Xác định vị trí của start (tp0) so với mid (tp1)
        const isLeft = tp0.x < p0; // start nằm bên trái mid
        const isRight = tp0.x > p0; // start nằm bên phải mid

        // Điều chỉnh radius dựa trên vị trí start
        if (
          (isLeft && tp1.y < p1) ||
          (isLeft && tp1.y > p1) ||
          (isRight && tp1.y < p1) ||
          (isRight && tp1.y > p1)
        ) {
          const newRadius = Math.max(0, newLine.radius + (deltaX > 0 ? 1 : -1));
          setNewLine({
            ...newLine,
            radius: newRadius,
          });
        } else if (tp1.y === p1 || tp0.x === p0) {
          const newRadius = Math.max(0, newLine.radius - 1);
          setNewLine({
            ...newLine,
            radius: newRadius,
          });
        }
      }
    }

    //Vẽ đường tiếp tuyến
    if (drawingMode === 'tangent') {
      // if (target.name() === Const.ShapeName.ARC) {
      //   const { center, radius } = {
      //     center: { x: target.attrs.x, y: target.attrs.y },
      //     radius: target.attrs.outerRadius,
      //   };
      //   const dx = smartSnap.x - center.x;
      //   const dy = smartSnap.y - center.y;
      //   const distance = Math.sqrt(dx * dx + dy * dy);
      //   if (Math.abs(distance - radius) <= 5) {
      //     setNewLine({
      //       ...lineProps({
      //         type: lineType,
      //         name: Const.ShapeName.TANGENT,
      //         points: [],
      //       }),
      //       contactPoint: smartSnap,
      //       arc: { center, radius },
      //     });
      //   }
      // }
    }

    //Vẽ đường chữ U
    if (drawingMode && drawingMode.includes('uline')) {
      if (newLine && newLine.startP && !adjustingRadius) {
        setNewLine({
          ...newLine,
          bottomP: smartSnap,
          endP: Utils.calculateUlineEndPoint(newLine.startP, smartSnap),
        }); // Giới hạn ry ≥ 0.1
      } else if (
        newLine &&
        newLine.startP &&
        newLine.bottomP &&
        adjustingRadius
      ) {
        const deltaX = smartSnap.x - newLine.bottomP.x; // Khoảng cách di chuột
        setNewLine({ ...newLine, ry: Math.max(0.1, deltaX) }); // Giới hạn ry ≥ 0.1
      }
    }

    //Vẽ đường chữ Spline
    if (drawingMode && drawingMode.includes('spline')) {
      const { x, y } = smartSnap;
      if (newLine && newLine.points.length === 2) {
        setNewLine({ ...newLine, points: [...newLine.points, x, y] });
      } else if (newLine && newLine.points.length >= 4) {
        setNewLine({
          ...newLine,
          points: [...newLine.points.slice(0, -2), x, y],
        });
      }
    }

    //Vẽ Circle
    if (newCircle && newCircle.points && newCircle.points.length >= 1) {
      setNewCircle({ ...newCircle, points: [newCircle.points[0], smartSnap] });
    } else if (newCircle && newCircle.points && newCircle.points.length === 2) {
      if (drawingMode === '3p-circle') {
        setNewCircle({
          ...newCircle,
          points: [...newCircle.points.slice(0, 2), smartSnap],
        });
      }
    }

    //Vẽ Rectangle
    if (newRectangle && newRectangle.startP) {
      setNewRectangle({
        ...newRectangle,
        endP: smartSnap,
      });
    }

    //Vẽ Elip
    if (
      newElip &&
      newElip.points &&
      newElip.points.length >= 1 &&
      !newElip.clicked
    ) {
      setNewElip({ ...newElip, points: [newElip.points[0], smartSnap] });
    } else if (
      newElip &&
      newElip.points &&
      newElip.points.length >= 2 &&
      newElip.clicked
    ) {
      setNewElip({
        ...newElip,
        points: [newElip.points[0], newElip.points[1], smartSnap],
      });
    }

    //Vẽ Polygon
    if (newPolygon) {
      if (newPolygon.points.length === 1) {
        setNewPolygon({
          ...newPolygon,
          points: [...newPolygon.points, smartSnap],
        });
      } else if (newPolygon.points.length >= 2) {
        setNewPolygon({
          ...newPolygon,
          points: [...newPolygon.points.slice(0, -1), smartSnap],
        });
      }
    }

    //Vẽ Free Shape
    if (newFreeShape) {
      const { x, y } = smartSnap;
      if (newFreeShape.points.length === 2) {
        setNewFreeShape({
          ...newFreeShape,
          points: [...newFreeShape.points, x, y],
        });
      } else if (newFreeShape.points.length >= 4) {
        setNewFreeShape({
          ...newFreeShape,
          points: [...newFreeShape.points.slice(0, -2), x, y],
        });
      }
    }
  };

  const handleStageLeftClick = (e) => {
    const target = e.target;
    const stage = target.getStage();
    const p = stage.getPointerPosition();

    // Xóa line đang select
    if (!target.name()) {
      resetSelection();
    }

    const adjustedPointer = Utils.adjustPointerForZoom(zoom, p);
    const smartSnap =
      Snap.getSnapPoint(
        enabledSnapModes,
        adjustedPointer,
        newLine?.startP,
        Utils.getAllShapesFromLayers(layers),
        gridSize
      ) || adjustedPointer;
    setSnapPoint(smartSnap);

    // Selection bắt đầu
    if (drawingMode === 'rect-selection' && !selectionBox) {
      setStartPoint(smartSnap);
      setSelectionBox({ x: smartSnap.x, y: smartSnap.y, width: 0, height: 0 });
    } else if (drawingMode === 'free-selection') {
      setSelectionPoints([smartSnap.x, smartSnap.y]);
    }

    // Click thứ 2 - xác nhận vùng chọn
    if (drawingMode === 'rect-selection' && selectionBox) {
      // Hàm đệ quy để kiểm tra selected cho shape và group lồng nhau
      const updateShapeSelection = (shape) => {
        const node = groupRefs.current[shape.id];
        if (!node) return shape;

        if (
          shape.name === Const.ShapeName.GROUP &&
          Array.isArray(shape.shapes)
        ) {
          const updatedChildren = shape.shapes.map(updateShapeSelection);
          const isGroupSelected = updatedChildren.some((s) => s.selected);
          return {
            ...shape,
            shapes: updatedChildren,
            selected: isGroupSelected,
          };
        }

        const isSelected = isGroupInSelection(node, selectionBox);
        return {
          ...shape,
          selected: isSelected,
        };
      };

      // Cập nhật toàn bộ shapes của layer
      const updatedShapes = selectedLayer.shapes.map(updateShapeSelection);

      // Cập nhật layer
      replaceShapesInLayer(selectedLayer.id, updatedShapes);
      setSelectionBox(null);
    } else if (drawingMode === 'free-selection' && selectionPoints) {
      setSelectionPoints([]);
    }

    //

    if (!drawingMode) return;

    // if (!isContinuosLine) {
    //   setIsContinuosLine(true);
    // }

    drawShape(smartSnap);

    //Thêm position
    if (drawingMode === 'add-pos') {
      if (!createPos) {
        setCreatePos({
          pos_x: smartSnap.x,
          pos_y: smartSnap.y,
          orientation: 0,
        });
      } else {
        const m = { pos_x: smartSnap.x, pos_y: smartSnap.y };
        const realPos = Utils.getRealPosition(
          Number(createPos.pos_x),
          Number(createPos.pos_y),
          map
        );
        const newPos = {
          pos_x: realPos.x,
          pos_y: realPos.y,
          orientation: Utils.getAngleSigned(
            createPos.pos_x,
            createPos.pos_y,
            m.pos_x,
            m.pos_y
          ),
        };
        setDrawingMode(null);
        openCreatePosition(newPos, 1);
        setCreatePos(null);
      }
    }

    //Thêm marker
    if (drawingMode === 'add-marker') {
      if (!createMarker) {
        setCreateMarker({
          pos_x: smartSnap.x,
          pos_y: smartSnap.y,
          orientation: 0,
        });
      } else {
        const m = { pos_x: smartSnap.x, pos_y: smartSnap.y };
        setCreateMarker({
          ...createMarker,
          orientation: Utils.getAngleSigned(
            createMarker.x,
            createMarker.y,
            m.pos_x,
            m.pos_y
          ),
        });
        openCreateMarker(createMarker);
        setCreateMarker(null);
      }
    }
  };

  const handleStageClick = (e) => {
    if (e.evt.button === 0) {
      // Chỉ xử lý chuột trái
      handleStageLeftClick(e);
    } else if (e.evt.button === 2) {
      handleStageRightClick(e);
    }
  };

  const handleStageMouseMove = (e) => {
    const target = e.target;
    const stage = target.getStage();
    const p = stage.getPointerPosition();

    const adjustedPointer = Utils.adjustPointerForZoom(zoom, p);
    const smartSnap =
      Snap.getSnapPoint(
        enabledSnapModes,
        adjustedPointer,
        newLine?.startP,
        Utils.getAllShapesFromLayers(layers),
        gridSize
      ) || adjustedPointer;
    setSnapPoint(smartSnap);
    setMousePos({ x: smartSnap.x, y: smartSnap.y, xRuler: p.x, yRuler: p.y });

    //Selection
    if (drawingMode === 'rect-selection') {
      if (selectionBox) {
        setSelectionBox({
          x: Math.min(startPoint.x, smartSnap.x),
          y: Math.min(startPoint.y, smartSnap.y),
          width: Math.abs(startPoint.x - smartSnap.x),
          height: Math.abs(startPoint.y - smartSnap.y),
        });
      }
    } else if (drawingMode === 'free-selection' && selectionPoints) {
      setSelectionPoints((prev) => [...prev, smartSnap.x, smartSnap.y]);
    }

    drawHoverShape(smartSnap, target);

    //Thêm position
    if (drawingMode === 'add-pos' && createPos) {
      const m = { pos_x: smartSnap.x, pos_y: smartSnap.y };
      setCreatePos({
        ...createPos,
        orientation: Utils.getAngleSigned(
          createPos.pos_x,
          createPos.pos_y,
          m.pos_x,
          m.pos_y
        ),
      });
    }

    //Thêm marker
    if (drawingMode === 'add-marker' && createMarker) {
      const m = { pos_x: smartSnap.x, pos_y: smartSnap.y };
      setCreateMarker({
        ...createMarker,
        orientation: Utils.getAngleSigned(
          createMarker.pos_x,
          createMarker.pos_y,
          m.pos_x,
          m.pos_y
        ),
      });
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const handleStageDblClick = (e) => {
    if (newLine && drawingMode.includes('spline')) {
      if (newLine) {
        const points = newLine.points;
        const len = points.length;
        const endP = { x: points[len - 2], y: points[len - 1] };

        addLineToPath({
          ...shapeProps({
            ...newLine,
            endP,
          }),
        });
      }
    }
  };

  const handleStageRightClick = (e) => {
    const target = e.target;
    const stage = target.getStage();
    const p = stage.getPointerPosition();

    // Điều chỉnh vị trí con trỏ theo tỷ lệ zoom
    const pointer = Utils.snapToGrid(
      zoom,
      gridSize,
      Utils.adjustPointerForZoom(zoom, p)
    );

    if (newPolygon && drawingMode === 'polygon') {
      setNewPolygon({ ...newPolygon, isComplete: true });
      addShapeToLayer(selectedLayer.id, { ...shapeProps(newPolygon) });
      setNewPolygon(null);
    } else if (newFreeShape && drawingMode.includes('freeShape')) {
      setNewFreeShape({ ...newFreeShape, isComplete: true });
      addShapeToLayer(selectedLayer.id, { ...shapeProps(newFreeShape) });
      setNewFreeShape(null);
    }

    addPathToLayer();
  };

  const addPathToLayer = () => {
    if (newPath && newPath.length > 0) {
      // setIsContinuosLine(false);

      const newGroupId = Date.now();

      const newGroup = {
        ...lineProps({
          type: 'path',
          name: Const.ShapeName.GROUP,
          points: newPath.flatMap((shape) => shape.points),
        }),
        id: newGroupId, // gán ID trước
        shapes: newPath.map((shape) => ({
          ...shape,
          groupId: newGroupId, // gán groupId cho từng shape
        })),
        sharedPoints: sharedPoints,
      };

      addShapeToLayer(selectedLayer.id, {
        ...shapeProps(newGroup),
      });

      setNewPath([]);
      setSharedPoints(new Map());
      resetAllShapes();
    }
  };

  const isGroupInSelection = (groupNode, selectionBox) => {
    if (!groupNode) return false;
    const box = groupNode.getClientRect();
    return (
      box.x >= selectionBox.x &&
      box.y >= selectionBox.y &&
      box.x + box.width <= selectionBox.x + selectionBox.width &&
      box.y + box.height <= selectionBox.y + selectionBox.height
    );
  };

  const saveState = () => {
    const snapshot = JSON.parse(JSON.stringify(layers));
    undoStack.push(snapshot);
    if (undoStack.length > Const.maxHistory) {
      undoStack.shift();
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    redoStack.push(JSON.parse(JSON.stringify(layers)));

    if (redoStack.length > Const.maxHistory) {
      redoStack.shift();
    }

    setLayers(undoStack.pop());
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    undoStack.push(JSON.parse(JSON.stringify(layers)));

    if (undoStack.length > Const.maxHistory) {
      undoStack.shift();
    }

    setLayers(redoStack.pop());
  };

  const renderPathPoints = () => {
    if (!pathPoints) return;

    return pathPoints.map((p) => {
      const canvasP = Utils.getCanvasPosition(p.x, p.y, map); //!!!

      //$$$ Test
      // const canvasP = Utils.getCanvasPosition(p.x, p.y, {
      //   metadata: { height: 568 },
      //   resolution: 0.05,
      //   origin_x: 0,
      //   origin_y: 0,
      // });

      return (
        canvasP && <Circle x={canvasP.x} y={canvasP.y} fill="red" radius={2} />
      );
    });
  };

  const extractAllShapes = (shapes) => {
    let result = [];

    shapes.forEach((shape) => {
      if (shape.type === 'group' && Array.isArray(shape.shapes)) {
        // Nếu là group, lấy các shape bên trong (đệ quy)
        result.push(shape);
        result = result.concat(extractAllShapes(shape.shapes));
      } else {
        // Nếu là shape thường
        result.push(shape);
      }
    });

    return result;
  };

  // Đệ quy lấy tất cả shape name === "line"
  const collectAllLines = (shapes) => {
    const lines = [];

    for (const shape of shapes) {
      if (shape.name === 'line') {
        lines.push({ p1: shape.startP, p2: shape.endP });
      }

      // Nếu là group thì tiếp tục đệ quy
      if (Array.isArray(shape.shapes)) {
        lines.push(...collectAllLines(shape.shapes));
      }
    }

    return lines;
  };

  const saveEditMap = async () => {
    const allShapes = layers.flatMap((layer) => extractAllShapes(layer.shapes));
    const converted = allShapes.map((shape) => {
      return Utils.convertShapeForMetadata(shape);
    });
    // console.log(allShapes, converted);
    // console.log({
    //   metadata: {
    //     ...map?.metadata,
    //     layers: { ...Utils.generateMetadataLayersFromShapes(converted) },
    //   },
    // });

    // api.postAreaEvents({map_id: mapId, polygon: {}, type_id: })
    // const a = await api.putMap(mapId, {metadata: btoa(JSON.stringify(map?.metadata))});
    // console.log(a);
  };

  //===========================================CALL API============================================

  const lidarPoints = useRosTopic({
    rosInstance: ros,
    name: '/scan',
    messageType: 'sensor_msgs/LaserScan',
  });

  const transforms = useRosTopic({
    rosInstance: ros,
    name: '/tf',
    messageType: 'tf2_msgs/TFMessage',
  });

  const lidarOrigin = useRosTopic({
    rosInstance: ros,
    name: '/mirwebapp/laser_map_metadata',
    messageType: 'mirMsgs/LocalMapStat',
  });

  // //cập nhật mỗi 30 phút
  const mapRos = useRosTopic({
    rosInstance: ros,
    name: '/map',
    messageType: 'nav_msgs/OccupancyGrid',
    rest: {
      throttle_rate: 1800000,
    },
  });

  function rotatePoints(points, angleDeg) {
    const angleRad = (angleDeg * Math.PI) / 180;

    return points.map((p) => {
      const x = p.x;
      const y = p.y;
      const xRot = x * Math.cos(angleRad) - y * Math.sin(angleRad);
      const yRot = x * Math.sin(angleRad) + y * Math.cos(angleRad);
      return { x: xRot, y: yRot };
    });
  }

  useEffect(() => {
    if (!lidarMapPoints || !transforms || !lidarOrigin) return;

    // const points = rotatePoints(Utils.processLidarData(lidarPoints, transforms?.transforms), robotStatus?.position.orientation);
    const points = Utils.processLidarData(
      lidarPoints,
      robotStatus?.position,
      'front'
    );
    // console.log(points)
    // const points = ps.map((p) => Utils.getCanvasPosition(p.x, p.y, map));
    if (!points) return;

    const lidarMapP = points.map((p) => {
      return {
        x: (p.x - map?.origin_x) / map?.resolution + lidarOrigin.x,
        y:
          map?.metadata.height -
          (p.y - map?.origin_y) / map?.resolution +
          lidarOrigin.y,
      };
    });
    setLidarMapPoints(lidarMapP);
  }, [lidarPoints, transforms, lidarOrigin]);

  useEffect(() => {
    if (!mapRos) return;

    const blob = new Blob([mapWorkerCode], {
      type: 'application/javascript',
    });
    const workerMap = new Worker(URL.createObjectURL(blob));

    workerMap.postMessage({
      mapData: mapRos.data,
      rows: mapRos.info.height,
      cols: mapRos.info.width,
      targetValues: [0, -32], // gửi mảng nhiều giá trị
      resolution: mapRos.info.resolution,
    });

    workerMap.onmessage = (e) => {
      const data = e.data;

      setMapArray((prev) => ({
        ...prev,
        floor: data[0],
        walls: data[-32],
      }));

      workerMap.terminate();
    };
  }, [mapRos]);

  //======Test
  const [simPose, setSimPose] = useState({
    y: 13,
    x: 17,
    orientation: -171,
  });

  useEffect(() => {
    console.log(pathPoints);
  }, [pathPoints]);

  // const obstacles = [
  //   map?.metadata.layers?.areaprefs_forbidden.shapes,
  //   map?.metadata.layers?.walls.shapes,
  // ];

  // const metadata = {
  //   walls: map?.metadata.layers?.walls.shapes,
  //   forbiddenZone: map?.metadata.layers?.areaprefs_forbidden.shapes,
  // };

  const obstacles = Const.obstacles;

  const metadata = Const.metadata;

  const [isHoverVisible, setIsHoverVisible] = useState(false);
  const [isClickVisible, setIsClickVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handlePositionHover = (e, x, y) => {
    const realPosX = (zoom * x) / 100 + Const.RULER_SIZE;
    const realPosY = (zoom * y) / 100 + Const.RULER_SIZE;
    setTooltipPosition({ x: realPosX, y: realPosY });
    setTooltipContent('This is an image!'); // Replace with dynamic content
    setIsHoverVisible(true);
  };

  const handlePositionClick = (e, x, y) => {
    const realPosX = (zoom * x) / 100 + Const.RULER_SIZE;
    const realPosY = (zoom * y) / 100 + Const.RULER_SIZE;
    setTooltipPosition({ x: realPosX, y: realPosY });
    setTooltipContent('Image clicked!');
    setIsClickVisible(true);
  };

  const [dropdownData, setDropdownData] = useState([]);
  const handleDropdownOpen = () => {
    const mouse = { x: mousePos.xRuler, y: mousePos.yRuler }; // lấy mouse position hiện tại
    const prevMouse = newLine?.startP; // hoặc null
    const enabledSnapModes = {
      grid: false,
      end: true,
      mid: true,
      nearest: false,
      geometricCenter: true,
      node: true,
      quadrant: true,
      intersection: true,
      perpendicular: false,
      tangent: false,
      parallel: false,
      extension: false,
    };

    const { end, mid, node, quadrant, intersection } = Snap.getSnapCandidates(
      enabledSnapModes,
      mouse,
      prevMouse,
      Utils.getAllShapesFromLayers(layers),
      gridSize
    );

    const candidatesDict = {
      end,
      mid,
      node,
      quadrant,
      intersection,
    };

    // Gộp các candidates từ từng loại (mid, end, ...) thành 1 mảng
    const candidates = Object.values(candidatesDict).flat();

    if (candidates.length <= 0) {
      setDropdownData([]);
      return;
    }

    // Gom nhóm theo loại
    const groupByType = {};
    for (const [type, points] of Object.entries(candidatesDict)) {
      if (points.length > 0) {
        groupByType[type] = points.map(
          (c) => `(${c.x.toFixed(1)}, ${c.y.toFixed(1)})`
        );
      }
    }

    // Biến thành mảng để truyền vào dropdown
    const groupedData = Object.entries(candidatesDict).map(
      ([type, points]) => ({
        title: type,
        items: points.map((c) => ({
          label: `(${c.x.toFixed(1)}, ${c.y.toFixed(1)})`,
          value: { x: c.x, y: c.y, type },
        })),
      })
    );

    setDropdownData(groupedData);
  };

  return (
    <div className="full-height flex-wrap" onContextMenu={handleRightClick}>
      {isSpeedVisible && (
        <Comp.DraggableSection
          initialPosition={{ x: 25, y: 267 }}
          style={{ width: '21.77%' }}
        >
          <PathControl
            simPose={simPose}
            setSimPose={setSimPose}
            layers={layers}
            baseSpeed={speed.baseSpeed}
            setSpeed={(value) => {
              setSpeed({
                ...speed,
                linearSpeed: value.linear,
                angularSpeed: value.angular,
              });
            }}
            metadata={metadata}
            obstacles={obstacles}
          />

          <div className="flex col gap-5px" style={{ marginTop: '12px' }}>
            Base speed
            <div className="flex row gap-15px">
              <Comp.InputNumber
                placeholder="Base speed"
                value={speed.baseSpeed}
                onChange={(e) => {
                  setSpeed({
                    ...speed,
                    baseSpeed: Number(e.target.value),
                  });
                }}
                width={100}
                imgSrc="letterB"
              />
            </div>
          </div>

          <div className="flex col gap-5px" style={{ marginTop: '12px' }}>
            Robot speed
            <div className="flex row gap-15px">
              <div className="width-50per flex row background radius-5px gap-10px padding-10px">
                <img width="15px" height="15px" src={Const.ImageSrc.letterL} />{' '}
                <span> {speed.linearSpeed.toFixed(2)} </span>
              </div>
              <div className="width-50per flex row background radius-5px gap-10px padding-10px">
                <img width="15px" height="15px" src={Const.ImageSrc.letterA} />{' '}
                <span> {speed.angularSpeed.toFixed(2)} </span>
              </div>
            </div>
          </div>
        </Comp.DraggableSection>
      )}
      <CanvasComponent.CanvasToolbar
        toggleMode={toggleDrawingMode}
        defaultCursor={defaultCursor}
        removeShape={removeShape}
        groupShape={groupShape}
        ungroupShape={ungroupShape}
        copyShape={copyShape}
        pasteShape={pasteShape}
        undo={undo}
        redo={redo}
        undoActive={undoStack.length > 0}
        redoActive={redoStack.length > 0}
        setLineType={setLineType}
        setZoneType={setZoneType}
        lineType={lineType}
        zoneType={zoneType}
        copyActive={clipboard.length > 0}
        hasShapeSelected={selectedShapes.length > 0}
        editable={editable}
        setEditable={setEditable}
        saveEditMap={saveEditMap}
      />
      <div className="full-height" style={{ position: 'relative' }}>
        <CanvasComponent.Zoom zoom={zoom} setZoom={setZoom} />

        <CanvasComponent.LeftSidebar
          shapes={selectedLayer.shapes}
          layers={layers}
          setLayers={setLayers}
          handleUpdateShape={(id, newProps) =>
            handleUpdateShape(selectedLayer.id, id, newProps)
          }
          sidebarHeight={dimensions.height - Const.RULER_SIZE}
        />

        {
          <CanvasComponent.RightSidebar
            shape={
              selectedShape ||
              newLine || {
                name: Const.ShapeName.LINE,
                type: lineType,
                startP: mousePos,
              }
            }
            handleUpdateShape={(id, newProps) =>
              handleUpdateShape(selectedLayer.id, id, newProps)
            }
            saveState={saveState}
            sidebarHeight={dimensions.height - Const.RULER_SIZE}
            editable={true}
            dropdownData={dropdownData}
            handleDropdownOpen={handleDropdownOpen}
            onSelectItem={({ x, y, type }) => {
              const { x: xRuler, y: yRuler } = Utils.revertPointerFromZoom(
                zoom,
                { x, y }
              );
              setSnapPoint({ x, y, type });
              setMousePos({ xRuler, yRuler, x, y });
              drawShape({ x, y });
            }}
            onHoverItem={({ x, y, type }) => {
              const { x: xRuler, y: yRuler } = Utils.revertPointerFromZoom(
                zoom,
                { x, y }
              );
              setSnapPoint({ x, y, type });
              setMousePos({ xRuler, yRuler, x, y });
              if (newLine) {
                drawHoverShape({ x, y });
              }
            }}
          />
        }
        <Comp.PositionTooltip
          hoverContent={tooltipContent}
          position="top"
          clickContent={tooltipContent}
          isHoverVisible={isHoverVisible}
          isClickVisible={isClickVisible}
          tooltipPosition={tooltipPosition}
          setIsClickVisible={setIsClickVisible}
        ></Comp.PositionTooltip>
        <Stage
          ref={stageRef}
          width={dimensions.width - 50}
          height={dimensions.height}
          onMouseMove={handleStageMouseMove}
          onClick={handleStageClick}
          onDblClick={handleStageDblClick}
          className="full-height"
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={dimensions.width - 50}
              height={dimensions.height}
              fill="#F0F9F9" // màu nền bạn muốn
            />
          </Layer>
          {/* =============================================Layer chính để vẽ============================================== */}

          {layers.map((layer) => (
            <Layer
              ref={(el) => (layerRefs.current[layer.id] = { current: el })}
              x={Const.CANVAS_POS.x}
              y={Const.CANVAS_POS.y}
              scaleX={zoom / 100}
              scaleY={zoom / 100}
              opacity={layer.selected ? 1 : 0.6}
            >
              {renderedMapArray}

              {renderMetadata()}

              {renderlidarMapPoints()}

              {renderPositions()}

              {renderCreatePosition()}

              {renderCreateMarker()}

              {renderShapes(layer.shapes)}

              {renderShape(newLine)}

              {renderNewPath()}

              {drawSelection()}

              {renderPathPoints()}

              {robotStatus && (
                <ShapeComp.MyImage
                  x={
                    (robotStatus?.position.x - map?.origin_x) / map?.resolution
                  }
                  y={
                    map?.metadata.height -
                    (robotStatus?.position.y - map?.origin_y) / map?.resolution
                  }
                  rotation={robotStatus?.position.orientation}
                  imageSrc={Const.ImageSrc.robot}
                  width={0.89 / map?.resolution}
                  height={0.58 / map?.resolution}
                  opacity={0.1}
                />
              )}

              {simPose && (
                <ShapeComp.MyImage
                  // x={(simPose?.x - map?.origin_x) / map?.resolution}
                  // y={
                  //   map?.metadata.height -
                  //   (simPose?.y - map?.origin_y) / map?.resolution
                  // }
                  // rotation={simPose?.orientation}
                  x={(simPose.x - 0) / 0.05}
                  y={568 - (simPose.y - 0) / 0.05}
                  rotation={simPose.orientation}
                  imageSrc={Const.ImageSrc.robot}
                  width={30}
                  height={20}
                />
              )}
            </Layer>
          ))}

          {/* ===================================================GRID===================================================== */}
          <CanvasComponent.Grid
            ref={gridLayerRef}
            gridData={gridData}
            canvasPos={Const.CANVAS_POS}
            snapPoint={snapPoint}
            gridSize={gridSize}
          />

          {/* ==================================================RULER===================================================== */}
          <CanvasComponent.Ruler
            stageSize={dimensions}
            mousePos={mousePos}
            zoom={zoom}
            setGridData={setGridData}
            gridSize={gridSize}
            setGridSize={setGridSize}
            gridLayerRef={gridLayerRef}
          />
        </Stage>
      </div>
      <CanvasComponent.CanvasFooter setIsContinuosLine={setIsContinuosLine} />
    </div>
  );
};

export default Canvas;
