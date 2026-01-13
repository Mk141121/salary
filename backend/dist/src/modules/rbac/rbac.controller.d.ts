import { RBACService } from './rbac.service';
import { TaoNguoiDungDto, CapNhatNguoiDungDto, DoiMatKhauDto, DangNhapDto, TaoVaiTroDto, CapNhatVaiTroDto, GanVaiTroDto, TaoQuyenDto, GanQuyenChoVaiTroDto, TimKiemAuditLogDto } from './dto/rbac.dto';
export declare class RBACController {
    private readonly rbacService;
    constructor(rbacService: RBACService);
    dangNhap(dto: DangNhapDto, ip: string, userAgent: string): Promise<{
        token: string;
        nguoiDung: {
            id: number;
            tenDangNhap: string;
            hoTen: string;
            email: string;
        };
        vaiTros: string[];
        quyens: string[];
        hetHan: Date;
    }>;
    dangXuat(auth: string): Promise<{
        message: string;
    }>;
    kiemTraToken(auth: string): Promise<{
        nguoiDung: {
            id: number;
            tenDangNhap: string;
            hoTen: string;
            email: string;
        };
        vaiTros: string[];
        quyens: string[];
    }>;
    layDanhSachNguoiDung(): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
        ngayTao: Date;
        email: string;
        hoTen: string;
        nhanVienId: number | null;
        vaiTros: ({
            vaiTro: {
                id: number;
                moTa: string | null;
                trangThai: boolean;
                ngayTao: Date;
                maVaiTro: string;
                tenVaiTro: string;
                capDo: number;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        tenDangNhap: string;
        lanDangNhapCuoi: Date | null;
    }[]>;
    layNguoiDungTheoId(id: number): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
        ngayTao: Date;
        email: string;
        hoTen: string;
        nhanVienId: number | null;
        vaiTros: ({
            vaiTro: {
                quyens: ({
                    quyen: {
                        id: number;
                        moTa: string | null;
                        ngayTao: Date;
                        maQuyen: string;
                        tenQuyen: string;
                        nhomQuyen: string;
                    };
                } & {
                    id: number;
                    ngayTao: Date;
                    vaiTroId: number;
                    quyenId: number;
                })[];
            } & {
                id: number;
                moTa: string | null;
                trangThai: boolean;
                ngayTao: Date;
                maVaiTro: string;
                tenVaiTro: string;
                capDo: number;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        tenDangNhap: string;
        lanDangNhapCuoi: Date | null;
    }>;
    taoNguoiDung(dto: TaoNguoiDungDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
        ngayTao: Date;
        email: string;
        hoTen: string;
        nhanVienId: number | null;
        vaiTros: ({
            vaiTro: {
                quyens: ({
                    quyen: {
                        id: number;
                        moTa: string | null;
                        ngayTao: Date;
                        maQuyen: string;
                        tenQuyen: string;
                        nhomQuyen: string;
                    };
                } & {
                    id: number;
                    ngayTao: Date;
                    vaiTroId: number;
                    quyenId: number;
                })[];
            } & {
                id: number;
                moTa: string | null;
                trangThai: boolean;
                ngayTao: Date;
                maVaiTro: string;
                tenVaiTro: string;
                capDo: number;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        tenDangNhap: string;
        lanDangNhapCuoi: Date | null;
    }>;
    capNhatNguoiDung(id: number, dto: CapNhatNguoiDungDto): Promise<{
        id: number;
        trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
        email: string;
        hoTen: string;
        tenDangNhap: string;
    }>;
    doiMatKhau(id: number, dto: DoiMatKhauDto): Promise<{
        message: string;
    }>;
    layDanhSachVaiTro(): Promise<({
        _count: {
            nguoiDungs: number;
        };
        quyens: ({
            quyen: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                maQuyen: string;
                tenQuyen: string;
                nhomQuyen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            vaiTroId: number;
            quyenId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    })[]>;
    layVaiTroTheoId(id: number): Promise<{
        nguoiDungs: ({
            nguoiDung: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
                ngayTao: Date;
                ngayCapNhat: Date;
                email: string;
                hoTen: string;
                nhanVienId: number | null;
                tenDangNhap: string;
                matKhau: string;
                lanDangNhapCuoi: Date | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        quyens: ({
            quyen: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                maQuyen: string;
                tenQuyen: string;
                nhomQuyen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            vaiTroId: number;
            quyenId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    }>;
    taoVaiTro(dto: TaoVaiTroDto): Promise<{
        nguoiDungs: ({
            nguoiDung: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
                ngayTao: Date;
                ngayCapNhat: Date;
                email: string;
                hoTen: string;
                nhanVienId: number | null;
                tenDangNhap: string;
                matKhau: string;
                lanDangNhapCuoi: Date | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        quyens: ({
            quyen: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                maQuyen: string;
                tenQuyen: string;
                nhomQuyen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            vaiTroId: number;
            quyenId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    }>;
    capNhatVaiTro(id: number, dto: CapNhatVaiTroDto): Promise<{
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    }>;
    ganVaiTroChoNguoiDung(dto: GanVaiTroDto): Promise<{
        vaiTro: {
            id: number;
            moTa: string | null;
            trangThai: boolean;
            ngayTao: Date;
            maVaiTro: string;
            tenVaiTro: string;
            capDo: number;
        };
        nguoiDung: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
            ngayTao: Date;
            ngayCapNhat: Date;
            email: string;
            hoTen: string;
            nhanVienId: number | null;
            tenDangNhap: string;
            matKhau: string;
            lanDangNhapCuoi: Date | null;
        };
    } & {
        id: number;
        ngayTao: Date;
        phongBanId: number | null;
        tuNgay: Date;
        denNgay: Date | null;
        vaiTroId: number;
        nguoiDungId: number;
    }>;
    goVaiTroKhoiNguoiDung(dto: GanVaiTroDto): Promise<{
        message: string;
    }>;
    layDanhSachQuyen(): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        maQuyen: string;
        tenQuyen: string;
        nhomQuyen: string;
    }[]>;
    layQuyenTheoNhom(): Promise<Record<string, any[]>>;
    taoQuyen(dto: TaoQuyenDto): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        maQuyen: string;
        tenQuyen: string;
        nhomQuyen: string;
    }>;
    ganQuyenChoVaiTro(dto: GanQuyenChoVaiTroDto): Promise<{
        nguoiDungs: ({
            nguoiDung: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
                ngayTao: Date;
                ngayCapNhat: Date;
                email: string;
                hoTen: string;
                nhanVienId: number | null;
                tenDangNhap: string;
                matKhau: string;
                lanDangNhapCuoi: Date | null;
            };
        } & {
            id: number;
            ngayTao: Date;
            phongBanId: number | null;
            tuNgay: Date;
            denNgay: Date | null;
            vaiTroId: number;
            nguoiDungId: number;
        })[];
        quyens: ({
            quyen: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                maQuyen: string;
                tenQuyen: string;
                nhomQuyen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            vaiTroId: number;
            quyenId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    }>;
    kiemTraQuyen(nguoiDungId: number, maQuyen: string): Promise<{
        coQuyen: boolean;
    }>;
    timKiemAuditLog(dto: TimKiemAuditLogDto): Promise<{
        items: ({
            nguoiDung: {
                hoTen: string;
            } | null;
        } & {
            id: number;
            moTa: string | null;
            ngayTao: Date;
            tenDangNhap: string;
            nguoiDungId: number | null;
            hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
            bangDuLieu: string;
            banGhiId: string | null;
            duLieuCu: string | null;
            duLieuMoi: string | null;
            diaChiIP: string | null;
            userAgent: string | null;
        })[];
        total: number;
    }>;
    layAuditLogTheoNguoiDung(nguoiDungId: number, limit?: string): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
        diaChiIP: string | null;
        userAgent: string | null;
    }[]>;
    layAuditLogTheoBanGhi(bangDuLieu: string, banGhiId: string): Promise<({
        nguoiDung: {
            hoTen: string;
        } | null;
    } & {
        id: number;
        moTa: string | null;
        ngayTao: Date;
        tenDangNhap: string;
        nguoiDungId: number | null;
        hanhDong: import(".prisma/client").$Enums.HanhDongAudit;
        bangDuLieu: string;
        banGhiId: string | null;
        duLieuCu: string | null;
        duLieuMoi: string | null;
        diaChiIP: string | null;
        userAgent: string | null;
    })[]>;
    khoiTaoQuyenMacDinh(): Promise<{
        id: number;
        moTa: string | null;
        ngayTao: Date;
        maQuyen: string;
        tenQuyen: string;
        nhomQuyen: string;
    }[]>;
    khoiTaoVaiTroMacDinh(): Promise<({
        _count: {
            nguoiDungs: number;
        };
        quyens: ({
            quyen: {
                id: number;
                moTa: string | null;
                ngayTao: Date;
                maQuyen: string;
                tenQuyen: string;
                nhomQuyen: string;
            };
        } & {
            id: number;
            ngayTao: Date;
            vaiTroId: number;
            quyenId: number;
        })[];
    } & {
        id: number;
        moTa: string | null;
        trangThai: boolean;
        ngayTao: Date;
        maVaiTro: string;
        tenVaiTro: string;
        capDo: number;
    })[]>;
    khoiTaoAdminMacDinh(): Promise<{
        message: string;
        nguoiDung: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
            ngayTao: Date;
            ngayCapNhat: Date;
            email: string;
            hoTen: string;
            nhanVienId: number | null;
            tenDangNhap: string;
            matKhau: string;
            lanDangNhapCuoi: Date | null;
        };
    } | {
        message: string;
        nguoiDung: {
            id: number;
            trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
            ngayTao: Date;
            email: string;
            hoTen: string;
            nhanVienId: number | null;
            vaiTros: ({
                vaiTro: {
                    quyens: ({
                        quyen: {
                            id: number;
                            moTa: string | null;
                            ngayTao: Date;
                            maQuyen: string;
                            tenQuyen: string;
                            nhomQuyen: string;
                        };
                    } & {
                        id: number;
                        ngayTao: Date;
                        vaiTroId: number;
                        quyenId: number;
                    })[];
                } & {
                    id: number;
                    moTa: string | null;
                    trangThai: boolean;
                    ngayTao: Date;
                    maVaiTro: string;
                    tenVaiTro: string;
                    capDo: number;
                };
            } & {
                id: number;
                ngayTao: Date;
                phongBanId: number | null;
                tuNgay: Date;
                denNgay: Date | null;
                vaiTroId: number;
                nguoiDungId: number;
            })[];
            tenDangNhap: string;
            lanDangNhapCuoi: Date | null;
        };
    }>;
    khoiTaoTatCa(): Promise<{
        message: string;
        admin: {
            message: string;
            nguoiDung: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
                ngayTao: Date;
                ngayCapNhat: Date;
                email: string;
                hoTen: string;
                nhanVienId: number | null;
                tenDangNhap: string;
                matKhau: string;
                lanDangNhapCuoi: Date | null;
            };
        } | {
            message: string;
            nguoiDung: {
                id: number;
                trangThai: import(".prisma/client").$Enums.TrangThaiNguoiDung;
                ngayTao: Date;
                email: string;
                hoTen: string;
                nhanVienId: number | null;
                vaiTros: ({
                    vaiTro: {
                        quyens: ({
                            quyen: {
                                id: number;
                                moTa: string | null;
                                ngayTao: Date;
                                maQuyen: string;
                                tenQuyen: string;
                                nhomQuyen: string;
                            };
                        } & {
                            id: number;
                            ngayTao: Date;
                            vaiTroId: number;
                            quyenId: number;
                        })[];
                    } & {
                        id: number;
                        moTa: string | null;
                        trangThai: boolean;
                        ngayTao: Date;
                        maVaiTro: string;
                        tenVaiTro: string;
                        capDo: number;
                    };
                } & {
                    id: number;
                    ngayTao: Date;
                    phongBanId: number | null;
                    tuNgay: Date;
                    denNgay: Date | null;
                    vaiTroId: number;
                    nguoiDungId: number;
                })[];
                tenDangNhap: string;
                lanDangNhapCuoi: Date | null;
            };
        };
    }>;
}
