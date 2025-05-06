/**
 * Hàm tạo request để gửi mission vào hàng đợi.
 *
 * @param {Object} props - Thông tin nhiệm vụ.
 * @param {string} props.message - Tin nhắn, tối đa 200 ký tự.
 * @param {string} props.mission_id - ID của mission.
 * @param {Array<Object>} props.parameters - Tham số cho mission. < object > array
 * @param {number} props.priority - Độ ưu tiên (integer hoặc float).
 * @returns {Object} props đã truyền vào.
 */

export const I_PostMission_queues = (props) => {
  const { message, mission_id, parameters, priority } = props;

  if (!mission_id) {
    throw new Error('mission_id là bắt buộc');
  }

  if (message && message.length > 200) {
    throw new Error('message không được vượt quá 200 ký tự');
  }

  return props;
};

/**
 * @typedef {Object} TGetMissions
 * @property {string} [guid] - ID toàn cục duy nhất của mission (unique across robots).
 * @property {string} [name] - Tên định danh của mission.
 * @property {string} [url] - Đường dẫn tài nguyên mô tả mission.
 */

/**
 * @typedef {Object} TGetMission
 * @property {string} [actions] - URL đến danh sách hành động chứa trong nhiệm vụ.
 * @property {string} [created_by] - URL mô tả người tạo nhiệm vụ.
 * @property {string} [created_by_id] - ID toàn cục của người đã tạo nhiệm vụ.
 * @property {string} [definition] - URL đến danh sách tham số đầu vào của nhiệm vụ.
 * @property {string} [description] - Mô tả nhiệm vụ.
 * @property {string} [group_id] - ID nhóm/khu vực mà nhiệm vụ thuộc về, hoặc null nếu áp dụng cho tất cả.
 * @property {string} [guid] - ID toàn cục duy nhất đại diện cho nhiệm vụ.
 * @property {boolean} [has_user_parameters] - Cho biết nhiệm vụ có chứa các tham số động do người dùng nhập không.
 * @property {boolean} [hidden] - Có ẩn nhiệm vụ khỏi danh sách hiển thị không.
 * @property {string} [name] - Tên của nhiệm vụ.
 * @property {string} [session_id] - ID của phiên làm việc hoặc khu vực mà nhiệm vụ thuộc về.
 * @property {boolean} [valid] - Trạng thái hợp lệ của nhiệm vụ (các thành phần cần thiết có tồn tại đầy đủ hay không).
 */

/**
 * @typedef {TGetMissions & TGetMission} TDetailedMission
 */

/**
 * @typedef {Object} TGetMission_queues
 * @property {number} [id] - ID của phần tử trong hàng đợi nhiệm vụ. Nếu không tồn tại, giá trị mặc định là -1.
 * @property {string} [state] - Trạng thái cuối cùng sau khi nhiệm vụ được thực thi. Có thể là "Pending", "Executing", "Finished", hoặc chuỗi rỗng nếu không có.
 * @property {string} [url] - URL của tài nguyên liên quan đến hàng đợi nhiệm vụ. Dùng để truy cập chi tiết của phần tử này. Nếu không có, trả về chuỗi rỗng.
 */

/**
 * @typedef {Object} TGetMission_queue
 * @property {string} [actions] - Danh sách hành động liên quan đến nhiệm vụ, có thể là chuỗi hoặc định dạng JSON.
 * @property {string} [control_posid] - ID toàn cục của vị trí dùng trong trạng thái điều khiển, nếu có.
 * @property {number} [control_state] - Trạng thái điều khiển của hàng đợi. Giá trị > 0 thể hiện yêu cầu tương tác từ người dùng.
 * @property {string} [created_by] - URL mô tả người đã tạo mục hàng đợi nhiệm vụ.
 * @property {string} [created_by_id] - ID toàn cục của người đã tạo hàng đợi.
 * @property {string} [description] - Mô tả chi tiết về nhiệm vụ, được kế thừa từ nhiệm vụ gốc.
 * @property {string} [finished] - Thời gian hoàn thành nhiệm vụ, theo định dạng ISO 8601.
 * @property {number|null} [id] - ID định danh duy nhất của hàng đợi nhiệm vụ. Nếu không có, giá trị là null.
 * @property {string} [message] - Thông điệp trạng thái cuối cùng từ hành động trong nhiệm vụ.
 * @property {string} [mission] - URL tham chiếu đến nhiệm vụ đã được thực hiện trong hàng đợi.
 * @property {string} [mission_id] - ID toàn cục của nhiệm vụ gốc được gọi trong hàng đợi.
 * @property {string} [ordered] - Thời điểm nhiệm vụ được thêm vào hàng đợi, theo định dạng ISO 8601.
 * @property {string} [parameters] - Danh sách tham số đầu vào của nhiệm vụ, dưới dạng chuỗi hoặc JSON.
 * @property {number} [priority] - Mức độ ưu tiên của nhiệm vụ. Giá trị càng cao thì càng ưu tiên.
 * @property {string} [started] - Thời điểm bắt đầu thực hiện nhiệm vụ, theo định dạng ISO 8601.
 * @property {string} [state] - Trạng thái hiện tại hoặc cuối cùng của nhiệm vụ. Ví dụ: "Pending", "Executing", "Finished".
 */

