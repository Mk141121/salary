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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATTERN_LOAI_RULE = exports.TU_DIEN_ALIAS = exports.AiRuleAuditDto = exports.ApDungRuleDeXuatDto = exports.AiContextDto = exports.GoiYRuleResponseDto = exports.RuleDeXuat = exports.CongThucBieuThucDeXuat = exports.CongThucTheoSuKienDeXuat = exports.CongThucBacThangDeXuat = exports.CongThucTheoHeSoDeXuat = exports.CongThucCoDinhDeXuat = exports.BacThangDeXuat = exports.DieuKienJsonDeXuat = exports.DieuKienApDungDeXuat = exports.GoiYRuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class GoiYRuleDto {
}
exports.GoiYRuleDto = GoiYRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban đang chọn' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoiYRuleDto.prototype, "phongBanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID quy chế lương đang chọn' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoiYRuleDto.prototype, "quyCheId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nội dung mô tả bằng tiếng Việt',
        example: 'Phạt đi trễ: 1-2 lần 50k/lần, từ lần 3 trở lên 100k/lần'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoiYRuleDto.prototype, "noiDungTiengViet", void 0);
class DieuKienApDungDeXuat {
}
exports.DieuKienApDungDeXuat = DieuKienApDungDeXuat;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Áp dụng cho tất cả' }),
    __metadata("design:type", Boolean)
], DieuKienApDungDeXuat.prototype, "tatCa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách vai trò áp dụng' }),
    __metadata("design:type", Array)
], DieuKienApDungDeXuat.prototype, "vaiTro", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách cấp trách nhiệm áp dụng' }),
    __metadata("design:type", Array)
], DieuKienApDungDeXuat.prototype, "capTrachNhiem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách ID nhân viên áp dụng' }),
    __metadata("design:type", Array)
], DieuKienApDungDeXuat.prototype, "nhanVienIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Danh sách ID phòng ban áp dụng' }),
    __metadata("design:type", Array)
], DieuKienApDungDeXuat.prototype, "phongBanIds", void 0);
class DieuKienJsonDeXuat {
}
exports.DieuKienJsonDeXuat = DieuKienJsonDeXuat;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện áp dụng' }),
    __metadata("design:type", DieuKienApDungDeXuat)
], DieuKienJsonDeXuat.prototype, "apDungCho", void 0);
class BacThangDeXuat {
}
exports.BacThangDeXuat = BacThangDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Từ giá trị' }),
    __metadata("design:type", Number)
], BacThangDeXuat.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đến giá trị' }),
    __metadata("design:type", Number)
], BacThangDeXuat.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền' }),
    __metadata("design:type", Number)
], BacThangDeXuat.prototype, "soTien", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền mỗi lần (cho sự kiện)' }),
    __metadata("design:type", Number)
], BacThangDeXuat.prototype, "soTienMoiLan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Hệ số' }),
    __metadata("design:type", Number)
], BacThangDeXuat.prototype, "heSo", void 0);
class CongThucCoDinhDeXuat {
}
exports.CongThucCoDinhDeXuat = CongThucCoDinhDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số tiền cố định' }),
    __metadata("design:type", Number)
], CongThucCoDinhDeXuat.prototype, "soTien", void 0);
class CongThucTheoHeSoDeXuat {
}
exports.CongThucTheoHeSoDeXuat = CongThucTheoHeSoDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nguồn base', example: 'LUONG_CO_BAN' }),
    __metadata("design:type", String)
], CongThucTheoHeSoDeXuat.prototype, "base", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hệ số' }),
    __metadata("design:type", Number)
], CongThucTheoHeSoDeXuat.prototype, "heSo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cộng thêm' }),
    __metadata("design:type", Number)
], CongThucTheoHeSoDeXuat.prototype, "congThem", void 0);
class CongThucBacThangDeXuat {
}
exports.CongThucBacThangDeXuat = CongThucBacThangDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trường dữ liệu để so sánh' }),
    __metadata("design:type", String)
], CongThucBacThangDeXuat.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách bậc thang' }),
    __metadata("design:type", Array)
], CongThucBacThangDeXuat.prototype, "bac", void 0);
class CongThucTheoSuKienDeXuat {
}
exports.CongThucTheoSuKienDeXuat = CongThucTheoSuKienDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã sự kiện' }),
    __metadata("design:type", String)
], CongThucTheoSuKienDeXuat.prototype, "maSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cách tính' }),
    __metadata("design:type", String)
], CongThucTheoSuKienDeXuat.prototype, "cachTinh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Số tiền mỗi lần' }),
    __metadata("design:type", Number)
], CongThucTheoSuKienDeXuat.prototype, "soTienMoiLan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bậc thang' }),
    __metadata("design:type", Array)
], CongThucTheoSuKienDeXuat.prototype, "bac", void 0);
class CongThucBieuThucDeXuat {
}
exports.CongThucBieuThucDeXuat = CongThucBieuThucDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Biểu thức công thức' }),
    __metadata("design:type", String)
], CongThucBieuThucDeXuat.prototype, "bieuThuc", void 0);
class RuleDeXuat {
}
exports.RuleDeXuat = RuleDeXuat;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên rule' }),
    __metadata("design:type", String)
], RuleDeXuat.prototype, "tenRule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mã khoản lương' }),
    __metadata("design:type", String)
], RuleDeXuat.prototype, "khoanLuongMa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID khoản lương (nếu đã map được)' }),
    __metadata("design:type", Number)
], RuleDeXuat.prototype, "khoanLuongId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại rule', enum: client_1.LoaiRule }),
    __metadata("design:type", String)
], RuleDeXuat.prototype, "loaiRule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thứ tự ưu tiên' }),
    __metadata("design:type", Number)
], RuleDeXuat.prototype, "thuTuUuTien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chế độ gộp', enum: client_1.CheDoGop }),
    __metadata("design:type", String)
], RuleDeXuat.prototype, "cheDoGop", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cho phép chỉnh tay' }),
    __metadata("design:type", Boolean)
], RuleDeXuat.prototype, "choPhepChinhTay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Điều kiện JSON' }),
    __metadata("design:type", DieuKienJsonDeXuat)
], RuleDeXuat.prototype, "dieuKienJson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Công thức JSON' }),
    __metadata("design:type", Object)
], RuleDeXuat.prototype, "congThucJson", void 0);
class GoiYRuleResponseDto {
}
exports.GoiYRuleResponseDto = GoiYRuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hợp lệ sơ bộ' }),
    __metadata("design:type", Boolean)
], GoiYRuleResponseDto.prototype, "hopLeSoBo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách câu hỏi cần làm rõ' }),
    __metadata("design:type", Array)
], GoiYRuleResponseDto.prototype, "canLamRo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Tóm tắt rule' }),
    __metadata("design:type", String)
], GoiYRuleResponseDto.prototype, "tomTatRule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Rule đề xuất' }),
    __metadata("design:type", RuleDeXuat)
], GoiYRuleResponseDto.prototype, "ruleDeXuat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Giải thích cách AI xử lý' }),
    __metadata("design:type", Array)
], GoiYRuleResponseDto.prototype, "giaiThich", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cảnh báo' }),
    __metadata("design:type", Array)
], GoiYRuleResponseDto.prototype, "canhBao", void 0);
class AiContextDto {
}
exports.AiContextDto = AiContextDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông tin phòng ban' }),
    __metadata("design:type", Object)
], AiContextDto.prototype, "phongBan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông tin quy chế' }),
    __metadata("design:type", Object)
], AiContextDto.prototype, "quyChe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh mục khoản lương' }),
    __metadata("design:type", Array)
], AiContextDto.prototype, "khoanLuongs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh mục sự kiện thưởng/phạt' }),
    __metadata("design:type", Array)
], AiContextDto.prototype, "danhMucSuKien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Danh sách cấp trách nhiệm có trong hệ thống' }),
    __metadata("design:type", Array)
], AiContextDto.prototype, "capTrachNhiems", void 0);
class ApDungRuleDeXuatDto {
}
exports.ApDungRuleDeXuatDto = ApDungRuleDeXuatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID audit log của đề xuất AI' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApDungRuleDeXuatDto.prototype, "auditId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Rule đề xuất (có thể đã được user chỉnh sửa)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", RuleDeXuat)
], ApDungRuleDeXuatDto.prototype, "ruleDeXuat", void 0);
class AiRuleAuditDto {
}
exports.AiRuleAuditDto = AiRuleAuditDto;
exports.TU_DIEN_ALIAS = {
    'trách nhiệm': { maKhoan: 'TRACH_NHIEM' },
    'tn': { maKhoan: 'TRACH_NHIEM' },
    'phụ cấp trách nhiệm': { maKhoan: 'TRACH_NHIEM' },
    'trách nhiệm kho': { maKhoan: 'TRACH_NHIEM_KHO' },
    'trách nhiệm kinh doanh': { maKhoan: 'TRACH_NHIEM_KD' },
    'lương cơ bản': { maKhoan: 'LUONG_CO_BAN' },
    'lcb': { maKhoan: 'LUONG_CO_BAN' },
    'thưởng': { maSuKien: 'THUONG_KHAC', loaiRule: 'THEO_SU_KIEN' },
    'bonus': { maSuKien: 'THUONG_KHAC', loaiRule: 'THEO_SU_KIEN' },
    'chuyên cần': { maSuKien: 'CHUYEN_CAN', loaiRule: 'THEO_SU_KIEN' },
    'hoàn thành xuất sắc': { maSuKien: 'HOAN_THANH_XUAT_SAC', loaiRule: 'THEO_SU_KIEN' },
    'sáng kiến': { maSuKien: 'SANG_KIEN', loaiRule: 'THEO_SU_KIEN' },
    'phạt': { maSuKien: 'PHAT_KHAC', loaiRule: 'THEO_SU_KIEN' },
    'trừ': { maSuKien: 'PHAT_KHAC', loaiRule: 'THEO_SU_KIEN' },
    'đi trễ': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' },
    'trễ giờ': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' },
    'muộn': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' },
    'về sớm': { maSuKien: 'VE_SOM', loaiRule: 'THEO_SU_KIEN' },
    'vắng mặt': { maSuKien: 'VANG_MAT_KHONG_PHEP', loaiRule: 'THEO_SU_KIEN' },
    'vắng mặt không phép': { maSuKien: 'VANG_MAT_KHONG_PHEP', loaiRule: 'THEO_SU_KIEN' },
    'sai quy trình': { maSuKien: 'SAI_QUY_TRINH', loaiRule: 'THEO_SU_KIEN' },
    'vi phạm quy trình': { maSuKien: 'SAI_QUY_TRINH', loaiRule: 'THEO_SU_KIEN' },
    'vi phạm nội quy': { maSuKien: 'VI_PHAM_NOI_QUY', loaiRule: 'THEO_SU_KIEN' },
};
exports.PATTERN_LOAI_RULE = {
    BAC_THANG: [
        /cấp\s*\d+/i,
        /bậc\s*\d+/i,
        /từ\s*\d+\s*(đến|tới|-)\s*\d+/i,
        /\d+\s*(-|đến|tới)\s*\d+\s*(lần|ngày)/i,
        /mức\s*\d+/i,
    ],
    CO_DINH: [
        /^\s*\d+\s*(k|tr|triệu|nghìn|đồng|vnđ)?\s*$/i,
        /cố định\s*\d+/i,
        /mỗi tháng\s*\d+/i,
    ],
    THEO_HE_SO: [
        /\*\s*\d+(\.\d+)?/,
        /hệ số/i,
        /nhân\s*\d+/i,
        /x\s*\d+(\.\d+)?/i,
    ],
    THEO_SU_KIEN: [
        /phạt/i,
        /thưởng/i,
        /đi trễ/i,
        /về sớm/i,
        /vắng mặt/i,
        /mỗi lần/i,
        /số lần/i,
    ],
    CONG_THUC: [
        /\+\s*\d+/,
        /-\s*\d+/,
        /\*\s*[a-zA-Z_]+/,
        /\/\s*\d+/,
        /=\s*.+\s*[\+\-\*\/]/,
    ],
};
//# sourceMappingURL=tro-ly-ai.dto.js.map