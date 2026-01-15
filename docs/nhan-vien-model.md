# 📋 Mô hình dữ liệu Nhân viên (Employee Data Model)

> **Cập nhật**: 14/01/2026  
> **Phiên bản**: 2.0 - Nâng cấp module theo PRD Payroll

---

## 1. Tổng quan

Hệ thống quản lý nhân viên được thiết kế theo mô hình **master-satellite** để:
- Tách biệt thông tin tĩnh (ít thay đổi) và thông tin động (thay đổi theo thời gian)
- Hỗ trợ snapshot kỳ lương chính xác
- Lưu trữ lịch sử đầy đủ cho audit

---

## 2. Sơ đồ Entity Relationship

```
┌─────────────────────┐
│     NhanVien        │ ◄─── Master table
│  (Thông tin cơ bản) │
└─────────┬───────────┘
          │ 1
          │
    ┌─────┼─────┬──────────┬──────────┐
    │     │     │          │          │
    ▼ N   ▼ N   ▼ N        ▼ N        ▼ N
┌────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐
│HopDong │ │NganHang│ │ ThueBH  │ │PhuCap   │ │NhanVienNhom  │
│ /Lương │ │        │ │         │ │NhanVien │ │(thuộc nhóm)  │
└────────┘ └────────┘ └─────────┘ └─────────┘ └──────┬───────┘
                                                     │ N
                                                     ▼ 1
                                              ┌──────────────┐
                                              │ NhomNhanVien │
                                              └──────────────┘
```

---

## 3. Chi tiết các bảng

### 3.1 NhanVien (Bảng master)

Lưu thông tin cơ bản, ít thay đổi của nhân viên.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `maNhanVien` | String | Mã nhân viên (unique) |
| `hoTen` | String | Họ tên đầy đủ |
| `gioiTinh` | Enum | NAM / NU / KHAC |
| `ngaySinh` | DateTime? | Ngày sinh |
| `soDienThoai` | String? | Số điện thoại |
| `email` | String? | Email |
| `diaChi` | String? | Địa chỉ |
| `chucVu` | String? | Chức vụ |
| `phongBanId` | Int | FK → PhongBan |
| `trangThai` | Enum | DANG_LAM / TAM_NGHI / NGHI_VIEC |
| `ngayVaoLam` | DateTime? | Ngày bắt đầu làm việc |
| `ngayNghiViec` | DateTime? | Ngày nghỉ việc |
| `taoBoi` | Int? | User ID tạo |
| `capNhatBoi` | Int? | User ID cập nhật |
| `taoLuc` | DateTime | Timestamp tạo |
| `capNhatLuc` | DateTime | Timestamp cập nhật |

**Lưu ý**: `luongCoBan` đã được chuyển sang bảng `NhanVienHopDong`.

---

### 3.2 NhanVienHopDong (Hợp đồng / Lương)

Lưu lịch sử hợp đồng và mức lương theo thời gian.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `nhanVienId` | Int | FK → NhanVien |
| `loaiHopDong` | Enum | THU_VIEC / MOT_NAM / BA_NAM / VO_THOI_HAN |
| `tuNgay` | DateTime | Ngày bắt đầu hiệu lực |
| `denNgay` | DateTime? | Ngày kết thúc (null = vô thời hạn) |
| `luongCoBan` | BigInt | Lương cơ bản (VND) |
| `luongDongBH` | BigInt? | Lương đóng BHXH |
| `heSoLuong` | Decimal? | Hệ số lương (nếu có) |
| `trangThai` | Enum | HIEU_LUC / HET_HAN / HUY_BO |
| `ghiChu` | String? | Ghi chú |
| `taoLuc` | DateTime | Timestamp tạo |
| `taoBoiId` | Int? | User ID tạo |

**Ràng buộc**:
- Không cho phép overlap hợp đồng cùng nhân viên
- Index: `(nhanVienId, tuNgay, denNgay)`

---

### 3.3 NhanVienNganHang (Tài khoản ngân hàng)

Lưu thông tin tài khoản ngân hàng để chuyển lương.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `nhanVienId` | Int | FK → NhanVien |
| `tenNganHang` | String | Tên ngân hàng |
| `soTaiKhoan` | String | Số tài khoản |
| `chuTaiKhoan` | String | Tên chủ tài khoản |
| `chiNhanh` | String? | Chi nhánh |
| `laMacDinh` | Boolean | Đánh dấu tài khoản mặc định |
| `tuNgay` | DateTime? | Ngày bắt đầu sử dụng |
| `denNgay` | DateTime? | Ngày kết thúc |
| `taoLuc` | DateTime | Timestamp tạo |

**Ràng buộc**:
- Mỗi nhân viên chỉ có 1 tài khoản mặc định tại 1 thời điểm
- Index: `(nhanVienId, laMacDinh)`

---

### 3.4 NhanVienThueBH (Thông tin Thuế / BHXH)

Lưu thông tin cần thiết để tính thuế TNCN và BHXH.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `nhanVienId` | Int | FK → NhanVien (unique) |
| `mstCaNhan` | String? | Mã số thuế cá nhân |
| `soCmndCccd` | String? | Số CMND/CCCD |
| `ngayCap` | DateTime? | Ngày cấp CMND |
| `noiCap` | String? | Nơi cấp |
| `soNguoiPhuThuoc` | Int | Số người phụ thuộc (default: 0) |
| `ghiChu` | String? | Ghi chú |

**Công thức giảm trừ**:
- Bản thân: 11.000.000 đ/tháng
- Người phụ thuộc: 4.400.000 đ/người/tháng

---

