Tóm tắt quy tắc nghiệp vụ đã rõ

Lịch làm việc: Làm tất cả các ngày trong tuần (Thứ 2 → Chủ Nhật), Thứ 7 chỉ làm buổi sáng → tính 0.5 ngày công cho mỗi Thứ 7.
Lương cơ bản: Là lương tháng cố định (ví dụ: 15.000.000đ/tháng), không được chia ra theo ngày.
Phụ cấp chuyên cần: Được hưởng đầy đủ nếu không nghỉ quá 2 ngày làm việc/tháng (nghĩa là nghỉ ≤ 2 ngày → vẫn full phụ cấp).
Nghỉ có phép: Vẫn được tính ngày công như đi làm bình thường (không bị trừ ngày công, không ảnh hưởng đến phụ cấp chuyên cần).

1. Cách tính số ngày công lý thuyết trong tháng
Vì làm 7 ngày/tuần, số ngày làm việc lý thuyết = tổng số ngày trong tháng.
Nhưng Thứ 7 chỉ tính 0.5 ngày → cần điều chỉnh:

Mỗi ngày Thứ 2 → Thứ 6 + Chủ Nhật = 1.0 ngày công
Mỗi Thứ 7 = 0.5 ngày công

Công thức:
textSố ngày công lý thuyết = (Tổng ngày trong tháng) + (Số Thứ 7 trong tháng × -0.5)
                     = Tổng ngày - (Số Thứ 7 × 0.5)
Ví dụ thực tế (tháng 1/2026 & 2/2026):

Tháng 1/2026: 31 ngày, có 5 Thứ 7 → Số ngày công lý thuyết = 31 - (5 × 0.5) = 28.5 ngày
Tháng 2/2026: 28 ngày, có 4 Thứ 7 → Số ngày công lý thuyết = 28 - (4 × 0.5) = 26 ngày

Hệ thống cần tự động tính hàm này mỗi khi tạo bảng lương tháng.
2. Cập nhật logic tính lương






























Khoản lương/Phụ cấpCách tính trong hệ thốngGhi chúLương cơ bảnFull số tiền cố định (ví dụ 15tr), không nhân với ngày côngVì là lương tháng cố định, không phụ thuộc ngày côngPhụ cấp cố định khác (xăng xe, điện thoại, ăn ca…)Tính theo số ngày thực tế đi làm / số ngày công lý thuyết × giá trị thángVí dụ: Phụ cấp ăn ca 30k/ngày → 30k × (ngày thực tế / ngày lý thuyết) × số ngày lý thuyếtPhụ cấp chuyên cầnFull nếu nghỉ không phép ≤ 2 ngày
0đ nếu nghỉ không phép > 2 ngàyNghỉ có phép không tính vào số ngày nghỉCác khoản biến động (thưởng KPI, tăng ca…)Theo rule engine hiện tại, nhưng nhân với hệ số ngày công nếu cầnTùy từng khoản
3. Cập nhật mô hình dữ liệu (Prisma – phần thay đổi chính)
prismamodel BangChamCongThang {
  id                        BigInt        @id @default(autoincrement())
  nhanVienId                BigInt
  thang                     Int
  nam                       Int
  soNgayDiLamThucTe         Decimal       // số ngày thực tế đi làm (bao gồm nghỉ có phép)
  soNgayNghiKhongPhep       Decimal       // số ngày nghỉ KHÔNG phép (để tính chuyên cần)
  soNgayCongLyThuyet        Decimal       // tự tính: tổng ngày - (số Thứ 7 × 0.5)
  soThuBayTrongThang        Int           // để audit
  // ... các trường khác: giờ tăng ca, đi muộn...
}

model KhoanLuong {
  id          BigInt   @id @default(autoincrement())
  ma_khoan    String   @unique
  ten_khoan   String
  loai        String   // thu_nhap / khau_tru
  cachTinh    String   // LUONG_THANG_CO_DINH, THEO_NGAY_CONG, CHUYEN_CAN_DIEU_KIEN, ...
  // ...
}
4. Logic Rule Engine – Cập nhật mẫu
Rule 1: Lương cơ bản (tháng cố định)
JSON{
  "dieu_kien": { "khoan_luong": "LUONG_CO_BAN" },
  "cong_thuc": {
    "loai": "LUONG_THANG_CO_DINH",
    "gia_tri_thang": 15000000
  }
}
Rule 2: Phụ cấp ăn ca (tính theo ngày thực tế)
JSON{
  "dieu_kien": { "khoan_luong": "HO_TRO_AN_CA" },
  "cong_thuc": {
    "loai": "THEO_NGAY_CONG",
    "gia_tri_mot_ngay": 30000,
    "so_ngay_tinh": "{{soNgayDiLamThucTe}}"
  }
}
Rule 3: Phụ cấp chuyên cần (điều kiện nghỉ không phép)
JSON{
  "dieu_kien": {
    "khoan_luong": "HO_TRO_CHUYEN_CAN",
    "soNgayNghiKhongPhep": { "lte": 2 }
  },
  "cong_thuc": {
    "loai": "SO_CUNG",
    "gia_tri": 800000,
    "ghi_chu": "Đi làm đủ, nghỉ không phép ≤ 2 ngày"
  }
}
5. Gợi ý triển khai thực tế (ưu tiên)