/**
 * @typedef {TGetMission_queues & TGetMission_queue} TDetailedMissionQueue
 */

/**
 * @typedef {Object} TGetMission_groups
 * @property {string} [guid] - ID toàn cục duy nhất đại diện cho nhóm nhiệm vụ.
 * @property {string} [name] - Tên của nhóm nhiệm vụ.
 * @property {string} [url] - URL tài nguyên đại diện cho nhóm nhiệm vụ.
 */

/**
 * @typedef {Object} TGetMission_group
 * @property {string} [created_by] - URL mô tả người tạo nhóm nhiệm vụ.
 * @property {string} [created_by_id] - ID toàn cục của người tạo nhóm nhiệm vụ.
 * @property {string} [feature] - Tên của vị trí hoặc đặc điểm liên kết với nhóm nhiệm vụ.
 * @property {string} [guid] - ID toàn cục duy nhất của nhóm nhiệm vụ.
 * @property {string} [icon] - Tên biểu tượng đại diện cho nhóm nhiệm vụ (kiểu byte).
 * @property {string} [name] - Tên của nhóm nhiệm vụ.
 * @property {number} [priority] - Mức độ ưu tiên của nhóm nhiệm vụ.
 */

/**
 * @typedef { TGetMission_groups & TGetMission_group} TDetailedMissionGroup
 */

/**
 * @typedef {Object} TGetAction_definition
 * @property {string} [action_type] - Kiểu hành động, ví dụ: "move", "wait", "hook_action". Dùng để xác định loại hành động trong hệ thống.
 * @property {string} [description] - Mô tả ngắn gọn về hành động này nhằm mục đích hiển thị hoặc ghi chú.
 * @property {Array<Object>} [descriptions] - Mảng mô tả chi tiết, có thể bao gồm bản dịch theo ngôn ngữ hoặc các mô tả mở rộng.
 * @property {string} [help] - Thông tin trợ giúp hoặc hướng dẫn sử dụng dành cho người dùng để hiểu rõ hơn về cách thiết lập hành động.
 * @property {string} [mission_group_id] - ID nhóm nhiệm vụ mà hành động này thuộc về, dùng để phân loại và tổ chức dữ liệu.
 * @property {string} [name] - Tên định danh của hành động, thường được sử dụng trong giao diện hoặc API.
 * @property {Array<Object>} [parameters] - Danh sách các tham số cấu hình cho hành động. Mỗi tham số có thể bao gồm tên, kiểu, giá trị mặc định và mô tả.
 */

/**
 * @typedef {Object} TGetAction_definitions
 * @property {string} [action_type] - Kiểu hành động được định nghĩa, ví dụ: "move", "wait", "hook_action".
 * @property {string} [description] - Mô tả ngắn gọn về chức năng của hành động.
 * @property {Array<Object>} [descriptions] - Mảng chứa các mô tả chi tiết hơn hoặc phiên bản dịch cho hành động.
 * @property {string} [help] - Văn bản hướng dẫn sử dụng hoặc trợ giúp cho người dùng khi cấu hình hành động này.
 * @property {string} [mission_group_id] - ID của nhóm nhiệm vụ mà hành động này thuộc về, giúp phân loại trong hệ thống.
 * @property {string} [name] - Tên hiển thị của hành động trong giao diện người dùng hoặc khi gọi từ API.
 * @property {Array<Object>} [parameters] - Mảng các đối tượng định nghĩa tham số đầu vào cho hành động. Mỗi đối tượng có thể chứa tên, kiểu dữ liệu, giá trị mặc định và mô tả.
 */

