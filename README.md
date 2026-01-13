# Hệ Thống Tính Lương

Ứng dụng quản lý tính lương doanh nghiệp được xây dựng với NestJS + PostgreSQL (Backend) và React + Vite (Frontend).

## Tính năng chính

- ✅ Quản lý phòng ban, nhân viên
- ✅ Quản lý các khoản lương (Thu nhập, Khấu trừ)
- ✅ Tạo và quản lý bảng lương theo tháng
- ✅ Giao diện chỉnh sửa trực tiếp giống Excel
- ✅ Import dữ liệu từ file Excel
- ✅ Export bảng lương ra Excel
- ✅ Quy trình chốt/khóa bảng lương
- ✅ Ghi lịch sử chỉnh sửa

## Cấu trúc dự án

```
tinh-luong/
├── backend/           # NestJS API
│   ├── prisma/        # Schema và seed data
│   └── src/           # Source code
└── frontend/          # React + Vite
    └── src/           # Source code
```

## Yêu cầu hệ thống

- Node.js >= 18.x
- PostgreSQL >= 14
- npm hoặc yarn

## Cài đặt

### 1. Clone và cài đặt dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Cấu hình Database

Tạo database PostgreSQL:

```sql
CREATE DATABASE tinh_luong;
```

Tạo file `.env` trong thư mục `backend/`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tinh_luong?schema=public"
PORT=3001
```

### 3. Khởi tạo Database

```bash
cd backend

# Tạo bảng từ schema
npx prisma db push

# Seed dữ liệu mẫu
npx prisma db seed
```

### 4. Chạy ứng dụng

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3001
Swagger API docs: http://localhost:3001/api/docs

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

## Dữ liệu mẫu

Khi chạy seed, hệ thống sẽ tạo:

- **5 phòng ban**: Giám đốc, Kế toán, Nhân sự, IT, Kinh doanh
- **10 khoản lương**:
  - Thu nhập: Lương cơ bản, Phụ cấp ăn trưa, Phụ cấp đi lại, Thưởng KPI, Lương OT
  - Khấu trừ: BHXH, BHYT, BHTN, Thuế TNCN, Tạm ứng
- **12 nhân viên** mẫu
- **1 bảng lương** tháng 1/2026 với dữ liệu chi tiết

## Quy trình sử dụng

### Tạo bảng lương mới

1. Vào **Danh sách bảng lương** → **Tạo bảng lương**
2. Chọn tháng/năm và phòng ban
3. Hệ thống tự động tạo chi tiết cho tất cả nhân viên

### Chỉnh sửa bảng lương

1. Click vào bảng lương để xem chi tiết
2. Click vào ô tiền để sửa trực tiếp
3. Thay đổi sẽ được đánh dấu màu vàng
4. Click **Lưu thay đổi** để lưu

### Import từ Excel

1. Vào **Import từ Excel**
2. Upload file Excel
3. Mapping các cột Excel với khoản lương trong hệ thống
4. Chọn phòng ban và tháng/năm
5. Bấm Import

### Chốt/Khóa bảng lương

- **Chốt bảng lương**: Đánh dấu đã xong, vẫn có thể mở lại sửa
- **Khóa bảng lương**: Khóa vĩnh viễn, không thể sửa

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/phong-ban | Lấy danh sách phòng ban |
| GET | /api/nhan-vien | Lấy danh sách nhân viên |
| GET | /api/khoan-luong | Lấy danh sách khoản lương |
| GET | /api/bang-luong | Lấy danh sách bảng lương |
| GET | /api/bang-luong/:id | Lấy chi tiết bảng lương |
| POST | /api/bang-luong | Tạo bảng lương mới |
| PUT | /api/bang-luong/:id/cap-nhat-hang-loat | Cập nhật nhiều chi tiết |
| POST | /api/bang-luong/:id/chot | Chốt bảng lương |
| POST | /api/bang-luong/:id/mo-khoa | Mở khóa bảng lương |
| POST | /api/bang-luong/:id/khoa | Khóa vĩnh viễn |
| GET | /api/bang-luong/:id/export | Export ra Excel |
| POST | /api/import-excel/import | Import từ Excel |

## Nguyên tắc tính lương

**QUAN TRỌNG**: Tổng lương được tính từ các khoản, KHÔNG lưu trong DB.

```
TỔNG_LƯƠNG = Σ (Thu nhập) - Σ (Khấu trừ)
```

Mỗi lần hiển thị, hệ thống tính toán lại từ bảng `chi_tiet_bang_luong`.

## Công nghệ sử dụng

### Backend
- NestJS 10.x
- Prisma ORM
- PostgreSQL
- ExcelJS
- Swagger/OpenAPI

### Frontend
- React 18
- Vite
- TanStack Query (React Query)
- TanStack Table
- Tailwind CSS
- React Router v6
- Axios

## License

MIT
