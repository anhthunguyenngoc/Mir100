export const STATUS_CODE = {
  SUCCESS_POST: 201, // Tạo thành công (Created)
  SUCCESS_GET: 200, // Lấy thành công (OK)
  SUCCESS_DELETE: 204, // Xóa thành công (No Content)

  ERROR_BAD_REQUEST: 400, // Lỗi định dạng, thiếu header, JSON sai, v.v.
  ERROR_CONFLICT: 409, // Trùng lặp (Duplicate entry)
};
