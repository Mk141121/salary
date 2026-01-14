export interface ThongTinNguoiDung {
    id: number;
    tenDangNhap: string;
    hoTen: string;
    email: string;
    vaiTros: string[];
    quyens: string[];
}
export declare const NguoiDungHienTai: (...dataOrPipes: (keyof ThongTinNguoiDung | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
