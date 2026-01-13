export declare class PaginationDto {
    trang?: number;
    soLuong?: number;
    sapXepTheo?: string;
    huongSapXep?: 'asc' | 'desc';
}
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        tongSo: number;
        trang: number;
        soLuong: number;
        tongTrang: number;
        coTrangTruoc: boolean;
        coTrangSau: boolean;
    };
}
export declare function tinhPagination(trang?: number, soLuong?: number): {
    skip: number;
    take: number;
};
export declare function taoPaginatedResult<T>(data: T[], tongSo: number, trang?: number, soLuong?: number): PaginatedResult<T>;