/**
 * @typedef {Object} TGetArea_events
 * @property {string} [guid] - ID toàn cục duy nhất dùng để định danh khu vực (unique across robots).
 * @property {string} [map] - URL tới bản đồ mà khu vực này thuộc về.
 * @property {string} [name] - Tên định danh của khu vực.
 * @property {number} [type_id] - Loại khu vực (theo định danh số).
 * @property {string} [url] - URL của tài nguyên mô tả khu vực.
 */

/**
 * Trạng thái tổng thể của robot.
 * @typedef {Object} TGetStatus
 * @property {number} [battery_percentage] - Phần trăm pin còn lại.
 * @property {number} [battery_time_remaining] - Thời gian hoạt động còn lại ước tính (phút).
 * @property {number} [distance_to_next_target] - Khoảng cách đến mục tiêu tiếp theo (m).
 * @property {TError[]} [errors] - Danh sách lỗi hiện tại của robot.
 * @property {string} [footprint] - Hình dạng (footprint) hiện tại của robot.
 * @property {THookStatus} [hook_status] - Thông tin về móc kéo và xe đẩy.
 * @property {boolean} [joystick_low_speed_mode_enabled] - Đang bật chế độ điều khiển chậm bằng joystick.
 * @property {string} [joystick_web_session_id] - ID phiên web đang điều khiển joystick.
 * @property {string} [map_id] - ID bản đồ hiện tại robot đang hoạt động.
 * @property {number} [mission_queue_id] - ID nhiệm vụ hiện tại trong hàng đợi.
 * @property {string} [mission_queue_url] - Đường dẫn đến nhiệm vụ trong hàng đợi.
 * @property {string} [mission_text] - Thông điệp từ bộ điều khiển nhiệm vụ.
 * @property {number} [mode_id] - ID chế độ hiện tại của robot.
 * @property {string} [mode_key_state] - Mô tả vị trí phím chế độ.
 * @property {string} [mode_text] - Mô tả chế độ hoạt động hiện tại.
 * @property {number} [moved] - Tổng quãng đường đã di chuyển (m).
 * @property {TPosition} [position] - Vị trí hiện tại của robot.
 * @property {string} [robot_model] - Model robot.
 * @property {string} [robot_name] - Tên robot.
 * @property {boolean} [safety_system_muted] - Hệ thống an toàn đã bị tắt.
 * @property {string} [serial_number] - Số seri của robot.
 * @property {string} [session_id] - ID phiên làm việc hiện tại.
 * @property {number} [state_id] - ID trạng thái hiện tại.
 * @property {string} [state_text] - Mô tả trạng thái hiện tại.
 * @property {boolean} [unloaded_map_changes] - Có bản đồ mới chưa được tải lên không.
 * @property {number} [uptime] - Thời gian hoạt động kể từ lần khởi động (giây).
 * @property {TUserPrompt} [user_prompt] - Câu hỏi cần phản hồi từ người dùng.
 * @property {TVelocity} [velocity] - Tốc độ di chuyển của robot.
 */

/**
 * Thông tin lỗi đang diễn ra.
 * @typedef {Object} TError
 * @property {number} [code] - Mã lỗi.
 * @property {string} [description] - Mô tả lỗi.
 * @property {string} [module] - Module phát sinh lỗi.
 */

/**
 * Trạng thái của móc kéo (hook).
 * @typedef {Object} THookStatus
 * @property {number} [angle] - Góc móc hiện tại (độ).
 * @property {boolean} [available] - Móc có khả dụng không.
 * @property {boolean} [braked] - Móc đang bị khoá (phanh).
 * @property {TCart} [cart] - Thông tin xe đẩy gắn kèm.
 * @property {boolean} [cart_attached] - Có xe đẩy đang được gắn không.
 * @property {number} [height] - Chiều cao hiện tại của móc.
 * @property {number} [length] - Chiều dài móc kéo.
 */

