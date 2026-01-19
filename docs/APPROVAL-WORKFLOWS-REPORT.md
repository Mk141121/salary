# 📋 Báo cáo Quy trình Duyệt - HRM Lite System

**Ngày tạo:** 18/01/2026  
**Phiên bản:** 1.0  
**Tác giả:** System Review

---

## 📑 Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Đơn Nghỉ phép (Leave Request)](#2-đơn-nghỉ-phép-leave-request)
3. [Đơn Yêu cầu (General Request - OT, Trễ, Sớm, WFH)](#3-đơn-yêu-cầu-general-request)
4. [Bảng Lương (Payroll)](#4-bảng-lương-payroll)
5. [Phiếu Điều chỉnh Lương (Salary Adjustment)](#5-phiếu-điều-chỉnh-lương-salary-adjustment)
6. [Bảng Ứng lương (Advance Salary)](#6-bảng-ứng-lương-advance-salary)
7. [Yêu cầu Sửa công (Timesheet Correction)](#7-yêu-cầu-sửa-công-timesheet-correction)
8. [Đánh giá KPI](#8-đánh-giá-kpi)
9. [Ma trận Tổng hợp](#9-ma-trận-tổng-hợp)
10. [Đề xuất Cải tiến](#10-đề-xuất-cải-tiến)

---

## 1. Tổng quan

HRM Lite System có **7 quy trình duyệt chính**, mỗi quy trình quản lý một nghiệp vụ cụ thể với các trạng thái, chuyển đổi và phân quyền riêng biệt.

### Kiến trúc chung

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPROVAL WORKFLOWS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Leave       │  │ Request     │  │ Payroll     │             │
│  │ (Nghỉ phép) │  │ (Yêu cầu)   │  │ (Bảng lương)│             │
│  │ 1-level     │  │ 1-2 level   │  │ Lock-based  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Adjustment  │  │ Advance     │  │ Timesheet   │             │
│  │ (Điều chỉnh)│  │ (Ứng lương) │  │ (Sửa công)  │             │
│  │ 1-level     │  │ Lock-based  │  │ 1-level     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐                                               │
│  │ KPI         │                                               │
│  │ (Đánh giá)  │                                               │
│  │ 2-phase     │                                               │
│  └─────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Đơn Nghỉ phép (Leave Request)

### 2.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `DonNghiPhep` |
| **Schema** | `backend/prisma/schema.prisma` |
| **Service** | `backend/src/modules/nghi-phep/nghi-phep.service.ts` |
| **Controller** | `backend/src/modules/nghi-phep/nghi-phep.controller.ts` |

### 2.2 Các trạng thái

| Trạng thái | Mô tả | Cho phép sửa |
|------------|-------|--------------|
| `NHAP` | Nháp - nhân viên có thể sửa/xóa | ✅ |
| `GUI_DUYET` | Gửi duyệt - chờ quản lý duyệt | ❌ |
| `DA_DUYET` | Đã duyệt - tự động map vào chấm công | ❌ |
| `TU_CHOI` | Từ chối - có thể sửa và gửi lại | ✅ |
| `HUY` | Đã hủy | ❌ |

### 2.3 Sơ đồ chuyển đổi trạng thái

```
                          guiDuyet()
      ┌──────────────────────────────────────────────────┐
      │                                                  │
      │    ┌─────────┐         ┌────────────┐           │
      │    │  NHAP   │────────►│ GUI_DUYET  │           │
      │    └─────────┘         └────────────┘           │
      │         ▲                    │                  │
      │         │                    │                  │
      │    sửa đơn              ┌────┴────┐             │
      │         │               │         │             │
      │         │          duyet()   tuChoi()           │
      │         │               │         │             │
      │    ┌────┴────┐          ▼         ▼             │
      │    │ TU_CHOI │◄────────────────────             │
      │    └─────────┘                    │             │
      │         │              ┌──────────▼──────────┐  │
      │         │              │     DA_DUYET        │  │
      │         │              │ (auto-map chấm công)│  │
      │         │              └─────────────────────┘  │
      │         │                         │             │
      │         │         huy()           │             │
      │         └────────────────►┌───────▼───────┐     │
      │                           │      HUY      │     │
      │                           └───────────────┘     │
      └──────────────────────────────────────────────────┘
```

### 2.4 API Endpoints

| Endpoint | Method | Permission | Mô tả |
|----------|--------|------------|-------|
| `/nghi-phep/don` | POST | `NGHI_PHEP_TAO_DON` | Tạo đơn mới |
| `/nghi-phep/don/:id` | PUT | `NGHI_PHEP_SUA_DON` | Cập nhật (chỉ NHAP/TU_CHOI) |
| `/nghi-phep/don/:id/gui-duyet` | POST | `NGHI_PHEP_GUI_DUYET` | Gửi duyệt |
| `/nghi-phep/don/:id/duyet` | POST | `NGHI_PHEP_DUYET` | Duyệt đơn |
| `/nghi-phep/don/:id/tu-choi` | POST | `NGHI_PHEP_DUYET` | Từ chối (yêu cầu lý do) |
| `/nghi-phep/don/:id/huy` | POST | `NGHI_PHEP_HUY_DON` | Hủy đơn |

### 2.5 Quy tắc nghiệp vụ

1. **Chỉ sửa được ở trạng thái NHAP hoặc TU_CHOI**
2. **Tự động loại trừ ngày cuối tuần** khi tính số ngày nghỉ
3. **Khi duyệt**: Tự động tạo `ChiTietNghiPhepNgay` cho từng ngày
4. **Khi hủy đơn đã duyệt**: Xóa mapping chấm công
5. **Duyệt 1 cấp** - chỉ cần 1 người duyệt

---

## 3. Đơn Yêu cầu (General Request)

### 3.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `DonYeuCau` |
| **Config Model** | `RequestWorkflowConfig` |
| **Service** | `backend/src/modules/yeu-cau/yeu-cau.service.ts` |
| **Controller** | `backend/src/modules/yeu-cau/yeu-cau.controller.ts` |

### 3.2 Loại yêu cầu hỗ trợ

| Mã loại | Tên | Yêu cầu giờ |
|---------|-----|-------------|
| `OT` | Làm thêm giờ | ✅ |
| `TRE_GIO` | Đi trễ | ✅ |
| `VE_SOM` | Về sớm | ✅ |
| `CONG_TAC` | Công tác | ❌ |
| `WFH` | Làm việc từ xa | ❌ |
| `NGHI_PHEP` | Nghỉ phép năm | ✅ (ngày) |
| `NGHI_KHONG_LUONG` | Nghỉ không lương | ✅ (ngày) |
| `NGHI_OM` | Nghỉ ốm | ✅ (ngày) |
| `NGHI_THAI_SAN` | Nghỉ thai sản | ✅ (ngày) |
| `NGHI_VIEC_RIENG` | Nghỉ việc riêng | ✅ (ngày) |

### 3.3 Các trạng thái

| Trạng thái | Mô tả | Cấp duyệt |
|------------|-------|-----------|
| `NHAP` | Nháp | - |
| `CHO_DUYET_1` | Chờ duyệt cấp 1 | Manager |
| `CHO_DUYET_2` | Chờ duyệt cấp 2 | HR |
| `DA_DUYET` | Đã duyệt hoàn toàn | - |
| `TU_CHOI_1` | Từ chối cấp 1 | - |
| `TU_CHOI_2` | Từ chối cấp 2 | - |
| `HUY` | Đã hủy | - |

### 3.4 Sơ đồ chuyển đổi (2 cấp duyệt)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ┌─────────┐    guiDuyet()    ┌─────────────┐                │
│   │  NHAP   │─────────────────►│ CHO_DUYET_1 │                │
│   └─────────┘                  └─────────────┘                │
│        ▲                             │                        │
│        │                       ┌─────┴─────┐                  │
│        │                       │           │                  │
│   (sửa đơn)            duyetCap1()   tuChoiCap1()             │
│        │                       │           │                  │
│        │                       ▼           ▼                  │
│   ┌────┴────┐           ┌─────────────┐  ┌─────────┐         │
│   │ TU_CHOI │◄──────────│ CHO_DUYET_2 │  │TU_CHOI_1│         │
│   │  (any)  │           └─────────────┘  └─────────┘         │
│   └─────────┘                  │                              │
│                          ┌─────┴─────┐                        │
│                          │           │                        │
│                   duyetCap2()   tuChoiCap2()                  │
│                          │           │                        │
│                          ▼           ▼                        │
│                   ┌───────────┐  ┌─────────┐                  │
│                   │ DA_DUYET  │  │TU_CHOI_2│                  │
│                   │(map công) │  └─────────┘                  │
│                   └───────────┘                               │
│                                                                │
│   ※ HR Override: Có thể đổi quyết định ở bất kỳ trạng thái   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.5 Cấu hình Workflow

```typescript
interface RequestWorkflowConfig {
  loaiYeuCauId: number;      // Loại yêu cầu áp dụng
  phongBanId?: number;       // Phòng ban (null = tất cả)
  soCap: 1 | 2;              // Số cấp duyệt
  nguoiDuyet1: 
    | 'QUAN_LY_TRUC_TIEP'    // Quản lý trực tiếp
    | 'TRUONG_PHONG'         // Trưởng phòng
    | 'NGUOI_DUNG_CU_THE';   // Người dùng cụ thể
  nguoiDuyet2: 
    | 'HR'                   // Phòng HR
    | 'NGUOI_DUNG_CU_THE';   // Người dùng cụ thể
  tuDongDuyetNeuQuaHan: boolean;  // Tự động duyệt sau hạn
  soNgayQuaHan?: number;     // Số ngày quá hạn
}
```

### 3.6 API Endpoints

| Endpoint | Method | Permission | Mô tả |
|----------|--------|------------|-------|
| `/yeu-cau/don` | POST | `YEU_CAU_TAO_DON` | Tạo đơn |
| `/yeu-cau/don/:id` | PUT | - | Cập nhật |
| `/yeu-cau/don/:id/gui-duyet` | POST | - | Gửi duyệt |
| `/yeu-cau/don/:id/duyet-cap-1` | POST | `YEU_CAU_DUYET_CAP_1` | Duyệt cấp 1 |
| `/yeu-cau/don/:id/duyet-cap-2` | POST | `YEU_CAU_DUYET_CAP_2` | Duyệt cấp 2 |
| `/yeu-cau/don/:id/tu-choi-cap-1` | POST | `YEU_CAU_DUYET_CAP_1` | Từ chối cấp 1 |
| `/yeu-cau/don/:id/tu-choi-cap-2` | POST | `YEU_CAU_DUYET_CAP_2` | Từ chối cấp 2 |
| `/yeu-cau/don/:id/override` | POST | `YEU_CAU_OVERRIDE` | HR override |
| `/yeu-cau/don/:id/huy` | POST | - | Hủy đơn |
| `/yeu-cau/inbox/cap-1` | GET | `YEU_CAU_DUYET_CAP_1` | Inbox cấp 1 |
| `/yeu-cau/inbox/cap-2` | GET | `YEU_CAU_DUYET_CAP_2` | Inbox cấp 2 |
| `/yeu-cau/inbox/duyet-batch` | POST | - | Duyệt hàng loạt |
| `/yeu-cau/my-requests` | GET | - | Đơn của tôi |

### 3.7 Quy tắc nghiệp vụ

1. **Cấu hình 1 hoặc 2 cấp duyệt** theo loại yêu cầu và phòng ban
2. **Override**: HR có thể đổi quyết định bất kỳ lúc nào
3. **Tự động tính giờ** từ giờ bắt đầu/kết thúc (xử lý qua đêm)
4. **Khi duyệt**: Tạo `RequestMappingChamCong` để tích hợp chấm công
5. **Thông báo** khi duyệt/từ chối

---

## 4. Bảng Lương (Payroll)

### 4.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `BangLuong` |
| **Service** | `backend/src/modules/bang-luong/bang-luong.service.ts` |
| **Controller** | `backend/src/modules/bang-luong/bang-luong.controller.ts` |

### 4.2 Các trạng thái

| Trạng thái | Mô tả | Sửa được | Mở khóa được |
|------------|-------|----------|--------------|
| `NHAP` | Đang nhập liệu | ✅ | - |
| `DA_CHOT` | Đã chốt - tạo snapshot | ❌ | ✅ (Admin) |
| `KHOA` | Khóa vĩnh viễn | ❌ | ❌ |

### 4.3 Sơ đồ chuyển đổi

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────┐     chot()      ┌──────────┐     khoa()     │
│    │  NHAP   │────────────────►│ DA_CHOT  │───────────────►│
│    │         │                 │          │                │
│    │• Sửa OK │                 │• Snapshot│    ┌───────┐   │
│    │• Tính   │   moKhoa()      │• BHXH    │    │ KHOA  │   │
│    │  lương  │◄────────────────│• Thuế    │    │       │   │
│    └─────────┘  (ADMIN + lý do)└──────────┘    │• Final│   │
│         │                                       │• Lock │   │
│         │           calcBHXH()                 └───────┘   │
│         │           calcThue()                      ▲      │
│         │           createSnapshot()                │      │
│         ▼                                          │      │
│    ┌─────────────────────────────────────────────┐ │      │
│    │              SIDE EFFECTS                    │ │      │
│    ├─────────────────────────────────────────────┤ │      │
│    │ • Tạo SnapshotBangLuong                     │ │      │
│    │ • Tính BangTinhBHXH cho từng NV             │─┘      │
│    │ • Tính BangTinhThue cho từng NV             │        │
│    │ • Ghi ngayChotLuong, nguoiChotLuong         │        │
│    │ • Log vào LichSuChinhSua                    │        │
│    └─────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.4 API Endpoints

| Endpoint | Method | Permission | Mô tả |
|----------|--------|------------|-------|
| `/bang-luong` | POST | - | Tạo bảng lương |
| `/bang-luong/:id` | PUT | - | Cập nhật (chỉ NHAP) |
| `/bang-luong/:id/chot` | POST | - | Chốt lương |
| `/bang-luong/:id/khoa` | POST | - | Khóa vĩnh viễn |
| `/bang-luong/:id/mo-khoa` | POST | `ADMIN` | Mở khóa (cần lý do ≥10 ký tự) |
| `/bang-luong/:id/tinh-lai` | POST | - | Tính lại toàn bộ |
| `/bang-luong/:id/tinh-bhxh-thue` | POST | - | Tính BHXH/Thuế |
| `/bang-luong/:id/export-excel` | GET | - | Xuất Excel |

### 4.5 Quy tắc nghiệp vụ

1. **Lock mechanism** ngăn chỉnh sửa sau khi chốt
2. **Khi chốt** (`chotBangLuong()`):
   - Tính BHXH cho tất cả nhân viên
   - Tính thuế TNCN cho tất cả nhân viên
   - Tạo `SnapshotBangLuong` lưu toàn bộ dữ liệu
   - Ghi `ngayChotLuong` và `nguoiChotLuong`
3. **Mở khóa yêu cầu lý do** (tối thiểu 10 ký tự)
4. **Trạng thái KHOA là vĩnh viễn** - không thể mở khóa
5. **Phụ cấp cố định** (`nguon = CO_DINH`) không thể sửa trong bảng lương
6. **Mọi thay đổi được log** vào `LichSuChinhSua`

---

## 5. Phiếu Điều chỉnh Lương (Salary Adjustment)

### 5.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `PhieuDieuChinh` |
| **Child Model** | `ChiTietPhieuDieuChinh` |
| **Service** | `backend/src/modules/bang-luong/snapshot-dieu-chinh.service.ts` |

### 5.2 Các trạng thái

| Trạng thái | Mô tả |
|------------|-------|
| `CHO_DUYET` | Chờ duyệt |
| `DA_DUYET` | Đã duyệt - áp dụng vào lương |
| `TU_CHOI` | Từ chối |
| `HUY` | Đã hủy |

### 5.3 Sơ đồ chuyển đổi

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    (Tạo mới)                                                │
│        │                                                    │
│        ▼                                                    │
│    ┌───────────┐                                            │
│    │ CHO_DUYET │                                            │
│    └───────────┘                                            │
│         │                                                   │
│    ┌────┼────────────────┐                                  │
│    │    │                │                                  │
│ duyet() │           tuChoi()                                │
│    │    │                │                                  │
│    ▼    │                ▼                                  │
│ ┌───────────┐       ┌─────────┐                            │
│ │ DA_DUYET  │       │ TU_CHOI │                            │
│ │           │       └─────────┘                            │
│ │• Cập nhật │            │                                  │
│ │  chi tiết │            │                                  │
│ │  bảng lương│       huy()                                  │
│ │• Audit log│            │                                  │
│ └───────────┘            ▼                                  │
│                     ┌─────────┐                             │
│                     │   HUY   │                             │
│                     └─────────┘                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.4 Loại điều chỉnh

| Loại | Mô tả |
|------|-------|
| `TANG` | Tăng thêm giá trị |
| `GIAM` | Giảm bớt giá trị |
| `THAY_THE` | Thay thế giá trị mới |

### 5.5 API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/snapshot-dieu-chinh/phieu-dieu-chinh` | POST | Tạo phiếu điều chỉnh |
| `/snapshot-dieu-chinh/phieu-dieu-chinh/:id/duyet` | POST | Duyệt |
| `/snapshot-dieu-chinh/phieu-dieu-chinh/:id/tu-choi` | POST | Từ chối |
| `/snapshot-dieu-chinh/phieu-dieu-chinh/:id/huy` | POST | Hủy |

### 5.6 Quy tắc nghiệp vụ

1. **Dùng để điều chỉnh lương sau khi đã chốt**
2. **Khi duyệt**: Cập nhật `ChiTietBangLuong` với giá trị mới
3. **Audit trail**: Tạo `LichSuChinhSua` cho mọi thay đổi
4. **Không thể hủy phiếu đã duyệt**
5. **Áp dụng vào kỳ lương tiếp theo**

---

## 6. Bảng Ứng lương (Advance Salary)

### 6.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `BangUngLuong` |
| **Child Model** | `ChiTietBangUngLuong` |
| **Service** | `backend/src/modules/ung-luong/ung-luong.service.ts` |
| **Controller** | `backend/src/modules/ung-luong/ung-luong.controller.ts` |

### 6.2 Các trạng thái

| Trạng thái | Mô tả | Sửa được |
|------------|-------|----------|
| `NHAP` | Đang tính toán điều kiện | ✅ |
| `DA_CHOT` | Đã chốt - snapshot | ❌ |
| `DA_KHOA` | Khóa vĩnh viễn | ❌ |

### 6.3 Điều kiện được ứng lương

```typescript
interface DieuKienUngLuong {
  soNgayCongToiThieu: number;     // Số ngày công tối thiểu
  soNgayNghiKhongPhepToiDa: number; // Số ngày nghỉ không phép tối đa
  tiLeUngToiDa: number;           // Tỷ lệ ứng tối đa (%)
  soTienUngToiDa: number;         // Số tiền ứng tối đa
}
```

### 6.4 Sơ đồ chuyển đổi

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌─────────┐                                              │
│    │  NHAP   │                                              │
│    │         │                                              │
│    │• Sinh   │                                              │
│    │  danh   │                                              │
│    │  sách   │                                              │
│    │• Set    │     chot()      ┌──────────┐     khoa()     │
│    │  tỷ lệ/ │────────────────►│ DA_CHOT  │───────────────►│
│    │  số tiền│                 │          │                │
│    └─────────┘   moKhoa()      │• Snapshot│    ┌─────────┐ │
│         ▲      ◄───────────────│• Tạo     │    │ DA_KHOA │ │
│         │       (ADMIN)        │  phiếu   │    │         │ │
│         │                      │  điều    │    │• Final  │ │
│    Kiểm tra                    │  chỉnh   │    │• Lock   │ │
│    điều kiện                   └──────────┘    └─────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.5 API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/ung-luong` | POST | Tạo bảng ứng lương |
| `/ung-luong/:id/sinh-danh-sach` | POST | Sinh danh sách NV đủ điều kiện |
| `/ung-luong/:id/set-ti-le` | POST | Set tỷ lệ % ứng |
| `/ung-luong/:id/set-so-tien-co-dinh` | POST | Set số tiền cố định |
| `/ung-luong/:id/chot` | POST | Chốt |
| `/ung-luong/:id/khoa` | POST | Khóa |
| `/ung-luong/:id/mo-khoa` | POST | Mở khóa (ADMIN) |

### 6.6 Quy tắc nghiệp vụ

1. **Kiểm tra điều kiện tự động**:
   - Số ngày công tối thiểu
   - Số ngày nghỉ không phép tối đa
   - Số tiền ứng tối đa
2. **Có thể set theo tỷ lệ hoặc số tiền cố định**
3. **Validate không vượt quá số tiền tối đa cho phép**
4. **Tạo phiếu điều chỉnh (khấu trừ)** cho kỳ lương tiếp theo
5. **Snapshot lưu dữ liệu đầu vào** để audit

---

## 7. Yêu cầu Sửa công (Timesheet Correction)

### 7.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model** | `YeuCauSuaCong` |
| **Service** | `backend/src/modules/cham-cong/timesheet.service.ts` |
| **Controller** | `backend/src/modules/cham-cong/timesheet.controller.ts` |

### 7.2 Các trạng thái

| Trạng thái | Mô tả |
|------------|-------|
| `CHO_DUYET` | Chờ duyệt |
| `DA_DUYET` | Đã duyệt - cập nhật chấm công |
| `TU_CHOI` | Từ chối |

### 7.3 Sơ đồ chuyển đổi

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    (Tạo yêu cầu)                                            │
│        │                                                    │
│        ▼                                                    │
│    ┌───────────┐                                            │
│    │ CHO_DUYET │                                            │
│    │           │                                            │
│    │• Lưu giá  │                                            │
│    │  trị cũ   │                                            │
│    └───────────┘                                            │
│         │                                                   │
│    ┌────┴────────────────┐                                  │
│    │                     │                                  │
│ duyet()             tuChoi()                                │
│    │                     │                                  │
│    ▼                     ▼                                  │
│ ┌───────────┐       ┌─────────┐                            │
│ │ DA_DUYET  │       │ TU_CHOI │                            │
│ │           │       │         │                            │
│ │• Cập nhật │       │• Yêu cầu│                            │
│ │  chấm công│       │  lý do  │                            │
│ │• Audit log│       └─────────┘                            │
│ └───────────┘                                               │
│                                                             │
│   ※ HR có thể sửa trực tiếp (bypass workflow)              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.4 API Endpoints

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/timesheet/yeu-cau-sua-cong` | GET | Danh sách yêu cầu |
| `/timesheet/yeu-cau-sua-cong` | POST | Tạo yêu cầu |
| `/timesheet/yeu-cau-sua-cong/:id/duyet` | POST | Duyệt/Từ chối |
| `/timesheet/sua-cong-truc-tiep` | PUT | Sửa trực tiếp (HR) |

### 7.5 Quy tắc nghiệp vụ

1. **Không được sửa công của kỳ lương đã chốt**
2. **Lưu giá trị cũ** (`gioVaoCu`, `gioRaCu`, `trangThaiCu`) để audit
3. **Khi duyệt**: Cập nhật `ChiTietChamCong` và tạo `LichSuSuaCong`
4. **Từ chối yêu cầu lý do**
5. **HR có thể sửa trực tiếp** không cần qua workflow

---

## 8. Đánh giá KPI

### 8.1 Thông tin Model

| Thuộc tính | Giá trị |
|------------|---------|
| **Model đánh giá** | `DanhGiaKPINhanVien` |
| **Model kỳ** | `KyDanhGiaKPI` |
| **Model kết quả** | `KetQuaKPI` |
| **Model template** | `TemplateKPI`, `ChiTieuKPI` |

### 8.2 Trạng thái Đánh giá cá nhân

| Trạng thái | Mô tả |
|------------|-------|
| `NHAP` | Đang nhập điểm |
| `CHO_DUYET` | Gửi duyệt |
| `DA_DUYET` | Đã duyệt - tính thưởng |
| `TU_CHOI` | Từ chối |

### 8.3 Trạng thái Kỳ đánh giá

| Trạng thái | Mô tả |
|------------|-------|
| `MO` | Mở - cho phép nhập liệu |
| `DONG` | Đóng - không nhập liệu |
| `DUYET` | Duyệt - kết quả được phê duyệt |
| `HOAN_THANH` | Hoàn thành - thưởng đã áp dụng |

### 8.4 Xếp loại KPI

| Xếp loại | Điểm tối thiểu | Hệ số thưởng |
|----------|----------------|--------------|
| `XUAT_SAC` | ≥ 95% | Cao nhất |
| `TOT` | ≥ 80% | Cao |
| `KHA` | ≥ 65% | Trung bình |
| `TRUNG_BINH` | ≥ 50% | Thấp |
| `YEU` | < 50% | Không thưởng |

### 8.5 Quy tắc nghiệp vụ

1. **Template KPI** định nghĩa các tiêu chí và trọng số (tổng = 100%)
2. **Tự động tính điểm** và xếp loại
3. **Hệ số thưởng** dựa trên xếp loại
4. **2 phase**: Đánh giá cá nhân → Phê duyệt kỳ

---

## 9. Ma trận Tổng hợp

### 9.1 So sánh các Workflow

| Workflow | Số cấp | Số trạng thái | Người duyệt | Thông báo | Lock |
|----------|--------|---------------|-------------|-----------|------|
| Nghỉ phép | 1 | 5 | Manager/HR | ❌ | ❌ |
| Yêu cầu (OT,...) | 1-2 | 6 | Manager → HR | ✅ | ❌ |
| Bảng lương | Lock-based | 3 | Admin | Audit | ✅ |
| Điều chỉnh lương | 1 | 4 | Admin | Audit | ❌ |
| Ứng lương | Lock-based | 3 | Admin | Audit | ✅ |
| Sửa công | 1 | 3 | HR | ❌ | ❌ |
| KPI | 2-phase | 4+4 | Manager → HR | ❌ | ❌ |

### 9.2 Ma trận Quyền

| Quyền | Mô tả | Áp dụng cho |
|-------|-------|-------------|
| `NGHI_PHEP_TAO_DON` | Tạo đơn nghỉ phép | Employee |
| `NGHI_PHEP_DUYET` | Duyệt đơn nghỉ phép | Manager/HR |
| `YEU_CAU_TAO_DON` | Tạo đơn yêu cầu | Employee |
| `YEU_CAU_DUYET_CAP_1` | Duyệt cấp 1 | Manager |
| `YEU_CAU_DUYET_CAP_2` | Duyệt cấp 2 | HR |
| `YEU_CAU_OVERRIDE` | Override quyết định | HR |
| `BANG_LUONG_CHOT` | Chốt bảng lương | Payroll |
| `BANG_LUONG_KHOA` | Khóa bảng lương | Admin |
| `BANG_LUONG_MO_KHOA` | Mở khóa bảng lương | Admin |

---

## 10. Đề xuất Cải tiến

### 10.1 Vấn đề hiện tại

| # | Vấn đề | Mức độ | Module |
|---|--------|--------|--------|
| 1 | Đơn nghỉ phép và Đơn yêu cầu có logic riêng biệt, nên hợp nhất | Medium | nghi-phep, yeu-cau |
| 2 | Thiếu thông báo cho đơn nghỉ phép | Medium | nghi-phep |
| 3 | Thiếu auto-approve sau deadline cho nghỉ phép | Low | nghi-phep |
| 4 | Chưa có workflow duyệt cho KPI | Medium | kpi |
| 5 | Thiếu email notification | High | Tất cả |
| 6 | Chưa có dashboard duyệt tập trung | Medium | Tất cả |

### 10.2 Đề xuất

1. **Hợp nhất workflow nghỉ phép vào đơn yêu cầu**
   - Đơn giản hóa code và logic
   - Sử dụng chung cấu hình workflow

2. **Thêm Email/Push Notification**
   - Thông báo khi có đơn cần duyệt
   - Thông báo khi đơn được duyệt/từ chối

3. **Dashboard duyệt tập trung**
   - Hiển thị tất cả đơn chờ duyệt
   - Filter theo loại, phòng ban, thời gian

4. **Auto-escalation**
   - Tự động chuyển cấp nếu quá hạn
   - Thông báo reminder

5. **Audit trail cải tiến**
   - Ghi log chi tiết hơn
   - Dashboard xem lịch sử thay đổi

---

## Phụ lục: Tham chiếu Code

| Module | File chính |
|--------|-----------|
| Nghỉ phép | `backend/src/modules/nghi-phep/` |
| Yêu cầu | `backend/src/modules/yeu-cau/` |
| Bảng lương | `backend/src/modules/bang-luong/` |
| Ứng lương | `backend/src/modules/ung-luong/` |
| Chấm công | `backend/src/modules/cham-cong/` |
| KPI | `backend/src/modules/kpi/` |
| Schema | `backend/prisma/schema.prisma` |

---

*Báo cáo được tạo tự động bởi System Review Tool*
