/**
 * Chuyển đổi tất cả các loại hình sang định dạng metadata
 * @param {Object} shape - Shape cần chuyển đổi
 * @returns {Object} Đối tượng chứa thông tin về layer và shape đã chuyển đổi
 */
export function convertShapeForMetadata(shape) {
    switch (true) {
        case shape.mode.includes("circle"):
            return convertCircleForMetadata(shape);
        case shape.mode.includes("elip"):
            return convertEllipseForMetadata(shape);
        case "rectangle":
            return convertRectangleForMetadata(shape);
        // Các mode khác như polygon, free shape...
        default:
            console.warn(`Không hỗ trợ chuyển đổi hình dạng: ${shape.mode}`);
            return null;
    }
}

/**
 * Chuyển đổi hình tròn sang polygon để lưu vào metadata
 * @param {Object} circleShape - Shape hình tròn
 * @returns {Object} Đối tượng chứa thông tin về layer và shape đã chuyển đổi
 */
function convertCircleForMetadata(circleShape) {
    // Xác định layer dựa vào loại shape
    let layerName;
    switch (circleShape.type) {
        case "directional_zones":
            layerName = "oneway";
            break;
        case "preferred_zones":
            layerName = "areaprefs_preferred";
            break;
        default:
            layerName = "default";
    }

    // Tính toán tâm và bán kính từ 2 điểm
    const p1 = circleShape.points[0];
    const p2 = circleShape.points[1];
    
    // Tâm là điểm thứ nhất
    const centerX = p1.x;
    const centerY = p1.y;
    
    // Bán kính là khoảng cách từ điểm 1 đến điểm 2
    const radius = Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    
    // Tạo polygon từ hình tròn
    const numPoints = 24; // Số điểm để tạo đa giác mô phỏng hình tròn
    const polygon = [];
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        polygon.push({
            x: Math.round(x * 100) / 100, // Làm tròn đến 2 chữ số thập phân
            y: Math.round(y * 100) / 100
        });
    }
    
    // Tạo shape theo định dạng metadata
    const convertedShape = {
        name: circleShape.name || `Circle (${Date.now()})`,
        type: "shape",
        color: circleShape.fill || "#ACACAC",
        polygon: polygon
    };
    
    // Thêm direction nếu là directional_zones
    if (circleShape.type === "directional_zones") {
        convertedShape.direction = circleShape.direction || "none";
        
        // Thiết lập color pattern dựa trên direction
        if (convertedShape.direction === "up") {
            convertedShape.color = "url(#pattern_arrow_up)";
        } else if (convertedShape.direction === "down") {
            convertedShape.color = "url(#pattern_arrow_down)";
        } else if (convertedShape.direction === "left") {
            convertedShape.color = "url(#pattern_arrow_left)";
        } else if (convertedShape.direction === "right") {
            convertedShape.color = "url(#pattern_arrow_right)";
        }
    }
    
    return { layerName, shape: convertedShape };
}

/**
 * Chuyển đổi hình ellipse sang polygon để lưu vào metadata
 * @param {Object} ellipseShape - Shape hình ellipse
 * @returns {Object} Đối tượng chứa thông tin về layer và shape đã chuyển đổi
 */
function convertEllipseForMetadata(ellipseShape) {
    // Xác định layer dựa vào loại shape
    let layerName;
    switch (ellipseShape.type) {
        case "directional_zones":
            layerName = "oneway";
            break;
        case "preferred_zones":
            layerName = "areaprefs_preferred";
            break;
        default:
            layerName = "default";
    }

    // Tính toán tâm, bán kính theo trục x và y từ 2 điểm
    const p1 = ellipseShape.points[0];
    const p2 = ellipseShape.points[1];
    
    // Tâm là điểm thứ nhất
    const centerX = p1.x;
    const centerY = p1.y;
    
    // Bán kính theo trục x và y
    const radiusX = Math.abs(p2.x - p1.x);
    const radiusY = Math.abs(p2.y - p1.y);
    
    // Tạo polygon từ hình ellipse
    const numPoints = 24; // Số điểm để tạo đa giác mô phỏng hình ellipse
    const polygon = [];
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI;
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle);
        polygon.push({
            x: Math.round(x * 100) / 100, // Làm tròn đến 2 chữ số thập phân
            y: Math.round(y * 100) / 100
        });
    }
    
    // Tạo shape theo định dạng metadata
    const convertedShape = {
        name: ellipseShape.name || `Ellipse (${Date.now()})`,
        type: "shape",
        color: ellipseShape.fill || "#ACACAC",
        polygon: polygon
    };
    
    // Thêm direction nếu là directional_zones
    if (ellipseShape.type === "directional_zones") {
        convertedShape.direction = ellipseShape.direction || "none";
        
        // Thiết lập color pattern dựa trên direction
        if (convertedShape.direction === "up") {
            convertedShape.color = "url(#pattern_arrow_up)";
        } else if (convertedShape.direction === "down") {
            convertedShape.color = "url(#pattern_arrow_down)";
        } else if (convertedShape.direction === "left") {
            convertedShape.color = "url(#pattern_arrow_left)";
        } else if (convertedShape.direction === "right") {
            convertedShape.color = "url(#pattern_arrow_right)";
        }
    }
    
    return { layerName, shape: convertedShape };
}

