import { useState, useEffect, createContext, useContext } from 'react';
import * as CanvasComponent from '../canvas/component';
import * as Const from '../constant';
import * as api from '../api';
import * as Utils from '../canvas/utils';
import { useAppContext } from './AppContext';

const CanvasContext = createContext();

export const useCanvasContext = () => useContext(CanvasContext);

export const CanvasProvider = ({ children, mapId }) => {
  const { showDialog } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [pathPoints, setPathPoints] = useState([]);
  const [isOpenCreateMarker, setIsOpenCreateMarker] = useState(false);
  const [isOpenCreatePosition, setIsOpenCreatePosition] = useState(false);
  const [isOpenCreatePath, setIsOpenCreatePath] = useState(false);
  const [createPosition, setCreatePosition] = useState(null);
  const [createMarker, setCreateMarker] = useState(null);
  const [positionDialog, setPositionDialog] = useState({
    isVisible: false,
  });
  const [enabledSnapModes, setEnabledSnapModes] = useState(Const.snapModeInit);

  /** @type {[Array<api.TGetPosition_types>, Function]} */
  const [positionTypes, setPositionTypes] = useState([]);

  /** @type {[api.TGetMap, Function]} */
  const [map, setMap] = useState(null);

  /** @type {[Array<api.TDetailedPosition>, Function]} */
  const [mapPositions, setMapPositions] = useState([]);

  const openCreateMarker = (position) => {
    setCreateMarker(position);
    setIsOpenCreateMarker(true);
  };

  const openCreatePosition = (position, mode) => {
    setCreatePosition({ ...position, mode });
    setIsOpenCreatePosition(true);
  };

  const openCreatePath = (position) => {
    setPositionDialog({ ...position });
    setIsOpenCreatePath(true);
  };

  const fetchPositionTypes = async () => {
    try {
      const { statusCode, data } = await api.getPositionTypes();

      //   const detailPositionTypes = await Promise.all(
      //     data.map(async (type) => {
      //       const detail = await fetchPositionType(type.id);
      //       return {
      //         ...type,
      //         ...(detail || {}),
      //       };
      //     })
      //   );

      // // Lọc bỏ những type có hidden === true
      // const filteredPositionTypes = detailPositionTypes.filter(
      //   (type) => type.hidden !== true
      // );

      setPositionTypes(data);
    } catch (err) {
      console.error('Error fetching position types:', err);
    }
  };

  const fetchPositionType = async (id) => {
    try {
      const { statusCode, data } = await api.getPositionType(id);
      return data;
    } catch (err) {
      console.error('Error fetching position type:', err);
    }
  };

  const fetchCurrentMap = async () => {
    if (!mapId) return;

    try {
      const { statusCode, data } = await api.getMap(mapId);

      const decodedMap = {
        ...data,
        metadata: JSON.parse(atob(data.metadata)),
      };
      console.log(decodedMap);
      setMap(decodedMap);
    } catch (err) {
      setMap(Const.TestMap)
      console.error('Error fetching robot status:', err);
    }
  };

  const fetchCurrentMapPosition = async () => {
    if (!mapId) return;

    try {
      const { statusCode, data } = await api.getMapPositions(mapId);

      const detailMapPositions = await Promise.all(
        data.map(async (position) => {
          const detail = await fetchPosition(position.guid);
          return {
            ...position,
            ...(detail || {}),
          };
        })
      );

      setMapPositions(detailMapPositions);
    } catch (err) {
      setMapPositions(Const.TestPositions)
      console.error('Error fetching robot status:', err);
    }
  };

  const fetchPosition = async (positionId) => {
    try {
      const { statusCode, data } = await api.getPosition(positionId);
      return data;
    } catch (err) {
      console.error('Error fetching robot status:', err);
    }
  };

  useEffect(() => {
    fetchPositionTypes();
  }, []);

  useEffect(() => {
    fetchCurrentMap();
    fetchCurrentMapPosition();
  }, [mapId]);

  //
  const actionList = {
    GOTO: {
      buttonText: 'Go to',
      description: 'Send robot to this position',
      buttonColor: Const.Color.BUTTON,
      textColor: Const.Color.WHITE,
      onClick: () => {
        setPositionDialog({ ...positionDialog, isVisible: false });
      },
      imageSrc: 'goTo',
      alt: 'Go to',
    },
    CREATE_PATH: {
      buttonText: 'Create path',
      description: 'Create path to this position',
      buttonColor: Const.Color.LIGHT_BUTTON,
      textColor: Const.Color.BLACK,
      onClick: async (positionId) => {
        const position = await fetchPosition(positionId);
        if (position) {
          openCreatePath(position);
          setPositionDialog({ ...positionDialog, isVisible: false });
        } else {
          console.error('Cannot fetch position with ID:', positionId);
        }
      },
      imageSrc: 'createPath',
      alt: 'Create path',
    },
    MOVE: {
      buttonText: 'Move selected position',
      description: 'Move the position on the map',
      buttonColor: Const.Color.LIGHT_BUTTON,
      textColor: Const.Color.BLACK,
      onClick: () => {
        setPositionDialog({ ...positionDialog, isVisible: false });
      },
      imageSrc: 'move',
      alt: 'Move',
    },
    EDIT: {
      buttonText: 'Edit',
      description: "Edit this position's name and parameters",
      buttonColor: Const.Color.LIGHT_BUTTON,
      textColor: Const.Color.BLACK,
      onClick: async (positionId) => {
        const position = await fetchPosition(positionId);
        if (position) {
          openCreatePosition(position, 2);
          setPositionDialog({ ...positionDialog, isVisible: false });
        } else {
          console.error('Cannot fetch position with ID:', positionId);
        }
      },
      imageSrc: 'edit',
      alt: 'Edit position',
    },
    DELETE: {
      buttonText: 'Delete',
      description: 'Delete this position from map',
      buttonColor: Const.Color.ERROR,
      textColor: Const.Color.WHITE,
      onClick: async (positionId) => {
        await deletePosition(positionId);
        setPositionDialog({ ...positionDialog, isVisible: false });
      },
      imageSrc: 'bin',
      alt: 'Delete position',
    },
    CANCEL: {
      buttonText: 'Cancel',
      description: 'Close this dialogue',
      buttonColor: Const.Color.LIGHT_BUTTON,
      textColor: Const.Color.BLACK,
      onClick: () => {
        setPositionDialog({ ...positionDialog, isVisible: false });
      },
      imageSrc: 'cancel',
      alt: 'Cancel',
    },
  };

  const fetchDeletePosition = async (positionId) => {
    try {
      const { statusCode } = await api.deletePosition(positionId);

      if (statusCode === api.STATUS_CODE.SUCCESS_DELETE) {
        fetchCurrentMapPosition();
      }
    } catch (error) {
      console.log('Error delete position');
    }
  };

  const deletePosition = async (positionId) => {
    showDialog({
      title: 'Delete position',
      content: 'You are about to delete the position.',
      onConfirm: async () => {
        await fetchDeletePosition(positionId);
      },
      onCancel: () => {
        // Không làm gì
      },
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        positionDialog,
        setPositionDialog,
        openCreateMarker,
        openCreatePosition,
        positionTypes,
        mapId,
        map,
        drawingMode,
        setDrawingMode,
        mapPositions,
        fetchCurrentMapPosition,
        fetchPosition,
        actionList,
        pathPoints,
        setPathPoints,
        setIsLoading,
        enabledSnapModes,
        setEnabledSnapModes,
      }}
    >
      {children}
      <CanvasComponent.PositionDialog
        positionId={positionDialog?.id}
        positionName={positionDialog?.name}
        positionTypeId={positionDialog?.type_id}
        isVisible={positionDialog?.isVisible}
        setIsVisible={(value) => {
          setPositionDialog({ ...positionDialog, isVisible: value });
        }}
      />
      <CanvasComponent.MarkerCreate
        isVisible={isOpenCreateMarker}
        setVisible={(value) => {
          setIsOpenCreateMarker(value);
        }}
        value={createMarker}
      />
      <CanvasComponent.PositionCreate
        isVisible={isOpenCreatePosition}
        setVisible={(value) => {
          setIsOpenCreatePosition(value);
        }}
        value={createPosition}
        mode={createPosition?.mode}
      />
      <CanvasComponent.CreatPath
        isVisible={isOpenCreatePath}
        setVisible={(value) => {
          setIsOpenCreatePath(value);
        }}
        positionId={positionDialog.id}
      />
      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tìm đường...</p>
        </div>
      )}
    </CanvasContext.Provider>
  );
};