/**
 * Thông tin về xe đẩy (cart) gắn với móc.
 * @typedef {Object} TCart
 * @property {number} [height] - Chiều cao xe đẩy.
 * @property {number} [id] - ID xe đẩy.
 * @property {number} [length] - Chiều dài xe đẩy.
 * @property {number} [offset_locked_wheels] - Khoảng cách từ đầu xe tới bánh bị khoá.
 * @property {number} [width] - Chiều rộng xe đẩy.
 */

/**
 * Vị trí hiện tại của robot.
 * @typedef {Object} TPosition
 * @property {number} [orientation] - Góc quay hiện tại (độ).
 * @property {number} [x] - Tọa độ X.
 * @property {number} [y] - Tọa độ Y.
 */

/**
 * Câu hỏi hiển thị cho người dùng.
 * @typedef {Object} TUserPrompt
 * @property {string} [guid] - ID của prompt.
 * @property {string[]} [options] - Danh sách lựa chọn.
 * @property {string} [question] - Câu hỏi.
 * @property {number} [timeout] - Thời gian hết hạn (giây).
 * @property {string} [user_group] - Nhóm người dùng được hỏi.
 */

/**
 * Vận tốc hiện tại của robot.
 * @typedef {Object} TVelocity
 * @property {number} [angular] - Tốc độ góc (độ/giây).
 * @property {number} [linear] - Tốc độ tuyến tính (m/s).
 */

/**
 * @typedef {Object} TGetMaps
 * @property {string} [guid] - Mã định danh toàn cục, duy nhất trên các robot, dùng để xác định bản đồ.
 * @property {string} [name] - Tên của bản đồ.
 * @property {string} [url] - Đường dẫn URL của tài nguyên bản đồ.
 */

/**
 * @typedef {Object} TGetMap
 * @property {string} [created_by] - URL mô tả người tạo bản đồ.
 * @property {string} [created_by_id] - ID toàn cục của người tạo bản đồ.
 * @property {string} [guid] - ID toàn cục duy nhất xác định bản đồ này.
 * @property {string} [map] - Xác định bản đồ có phải bản đồ điều hướng hay không (dạng byte).
 * @property {TMetadata} [metadata] - Xác định bản đồ có phải là web map hay không (dạng byte).
 * @property {string} [name] - Tên của bản đồ.
 * @property {string} [one_way_map] - Bản đồ một chiều hay không (dạng byte).
 * @property {number} [origin_theta] - Góc quay gốc của bản đồ so với vị trí robot (đơn vị độ).
 * @property {number} [origin_x] - Tọa độ X của gốc bản đồ so với robot.
 * @property {number} [origin_y] - Tọa độ Y của gốc bản đồ so với robot.
 * @property {string} [path_guides] - URL đến danh sách path guides của bản đồ.
 * @property {string} [paths] - URL đến danh sách paths của bản đồ.
 * @property {string} [positions] - URL đến danh sách positions của bản đồ.
 * @property {number} [resolution] - Độ phân giải của bản đồ.
 * @property {string} [session_id] - ID toàn cục của khu vực chứa bản đồ này.
 */

/**
 * @typedef {Object} TMetadata
 * @property {string} base_map_floor - Base map floor hình ảnh dưới dạng base64.
 * @property {string} base_map_walls - Base map walls hình ảnh dưới dạng base64.
 * @property {number} height - Chiều cao của bản đồ.
 * @property {TLayers} layers - Các lớp bản đồ.
 * @property {boolean} new_mappicture - Chỉ thị liệu có hình ảnh bản đồ mới.
 * @property {boolean} render_nav_maps - Chỉ thị liệu có render bản đồ điều hướng.
 * @property {number} width - Chiều rộng của bản đồ.
 */