/**
 * Chuyển đổi hình chữ nhật sang polygon để lưu vào metadata
 * @param {Object} rectangleShape - Shape hình chữ nhật
 * @returns {Object} Đối tượng chứa thông tin về layer và shape đã chuyển đổi
 */
function convertRectangleForMetadata(rectangleShape) {
    // Xác định layer dựa vào loại shape
    let layerName;
    switch (rectangleShape.type) {
        case "directional_zones":
            layerName = "oneway";
            break;
        case "preferred_zones":
            layerName = "areaprefs_preferred";
            break;
        default:
            layerName = "default";
    }

    // Tạo polygon từ hình chữ nhật
    const p1 = rectangleShape.points[0];
    const p2 = rectangleShape.points[1];
    
    const polygon = [
        { x: p1.x, y: p1.y },             // Góc trên bên trái
        { x: p2.x, y: p1.y },             // Góc trên bên phải
        { x: p2.x, y: p2.y },             // Góc dưới bên phải
        { x: p1.x, y: p2.y }              // Góc dưới bên trái
    ];
    
    // Tạo shape theo định dạng metadata
    const convertedShape = {
        name: rectangleShape.name || `Rectangle (${Date.now()})`,
        type: "shape",
        color: rectangleShape.fill || "#ACACAC",
        polygon: polygon
    };
    
    // Thêm direction nếu là directional_zones
    if (rectangleShape.type === "directional_zones") {
        convertedShape.direction = rectangleShape.direction || "none";
        
        // Thiết lập color pattern dựa trên direction
        if (convertedShape.direction === "up") {
            convertedShape.color = "url(#pattern_arrow_up)";
        } else if (convertedShape.direction === "down") {
            convertedShape.color = "url(#pattern_arrow_down)";
        } else if (convertedShape.direction === "left") {
            convertedShape.color = "url(#pattern_arrow_left)";
        } else if (convertedShape.direction === "right") {
            convertedShape.color = "url(#pattern_arrow_right)";
        }
    }
    
    return { layerName, shape: convertedShape };
}

/**
 * Lưu các shape đã chuyển đổi vào metadata
 * @param {Object} metadata - Metadata gốc
 * @param {Array} shapes - Mảng các shape cần lưu
 * @returns {Object} Metadata đã cập nhật và thông tin về các thay đổi
 */
function saveShapesToMetadata(metadata, shapes) {
    // Object theo dõi thay đổi
    const changes = {
        added: {},
        modified: {},
        deleted: {}
    };
    
    shapes.forEach(shape => {
        if (!shape) return; // Bỏ qua nếu shape không hợp lệ
        
        const convertedData = convertShapeForMetadata(shape);
        if (!convertedData) return; // Bỏ qua nếu không thể chuyển đổi
        
        const { layerName, shape: convertedShape } = convertedData;
        
        // Kiểm tra loại thay đổi (thêm mới, sửa đổi, hoặc xóa)
        if (shape.isNew) {
            // Thêm mới shape
            
            // Đảm bảo layer tồn tại
            if (!metadata.layers[layerName]) {
                metadata.layers[layerName] = { shapes: [] };
            }
            
            // Thêm shape mới vào layer
            metadata.layers[layerName].shapes.push(convertedShape);
            
            // Theo dõi thay đổi
            if (!changes.added[layerName]) {
                changes.added[layerName] = [];
            }
            changes.added[layerName].push(convertedShape);
        } else if (shape.isModified) {
            // Cập nhật shape đã tồn tại
            // Tìm và cập nhật shape trong metadata dựa vào ID hoặc thông tin khác
            // (Logic cụ thể tùy thuộc vào cách bạn quản lý ID giữa hai hệ thống)
            
            // Theo dõi thay đổi
            if (!changes.modified[layerName]) {
                changes.modified[layerName] = [];
            }
            changes.modified[layerName].push(convertedShape);
        }
    });
    
    return { metadata, changes };
}

export function generateMetadataLayersFromShapes(shapeList) {
  // Khởi tạo khung layers gốc với tất cả các layer mặc định có sẵn
  const layers = {
    areaevents_blink: { shapes: [] },
    areaevents_disable_localization: { shapes: [] },
    areaevents_door: { shapes: [] },
    areaevents_evacuation: { shapes: [] },
    areaevents_fleet_and_emergency: { shapes: [] },
    areaevents_io: { shapes: [] },
    areaevents_look_ahead_distance: { shapes: [] },
    areaevents_planner_zone: { shapes: [] },
    areaevents_sound: { shapes: [] },
    areaevents_sound_and_light_zone: { shapes: [] },
    areaevents_speed: { shapes: [] },
    areaprefs_critical: { shapes: [] },
    areaprefs_forbidden: { shapes: [] },
    areaprefs_preferred: { shapes: [] },
    areaprefs_unpreferred: { shapes: [] },
    bluetooth: { shapes: [] },
    emergency_zone: { shapes: [] },
    floor: { shapes: [] },
    oneway: { shapes: [] },
    positions: { shapes: [] },
    walls: { shapes: [] }
  };

  // Gộp shapes mới vào đúng layerName
  for (const item of shapeList) {
    const { layerName, shape } = item;

    if (!layers[layerName]) {
      // Nếu layer chưa có trong danh sách mặc định, thêm vào
      layers[layerName] = { shapes: [] };
    }

    layers[layerName].shapes.push(shape);
  }

  return layers;
}