### 3.5 NhomNhanVien (Nhóm / Tag)

Định nghĩa các nhóm để phân loại nhân viên.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `maNhom` | String | Mã nhóm (unique) |
| `tenNhom` | String | Tên nhóm |
| `moTa` | String? | Mô tả |
| `taoLuc` | DateTime | Timestamp tạo |

**Ví dụ nhóm**:
- `KINH_DOANH` - Nhân viên kinh doanh
- `VAN_PHONG` - Nhân viên văn phòng
- `NHA_MAY` - Công nhân nhà máy

---

### 3.6 NhanVienThuocNhom (Membership)

Liên kết nhân viên với nhóm theo thời gian.

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | Int | Primary key |
| `nhanVienId` | Int | FK → NhanVien |
| `nhomId` | Int | FK → NhomNhanVien |
| `tuNgay` | DateTime? | Ngày bắt đầu thuộc nhóm |
| `denNgay` | DateTime? | Ngày kết thúc |
| `taoLuc` | DateTime | Timestamp tạo |

**Ràng buộc**:
- Unique constraint: `(nhanVienId, nhomId, tuNgay)`
- Không overlap membership cùng nhóm

---

## 4. Enums

### GioiTinh
```prisma
enum GioiTinh {
  NAM
  NU
  KHAC
}
```

### TrangThaiNhanVien
```prisma
enum TrangThaiNhanVien {
  DANG_LAM
  TAM_NGHI
  NGHI_VIEC
}
```

### LoaiHopDong
```prisma
enum LoaiHopDong {
  THU_VIEC
  MOT_NAM
  BA_NAM
  VO_THOI_HAN
}
```

### TrangThaiHopDong
```prisma
enum TrangThaiHopDong {
  HIEU_LUC
  HET_HAN
  HUY_BO
}
```

---

## 5. API Endpoints

### Nhân viên
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/nhan-vien` | Danh sách nhân viên |
| GET | `/nhan-vien/:id` | Chi tiết nhân viên |
| POST | `/nhan-vien` | Tạo nhân viên mới |
| PUT | `/nhan-vien/:id` | Cập nhật nhân viên |

### Hợp đồng
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/nhan-vien/:id/hop-dong` | Lịch sử hợp đồng |
| POST | `/nhan-vien/:id/hop-dong` | Tạo hợp đồng mới |
| PUT | `/nhan-vien/hop-dong/:hopDongId` | Cập nhật hợp đồng |
| POST | `/nhan-vien/hop-dong/:hopDongId/ket-thuc` | Kết thúc hợp đồng |

### Ngân hàng
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/nhan-vien/:id/ngan-hang` | Danh sách tài khoản |
| POST | `/nhan-vien/:id/ngan-hang` | Thêm tài khoản |
| PUT | `/nhan-vien/ngan-hang/:id` | Cập nhật tài khoản |
| POST | `/nhan-vien/ngan-hang/:id/mac-dinh` | Đặt làm mặc định |

### Thuế & BHXH
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/nhan-vien/:id/thue-bh` | Lấy thông tin |
| POST | `/nhan-vien/:id/thue-bh` | Tạo/Cập nhật |

### Nhóm nhân viên
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/nhom-nhan-vien` | Danh sách nhóm |
| POST | `/nhom-nhan-vien` | Tạo nhóm |
| GET | `/nhan-vien/:id/nhom` | Nhóm của nhân viên |
| POST | `/nhan-vien/:id/nhom` | Thêm vào nhóm |
| DELETE | `/nhan-vien/:nhanVienId/nhom/:nhomId` | Xóa khỏi nhóm |

---

## 6. Tích hợp với Payroll

### 6.1 Lấy lương cơ bản

```typescript
// Lấy hợp đồng hiệu lực tại ngày cụ thể
const hopDong = await prisma.nhanVienHopDong.findFirst({
  where: {
    nhanVienId: id,
    trangThai: 'HIEU_LUC',
    tuNgay: { lte: ngay },
    OR: [
      { denNgay: null },
      { denNgay: { gte: ngay } }
    ]
  },
  orderBy: { tuNgay: 'desc' }
});

const luongCoBan = hopDong?.luongCoBan ?? 0;
```

### 6.2 Snapshot kỳ lương

Khi tạo snapshot, hệ thống phải:
1. Lấy hợp đồng hiệu lực tại `ngayChotSnapshot`
2. Lấy ngân hàng mặc định
3. Lấy danh sách nhóm hiệu lực
4. Lấy phụ cấp hiệu lực

Xem thêm: [snapshot-mapping.md](./snapshot-mapping.md)

---

## 7. Frontend UI

### Tabs trong Chi tiết Nhân viên

1. **Thông tin** - Thông tin cơ bản
2. **Hợp đồng / Lương** - Timeline hợp đồng
3. **Phụ cấp** - Danh sách phụ cấp cố định
4. **Ngân hàng** - Tài khoản ngân hàng
5. **Thuế & BHXH** - Thông tin thuế TNCN
6. **Nhóm NV** - Các nhóm đang tham gia
7. **Lịch sử** - Lịch sử thay đổi

---

## 8. Lưu ý quan trọng

⚠️ **Không đọc `luongCoBan` trực tiếp từ bảng `NhanVien`**
- Luôn lấy từ `NhanVienHopDong` với điều kiện hiệu lực

⚠️ **Validate overlap hợp đồng**
- Không cho phép 2 hợp đồng cùng nhân viên chồng chéo thời gian

⚠️ **Snapshot là bất biến**
- Thay đổi hợp đồng/lương sau khi snapshot không ảnh hưởng kỳ lương cũ