/**
 * @typedef {Object} TLayers
 * @property {TLayer} oneway - Lớp một chiều, chứa các hình dạng.
 * @property {TLayer} areaevents_blink - Lớp sự kiện nhấp nháy, chứa các hình dạng.
 * @property {TLayer} areaevents_disable_localization - Lớp sự kiện vô hiệu hóa định vị, chứa các hình dạng.
 * @property {TLayer} areaevents_door - Lớp sự kiện cửa, chứa các hình dạng.
 * @property {TLayer} areaevents_evacuation - Lớp sự kiện thoát hiểm, chứa các hình dạng.
 * @property {TLayer} areaevents_fleet_and_emergency - Lớp sự kiện đội tàu và khẩn cấp, chứa các hình dạng.
 * @property {TLayer} areaevents_io - Lớp sự kiện IO, chứa các hình dạng.
 * @property {TLayer} areaevents_look_ahead_distance - Lớp sự kiện nhìn trước khoảng cách, chứa các hình dạng.
 * @property {TLayer} areaevents_planner_zone - Lớp sự kiện khu vực lập kế hoạch, chứa các hình dạng.
 * @property {TLayer} areaevents_sound - Lớp sự kiện âm thanh, chứa các hình dạng.
 * @property {TLayer} areaevents_sound_and_light_zone - Lớp sự kiện âm thanh và ánh sáng, chứa các hình dạng.
 * @property {TLayer} areaevents_speed - Lớp sự kiện tốc độ, chứa các hình dạng.
 * @property {TLayer} areaprefs_critical - Lớp vùng quan trọng, chứa các hình dạng.
 * @property {TLayer} areaprefs_forbidden - Lớp vùng bị cấm, chứa các hình dạng.
 * @property {TLayer} areaprefs_preferred - Lớp vùng ưu tiên, chứa các hình dạng.
 * @property {TLayer} areaprefs_unpreferred - Lớp vùng không ưu tiên, chứa các hình dạng.
 * @property {TLayer} bluetooth - Lớp bluetooth, chứa các hình dạng.
 * @property {TLayer} emergency_zone - Lớp vùng khẩn cấp, chứa các hình dạng.
 * @property {TLayer} floor - Lớp sàn, chứa các hình dạng.
 * @property {TLayer} positions - Lớp vị trí, chứa các hình dạng.
 * @property {TLayer} walls - Lớp tường, chứa các hình dạng.
 */

/**
 * @typedef {Object} TLayer
 * @property {Array<TZone>} shapes
 */

/**
 * @typedef {Object} TZone
 * @property {string} name - Tên của khu vực.
 * @property {string} type - Loại khu vực (ví dụ: shape, stroke, etc.).
 * @property {string} color - Màu sắc của khu vực.
 * @property {number} brushsize - Kích thước cọ vẽ khu vực.
 * @property {Array<TCoordinates>} polygon - Các tọa độ của đa giác (nếu là shape dạng polygon).
 */

/**
 * @typedef {Object} TCoordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef { TGetMaps & TGetMap} TDetailedMap
 */

/**
 * @typedef {Object} TGetMap_positions
 * @property {string} [guid] - ID toàn cục, duy nhất giữa các robot, đại diện cho vị trí này.
 * @property {string} [map] - URL của bản đồ mà vị trí này thuộc về.
 * @property {string} [name] - Tên của vị trí.
 * @property {number} [type_id] - Loại vị trí. Xem mô tả chung để biết chi tiết các loại.
 * @property {string} [url] - URL của tài nguyên đại diện cho vị trí này.
 */

/**
 * @typedef { TGetMap_positions & TGetPosition} TDetailedPosition
 */

/**
 * @typedef {Object} TGetPosition_types
 * @property {number} [id] - ID duy nhất của loại vị trí.
 * @property {string} [name] - Tên của loại vị trí.
 * @property {string} [url] - URL của tài nguyên liên quan đến loại vị trí.
 */

/**
 * @typedef {Object} TGetPosition_type
 * @property {boolean} [hidden] - False nếu vị trí này không phải do người dùng tạo.
 * @property {number} [id] - ID duy nhất của loại vị trí.
 * @property {string} [name] - Tên của loại vị trí.
 * @property {boolean} [reachable_for_robot] - True nếu robot có thể di chuyển đến vị trí này.
 */

/**
 * @typedef {Object} TGetPositions
 * @property {string} [guid] - ID toàn cục, duy nhất giữa các robot để nhận diện vị trí này.
 * @property {string} [map] - URL của bản đồ mà vị trí này thuộc về.
 * @property {string} [name] - Tên của vị trí.
 * @property {number} [type_id] - Loại của vị trí. Xem mô tả chi tiết ở phần Position Type.
 * @property {string} [url] - URL đến tài nguyên chứa thông tin vị trí này.
 */

