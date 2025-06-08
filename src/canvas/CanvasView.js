import Canvas from './canvas';
import { CanvasProvider } from 'context';

export const CanvasView = ({ mapId, isSpeedVisible }) => {
  return (
    <CanvasProvider mapId={mapId}>
      <Canvas isSpeedVisible={isSpeedVisible} />
    </CanvasProvider>
  );
};
