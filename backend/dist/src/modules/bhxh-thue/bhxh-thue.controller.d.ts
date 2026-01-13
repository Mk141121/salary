import { BHXHThueService } from './bhxh-thue.service';
import { ThemNguoiPhuThuocDto, CapNhatNguoiPhuThuocDto, LuuCauHinhBHXHDto } from './dto/bhxh-thue.dto';
export declare class BHXHThueController {
    private readonly bhxhThueService;
    constructor(bhxhThueService: BHXHThueService);
    layCauHinhBHXH(nam: number): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tyLeBHXH_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHXH_DN: import("@prisma/client/runtime/library").Decimal;
        tyLeBHYT_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHYT_DN: import("@prisma/client/runtime/library").Decimal;
        tyLeBHTN_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHTN_DN: import("@prisma/client/runtime/library").Decimal;
        luongCoBanToiThieu: import("@prisma/client/runtime/library").Decimal;
        tranDongBHXH: import("@prisma/client/runtime/library").Decimal;
        luongCoSo: import("@prisma/client/runtime/library").Decimal;
    }>;
    luuCauHinhBHXH(dto: LuuCauHinhBHXHDto): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        tyLeBHXH_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHXH_DN: import("@prisma/client/runtime/library").Decimal;
        tyLeBHYT_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHYT_DN: import("@prisma/client/runtime/library").Decimal;
        tyLeBHTN_NV: import("@prisma/client/runtime/library").Decimal;
        tyLeBHTN_DN: import("@prisma/client/runtime/library").Decimal;
        luongCoBanToiThieu: import("@prisma/client/runtime/library").Decimal;
        tranDongBHXH: import("@prisma/client/runtime/library").Decimal;
        luongCoSo: import("@prisma/client/runtime/library").Decimal;
    }>;
    khoiTaoCauHinhMacDinh(): Promise<{
        message: string;
    }>;
    layCauHinhThue(nam: number): Promise<{
        bacThue: {
            id: number;
            ngayTao: Date;
            cauHinhThueId: number;
            bac: number;
            tuMuc: import("@prisma/client/runtime/library").Decimal;
            denMuc: import("@prisma/client/runtime/library").Decimal | null;
            thueSuat: import("@prisma/client/runtime/library").Decimal;
            soTienTruNhanh: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        nam: number;
        giamTruBanThan: import("@prisma/client/runtime/library").Decimal;
        giamTruPhuThuoc: import("@prisma/client/runtime/library").Decimal;
    }>;
    layNguoiPhuThuoc(nhanVienId: number): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }[]>;
    themNguoiPhuThuoc(dto: ThemNguoiPhuThuocDto): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }>;
    capNhatNguoiPhuThuoc(id: number, dto: CapNhatNguoiPhuThuocDto): Promise<{
        id: number;
        trangThai: boolean;
        ngayTao: Date;
        ngayCapNhat: Date;
        hoTen: string;
        nhanVienId: number;
        tuNgay: Date;
        denNgay: Date | null;
        ghiChu: string | null;
        ngaySinh: Date | null;
        quanHe: string;
        maSoThue: string | null;
        soCCCD: string | null;
    }>;
    tinhChoToBoNhanVien(bangLuongId: number): Promise<{
        nhanVienId: number;
        hoTen: string;
        bhxh: import("./bhxh-thue.service").KetQuaTinhBHXH;
        thue: import("./bhxh-thue.service").KetQuaTinhThue;
    }[]>;
    layKetQuaTinh(bangLuongId: number): Promise<{
        bhxh: {
            id: number;
            ngayTao: Date;
            nhanVienId: number;
            bangLuongId: number;
            luongDongBHXH: import("@prisma/client/runtime/library").Decimal;
            bhxhNV: import("@prisma/client/runtime/library").Decimal;
            bhytNV: import("@prisma/client/runtime/library").Decimal;
            bhtnNV: import("@prisma/client/runtime/library").Decimal;
            tongBHNV: import("@prisma/client/runtime/library").Decimal;
            bhxhDN: import("@prisma/client/runtime/library").Decimal;
            bhytDN: import("@prisma/client/runtime/library").Decimal;
            bhtnDN: import("@prisma/client/runtime/library").Decimal;
            tongBHDN: import("@prisma/client/runtime/library").Decimal;
        }[];
        thue: {
            id: number;
            ngayTao: Date;
            giamTruBanThan: import("@prisma/client/runtime/library").Decimal;
            giamTruPhuThuoc: import("@prisma/client/runtime/library").Decimal;
            nhanVienId: number;
            bangLuongId: number;
            thuNhapChiuThue: import("@prisma/client/runtime/library").Decimal;
            soPhuThuoc: number;
            giamTruBHXH: import("@prisma/client/runtime/library").Decimal;
            thuNhapTinhThue: import("@prisma/client/runtime/library").Decimal;
            thueTNCN: import("@prisma/client/runtime/library").Decimal;
            bacThueApDung: number | null;
        }[];
    }>;
}