/**
 * @typedef {Object} TGetPosition
 * @property {string} [created_by] - URL mô tả người đã tạo vị trí này.
 * @property {string} [created_by_id] - ID toàn cục của người dùng tạo vị trí.
 * @property {string} [docking_offsets] - URL của docking offset nếu có, nếu không thì để trống.
 * @property {string} [guid] - ID toàn cục duy nhất giữa các robot để nhận diện vị trí này.
 * @property {string} [help_positions] - Thông tin trợ giúp hoặc vị trí liên quan.
 * @property {string} [map] - URL của bản đồ chứa vị trí này.
 * @property {string} [map_id] - ID toàn cục của bản đồ chứa vị trí này.
 * @property {string} [name] - Tên của vị trí.
 * @property {number} [orientation] - Góc xoay của vị trí (độ) so với gốc của bản đồ.
 * @property {string} [parent] - URL của vị trí cha (nếu có), nếu không để trống.
 * @property {string} [parent_id] - ID toàn cục của vị trí cha (nếu có), nếu không để trống.
 * @property {number} [pos_x] - Tọa độ X của vị trí so với gốc bản đồ.
 * @property {number} [pos_y] - Tọa độ Y của vị trí so với gốc bản đồ.
 * @property {string} [type] - URL mô tả loại vị trí.
 * @property {number} [type_id] - Loại của vị trí (theo định nghĩa trong Position Type).
 */

//======================================           POST           ======================================

/**
 * @typedef {Object} TPostMissions
 * @property {string} group_id - ID của nhóm nhiệm vụ (bắt buộc).
 * @property {string} name - Tên nhiệm vụ (bắt buộc, 1–255 ký tự).
 * @property {string} [created_by_id] - ID của người tạo nhiệm vụ (tùy chọn).
 * @property {string} [description] - Mô tả nhiệm vụ (tùy chọn, tối đa 255 ký tự).
 * @property {string} [guid] - ID toàn cục duy nhất của mission (tùy chọn).
 * @property {boolean} [hidden] - Có ẩn khỏi danh sách nhiệm vụ không (tùy chọn).
 * @property {string} [session_id] - ID phiên hoặc khu vực (tùy chọn).
 */

/**
 * @typedef {Object} TPostArea_events
 * @property {Array<Object>} [actions] - Mảng các hành động gắn với sự kiện khu vực. Mỗi phần tử đại diện cho một hành động cụ thể.
 * @property {string} [created_by_id] - ID toàn cục của người đã tạo sự kiện khu vực.
 * @property {string} [guid] - ID toàn cục duy nhất cho sự kiện khu vực, đảm bảo không trùng lặp.
 * @property {string} map_id - ID của bản đồ mà sự kiện khu vực này thuộc về.
 * @property {string} [name] - Tên của sự kiện khu vực. Tối đa 255 ký tự.
 * @property {Array<Object>} polygon - Danh sách các điểm tạo nên đa giác xác định khu vực. Mỗi điểm có thể là một đối tượng `{ x: number, y: number }`.
 * @property {number} type_id - Kiểu sự kiện khu vực. Là số nguyên dùng để phân loại sự kiện.
 */

/**
 * @typedef {Object} TPostMission_queues
 * @property {string} mission_id*
 * @property {string} [message]
 * @property {Array<object>} [parameters]
 * @property {number} [priority]
 */

/**
 * @typedef {Object} TPostPositions
 * @property {string} [created_by_id] - ID toàn cục của người tạo vị trí.
 * @property {string} [guid] - ID toàn cục duy nhất giữa các robot để nhận diện vị trí này.
 * @property {string} map_id - ID toàn cục của bản đồ chứa vị trí này.
 * @property {string} name - Tên của vị trí (từ 1 đến 40 ký tự).
 * @property {number} orientation - Góc xoay của vị trí (độ) so với gốc bản đồ.
 * @property {string} [parent_id] - ID toàn cục của vị trí cha (nếu có).
 * @property {number} pos_x - Tọa độ X của vị trí so với gốc bản đồ.
 * @property {number} pos_y - Tọa độ Y của vị trí so với gốc bản đồ.
 * @property {number} type_id - Loại của vị trí (theo định nghĩa trong Position Type).
 */

