import * as CanvasConstant from '../../constant/CanvasConstant';

export const Zoom = ({ zoom, setZoom }) => {
  return (
    <div className="canvas-zoom">
      <span>Zoom:</span>
      <input
        type="range"
        min={CanvasConstant.MIN_ZOOM}
        max={CanvasConstant.MAX_ZOOM}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        style={{ width: '200px' }}
      />
      <button
        className="canvas-zoom-btn"
        onClick={() =>
          setZoom((prev) =>
            Math.max(CanvasConstant.MIN_ZOOM, prev - CanvasConstant.ZOOMSTEP)
          )
        }
      >
        -
      </button>
      <button
        className="canvas-zoom-btn"
        onClick={() =>
          setZoom((prev) =>
            Math.min(CanvasConstant.MAX_ZOOM, prev + CanvasConstant.ZOOMSTEP)
          )
        }
      >
        +
      </button>
      <span>{zoom}%</span>
    </div>
  );
};

export default Zoom;
