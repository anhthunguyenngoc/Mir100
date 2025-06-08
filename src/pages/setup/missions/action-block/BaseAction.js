import * as Icons from '../../../../components/icons';

/**
@typedef {Object} ParameterChoice

@property {string} name - Tên hiển thị cho người dùng.

@property {string} value - Giá trị thực dùng trong logic.
*/

/**

@typedef {Object} ParameterConstraints

@property {string|number|boolean} [default] - Giá trị mặc định.

@property {ParameterChoice[]} [choices] - Danh sách lựa chọn.
*/

/**

@typedef {'Text'|'Number'|'Selection'|'Boolean'} ParameterType
*/

/**
@typedef {Object} BlockParameter

@property {string} id - ID tham số (dùng trong logic, mô tả...).

@property {ParameterType} type - Loại tham số.

@property {string} name - Tên hiển thị tham số.

@property {(string|number|boolean)} [value] - Giá trị tham số.

@property {string} [help] - Mô tả chi tiết tham số.

@property {ParameterConstraints} [constraints] - Ràng buộc giá trị.
*/

/**

@typedef {Object} DescriptionCondition

@property {string} parameter_id - Tham số cần kiểm tra.

@property {'=='|'!='|'>'|'>='|'<'|'<='} operator - Toán tử so sánh.

@property {string} value - Giá trị cần khớp.
*/

/**

@typedef {Object} BlockDescription

@property {string} text - Chuỗi mô tả có định dạng %(param)s.

@property {DescriptionCondition[]} [conditions] - Điều kiện áp dụng mô tả.
*/

/**

@typedef {Object} BlockStyle

@property {any} icon - Icon React hoặc SVG.

@property {string} color - Màu hiển thị.
*/

/**

@typedef {Object} Block

@property {string} name - Tên hành động.

@property {string} action_type - Kiểu hành động (ví dụ: 'if', 'pause').

@property {BlockParameter[]} parameters - Các tham số cấu hình.

@property {BlockDescription[]} [descriptions] - Danh sách mô tả tùy theo điều kiện.

@property {string} [description] - Mô tả mặc định.

@property {string} [help] - Mô tả dài từ hệ thống.

@property {string} [color] - Màu sắc khối.

@property {any} [icon] - Icon hiển thị.

@property {BlockStyle} [style] - Gộp icon + color.

@property {Block[]} [children] - Khối con (dùng cho if, loop...)
*/

/** @type {Block} */
export const BaseAction = {
  uniqueId: '',
  name: '',
  action_type: '',
  parameters: [],
  color: '',
  icon: null,
  description: '',
  descriptions: [],
  priority: null,
  describe: () => '',

  execute(context) {
    console.log(`Executing ${this.name} (type: ${this.action_type})`);
  },

  toJSON() {
    return {
      name: this.name,
      action_type: this.action_type,
      parameters: this.parameters,
      color: this.color,
      icon: this.icon,
    };
  },
};

export const MissionGroupStyles = {
  move: {
    icon: <Icons.Move />,
    color: '#2563EB',
  },
  battery: {
    icon: <Icons.BatteryCharging />,
    color: '#2A7378',
  },
  logic: {
    icon: <Icons.Logic />,
    color: '#9333EA',
  },
  error: {
    icon: <Icons.ErrorHandling />,
    color: '#E74C3C',
  },
  sound: {
    icon: <Icons.SoundLight />,
    color: '#F59E0B',
  },
  plc: {
    icon: <Icons.PLC />,
    color: '#A16207',
  },
  email: {
    icon: <Icons.Email />,
    color: '#0891B2',
  },
  io: {
    icon: <Icons.IOModule />,
    color: '#374151',
  },
  mission: {
    icon: (
      <Icons.Mission
        mainColor="#EA580C"
        subColor="#EA580C66"
        width="20px"
        height="20px"
      />
    ),
    color: '#EA580C',
  },
};
