export const calculateUlineEndPoint = (startP, bottomP) => ({
  x: 2 * bottomP.x - startP.x,
  y: startP.y,
});