Hàm tính số ngày công lý thuyết (JavaScript/TypeScript)

TypeScriptfunction tinhSoNgayCongLyThuyet(thang: number, nam: number): number {
  const ngayDau = new Date(nam, thang - 1, 1);
  const ngayCuoi = new Date(nam, thang, 0); // ngày cuối tháng
  const tongNgay = ngayCuoi.getDate();

  let soThuBay = 0;
  let current = new Date(ngayDau);

  while (current <= ngayCuoi) {
    if (current.getDay() === 6) { // Thứ 7 = 6
      soThuBay++;
    }
    current.setDate(current.getDate() + 1);
  }

  return tongNgay - (soThuBay * 0.5);
}

Trong service tính lương: Lấy soNgayDiLamThucTe và soNgayNghiKhongPhep từ chấm công để áp dụng rule.

Câu hỏi còn lại (nếu có) để hoàn thiện

Phụ cấp ăn ca, xăng xe, điện thoại... hiện tại có tính theo ngày hay cố định tháng?
Nghỉ phép có giới hạn số ngày/tháng không? (ví dụ: tối đa 12 ngày phép/năm)
Có cần trừ tiền khi nghỉ không phép không? Hay chỉ ảnh hưởng chuyên cần?

Nếu bạn xác nhận thêm các điểm trên, mình có thể sinh code chi tiết hơn (service + rule mẫu đầy đủ).
Bạn muốn tiếp tục phần nào?

Code hàm tính ngày công chi tiết
Service tính lương tháng (NestJS)
Giao diện hiển thị ngày công & chuyên cần trên AG-Grid
Hay phần khác?
3.7sExecuted code
Phụ cấp ăn ca, xăng xe, điện thoại... hiện tại tính theo ngày
Nghỉ phép tối đa 12 ngày phép/năm - Không trừ tiền khi nghỉ có phép
Trừ tiền khi nghỉ không phép
Dựa trên thông tin mới bạn cung cấp, mình tổng hợp và cập nhật toàn bộ quy tắc tính lương/phụ cấp cho hệ thống một cách chính xác, minh bạch, phù hợp với thực tế doanh nghiệp Việt Nam và hướng Option B (chuẩn hoá ngay, dựa trên nguồn dữ liệu gốc).
Tóm tắt quy tắc nghiệp vụ hoàn chỉnh (đến thời điểm hiện tại)

Lịch làm việc: Làm tất cả các ngày trong tuần (Thứ 2 → Chủ Nhật).
→ Thứ 7 buổi sáng tính 0.5 ngày công.
Số ngày công lý thuyết trong tháng: Tổng ngày trong tháng trừ đi 0.5 ngày cho mỗi Thứ 7.
Ví dụ (dựa trên tính toán thực tế tháng 2026):
Tháng 1/2026: 31 ngày, 5 Thứ 7 → 28.5 ngày công
Tháng 2/2026: 28 ngày, 4 Thứ 7 → 26.0 ngày công
Tháng 3/2026: 31 ngày, 4 Thứ 7 → 29.0 ngày công

Lương cơ bản: Lương tháng cố định (full, không nhân/chia theo ngày công).
Phụ cấp theo ngày (ăn ca, xăng xe, điện thoại, ...):
→ Tính theo công thức:
(giá trị tháng quy định) × (số ngày thực tế đi làm / số ngày công lý thuyết)
Phụ cấp chuyên cần:
→ Full nếu nghỉ không phép ≤ 2 ngày/tháng
→ 0đ nếu nghỉ không phép > 2 ngày
Nghỉ phép:
→ Tối đa 12 ngày/năm
→ Không trừ tiền khi nghỉ có phép
→ Vẫn tính ngày công như đi làm bình thường
→ Không ảnh hưởng đến phụ cấp chuyên cần
Nghỉ không phép:
→ Trừ tiền (thường trừ theo ngày lương cơ bản hoặc theo quy định riêng)
→ Ảnh hưởng đến phụ cấp chuyên cần (nếu > 2 ngày)