//======================================           PUT           ======================================

/**
 * @typedef {Object} TPutStatus
 * @property {string} [answer] - Câu trả lời của người dùng (tùy chọn). Độ dài từ 1 đến 255 ký tự.
 * @property {boolean} [clear_error] - Cờ cho biết có cần xóa lỗi hiện tại không (tùy chọn).
 * @property {string} [datetime] - Thời gian theo định dạng ISO 8601 (ví dụ: '2025-04-25T10:00:00Z') (tùy chọn).
 * @property {string} [guid] - Mã định danh duy nhất toàn cục cho yêu cầu (tùy chọn).
 * @property {string} [map_id] - ID của bản đồ được sử dụng hiện tại (tùy chọn).
 * @property {number} [mode_id] - Chế độ hoạt động của robot. Giá trị hợp lệ: 3 hoặc 7 (tùy chọn).
 * @property {string} [name] - Tên người gửi trạng thái. Độ dài từ 1 đến 20 ký tự (tùy chọn).
 * @property {Object} [position] - Thông tin vị trí hiện tại của robot (tùy chọn). Cấu trúc cụ thể tùy theo hệ thống.
 * @property {string} [serial_number] - Số serial của robot (tùy chọn).
 * @property {number} [state_id] - Trạng thái hiện tại của robot. Các giá trị hợp lệ:
 *   - 3: Ready
 *   - 4: Pause
 *   - 11: Manual control
 * (tùy chọn)
 * @property {string} [web_session_id] - ID phiên web hiện tại (tùy chọn).
 */

/**
 * @typedef {Object} TPutPosition
 * @property {string} [map_id] - (Tùy chọn) ID bản đồ chứa vị trí.
 * @property {string} [name] - (Tùy chọn) Tên vị trí (1-40 ký tự).
 * @property {number} [orientation] - (Tùy chọn) Góc xoay của vị trí (độ) so với gốc bản đồ.
 * @property {string} [parent_id] - (Tùy chọn) ID vị trí cha (nếu có).
 * @property {number} [pos_x] - (Tùy chọn) Tọa độ X của vị trí.
 * @property {number} [pos_y] - (Tùy chọn) Tọa độ Y của vị trí.
 * @property {number} [type_id] - (Tùy chọn) Loại vị trí (theo Position Type).
 */

/**
 * @typedef {Object} TPutMap
 * @property {string} [map] - Dữ liệu bản đồ (byte dạng string).
 * @property {string} [metadata] - Dữ liệu metadata của bản đồ (byte dạng string).
 * @property {string} [name] - Tên bản đồ (1-40 ký tự).
 * @property {string} [one_way_map] - Dữ liệu bản đồ một chiều (byte dạng string).
 * @property {number} [origin_theta] - Góc xoay gốc bản đồ.
 * @property {number} [origin_x] - Tọa độ X gốc.
 * @property {number} [origin_y] - Tọa độ Y gốc.
 * @property {number} [resolution] - Độ phân giải bản đồ.
 */

/**
 * @typedef {Object} TPutMission
 * @property {string} [description] - (Tùy chọn) Mô tả nhiệm vụ (tối đa 255 ký tự).
 * @property {string} [group_id] - (Tùy chọn) ID nhóm nhiệm vụ.
 * @property {boolean} [hidden] - (Tùy chọn) Ẩn hoặc hiển thị nhiệm vụ.
 * @property {string} [name] - (Tùy chọn) Tên nhiệm vụ (1-255 ký tự).
 * @property {string} [session_id] - (Tùy chọn) ID phiên thực thi nhiệm vụ.
 */

/**
 * @typedef {Object} TPutMission_queue
 * @property {number} [cmd] - (Tùy chọn) Lệnh điều khiển (theo định nghĩa riêng).
 * @property {string} [description] - (Tùy chọn) Mô tả (tối đa 200 ký tự).
 * @property {string} [mission_id] - (Tùy chọn) ID nhiệm vụ liên quan.
 * @property {number} [priority] - (Tùy chọn) Mức ưu tiên của nhiệm vụ.
 */
