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
exports.AntiFraudController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const anti_fraud_service_1 = require("./anti-fraud.service");
const anti_fraud_dto_1 = require("./anti-fraud.dto");
let AntiFraudController = class AntiFraudController {
    constructor(service) {
        this.service = service;
    }
    async layDanhSachGeofence(query) {
        return this.service.layDanhSachGeofence(query);
    }
    async layGeofence(id) {
        return this.service.layGeofence(id);
    }
    async taoGeofence(dto, req) {
        return this.service.taoGeofence(dto, req.user?.id);
    }
    async capNhatGeofence(id, dto, req) {
        return this.service.capNhatGeofence(id, dto, req.user?.id);
    }
    async xoaGeofence(id) {
        return this.service.xoaGeofence(id);
    }
    async layGeofenceCuaToi(req) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            return [];
        }
        return this.service.layGeofenceChoNhanVien(nguoiDung.nhanVienId);
    }
    async gpsCheckin(dto, req, userAgent, ipAddress) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            throw new Error('Tài khoản chưa liên kết với nhân viên');
        }
        return this.service.gpsCheckin(nguoiDung.nhanVienId, dto, {
            userAgent,
            ipAddress,
        });
    }
    async layLichSuGPS(query) {
        return this.service.layLichSuGPS(query);
    }
    async layLichSuGPSCuaToi(req, query) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            return { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
        }
        return this.service.layLichSuGPS({
            ...query,
            nhanVienId: nguoiDung.nhanVienId,
        });
    }
    async thongKeGPS(tuNgay, denNgay, phongBanId) {
        return this.service.thongKeGPS(tuNgay, denNgay, phongBanId);
    }
    async layDanhSachThietBi(query) {
        return this.service.layDanhSachThietBi(query);
    }
    async layThietBiNhanVien(nhanVienId) {
        return this.service.layThietBiNhanVien(nhanVienId);
    }
    async layThietBiCuaToi(req) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            return null;
        }
        return this.service.layThietBiNhanVien(nguoiDung.nhanVienId);
    }
    async kiemTraDevice(deviceId, req) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            return { isValid: true, isBound: false, message: 'Tài khoản không liên kết nhân viên' };
        }
        return this.service.kiemTraDevice(nguoiDung.nhanVienId, deviceId);
    }
    async bindDevice(dto, req, userAgent, ipAddress) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        if (!nguoiDung?.nhanVienId) {
            throw new Error('Tài khoản chưa liên kết với nhân viên');
        }
        return this.service.bindDevice(nguoiDung.nhanVienId, dto, { userAgent, ipAddress });
    }
    async resetDevice(dto, req, ipAddress, userAgent) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        const nguoiThucHienId = nguoiDung?.nhanVienId || req.user.id;
        return this.service.resetDevice(dto, nguoiThucHienId, { ipAddress, userAgent });
    }
    async blockDevice(nhanVienId, lyDo, req, ipAddress, userAgent) {
        const nguoiDung = await this.service['prisma'].nguoiDung.findUnique({
            where: { id: req.user.id },
            select: { nhanVienId: true },
        });
        return this.service.blockDevice(nhanVienId, lyDo, nguoiDung?.nhanVienId || req.user.id, {
            ipAddress,
            userAgent,
        });
    }
    async layLichSuThietBi(query) {
        return this.service.layLichSuThietBi(query);
    }
    async layLichSuThietBiNhanVien(nhanVienId, query) {
        return this.service.layLichSuThietBi({ ...query, nhanVienId });
    }
};
exports.AntiFraudController = AntiFraudController;
__decorate([
    (0, common_1.Get)('geofence'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách geofence' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.GeofenceQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layDanhSachGeofence", null);
__decorate([
    (0, common_1.Get)('geofence/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết geofence' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layGeofence", null);
__decorate([
    (0, common_1.Post)('geofence'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo geofence mới' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.TaoGeofenceDto, Object]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "taoGeofence", null);
__decorate([
    (0, common_1.Put)('geofence/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật geofence' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, anti_fraud_dto_1.CapNhatGeofenceDto, Object]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "capNhatGeofence", null);
__decorate([
    (0, common_1.Delete)('geofence/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa geofence' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "xoaGeofence", null);
__decorate([
    (0, common_1.Get)('my-geofence'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy geofence của tôi' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layGeofenceCuaToi", null);
__decorate([
    (0, common_1.Post)('gps-checkin'),
    (0, swagger_1.ApiOperation)({ summary: 'GPS Check-in/Check-out' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __param(3, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.GPSCheckinDto, Object, String, String]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "gpsCheckin", null);
__decorate([
    (0, common_1.Get)('gps-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử GPS logs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.GPSLogQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layLichSuGPS", null);
__decorate([
    (0, common_1.Get)('my-gps-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử GPS của tôi' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, anti_fraud_dto_1.GPSLogQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layLichSuGPSCuaToi", null);
__decorate([
    (0, common_1.Get)('thong-ke'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê GPS' }),
    __param(0, (0, common_1.Query)('tuNgay')),
    __param(1, (0, common_1.Query)('denNgay')),
    __param(2, (0, common_1.Query)('phongBanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "thongKeGPS", null);
__decorate([
    (0, common_1.Get)('devices'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thiết bị đã đăng ký' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.DeviceQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layDanhSachThietBi", null);
__decorate([
    (0, common_1.Get)('devices/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thiết bị của nhân viên' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layThietBiNhanVien", null);
__decorate([
    (0, common_1.Get)('my-device'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thiết bị của tôi' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layThietBiCuaToi", null);
__decorate([
    (0, common_1.Post)('check-device'),
    (0, swagger_1.ApiOperation)({ summary: 'Kiểm tra thiết bị có hợp lệ không' }),
    __param(0, (0, common_1.Body)('deviceId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "kiemTraDevice", null);
__decorate([
    (0, common_1.Post)('bind-device'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng ký thiết bị' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __param(3, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.BindDeviceDto, Object, String, String]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "bindDevice", null);
__decorate([
    (0, common_1.Post)('reset-device'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset thiết bị cho nhân viên' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.ResetDeviceDto, Object, String, String]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "resetDevice", null);
__decorate([
    (0, common_1.Post)('block-device/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Khóa thiết bị' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('lyDo')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Ip)()),
    __param(4, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, String, String]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "blockDevice", null);
__decorate([
    (0, common_1.Get)('device-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử thiết bị' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anti_fraud_dto_1.LichSuThietBiQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layLichSuThietBi", null);
__decorate([
    (0, common_1.Get)('device-history/:nhanVienId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử thiết bị của nhân viên' }),
    __param(0, (0, common_1.Param)('nhanVienId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, anti_fraud_dto_1.LichSuThietBiQueryDto]),
    __metadata("design:returntype", Promise)
], AntiFraudController.prototype, "layLichSuThietBiNhanVien", null);
exports.AntiFraudController = AntiFraudController = __decorate([
    (0, swagger_1.ApiTags)('Anti-fraud (GPS & Geofence)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('anti-fraud'),
    __metadata("design:paramtypes", [anti_fraud_service_1.AntiFraudService])
], AntiFraudController);
//# sourceMappingURL=anti-fraud.controller.js.map