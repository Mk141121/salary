export declare class TaoPhongBanDto {
    maPhongBan: string;
    tenPhongBan: string;
    moTa?: string;
    gioVaoChuan?: string;
    gioRaChuan?: string;
    phutChoPhepTre?: number;
}
declare const CapNhatPhongBanDto_base: import("@nestjs/common").Type<Partial<TaoPhongBanDto>>;
export declare class CapNhatPhongBanDto extends CapNhatPhongBanDto_base {
    trangThai?: boolean;
}
export {};
