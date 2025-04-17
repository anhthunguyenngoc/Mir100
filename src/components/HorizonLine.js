export const HorizonLine = ({
  width,
  height,
  color,
  borderRadius,
  rest,
  isVisible = true,
}) => {
  return (
    <hr
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius,
        opacity: isVisible ? '100%' : '0%',
        ...rest,
      }}
    ></hr>
  );
};