Cập nhật logic tính toán chi tiết



































Khoản lương/Phụ cấpCách tính trong hệ thốngGhi chú quan trọngLương cơ bảnFull số tiền cố định (ví dụ: 15.000.000đ)Không phụ thuộc ngày côngPhụ cấp theo ngày (ăn ca, xăng xe, điện thoại...)giá_trị_tháng × (soNgayDiLamThucTe / soNgayCongLyThuyet)soNgayDiLamThucTe bao gồm nghỉ có phépPhụ cấp chuyên cầnFull nếu soNgayNghiKhongPhep ≤ 2
0đ nếu soNgayNghiKhongPhep > 2Nghỉ có phép không tính vào soNgayNghiKhongPhepTrừ tiền nghỉ không phépThường: - (lương cơ bản / soNgayCongLyThuyet) × số ngày nghỉ không phépCó thể dùng rule riêng nếu công ty trừ theo mức cố định (ví dụ: 300k/ngày)Nghỉ phépKhông trừ tiền, tính ngày công full, không ảnh hưởng chuyên cầnHệ thống cần theo dõi số ngày phép còn lại/năm
Cập nhật Rule Engine – Mẫu rule JSON (Prisma lưu dưới dạng JsonB)

Lương cơ bản (cố định tháng)

JSON{
  "dieu_kien": { "khoan_luong": "LUONG_CO_BAN" },
  "cong_thuc": {
    "loai": "LUONG_THANG_CO_DINH",
    "gia_tri_thang": 15000000,
    "ghi_chu": "Lương tháng cố định, không phụ thuộc ngày công"
  }
}

Phụ cấp ăn ca (theo ngày)

JSON{
  "dieu_kien": { "khoan_luong": "HO_TRO_AN_CA" },
  "cong_thuc": {
    "loai": "THEO_NGAY_CONG",
    "gia_tri_thang_quy_dinh": 780000,  // ví dụ 30k/ngày × 26 ngày chuẩn
    "so_ngay_tinh": "{{soNgayDiLamThucTe}}",
    "so_ngay_ly_thuyet": "{{soNgayCongLyThuyet}}"
  }
}

Phụ cấp chuyên cần (điều kiện nghỉ không phép)

JSON{
  "dieu_kien": {
    "khoan_luong": "HO_TRO_CHUYEN_CAN",
    "soNgayNghiKhongPhep": { "lte": 2 }
  },
  "cong_thuc": {
    "loai": "SO_CUNG",
    "gia_tri": 800000,
    "ghi_chu": "Đi làm đủ, nghỉ không phép ≤ 2 ngày/tháng"
  }
}

Khấu trừ nghỉ không phép (rule khấu trừ)

JSON{
  "dieu_kien": { "khoan_khau_tru": "NGHI_KHONG_PHEP" },
  "cong_thuc": {
    "loai": "THEO_NGAY_CONG",
    "gia_tri_mot_ngay": - "{{luongCoBanMotNgay}}",  // = lương cơ bản / soNgayCongLyThuyet
    "so_ngay_tinh": "{{soNgayNghiKhongPhep}}"
  }
}
Khuyến nghị triển khai tiếp theo (ưu tiên cao)

Bảng chấm công cần bổ sung các trường:
soNgayDiLamThucTe: bao gồm đi làm + nghỉ có phép
soNgayNghiCoPhep: để theo dõi quota 12 ngày/năm
soNgayNghiKhongPhep: để tính chuyên cần & khấu trừ
soNgayCongLyThuyet: lưu giá trị đã tính (cho audit)

Quản lý phép năm:
Thêm bảng nghi_phep_nam để theo dõi còn lại bao nhiêu ngày phép cho từng nhân viên (tự động trừ khi duyệt nghỉ có phép).

Hàm hỗ trợ (TypeScript – dùng trong service):

TypeScriptfunction tinhSoNgayCongLyThuyet(thang: number, nam: number): number {
  const ngayDau = new Date(nam, thang - 1, 1);
  const ngayCuoi = new Date(nam, thang, 0);
  const tongNgay = ngayCuoi.getDate();

  let soThuBay = 0;
  let current = new Date(ngayDau);

  while (current <= ngayCuoi) {
    if (current.getDay() === 6) { // Thứ 7 = 6 (0=CN, 1=Thứ 2, ..., 6=Thứ 7)
      soThuBay++;
    }
    current.setDate(current.getDate() + 1);
  }

  return tongNgay - (soThuBay * 0.5);