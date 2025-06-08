import * as Const from '../constant';

export const InputNumber = ({
  value,
  defaultValue,
  placeholder,
  onChange,
  imgSrc,
  readOnly = false,
  width = 50,
}) => {
  return (
    <div className={`width-${width}per`} style={{ position: 'relative' }}>
      <img
        className="size-15px"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '10px',
        }}
        src={Const.ImageSrc[imgSrc]}
      />
      <input
        className="height-40px"
        style={{ paddingLeft: '30px' }}
        type="number"
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value ? value.toFixed(2) : '--'}
        onChange={(e) => onChange?.(e)}
        readOnly={readOnly}
      />
    </div>
  );
};
