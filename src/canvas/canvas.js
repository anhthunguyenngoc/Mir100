import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';

import './canvas.css';
import { CanvasToolbar } from './toolbar/CanvasToolbar';
import * as CanvasComponent from './component';
import * as Const from '../constant';
import * as Utils from './utils';
import * as ShapeComp from '../canvas/path';

//Api
import * as api from '../api';
import RosTopic from '../ros/ros';
import { li } from 'framer-motion/client';

const Canvas = ({ canvasW, canvasH, mapId, robotPosition }) => {
  const stageSize = useMemo(
    () => ({
      width: canvasW,
      height: canvasH,
    }),
    [canvasW, canvasH]
  );

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
  const [drawingMode, setDrawingMode] = useState(null);
  const [selection, setSelection] = useState(null);

  const [wallsData, setWallsData] = useState([]);
  const [areaprefs_preferred, setAreaprefs_preferred] = useState([]);
  const [areaprefs_unpreferred, setAreaprefs_unpreferred] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [mapPositions, setMapPositions] = useState([]);

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

  const renderAreaprefsPreferred = () => {
    return areaprefs_preferred.map((wall, index) => (
      <Line
        key={index}
        points={wall.polygon.flatMap((point) => [point.x, point.y])}
        stroke={wall.color}
        strokeWidth={wall.brushsize}
        closed={true} // Giữ `false` nếu không muốn tạo đa giác kín
        fill={wall.color}
        draggable
      />
    ));
  };

  const renderAreaprefsUnpreferred = () => {
    return areaprefs_unpreferred.map((wall, index) => (
      <Line
        key={index}
        points={wall.polygon.flatMap((point) => [point.x, point.y])}
        stroke={wall.color}
        strokeWidth={wall.brushsize}
        closed={true} // Giữ `false` nếu không muốn tạo đa giác kín
        fill={wall.color}
        draggable
      />
    ));
  };

  const renderWallsData = () => {
    return wallsData.map((wall, index) => (
      <Line
        key={index}
        points={wall.polygon.flatMap((point) => [point.x, point.y])}
        stroke={wall.color}
        strokeWidth={wall.brushsize}
        closed={false} // Giữ `false` nếu không muốn tạo đa giác kín
        draggable
      />
    ));
  };

  const renderMapData = () => {
    return mapData.map((point, index) => (
      <Circle
        key={index}
        x={point.x}
        y={point.y}
        radius={1}
        fill={point.range > 0.05 && point.range < 29 ? 'red' : 'gray'}
      />
    ))
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
  };

  const toggleDrawingMode = (mode) => {
    setDrawingMode(drawingMode === mode ? null : mode);
    resetAllShapes();
  };

  const defaultCursor = () => {
    setDrawingMode(null);
    resetAllShapes();
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

  const lineProps = ({ name, points }) => ({
    id: Date.now(),
    name: name,
    points: points,
    selected: false,
    mode: drawingMode,
    direction: Const.LineDirection.START_TO_END,
  });

  const baseShapeProps = (line) => ({
    ref: (node) => (groupRefs.current[line.id] = node),
    id: line.id,
    name: line.name,
    groupName: line.name,
    points: line.points,
    pointerLength: 10,
    pointerWidth: 10,
    fill: '#ACACAC',
    stroke: 'black',
    strokeWidth: 2,
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
        };
      case Const.ShapeName.SPLINE:
        return {
          ...baseShapeProps(line),
          isComplete: line.isComplete,
        };
      case Const.ShapeName.ULINE:
        return {
          ...baseShapeProps(line),
          rx: line.rx,
          ry: line.ry,
          bottomP: line.bottomP,
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

  const saveState = (() => {
    const snapshot = JSON.parse(JSON.stringify(layers));
    undoStack.push(snapshot);
    if (undoStack.length > Const.maxHistory) {
      undoStack.shift();
    }
  });

  const undo = (() =>{
    if (undoStack.length === 0) return;
    redoStack.push(JSON.parse(JSON.stringify(layers)));

    if (redoStack.length > Const.maxHistory) {
      redoStack.shift();
    }
  
    setLayers(undoStack.pop());
  });

  const redo = (() =>{
    if (redoStack.length === 0) return;
    undoStack.push(JSON.parse(JSON.stringify(layers)));

    if (undoStack.length > Const.maxHistory) {
      undoStack.shift();
    }
  
    setLayers(redoStack.pop());
  });

  //===========================================CALL API============================================

  const message = RosTopic('/f_scan', 'sensor_msgs/LaserScan');
  useEffect(() => {
    
    const points =(message?.ranges ?? []).map((r, i) => {
      const angle = message.angle_min + i * message.angle_increment;
      const x = r * Math.cos(angle) * 10 + 200;  // scale + offset giữa canvas
      const y = r * Math.sin(angle) * 10 + 200;
      return { x, y, range: r };
    });

    setMapData(points)
  }, [message]);

  //   const message = RosTopic("/mirwebapp/laser_map_metadata", "mirMsgs/LocalMapStat", {throttle_rate: 10});
  // useEffect(() => {
  //   setMapData(message.ranges);
  // }, [message]);

  useEffect(() => {
    const fetchCurrentMap = async () => {
      try {
        const { statusCode, data } = await api.getMap(mapId);
        const decodedMetadata = JSON.parse(atob(data.metadata));
        console.log(decodedMetadata, data)
        // In ra nội dung đã giải mã
        console.log(decodedMetadata);
        setWallsData(decodedMetadata.layers.walls.shapes);
        setAreaprefs_preferred(
          decodedMetadata.layers.areaprefs_preferred.shapes
        );
        setAreaprefs_unpreferred(
          decodedMetadata.layers.areaprefs_unpreferred.shapes
        );
      } catch (err) {
        console.error('Error fetching robot status:', err);
      }
    };

    fetchCurrentMap();
  }, []);

  useEffect(() => {
    const fetchCurrentMapPosition = async () => {
      try {
        const { statusCode, data } = await api.getMapPositions(mapId);
        const detailMapPositions = data.map((position) => {
          return api.getPosition(position.guid);
        });

        setMapPositions(detailMapPositions);
      } catch (err) {
        console.error('Error fetching robot status:', err);
      }
    };

    fetchCurrentMapPosition();
  }, []);

  return (
    <div>
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
      />
      <div style={{ position: 'relative' }}>
        <CanvasComponent.Zoom zoom={zoom} setZoom={setZoom} />
        <CanvasComponent.LeftSidebar
          shapes={selectedLayer.shapes}
          layers={layers}
          setLayers={setLayers}
          handleUpdateShape={(id, newProps) =>
            handleUpdateShape(selectedLayer.id, id, newProps)
          }
        />
        <CanvasComponent.RightSidebar
          shape={selectedShape}
          handleUpdateShape={(id, newProps) =>
            handleUpdateShape(selectedLayer.id, id, newProps)
          }
          saveState={saveState}
        />

        <Stage
          ref={stageRef}
          width={canvasW}
          height={canvasH}
          onMouseMove={handleStageMouseMove}
          onClick={handleStageClick}
        >
          {/* ===================================================GRID===================================================== */}
          <CanvasComponent.Grid
            ref={gridLayerRef}
            gridData={gridData}
            canvasPos={Const.CANVAS_POS}
            snapPoint={snapPoint}
            gridSize={gridSize}
          />

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
              
              {renderMapData()}

              {renderAreaprefsPreferred()}

              {renderAreaprefsUnpreferred()}

              {renderWallsData()}

              {renderShape(layer.shapes)}

              {drawShape()}

              {drawSelection()}

              <ShapeComp.MyImage
                x={robotPosition.x}
                y={robotPosition.y}
                orientation={robotPosition.orientation}
              />
            </Layer>
          ))}

          {/* ==================================================RULER===================================================== */}
          <CanvasComponent.Ruler
            stageSize={stageSize}
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
