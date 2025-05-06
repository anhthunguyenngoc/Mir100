import React, { useEffect, useState, useRef, useMemo, use } from 'react';
import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';

import './canvas.css';
import { CanvasToolbar } from './toolbar/CanvasToolbar';
import * as CanvasComponent from './component';
import * as Const from '../constant';
import * as Utils from './utils';
import * as ShapeComp from '../canvas/path';
import * as Context from '../context';

//Api
import * as api from '../api';
import { useRosTopic, useRosConnection } from 'ros';
import { PathControl } from './path-control';

const Canvas = () => {
  /** @type { api.TGetStatus } */
  const { robotStatus } = Context.useAppContext();
  const {
    setPositionDialog,
    openCreatePosition,
    openCreateMarker,
    mapId,
    map,
    setDrawingMode,
    drawingMode,
    mapPositions,
  } = Context.useCanvasContext();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    xRuler: 0,
    yRuler: 0,
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
  const [editable, setEditable] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [clipboard, setClipboard] = useState([]);

  const [newLine, setNewLine] = useState(null);
  const [newArc, setNewArc] = useState(null);
  const [newZigzag, setNewZigzag] = useState(null);
  const [newTangent, setNewTangent] = useState(null);
  const [newULine, setNewULine] = useState(null);
  const [newSpline, setNewSpline] = useState(null);

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

  //Lấy ra danh sách shape được chọn
  const selectedShapes = useMemo(() => {
    return selectedLayer.shapes.filter((line) => line.selected);
  }, [selectedLayer.shapes]);

  const selectedShape = useMemo(() => {
    return selectedShapes.length === 1 ? selectedShapes[0] : null;
  }, [selectedShapes]);

  useEffect(() => {
    const container = stageRef.current?.container();
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const { offsetWidth } = container;
      // Đặt chiều cao là 90vh
      const height = window.innerHeight * 0.8;
      setDimensions({ width: offsetWidth, height });
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

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

  const removeShapeFromLayer = (layerId, selectedShapes) => {
    saveState();

    const selectedShapeIds = selectedShapes.map((shape) => shape.id);

    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === layerId
          ? {
              ...layer,
              shapes: layer.shapes.filter(
                (shape) => !selectedShapeIds.includes(shape.id)
              ),
            }
          : layer
      )
    );
  };

  const handleUpdateShape = (layerId, shapeId, newProps) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === layerId
          ? {
              ...layer,
              shapes: layer.shapes.map((shape) =>
                shape.id === shapeId ? { ...shape, ...newProps } : shape
              ),
            }
          : layer
      )
    );
  };

  const renderShape = (array) => {
    return array.map((line) => {
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
          return (
            <ShapeComp.MyGroup
              id={line.id}
              ref={(node) => (groupRefs.current[line.id] = node)}
              children={renderShape(line.shapes)}
              points={line.points}
            />
          );

        default:
          return null;
      }
    });
  };

  const renderMetadata = () => {
    // Mảng để lưu các phần tử Line
    const lines = [];

    //!!!!
    // // Lặp qua các zones trong layers
    // for (const zones in map?.metadata.layers) {
    //   // Lấy shapes của từng zone
    //   const shapes = map?.metadata.layers[zones].shapes;

    //   // Nếu có shapes, lặp qua các shape để tạo các Line
    //   shapes.forEach((zone, index) => {
    //     lines.push(
    //       <Line
    //         points={zone.polygon.flatMap((point) => [point.x, point.y])}
    //         stroke={zone.color}
    //         strokeWidth={zone.brushsize}
    //         closed={shapes[0]?.type === 'shape'} // Giữ `false` nếu không muốn tạo đa giác kín
    //         fill={zone.color}
    //       />
    //     );
    //   });
    // }

    //$$$Test */
    Object.entries(metadata).forEach(([key, zones]) => {
      zones.forEach((zone) => {
        lines.push(
          <Line
            key={`${key}-${JSON.stringify(zone.polygon)}`}
            points={zone.polygon.flatMap((point) => [point.x, point.y])}
            stroke={zone.color}
            strokeWidth={zone.brushsize}
            closed={zone.type === 'shape'}
            fill={zone.color}
          />
        );
      });
    });

    // Trả về mảng các phần tử Line
    return lines;
  };

  const renderPositions = () => {
    if (!mapPositions) return;

    return mapPositions.map((position) => {
      const p = Utils.getCanvasPosition(position.pos_x, position.pos_y, map);
      return (
        <ShapeComp.MyImage
          x={p.x}
          y={p.y}
          rotation={position.orientation}
          imageSrc={Const.getPositionImage(position.type_id)}
          width={20}
          height={20}
          onClick={() =>
            setPositionDialog({
              isVisible: true,
              name: position.name,
              type_id: position.type_id,
              id: position.guid,
            })
          }
        />
      );
    });
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

  const renderlidarMapPoints = () => {
    if (!lidarMapPoints) return;

    return lidarMapPoints.map((point, index) => {
      if (!point || !point.x || !point.y) return;

      return (
        <Circle key={index} x={point.x} y={point.y} radius={0.5} fill={'red'} />
      );
    });
  };

  const renderMap = () => {
    if (!obstacles) return;

    return obstacles.map((point, index) => {
      if (!point || !point.x || !point.y) return;

      return (
        <Circle key={index} x={point.x} y={point.y} radius={1} fill={'red'} />
      );
    });
  };

  const drawShape = () => {
    if (newLine) {
      return <ShapeComp.MyArrow {...shapeProps(newLine)} />;
    }

    if (newArc) {
      return (
        <>
          <ShapeComp.ThreePointArc {...shapeProps(newArc)} />

          <Text
            text={`Angle: ${Math.round(newArc.angle * 100) / 100}°`}
            x={newArc.points[0].x + 10}
            y={newArc.points[0].y}
            fontSize={14}
            fill="red"
          />
        </>
      );
    }

    if (newZigzag) {
      return <ShapeComp.MyZigzag {...shapeProps(newZigzag)} />;
    }

    if (newTangent) {
      return <ShapeComp.MyTangent {...shapeProps(newTangent)} />;
    }

    if (newULine && newULine.startP && newULine.bottomP) {
      return <ShapeComp.MyULine {...shapeProps(newULine)} />;
    }

    if (newSpline) {
      return <ShapeComp.MySpline {...shapeProps(newSpline)} />;
    }

    if (newCircle) {
      return (
        <ShapeComp.MyCircle
          {...shapeProps(newCircle)}
          isVisible={true}
          hitboxVisible={false}
        />
      );
    }

    if (newRectangle && newRectangle.startP && newRectangle.endP) {
      return <ShapeComp.MyRectangle {...shapeProps(newRectangle)} />;
    }

    if (newElip) {
      return <ShapeComp.MyElip {...shapeProps(newElip)} />;
    }

    if (newPolygon) {
      return (
        <ShapeComp.MyPolygon
          {...shapeProps(newPolygon)}
          isComplete={newPolygon.isComplete}
        />
      );
    }

    if (newFreeShape) {
      return <ShapeComp.MySpline {...shapeProps(newFreeShape)} />;
    }

    return null; // Nếu không có shape nào phù hợp, return null
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
    setNewArc(null);
    setNewZigzag(null);
    setNewTangent(null);
    setNewULine(null);
    setNewSpline(null);

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
    resetAllShapes();
  };

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
    const isShiftPressed = event?.shiftKey; // Kiểm tra Shift có được nhấn không

    selectedLayer.shapes.map((shape) => {
      if (isShiftPressed) {
        if (shape.id === id) {
          handleUpdateShape(selectedLayer.id, shape.id, {
            selected: !shape.selected,
          });
        }
      } else {
        if (shape.id === id) {
          handleUpdateShape(selectedLayer.id, shape.id, {
            selected: !shape.selected,
          });
        } else {
          handleUpdateShape(selectedLayer.id, shape.id, { selected: false });
        }
      }
    });
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
    name: line.name,
    type: line.type,
    groupName: line.name,
    points: line.points,
    pointerLength: 4,
    pointerWidth: 4,
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
    isDrawing: false,
    onClick: (e) => {
      selectLine(line.id, e);
    },
    onDrag: (x, y) => onDrag(x, y),
    onUpdateShape: (newProps) =>
      handleUpdateShape(selectedLayer.id, line.id, newProps),
    saveState: () => saveState(),
  });

  const shapeProps = (line) => {
    switch (line.name) {
      case Const.ShapeName.LINE:
        return {
          ...baseShapeProps(line),
          getShapePoints: () => {
            return Utils.getPointsAlongLine(line.startP, line.endP, 10).map(
              (p) => {
                // return Utils.getRealPosition(p.x, p.y, map); //!!!!

                //$$$ Test
                return Utils.getRealPosition(p.x, p.y, {
                  metadata: { height: 568 },
                  resolution: 0.05,
                  origin_x: 0,
                  origin_y: 0,
                });
              }
            );
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
          getShapePoints: () => {
            const pathData = ShapeComp.getZigzagPathData(
              [line.startP, line.midP, line.endP],
              line.radius
            );
            return Utils.getPointsOnPath(pathData, 10).map((p) => {
              // return Utils.getRealPosition(p.x, p.y, map); // !!!!

              //$$$ Test
              return Utils.getRealPosition(p.x, p.y, {
                metadata: { height: 568 },
                resolution: 0.05,
                origin_x: 0,
                origin_y: 0,
              });
            });
          },
        };
      case Const.ShapeName.SPLINE:
        return {
          ...baseShapeProps(line),
          isComplete: line.isComplete,
          getShapePoints: () => {
            let pointPairs = [];

            if (line.mode.includes('p-')) {
              // Dữ liệu gốc, không dùng spline
              const sampled = ShapeComp.samplePSplineByDistance(line.points, 10);
              for (let i = 0; i < sampled.length; i += 2) {
                pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
              }
            } else if (line.mode.includes('cv-')) {
              // Dữ liệu spline được lấy mẫu đều
              const sampled = ShapeComp.sampleBSplineByDistance(line.points, 10);
              for (let i = 0; i < sampled.length; i += 2) {
                pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
              }
            }

            return pointPairs.map((p) => {
              // return Utils.getRealPosition(p.x, p.y, map); // !!!!

              //$$$ Test
              return Utils.getRealPosition(p.x, p.y, {
                metadata: { height: 568 },
                resolution: 0.05,
                origin_x: 0,
                origin_y: 0,
              });
            });
          },
          
        };
      case Const.ShapeName.ULINE:
        return {
          ...baseShapeProps(line),
          rx: line.rx,
          ry: line.ry,
          bottomP: line.bottomP,
          getShapePoints: () => {
            const pathData = ShapeComp.getUlinePathData(
              line.startP,
              line.bottomP,
              line.ry
            );

            return Utils.getPointsOnPath(pathData, 10).map((p) => {
              // return Utils.getRealPosition(p.x, p.y, map); // !!!!

              //$$$ Test
              return Utils.getRealPosition(p.x, p.y, {
                metadata: { height: 568 },
                resolution: 0.05,
                origin_x: 0,
                origin_y: 0,
              });
            });
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

    // Điều chỉnh vị trí con trỏ theo tỷ lệ zoom
    const pointer = Utils.snapToGrid(
      zoom,
      gridSize,
      Utils.adjustPointerForZoom(zoom, p)
    );

    //Selection
    if (drawingMode === 'rect-selection' && !selectionBox) {
      setStartPoint(pointer);
      setSelectionBox({ x: pointer.x, y: pointer.y, width: 0, height: 0 });
    } else if (drawingMode === 'free-selection') {
      setSelectionPoints([pointer.x, pointer.y]);
    }

    //2nd click
    if (drawingMode === 'rect-selection' && selectionBox) {
      const newLines = selectedLayer.shapes.map((line) => {
        const groupNode = groupRefs.current[line.id];
        if (!groupNode) return line;

        if (line.name === Const.ShapeName.GROUP) {
          // Kiểm tra từng shape trong group
          const newShapes = line.shapes.map((shape) => {
            const shapeNode = groupRefs.current[shape.id];
            if (!shapeNode) return shape;

            const isSelected = isGroupInSelection(shapeNode, selectionBox);
            return { ...shape, selected: isSelected };
          });

          // Nếu có ít nhất 1 shape được chọn, group cũng được chọn
          const isGroupSelected = newShapes.some((shape) => shape.selected);

          return { ...line, shapes: newShapes, selected: isGroupSelected };
        } else {
          const isSelected = isGroupInSelection(groupNode, selectionBox);
          return { ...line, selected: isSelected };
        }
      });

      replaceShapesInLayer(selectedLayer.id, newLines);
      setSelectionBox(null);
    } else if (drawingMode === 'free-selection' && selectionPoints) {
      setSelectionPoints([]);
    }
    //

    if (!drawingMode) return;
    if (drawingMode === 'line') {
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
        });
      } else {
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newLine) });
        setNewLine(null);
        setDrawing(true);
      }
    } else if (drawingMode.includes('arc')) {
      if (!newArc) {
        setNewArc({
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
      } else if (newArc.points.length < 2) {
        setNewArc({ ...newArc, points: [...newArc.points, pointer] });
      } else {
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newArc) });
        setNewArc(null);
      }
    } else if (drawingMode.includes('zigzag')) {
      if (!newZigzag) {
        // Lưu điểm đầu tiên
        setNewZigzag({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.ZIGZAG,
          }),
          radius: 0,
          direction: Const.LineDirection.START_TO_END,
          startP: pointer,
        });
      } else if (newZigzag.startP && !adjustingRadius) {
        if (drawingMode === 'sm-zigzag') {
          const start = newZigzag.startP;
          const mid = pointer;
          setNewZigzag({
            ...newZigzag,
            midP: mid,
            endP: ShapeComp.calculateEndPoint(start, mid),
            radius: newZigzag.radius,
          });
        } else if (drawingMode === 'se-zigzag') {
          const start = newZigzag.startP;
          const end = pointer;
          setNewZigzag({
            ...newZigzag,
            midP: ShapeComp.calculateMidPoint(start, end),
            endP: end,
            radius: newZigzag.radius,
          });
        }
        setAdjustingRadius(true); // Cho phép điều chỉnh radius sau khi chọn trung điểm
      } else if (
        newZigzag.startP &&
        newZigzag.midP &&
        newZigzag.endP &&
        adjustingRadius
      ) {
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newZigzag) });
        setNewZigzag(null);
        setAdjustingRadius(false); // Ngừng điều chỉnh radius
      }
    } else if (drawingMode === 'tangent') {
      if (newTangent) {
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newTangent) });
        setNewTangent(null);
      }
    } else if (drawingMode.includes('uline')) {
      if (!newULine) {
        // Chọn điểm bắt đầu
        setNewULine({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.ULINE,
          }),
          rx: 0.1,
          ry: 0.1,
          startP: pointer,
        });
      } else if (newULine.startP && !adjustingRadius) {
        // Chọn điểm bottom
        setNewULine({
          ...newULine,
          bottomP: pointer,
          endP: Utils.calculateUlineEndPoint(newULine.startP, pointer),
        });
        setAdjustingRadius(true);
      } else {
        // Khi click lần thứ 3, lưu đường U vào danh sách
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newULine) });
        setNewULine(null); // Reset để vẽ đường mới
        setAdjustingRadius(false);
      }
    } else if (drawingMode.includes('spline')) {
      const { x, y } = pointer;
      if (!newSpline) {
        setNewSpline({
          ...lineProps({
            type: lineType,
            name: Const.ShapeName.SPLINE,
            points: [x, y],
          }),
        });
      } else {
        setNewSpline({ ...newSpline, points: [...newSpline.points, x, y] });
      }
    } else if (drawingMode.includes('circle')) {
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
    } else if (drawingMode.includes('rectangle')) {
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
    } else if (drawingMode.includes('elip')) {
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
    } else if (drawingMode.includes('polygon')) {
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
    } else if (drawingMode.includes('freeShape')) {
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
    }

    //Thêm position
    if (drawingMode === 'add-pos') {
      if (!createPos) {
        setCreatePos({ pos_x: mousePos.x, pos_y: mousePos.y, orientation: 0 });
      } else {
        const m = { pos_x: mousePos.x, pos_y: mousePos.y };
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
          pos_x: mousePos.x,
          pos_y: mousePos.y,
          orientation: 0,
        });
      } else {
        const m = { pos_x: mousePos.x, pos_y: mousePos.y };
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

    // Điều chỉnh vị trí con trỏ theo tỷ lệ zoom
    const pointer = Utils.snapToGrid(
      zoom,
      gridSize,
      Utils.adjustPointerForZoom(zoom, p)
    );

    setMousePos({
      x: pointer.x,
      y: pointer.y,
      xRuler: p.x - Const.RULER_SIZE,
      yRuler: p.y - Const.RULER_SIZE,
    });
    setSnapPoint(Utils.snapToGrid(zoom, gridSize, pointer));

    //Selection
    if (drawingMode === 'rect-selection') {
      if (selectionBox) {
        setSelectionBox({
          x: Math.min(startPoint.x, pointer.x),
          y: Math.min(startPoint.y, pointer.y),
          width: Math.abs(startPoint.x - pointer.x),
          height: Math.abs(startPoint.y - pointer.y),
        });
      }
    } else if (drawingMode === 'free-selection' && selectionPoints) {
      setSelectionPoints((prev) => [...prev, pointer.x, pointer.y]);
    }
    //

    //Vẽ đường thẳng
    if (drawing && newLine) {
      setNewLine({
        ...newLine,
        endP: { x: pointer.x, y: pointer.y },
      });
    }

    //Vẽ đường arc
    if (newArc && newArc.points.length >= 2) {
      if (drawingMode.includes('3p')) {
        setNewArc({
          ...newArc,
          points: [...newArc.points.slice(0, 2), pointer],
        });
      } else if (drawingMode === 'sca-arc' || drawingMode === 'csa-arc') {
        const angle = ShapeComp.arcCalculateAngle(newArc.points[1], pointer);
        setNewArc({
          ...newArc,
          angle: angle,
          points: [...newArc.points.slice(0, 2), pointer],
        });
      } else if (drawingMode === 'sea-arc') {
        const angle = ShapeComp.arcCalculateAngle(newArc.points[0], pointer);
        setNewArc({
          ...newArc,
          angle: angle,
          points: [...newArc.points.slice(0, 2), pointer],
        }); //start, end
      } else if (drawingMode === 'ser-arc') {
        const radius = ShapeComp.calculateDistance(newArc.points[1], pointer);
        setNewArc({
          ...newArc,
          radius: radius,
          points: [...newArc.points.slice(0, 2), pointer],
        }); //start, end
      }
    }

    //Vẽ đường zigzag
    if (newZigzag && newZigzag.startP && !adjustingRadius) {
      if (drawingMode === 'sm-zigzag') {
        const start = newZigzag.startP;
        const mid = pointer;
        setNewZigzag({
          ...newZigzag,
          midP: mid,
          endP: ShapeComp.calculateEndPoint(start, mid),
          radius: newZigzag.radius,
        });
      } else if (drawingMode === 'se-zigzag') {
        const start = newZigzag.startP;
        const end = pointer;
        setNewZigzag({
          ...newZigzag,
          midP: ShapeComp.calculateMidPoint(start, end),
          endP: end,
          radius: newZigzag.radius,
        });
      }
    } else if (adjustingRadius && newZigzag) {
      const radius = newZigzag.radius;
      const [tp0, tp1, tp2] = [
        newZigzag.startP,
        newZigzag.midP,
        newZigzag.endP,
      ];
      const p0 = tp1.x + (tp0.x > tp2.x ? radius : -radius);
      const p1 = tp0.y + (tp0.y < tp2.y ? radius : -radius);

      const deltaX = pointer.x - tp1.x;

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
        const newRadius = Math.max(0, newZigzag.radius + (deltaX > 0 ? 1 : -1));
        setNewZigzag({
          ...newZigzag,
          radius: newRadius,
        });
      } else if (tp1.y === p1 || tp0.x === p0) {
        const newRadius = Math.max(0, newZigzag.radius - 1);
        setNewZigzag({
          ...newZigzag,
          radius: newRadius,
        });
      }
    }

    //Vẽ đường tiếp tuyến
    if (drawingMode === 'tangent') {
      if (target.name() === Const.ShapeName.ARC) {
        const { center, radius } = {
          center: { x: target.attrs.x, y: target.attrs.y },
          radius: target.attrs.outerRadius,
        };
        const dx = pointer.x - center.x;
        const dy = pointer.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (Math.abs(distance - radius) <= 5) {
          setNewTangent({
            ...lineProps({
              type: lineType,
              name: Const.ShapeName.TANGENT,
              points: [],
            }),
            contactPoint: pointer,
            arc: { center, radius },
          });
        } else {
          setNewTangent(null);
        }
      }
    }

    //Vẽ đường chữ U
    if (newULine && newULine.startP && !adjustingRadius) {
      setNewULine({
        ...newULine,
        bottomP: pointer,
        endP: Utils.calculateUlineEndPoint(newULine.startP, pointer),
      }); // Giới hạn ry ≥ 0.1
    } else if (
      newULine &&
      newULine.startP &&
      newULine.bottomP &&
      adjustingRadius
    ) {
      const deltaX = pointer.x - newULine.bottomP.x; // Khoảng cách di chuột
      setNewULine({ ...newULine, ry: Math.max(0.1, deltaX) }); // Giới hạn ry ≥ 0.1
    }

    //Vẽ đường chữ Spline
    if (drawingMode && drawingMode.includes('spline')) {
      const { x, y } = pointer;
      if (newSpline && newSpline.points.length === 2) {
        setNewSpline({ ...newSpline, points: [...newSpline.points, x, y] });
      } else if (newSpline && newSpline.points.length >= 4) {
        setNewSpline({
          ...newSpline,
          points: [...newSpline.points.slice(0, -2), x, y],
        });
      }
    }

    //Vẽ Circle
    if (newCircle && newCircle.points && newCircle.points.length >= 1) {
      setNewCircle({ ...newCircle, points: [newCircle.points[0], pointer] });
    } else if (newCircle && newCircle.points && newCircle.points.length === 2) {
      if (drawingMode === '3p-circle') {
        setNewCircle({
          ...newCircle,
          points: [...newCircle.points.slice(0, 2), pointer],
        });
      }
    }

    //Vẽ Rectangle
    if (newRectangle && newRectangle.startP) {
      setNewRectangle({
        ...newRectangle,
        endP: pointer,
      });
    }

    //Vẽ Elip
    if (
      newElip &&
      newElip.points &&
      newElip.points.length >= 1 &&
      !newElip.clicked
    ) {
      setNewElip({ ...newElip, points: [newElip.points[0], pointer] });
    } else if (
      newElip &&
      newElip.points &&
      newElip.points.length >= 2 &&
      newElip.clicked
    ) {
      setNewElip({
        ...newElip,
        points: [newElip.points[0], newElip.points[1], pointer],
      });
    }

    //Vẽ Polygon
    if (newPolygon) {
      if (newPolygon.points.length === 1) {
        setNewPolygon({
          ...newPolygon,
          points: [...newPolygon.points, pointer],
        });
      } else if (newPolygon.points.length >= 2) {
        setNewPolygon({
          ...newPolygon,
          points: [...newPolygon.points.slice(0, -1), pointer],
        });
      }
    }

    //Vẽ Free Shape
    if (newFreeShape) {
      const { x, y } = pointer;
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

    //Thêm position
    if (drawingMode === 'add-pos' && createPos) {
      const m = { pos_x: mousePos.x, pos_y: mousePos.y };
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
      const m = { pos_x: mousePos.x, pos_y: mousePos.y };
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

    if (newSpline && drawingMode.includes('spline')) {
      if (newSpline) {
        addShapeToLayer(selectedLayer.id, { ...shapeProps(newSpline) });
        setNewSpline(null);
      }
    } else if (newPolygon && drawingMode === 'polygon') {
      setNewPolygon({ ...newPolygon, isComplete: true });
      addShapeToLayer(selectedLayer.id, { ...shapeProps(newPolygon) });
      setNewPolygon(null);
    } else if (newFreeShape && drawingMode.includes('freeShape')) {
      setNewFreeShape({ ...newFreeShape, isComplete: true });
      addShapeToLayer(selectedLayer.id, { ...shapeProps(newFreeShape) });
      setNewFreeShape(null);
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

  const isPointInPolygon = (point, polygon) => {
    let [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
      let xi = polygon[i],
        yi = polygon[i + 1];
      let xj = polygon[j],
        yj = polygon[j + 1];
      let intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
      j = i;
    }
    return inside;
  };

  const cellSize = 1; // Kích thước ô vuông trên bản đồ

  // Hàm chuyển đổi giá trị thành màu sắc
  const getColor = (value) => {
    const colors = [
      '#ffffff',
      '#ffdddd',
      '#ffaaaa',
      '#ff7777',
      '#ff4444',
      '#ff0000',
    ];
    return colors[Math.min(value, colors.length - 1)];
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

  const [pathPoints, setPathPoints] = useState([]);

  const renderPathPoints = () => {
    if (!pathPoints) return;

    return pathPoints.map((p) => {
      // const canvasP = Utils.getCanvasPosition(p.x, p.y, map); //!!!

      //$$$ Test
      const canvasP = Utils.getCanvasPosition(p.x, p.y, {
        metadata: { height: 568 },
        resolution: 0.05,
        origin_x: 0,
        origin_y: 0,
      });
      return (
        canvasP && <Circle x={canvasP.x} y={canvasP.y} fill="red" radius="2" />
      );
    });
  };

  const renderPointAlongZigzag = (line) => {
    if (!line || !line.endP || !line.radius) return;

    const pathData = ShapeComp.getZigzagPathData(
      [line.startP, line.midP, line.endP],
      line.radius
    );
    const points = Utils.getPointsOnPath(pathData, 5);
    return points.map((p) => {
      return <Circle x={p.x} y={p.y} fill="red" radius={1} />;
    });
  };

  const renderPointAlongUline = (line) => {
    if (!line || !line.endP || !line.ry) return;

    const pathData = ShapeComp.getUlinePathData(
      line.startP,
      line.bottomP,
      line.ry
    );
    const points = Utils.getPointsOnPath(pathData, 5);
    return points.map((p) => {
      return <Circle x={p.x} y={p.y} fill="red" radius={1} />;
    });
  };

  const renderPointAlongSpline = (line) => {
    if (!line || !line.points) return null;

    let pointPairs = [];

    if (line.mode.includes('p-')) {
      // Dữ liệu gốc, không dùng spline
      const sampled = ShapeComp.samplePSplineByDistance(line.points, 5);
      for (let i = 0; i < sampled.length; i += 2) {
        pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
      }
    } else if (line.mode.includes('cv-')) {
      // Dữ liệu spline được lấy mẫu đều
      const sampled = ShapeComp.sampleBSplineByDistance(line.points, 5);
      for (let i = 0; i < sampled.length; i += 2) {
        pointPairs.push({ x: sampled[i], y: sampled[i + 1] });
      }
    }

    return pointPairs.map((p, idx) => (
      <Circle key={idx} x={p.x} y={p.y} fill="red" radius={1} />
    ));
  };

  //===========================================CALL API============================================

  const ros = useRosConnection(); // chỉ 1 connection chung

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

  useEffect(() => {
    if (!lidarMapPoints && !transforms) return;

    const points = Utils.processLidarData(lidarPoints, transforms?.transforms);

    if (!points) return;

    const lidarMapP = points.map((p) => {
      return {
        x: (p.x - map?.origin_x) / map?.resolution,
        y: map?.metadata.height - (p.y - map?.origin_y) / map?.resolution,
      };
    });
    setLidarMapPoints(lidarMapP);
  }, [lidarPoints, transforms]);

  //======Test
  const [simPose, setSimPose] = useState({
    y: 12.866586685180664,
    x: 16.529640197753906,
    orientation: Math.PI/2,
  });

  // useEffect(() => {
  //   console.log(simPose);
  // }, [simPose]);

  // useEffect(() => {
  //   console.log(pathPoints);
  // }, [pathPoints]);

  const metadata = {
    walls: [
      {
        polygon: [
          { x: 460, y: 380 },
          { x: 460, y: 200 },
        ],
        color: '#000000',
        brushsize: 1,
        type: 'line',
      },
    ],
    forbiddenZone: [
      {
        polygon: [
          { x: 520, y: 380 },
          { x: 520, y: 200 },
          { x: 600, y: 200 },
          { x: 600, y: 380 },
        ],
        color: '#FFEBEE',
        brushsize: 1,
        type: 'shape',
      },
    ],
  };

  const obstacles = [
    // { x: 420, y: 300 },
    // { x: 400, y: 300 },
  ];

  return (
    <div className="full-height flex col">
      <PathControl
        rosInstance={ros}
        simPose={simPose}
        setSimPose={setSimPose}
        layers={layers}
        pathPoints={pathPoints}
        setPathPoints={setPathPoints}
        metadata={metadata}
        obstacles={obstacles}
      />

      <CanvasToolbar
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
      />

      <div className="full-height" style={{ position: 'relative' }}>
        <CanvasComponent.Zoom zoom={zoom} setZoom={setZoom} />
        {editable && (
          <CanvasComponent.LeftSidebar
            shapes={selectedLayer.shapes}
            layers={layers}
            setLayers={setLayers}
            handleUpdateShape={(id, newProps) =>
              handleUpdateShape(selectedLayer.id, id, newProps)
            }
          />
        )}
        {editable && (
          <CanvasComponent.RightSidebar
            shape={selectedShape}
            handleUpdateShape={(id, newProps) =>
              handleUpdateShape(selectedLayer.id, id, newProps)
            }
            saveState={saveState}
            sidebarHeight={dimensions.height}
          />
        )}
        <Stage
          ref={stageRef}
          width={dimensions.width - 50}
          height={dimensions.height}
          onMouseMove={handleStageMouseMove}
          onClick={handleStageClick}
          className="full-height"
        >
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
              {renderlidarMapPoints()}

              {renderMetadata()}

              {renderMap()}

              {/* {renderPositions()} */}

              {renderCreatePosition()}

              {renderCreateMarker()}

              {renderShape(layer.shapes)}

              {drawShape()}

              {drawSelection()}

              {renderPathPoints()}

              {renderPointAlongUline(newULine)}

              {renderPointAlongSpline(newSpline)}

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
                  width={30}
                  height={20}
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
                  rotation={(simPose.orientation * 180) / Math.PI}
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
    </div>
  );
};

export default Canvas;
