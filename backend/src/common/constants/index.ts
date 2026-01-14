// Constants cho hệ thống tính lương
// Tránh hardcode các giá trị

// Ngày công chuẩn mặc định (fallback khi không có config)
export const NGAY_CONG_CHUAN_MAC_DINH = 26;

// Giới hạn file upload
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_EXCEL_ROWS = 10000;

// Bcrypt
export const BCRYPT_SALT_ROUNDS = 12;

// Token
export const TOKEN_EXPIRY_HOURS = 8;

// Rate limiting
export const LOGIN_RATE_LIMIT = 5; // requests
export const LOGIN_RATE_LIMIT_TTL = 60000; // 1 minute

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
