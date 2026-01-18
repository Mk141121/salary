# PRD-04 — Anti-fraud Lite (GPS + Geofence + 1 Device Binding + Offline Sync)

## 1) Mục tiêu
- GPS check-in/out + proof
- Geofence chặn check-in ngoài vùng
- 1 user = 1 device
- Offline sync queue

---

## 2) Data model
- `CauHinhGeofence`
- `ThietBiNhanVien`
- `BangGhiChamCongGPS`
Idempotent key chống duplicate

---

## 3) API
- GET/PUT geofence
- checkin/checkout
- bind/reset device
- my gps logs

---

## 4) UI
- HR cấu hình geofence (map basic + radius)
- Nhân viên check-in/out hiện trạng thái in/out geofence
- HR reset device (log reason)

---

## 5) Acceptance
- Ngoài vùng không check-in
- Đổi thiết bị bị chặn
- Offline sync không mất dữ liệu
- Audit đầy đủ
