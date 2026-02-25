import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BangLuongValidationService {
  assertBangLuongTonTai<T>(bangLuong: T | null | undefined, id: number): asserts bangLuong is T {
    if (!bangLuong) {
      throw new NotFoundException(`Không tìm thấy bảng lương với ID: ${id}`);
    }
  }

  assertTrangThaiNhap(
    bangLuong: { trangThai: string },
    message = 'Không thể sửa bảng lương đã chốt hoặc khóa',
  ): void {
    if (bangLuong.trangThai !== 'NHAP') {
      throw new BadRequestException(message);
    }
  }

  assertTrangThaiDaChot(
    bangLuong: { trangThai: string },
    message = 'Phải chốt bảng lương trước khi khóa',
  ): void {
    if (bangLuong.trangThai !== 'DA_CHOT') {
      throw new BadRequestException(message);
    }
  }

  assertLyDoMoKhoa(lyDo: string): void {
    if (!lyDo || lyDo.trim().length < 10) {
      throw new BadRequestException('Lý do mở khóa phải có ít nhất 10 ký tự');
    }
  }
}
