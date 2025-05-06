import { useState, useEffect, createContext, useContext } from 'react';
import * as CanvasComponent from '../canvas/component';
import * as Const from '../constant';
import * as api from '../api';

const CanvasContext = createContext();

export const useCanvasContext = () => useContext(CanvasContext);

export const CanvasProvider = ({ children, mapId }) => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [isOpenCreateMarker, setIsOpenCreateMarker] = useState(false);
  const [isOpenCreatePosition, setIsOpenCreatePosition] = useState(false);
  const [createPosition, setCreatePosition] = useState(null);
  const [createMarker, setCreateMarker] = useState(null);
  const [positionDialog, setPositionDialog] = useState({
    name: '',
    id: null,
    isVisible: false,
    type_id: null,
  });

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

      setMap(decodedMap);
    } catch (err) {
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
    </CanvasContext.Provider>
  );
};
