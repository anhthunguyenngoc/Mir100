import Canvas from './canvas';
import { CanvasProvider } from 'context';

export const CanvasView = ({ mapId }) => {
  return (
    <CanvasProvider mapId={mapId}>
      <Canvas />
    </CanvasProvider>
  );
};
