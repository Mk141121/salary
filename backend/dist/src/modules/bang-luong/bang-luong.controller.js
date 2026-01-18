"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BangLuongController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bang_luong_service_1 = require("./bang-luong.service");
const tinh_luong_service_1 = require("./tinh-luong.service");
const phieu_luong_service_1 = require("./phieu-luong.service");
const ngay_cong_service_1 = require("./ngay-cong.service");
const bang_luong_dto_1 = require("./dto/bang-luong.dto");
const common_2 = require("../../common");
let BangLuongController = class BangLuongController {
    constructor(bangLuongService, tinhLuongService, phieuLuongService, ngayCongService) {
        this.bangLuongService = bangLuongService;
        this.tinhLuongService = tinhLuongService;
        this.phieuLuongService = phieuLuongService;
        this.ngayCongService = ngayCongService;
    }
    async layDanhSach(thang, nam, phongBanId) {
        return this.bangLuongService.layDanhSach(thang, nam, phongBanId);
    }
    async layTheoId(id) {
        return this.bangLuongService.layTheoId(id);
    }
    async layTongLuong(id) {
        return this.tinhLuongService.tinhTongBangLuong(id);
    }
    async layTongLuongNhanVien(id, nhanVienId) {
        return this.tinhLuongService.tinhTongLuongNhanVien(id, nhanVienId);
    }
    async layLichSu(id) {
        return this.bangLuongService.layLichSuChinhSua(id);
    }
    async taoMoi(dto) {
        return this.bangLuongService.taoMoi(dto);
    }
    async capNhat(id, dto) {
        return this.bangLuongService.capNhat(id, dto);
    }
    async capNhatChiTiet(dto) {
        return this.bangLuongService.capNhatChiTiet(dto);
    }
    async capNhatNhieuChiTiet(dto) {
        return this.bangLuongService.capNhatNhieuChiTiet(dto.danhSach);
    }
    async chotBangLuong(id, dto, nguoiDung) {
        return this.bangLuongService.chotBangLuong(id, dto, nguoiDung?.id);
    }
    async moKhoa(id, lyDo, nguoiDung) {
        return this.bangLuongService.moKhoaBangLuong(id, lyDo, nguoiDung?.id, nguoiDung?.tenDangNhap);
    }
    async khoa(id, nguoiDung) {
        return this.bangLuongService.khoaBangLuong(id, nguoiDung?.id, nguoiDung?.tenDangNhap);
    }
    async xoa(id, force, nguoiDung) {
        const isAdmin = nguoiDung?.vaiTros?.includes('ADMIN') || nguoiDung?.tenDangNhap === 'admin';
        const forceDelete = force === 'true' && isAdmin;
        return this.bangLuongService.xoa(id, forceDelete, nguoiDung?.tenDangNhap);
    }
    async soSanhExcel(id, tongExcel) {
        return this.tinhLuongService.soSanhVoiExcel(id, tongExcel);
    }
    async layPhieuLuong(id, nhanVienId) {
        return this.phieuLuongService.layPhieuLuong(id, nhanVienId);
    }
    async layPhieuLuongHtml(id, nhanVienId) {
        return this.phieuLuongService.layPhieuLuongHtml(id, nhanVienId);
    }
    async guiPhieuLuong(id, nhanVienId) {
        return this.phieuLuongService.guiPhieuLuong(id, nhanVienId);
    }
    async guiTatCa(id) {
        return this.phieuLuongService.guiTatCaPhieuLuong(id);
    }
    async layTatCaNgayCong(id) {
        return this.ngayCongService.layTatCaNgayCong(id);
    }
    async layNgayCongNhanVien(id, nhanVienId) {
        return this.ngayCongService.layNgayCongTheoNhanVien(id, nhanVienId);
    }
    async khoiTaoNgayCong(id) {
        return this.ngayCongService.khoiTaoNgayCongTuChamCong(id);
    }
    async tinhLaiLuong(id) {
        return this.bangLuongService.tinhLaiTatCaKhoanLuong(id);
    }
    async dieuChinhNgayCong(id, nhanVienId, body) {
        return this.ngayCongService.capNhatNgayCongDieuChinh(id, nhanVienId, body.ngayCongMoi, body.ghiChu);
    }
    async xoaDieuChinhNgayCong(id, nhanVienId) {
        return this.ngayCongService.xoaDieuChinh(id, nhanVienId);
    }
};
exports.BangLuongController = BangLuongController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách bảng lương' }),
    (0, swagger_1.ApiQuery)({ name: 'thang', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'nam', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'phongBanId', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Query)('thang')),
    __param(1, (0, common_1.Query)('nam')),
    __param(2, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layDanhSach", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết bảng lương theo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy bảng lương' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layTheoId", null);
