import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaoNhomDto, CapNhatNhomDto, ThemVaoNhomDto, GoKhoiNhomDto } from './nhom-nhan-vien.dto';

@Injectable()
export class NhomNhanVienService {
  constructor(private prisma: PrismaService) {}

  // =============== QUẢN LÝ NHÓM ===============

  /**
   * Lấy danh sách nhóm
   */
  async layDanhSachNhom() {
    return this.prisma.nhomNhanVien.findMany({
      include: {
        _count: {
          select: { thanhViens: true },
        },
      },
      orderBy: { maNhom: 'asc' },
    });
  }

  /**
   * Lấy chi tiết nhóm
   */
  async layNhomTheoId(id: number) {
    const nhom = await this.prisma.nhomNhanVien.findUnique({
      where: { id },
      include: {
        thanhViens: {
          include: {
            nhanVien: {
              select: { maNhanVien: true, hoTen: true, trangThai: true },
            },
          },
          orderBy: { ngayTao: 'desc' },
        },
      },
    });
    if (!nhom) {
      throw new NotFoundException('Không tìm thấy nhóm');
    }
    return nhom;
  }

  /**
   * Tạo nhóm mới
   */
  async taoNhom(dto: TaoNhomDto) {
    // Kiểm tra mã nhóm trùng
    const existing = await this.prisma.nhomNhanVien.findUnique({
      where: { maNhom: dto.maNhom },
    });
    if (existing) {
      throw new ConflictException(`Mã nhóm "${dto.maNhom}" đã tồn tại`);
    }

    return this.prisma.nhomNhanVien.create({
      data: {
        maNhom: dto.maNhom,
        tenNhom: dto.tenNhom,
        moTa: dto.moTa,
        mauSac: dto.mauSac,
        trangThai: dto.trangThai ?? true,
      },
    });
  }

  /**
   * Cập nhật nhóm
   */
  async capNhatNhom(id: number, dto: CapNhatNhomDto) {
    const nhom = await this.prisma.nhomNhanVien.findUnique({
      where: { id },
    });
    if (!nhom) {
      throw new NotFoundException('Không tìm thấy nhóm');
    }

    // Kiểm tra mã nhóm trùng
    if (dto.maNhom && dto.maNhom !== nhom.maNhom) {
      const existing = await this.prisma.nhomNhanVien.findUnique({
        where: { maNhom: dto.maNhom },
      });
      if (existing) {
        throw new ConflictException(`Mã nhóm "${dto.maNhom}" đã tồn tại`);
      }
    }

    return this.prisma.nhomNhanVien.update({
      where: { id },
      data: {
        maNhom: dto.maNhom,
        tenNhom: dto.tenNhom,
        moTa: dto.moTa,
        mauSac: dto.mauSac,
        trangThai: dto.trangThai,
      },
    });
  }

  /**
   * Xóa nhóm
   */
  async xoaNhom(id: number) {
    const nhom = await this.prisma.nhomNhanVien.findUnique({
      where: { id },
      include: { _count: { select: { thanhViens: true } } },
    });
    if (!nhom) {
      throw new NotFoundException('Không tìm thấy nhóm');
    }
    if (nhom._count.thanhViens > 0) {
      throw new BadRequestException(
        `Nhóm đang có ${nhom._count.thanhViens} thành viên. Hãy gỡ hết thành viên trước khi xóa.`,
      );
    }
    return this.prisma.nhomNhanVien.delete({
      where: { id },
    });
  }

  // =============== THÀNH VIÊN NHÓM ===============

  /**
   * Lấy danh sách nhóm của nhân viên
   */
  async layNhomCuaNhanVien(nhanVienId: number) {
    return this.prisma.nhanVienThuocNhom.findMany({
      where: { nhanVienId },
      include: {
        nhom: true,
      },
      orderBy: { ngayTao: 'desc' },
    });
  }

  /**
   * Lấy nhóm của nhân viên hiệu lực tại thời điểm
   * Dùng cho Rule Engine
   */
  async layNhomHieuLuc(nhanVienId: number, ngay: Date) {
    return this.prisma.nhanVienThuocNhom.findMany({
      where: {
        nhanVienId,
        nhom: { trangThai: true },
        OR: [
          { tuNgay: null },
          { tuNgay: { lte: ngay } },
        ],
        AND: [
          {
            OR: [{ denNgay: null }, { denNgay: { gte: ngay } }],
          },
        ],
      },
      include: {
        nhom: true,
      },
    });
  }

  /**
   * Thêm nhân viên vào nhóm
   */
  async themVaoNhom(nhanVienId: number, dto: ThemVaoNhomDto) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({
      where: { id: nhanVienId },
    });
    if (!nhanVien) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    // Kiểm tra nhóm tồn tại
    const nhom = await this.prisma.nhomNhanVien.findUnique({
      where: { id: dto.nhomId },
    });
    if (!nhom) {
      throw new NotFoundException('Không tìm thấy nhóm');
    }

    // Kiểm tra đã thuộc nhóm chưa (overlap)
    const tuNgay = dto.tuNgay ? new Date(dto.tuNgay) : null;
    const denNgay = dto.denNgay ? new Date(dto.denNgay) : null;

    const existing = await this.prisma.nhanVienThuocNhom.findFirst({
      where: {
        nhanVienId,
        nhomId: dto.nhomId,
        // Kiểm tra overlap đơn giản
        OR: [
          { tuNgay: null, denNgay: null },
          {
            AND: [
              { OR: [{ tuNgay: null }, { tuNgay: { lte: denNgay || new Date('9999-12-31') } }] },
              { OR: [{ denNgay: null }, { denNgay: { gte: tuNgay || new Date('1900-01-01') } }] },
            ],
          },
        ],
      },
    });
    if (existing) {
      throw new ConflictException('Nhân viên đã thuộc nhóm này trong khoảng thời gian này');
    }

    return this.prisma.nhanVienThuocNhom.create({
      data: {
        nhanVienId,
        nhomId: dto.nhomId,
        tuNgay,
        denNgay,
      },
      include: {
        nhom: true,
      },
    });
  }

  /**
   * Gỡ nhân viên khỏi nhóm
   */
  async goKhoiNhom(nhanVienId: number, dto: GoKhoiNhomDto) {
    const membership = await this.prisma.nhanVienThuocNhom.findFirst({
      where: {
        nhanVienId,
        nhomId: dto.nhomId,
        denNgay: null, // Đang active
      },
    });
    if (!membership) {
      throw new NotFoundException('Nhân viên không thuộc nhóm này hoặc đã kết thúc');
    }

    // Nếu có ngày kết thúc, update denNgay thay vì xóa
    if (dto.denNgay) {
      return this.prisma.nhanVienThuocNhom.update({
        where: { id: membership.id },
        data: { denNgay: new Date(dto.denNgay) },
        include: { nhom: true },
      });
    }

    // Xóa hoàn toàn
    return this.prisma.nhanVienThuocNhom.delete({
      where: { id: membership.id },
    });
  }
}
