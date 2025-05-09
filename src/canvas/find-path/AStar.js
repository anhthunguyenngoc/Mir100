import * as Utils from '../utils';

// Hàm tính toán khoảng cách Manhattan (tính nhanh hơn Euclidean nếu chỉ di chuyển theo hướng ngang/dọc)
function calculateManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Hàm kiểm tra xem điểm có nằm trong vùng cấm hay tường không
function isPointInObstacle(point, obstacles, threshold = 10) {
    const [forbiddenZones, walls] = obstacles;
    return (
        Utils.pointNearPolygon(point, forbiddenZones, threshold) ||
        Utils.pointNearLine(point, walls, threshold)
    );
}

// Priority Queue (Hàng đợi ưu tiên)
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority); // Sắp xếp theo độ ưu tiên
    }

    dequeue() {
        return this.queue.shift().item; // Lấy phần tử có độ ưu tiên thấp nhất
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Hàm A* tối ưu hóa
export function aStar(start, goal, obstacles, mapWidth, mapHeight) {
    const openList = new PriorityQueue(); // Sử dụng PriorityQueue thay vì mảng
    const closedList = new Set(); // Sử dụng Set để kiểm tra closedList nhanh hơn
    const cameFrom = {};

    const gScore = {};
    const fScore = {};

    // Hàm heuristic (khoảng cách Manhattan giữa điểm hiện tại và đích)
    function heuristic(a, b) {
        return calculateManhattanDistance(a, b);
    }

    // Khởi tạo điểm bắt đầu và điểm đích
    gScore[`${start.x},${start.y}`] = 0;
    fScore[`${start.x},${start.y}`] = heuristic(start, goal);

    openList.enqueue(start, fScore[`${start.x},${start.y}`]);

    while (!openList.isEmpty()) {
        // Lấy điểm có fScore thấp nhất từ openList
        const current = openList.dequeue();

        // Nếu đã tìm thấy đích, xây dựng lại đường đi
        if (current.x === goal.x && current.y === goal.y) {
            const path = [];
            let temp = goal;
            while (cameFrom[`${temp.x},${temp.y}`]) {
                path.push(temp);
                temp = cameFrom[`${temp.x},${temp.y}`];
            }
            path.push(start);
            return path.reverse();
        }

        closedList.add(`${current.x},${current.y}`); // Đánh dấu điểm là đã thăm

        // Kiểm tra các điểm xung quanh (4 hướng)
        const neighbors = [
            { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }
        ];

        for (let neighbor of neighbors) {
            const neighborPoint = { x: current.x + neighbor.x, y: current.y + neighbor.y };

            // Kiểm tra xem điểm có nằm trong bản đồ và không phải vật cản
            if (
                neighborPoint.x < 0 || neighborPoint.x >= mapWidth ||
                neighborPoint.y < 0 || neighborPoint.y >= mapHeight ||
                isPointInObstacle(neighborPoint, obstacles) ||
                closedList.has(`${neighborPoint.x},${neighborPoint.y}`)
            ) {
                continue;
            }

            const tentativeGScore = gScore[`${current.x},${current.y}`] + calculateManhattanDistance(current, neighborPoint);

            // Nếu điểm chưa được thêm vào openList hoặc gScore thấp hơn
            if (!openList.queue.some(item => item.item.x === neighborPoint.x && item.item.y === neighborPoint.y)) {
                openList.enqueue(neighborPoint, tentativeGScore + heuristic(neighborPoint, goal));
            } else if (tentativeGScore >= gScore[`${neighborPoint.x},${neighborPoint.y}`]) {
                continue;
            }

            // Cập nhật cameFrom, gScore và fScore
            cameFrom[`${neighborPoint.x},${neighborPoint.y}`] = current;
            gScore[`${neighborPoint.x},${neighborPoint.y}`] = tentativeGScore;
            fScore[`${neighborPoint.x},${neighborPoint.y}`] = tentativeGScore + heuristic(neighborPoint, goal);
        }
    }

    return []; // Nếu không tìm được đường đi
}