__decorate([
    (0, common_1.Get)(':id/tong'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tổng lương của bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layTongLuong", null);
__decorate([
    (0, common_1.Get)(':id/nhan-vien/:nhanVienId/tong'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tổng lương của nhân viên trong bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layTongLuongNhanVien", null);
__decorate([
    (0, common_1.Get)(':id/lich-su'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử chỉnh sửa bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layLichSu", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo bảng lương mới' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tạo thành công' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Bảng lương đã tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bang_luong_dto_1.TaoBangLuongDto]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "taoMoi", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bảng lương đã chốt' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, bang_luong_dto_1.CapNhatBangLuongDto]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "capNhat", null);
__decorate([
    (0, common_1.Put)('chi-tiet/cap-nhat'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật một ô chi tiết lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bang_luong_dto_1.CapNhatChiTietLuongDto]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "capNhatChiTiet", null);
__decorate([
    (0, common_1.Put)('chi-tiet/cap-nhat-nhieu'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật nhiều ô chi tiết lương cùng lúc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bang_luong_dto_1.CapNhatNhieuChiTietDto]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "capNhatNhieuChiTiet", null);
__decorate([
    (0, common_1.Post)(':id/chot'),
    (0, swagger_1.ApiOperation)({ summary: 'Chốt bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Chốt thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bảng lương đã chốt' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, bang_luong_dto_1.ChotBangLuongDto, Object]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "chotBangLuong", null);
__decorate([
    (0, common_1.Post)(':id/mo-khoa'),
    (0, common_2.VaiTro)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Mở khóa bảng lương đã chốt (chỉ ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mở khóa thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('lyDo')),
    __param(2, (0, common_2.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "moKhoa", null);
__decorate([
    (0, common_1.Post)(':id/khoa'),
    (0, common_2.VaiTro)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Khóa vĩnh viễn bảng lương (chỉ ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Khóa thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_2.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "khoa", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa bảng lương (ADMIN có thể xóa bảng đã khóa với force=true)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Không thể xóa bảng lương đã chốt' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('force')),
    __param(2, (0, common_2.NguoiDungHienTai)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "xoa", null);
__decorate([
    (0, common_1.Post)(':id/so-sanh-excel'),
    (0, swagger_1.ApiOperation)({ summary: 'So sánh tổng lương với Excel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('tongExcel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "soSanhExcel", null);
__decorate([
    (0, common_1.Get)(':id/phieu-luong/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy dữ liệu phiếu lương của nhân viên' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layPhieuLuong", null);
__decorate([
    (0, common_1.Get)(':id/phieu-luong/:nhanVienId/html'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy HTML phiếu lương (để render hoặc xuất ảnh)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layPhieuLuongHtml", null);
__decorate([
    (0, common_1.Post)(':id/gui-phieu-luong/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Gửi phiếu lương qua email cho 1 nhân viên' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gửi thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "guiPhieuLuong", null);
__decorate([
    (0, common_1.Post)(':id/gui-tat-ca'),
    (0, swagger_1.ApiOperation)({ summary: 'Gửi phiếu lương cho tất cả nhân viên trong bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gửi thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "guiTatCa", null);
__decorate([
    (0, common_1.Get)(':id/ngay-cong'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả ngày công của bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layTatCaNgayCong", null);
__decorate([
    (0, common_1.Get)(':id/ngay-cong/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy ngày công của nhân viên trong bảng lương' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "layNgayCongNhanVien", null);
__decorate([
    (0, common_1.Post)(':id/ngay-cong/khoi-tao'),
    (0, swagger_1.ApiOperation)({ summary: 'Khởi tạo ngày công từ dữ liệu chấm công' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Khởi tạo thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "khoiTaoNgayCong", null);
__decorate([
    (0, common_1.Post)(':id/tinh-lai-luong'),
    (0, swagger_1.ApiOperation)({ summary: 'Tính lại tất cả khoản lương theo ngày công hiện tại' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tính lại thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "tinhLaiLuong", null);
__decorate([
    (0, common_1.Put)(':id/ngay-cong/:nhanVienId/dieu-chinh'),
    (0, swagger_1.ApiOperation)({ summary: 'Điều chỉnh ngày công thủ công' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "dieuChinhNgayCong", null);
__decorate([
    (0, common_1.Delete)(':id/ngay-cong/:nhanVienId/dieu-chinh'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa điều chỉnh ngày công (trở về tính tự động)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa thành công' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BangLuongController.prototype, "xoaDieuChinhNgayCong", null);
exports.BangLuongController = BangLuongController = __decorate([
    (0, swagger_1.ApiTags)('bang-luong'),
    (0, common_1.Controller)('bang-luong'),
    __metadata("design:paramtypes", [bang_luong_service_1.BangLuongService,
        tinh_luong_service_1.TinhLuongService,
        phieu_luong_service_1.PhieuLuongService,
        ngay_cong_service_1.NgayCongService])
], BangLuongController);
//# sourceMappingURL=bang-luong.controller.js.map