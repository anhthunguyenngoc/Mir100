export const VerticalLine = ({
  width,
  height,
  color,
  borderRadius,
  rest,
  isVisible = true,
}) => {
  return (
    <div
      className="vertical-divider"
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius,
        opacity: isVisible ? '100%' : '0%',
        ...rest,
      }}
    ></div>
  );
};
