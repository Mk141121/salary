// Service Phòng Ban - Hỗ trợ cây phân cấp + Đơn vị con + Lịch sử nhân viên
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { 
  TaoPhongBanDto, 
  CapNhatPhongBanDto, 
  DoiPhongBanChaDto,
  TaoDonViConDto,
  CapNhatDonViConDto,
  ChuyenPhongBanDto,
  TaoPhanQuyenPhongBanDto
} from './dto/phong-ban.dto';

@Injectable()
export class PhongBanService {
  constructor(private prisma: PrismaService) {}

  // ===== PHÒNG BAN CƠ BẢN =====

  // Lấy tất cả phòng ban (danh sách phẳng)
  async layTatCa() {
    return this.prisma.phongBan.findMany({
      where: { trangThai: 'HOAT_DONG' },
      include: {
        phongBanCha: { select: { id: true, tenPhongBan: true } },
        _count: {
          select: { nhanViens: true, phongBanCons: true, donViCons: true },
        },
      },
      orderBy: [{ capDo: 'asc' }, { tenPhongBan: 'asc' }],
    });
  }

  // Lấy cây phòng ban (hierarchical)
  async layCayPhongBan() {
    const tatCaPhongBan = await this.prisma.phongBan.findMany({
      where: { trangThai: 'HOAT_DONG' },
      include: {
        _count: {
          select: { nhanViens: true, donViCons: true },
        },
      },
      orderBy: [{ capDo: 'asc' }, { tenPhongBan: 'asc' }],
    });

    // Build tree structure
    const map = new Map();
    const roots: any[] = [];

    tatCaPhongBan.forEach(pb => {
      map.set(pb.id, { ...pb, children: [] });
    });

    tatCaPhongBan.forEach(pb => {
      const node = map.get(pb.id);
      if (pb.phongBanChaId && map.has(pb.phongBanChaId)) {
        map.get(pb.phongBanChaId).children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  // Lấy phòng ban theo ID
  async layTheoId(id: number) {
    const phongBan = await this.prisma.phongBan.findUnique({
      where: { id },
      include: {
        phongBanCha: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
        phongBanCons: { 
          where: { trangThai: 'HOAT_DONG' },
          select: { id: true, maPhongBan: true, tenPhongBan: true, capDo: true }
        },
        donViCons: { where: { trangThai: 'HOAT_DONG' } },
        nhanViens: {
          where: { trangThai: 'DANG_LAM' },
          orderBy: { hoTen: 'asc' },
          select: { id: true, maNhanVien: true, hoTen: true, chucVu: true }
        },
        _count: {
          select: { nhanViens: true, bangLuongs: true, donViCons: true },
        },
      },
    });

    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
    }

    return phongBan;
  }

  // Tạo phòng ban mới
  async taoMoi(dto: TaoPhongBanDto, taoBoi?: number) {
    // Tính cấp độ dựa trên phòng ban cha
    let capDo = 1;
    if (dto.phongBanChaId) {
      const phongBanCha = await this.prisma.phongBan.findUnique({
        where: { id: dto.phongBanChaId },
      });
      if (!phongBanCha) {
        throw new BadRequestException(`Không tìm thấy phòng ban cha với ID: ${dto.phongBanChaId}`);
      }
      capDo = phongBanCha.capDo + 1;
    }

    return this.prisma.phongBan.create({
      data: {
        ...dto,
        capDo,
        taoBoi,
      },
    });
  }

  // Cập nhật phòng ban
  async capNhat(id: number, dto: CapNhatPhongBanDto, capNhatBoi?: number) {
    await this.layTheoId(id);

    return this.prisma.phongBan.update({
      where: { id },
      data: {
        ...dto,
        capNhatBoi,
      },
    });
  }

  // Đổi phòng ban cha (di chuyển trong cây)
  async doiPhongBanCha(id: number, dto: DoiPhongBanChaDto, capNhatBoi?: number) {
    const phongBan = await this.layTheoId(id);

    // Kiểm tra không tạo vòng lặp (cycle)
    if (dto.phongBanChaId) {
      const seCycyle = await this.kiemTraVongLap(id, dto.phongBanChaId);
      if (seCycyle) {
        throw new BadRequestException('Không thể di chuyển: sẽ tạo vòng lặp trong cây phòng ban');
      }
    }

    // Tính cấp độ mới
    let capDoMoi = 1;
    if (dto.phongBanChaId) {
      const phongBanCha = await this.prisma.phongBan.findUnique({
        where: { id: dto.phongBanChaId },
      });
      if (!phongBanCha) {
        throw new BadRequestException(`Không tìm thấy phòng ban cha mới với ID: ${dto.phongBanChaId}`);
      }
      capDoMoi = phongBanCha.capDo + 1;
    }

    // Cập nhật phòng ban và các phòng ban con (đệ quy)
    const chenhLechCapDo = capDoMoi - phongBan.capDo;
    await this.capNhatCapDoDeQuy(id, chenhLechCapDo);

    return this.prisma.phongBan.update({
      where: { id },
      data: {
        phongBanChaId: dto.phongBanChaId,
        capDo: capDoMoi,
        capNhatBoi,
      },
    });
  }

  // Kiểm tra vòng lặp trong cây
  private async kiemTraVongLap(phongBanId: number, phongBanChaIdMoi: number): Promise<boolean> {
    if (phongBanId === phongBanChaIdMoi) return true;

    let currentId: number | null = phongBanChaIdMoi;
    const visited = new Set<number>();

    while (currentId) {
      if (currentId === phongBanId) return true;
      if (visited.has(currentId)) return true;
      visited.add(currentId);

      const phongBanHienTai: { phongBanChaId: number | null } | null = await this.prisma.phongBan.findUnique({
        where: { id: currentId },
        select: { phongBanChaId: true },
      });
      currentId = phongBanHienTai?.phongBanChaId ?? null;
    }

    return false;
  }

  // Cập nhật cấp độ đệ quy cho các phòng ban con
  private async capNhatCapDoDeQuy(phongBanId: number, chenhLech: number) {
    const phongBanCons = await this.prisma.phongBan.findMany({
      where: { phongBanChaId: phongBanId },
    });

    for (const pb of phongBanCons) {
      await this.prisma.phongBan.update({
        where: { id: pb.id },
        data: { capDo: pb.capDo + chenhLech },
      });
      await this.capNhatCapDoDeQuy(pb.id, chenhLech);
    }
  }

  // Ngừng hoạt động phòng ban (soft delete)
  async ngungHoatDong(id: number, capNhatBoi?: number) {
    await this.layTheoId(id);

    // Kiểm tra có phòng ban con đang hoạt động không
    const pbConHoatDong = await this.prisma.phongBan.count({
      where: { phongBanChaId: id, trangThai: 'HOAT_DONG' },
    });
    if (pbConHoatDong > 0) {
      throw new BadRequestException('Không thể ngừng hoạt động: còn phòng ban con đang hoạt động');
    }

    // Kiểm tra có nhân viên đang làm việc không
    const nvDangLam = await this.prisma.nhanVien.count({
      where: { phongBanId: id, trangThai: 'DANG_LAM' },
    });
    if (nvDangLam > 0) {
      throw new BadRequestException(`Không thể ngừng hoạt động: còn ${nvDangLam} nhân viên đang làm việc`);
    }

    return this.prisma.phongBan.update({
      where: { id },
      data: { trangThai: 'NGUNG_HOAT_DONG', capNhatBoi },
    });
  }

  // Kích hoạt lại phòng ban
  async kichHoat(id: number, capNhatBoi?: number) {
    const phongBan = await this.prisma.phongBan.findUnique({ where: { id } });
    if (!phongBan) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID: ${id}`);
    }

    return this.prisma.phongBan.update({
      where: { id },
      data: { trangThai: 'HOAT_DONG', capNhatBoi },
    });
  }

  // Xóa phòng ban (dùng ngừng hoạt động thay thế)
  async xoa(id: number) {
    return this.ngungHoatDong(id);
  }

  // Lấy danh sách nhân viên theo phòng ban
  async layNhanVienTheoPhongBan(id: number) {
    await this.layTheoId(id);

    return this.prisma.nhanVien.findMany({
      where: {
        phongBanId: id,
        trangThai: 'DANG_LAM',
      },
      orderBy: { hoTen: 'asc' },
    });
  }

  // ===== ĐƠN VỊ CON (TỔ/CA/NHÓM) =====

  // Lấy danh sách đơn vị con của phòng ban
  async layDonViCon(phongBanId: number) {
    await this.layTheoId(phongBanId);

    return this.prisma.donViCon.findMany({
      where: { phongBanId, trangThai: 'HOAT_DONG' },
      orderBy: { tenDonVi: 'asc' },
    });
  }

  // Tạo đơn vị con
  async taoDonViCon(phongBanId: number, dto: TaoDonViConDto, taoBoi?: number) {
    await this.layTheoId(phongBanId);

    return this.prisma.donViCon.create({
      data: {
        ...dto,
        phongBanId,
        taoBoi,
      },
    });
  }

  // Cập nhật đơn vị con
  async capNhatDonViCon(donViConId: number, dto: CapNhatDonViConDto) {
    const donViCon = await this.prisma.donViCon.findUnique({ where: { id: donViConId } });
    if (!donViCon) {
      throw new NotFoundException(`Không tìm thấy đơn vị con với ID: ${donViConId}`);
    }

    return this.prisma.donViCon.update({
      where: { id: donViConId },
      data: dto,
    });
  }

  // Ngừng hoạt động đơn vị con
  async ngungDonViCon(donViConId: number) {
    const donViCon = await this.prisma.donViCon.findUnique({ where: { id: donViConId } });
    if (!donViCon) {
      throw new NotFoundException(`Không tìm thấy đơn vị con với ID: ${donViConId}`);
    }

    return this.prisma.donViCon.update({
      where: { id: donViConId },
      data: { trangThai: 'NGUNG_HOAT_DONG' },
    });
  }

  // ===== LỊCH SỬ NHÂN VIÊN THUỘC PHÒNG BAN =====

  // Lấy lịch sử phòng ban của nhân viên
  async layLichSuPhongBan(nhanVienId: number) {
    return this.prisma.nhanVienPhongBan.findMany({
      where: { nhanVienId },
      include: {
        phongBan: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
        donViCon: { select: { id: true, maDonVi: true, tenDonVi: true, loaiDonVi: true } },
      },
      orderBy: { tuNgay: 'desc' },
    });
  }

  // Lấy phòng ban hiện tại của nhân viên (theo ngày)
  async layPhongBanHienTai(nhanVienId: number, ngay?: Date) {
    const ngayKiemTra = ngay || new Date();

    return this.prisma.nhanVienPhongBan.findFirst({
      where: {
        nhanVienId,
        tuNgay: { lte: ngayKiemTra },
        OR: [
          { denNgay: null },
          { denNgay: { gte: ngayKiemTra } },
        ],
      },
      include: {
        phongBan: true,
        donViCon: true,
      },
      orderBy: { tuNgay: 'desc' },
    });
  }

  // Chuyển phòng ban cho nhân viên
  async chuyenPhongBan(nhanVienId: number, dto: ChuyenPhongBanDto, taoBoi?: number) {
    // Kiểm tra nhân viên tồn tại
    const nhanVien = await this.prisma.nhanVien.findUnique({ where: { id: nhanVienId } });
    if (!nhanVien) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${nhanVienId}`);
    }

    // Kiểm tra phòng ban mới tồn tại
    await this.layTheoId(dto.phongBanId);

    // Kiểm tra đơn vị con (nếu có) thuộc đúng phòng ban
    if (dto.donViConId) {
      const donViCon = await this.prisma.donViCon.findUnique({ where: { id: dto.donViConId } });
      if (!donViCon || donViCon.phongBanId !== dto.phongBanId) {
        throw new BadRequestException('Đơn vị con không thuộc phòng ban được chọn');
      }
    }

    const tuNgay = new Date(dto.tuNgay);

    // Kiểm tra overlap
    const overlap = await this.prisma.nhanVienPhongBan.findFirst({
      where: {
        nhanVienId,
        OR: [
          { tuNgay: { lte: tuNgay }, denNgay: null },
          { tuNgay: { lte: tuNgay }, denNgay: { gte: tuNgay } },
        ],
      },
    });

    // Nếu có overlap, set denNgay cho record trước
    if (overlap) {
      const ngayTruoc = new Date(tuNgay);
      ngayTruoc.setDate(ngayTruoc.getDate() - 1);
      
      await this.prisma.nhanVienPhongBan.update({
        where: { id: overlap.id },
        data: { denNgay: ngayTruoc },
      });
    }

    // Tạo record mới
    const lichSuMoi = await this.prisma.nhanVienPhongBan.create({
      data: {
        nhanVienId,
        phongBanId: dto.phongBanId,
        donViConId: dto.donViConId,
        tuNgay,
        ghiChu: dto.ghiChu,
        taoBoi,
      },
      include: {
        phongBan: { select: { id: true, tenPhongBan: true } },
        donViCon: { select: { id: true, tenDonVi: true } },
      },
    });

    // Cập nhật phongBanId trên bảng nhân viên (tham chiếu nhanh)
    await this.prisma.nhanVien.update({
      where: { id: nhanVienId },
      data: { phongBanId: dto.phongBanId },
    });

    return lichSuMoi;
  }

  // ===== PHÂN QUYỀN THEO PHÒNG BAN =====

  // Lấy phân quyền của người dùng
  async layPhanQuyenNguoiDung(nguoiDungId: number) {
    return this.prisma.phanQuyenPhongBan.findMany({
      where: { nguoiDungId },
      include: {
        phongBan: { select: { id: true, maPhongBan: true, tenPhongBan: true } },
      },
    });
  }

  // Lấy phân quyền theo phòng ban
  async layPhanQuyenPhongBan(phongBanId: number) {
    return this.prisma.phanQuyenPhongBan.findMany({
      where: { phongBanId },
    });
  }

  // Tạo phân quyền
  async taoPhanQuyen(dto: TaoPhanQuyenPhongBanDto, taoBoi?: number) {
    await this.layTheoId(dto.phongBanId);

    return this.prisma.phanQuyenPhongBan.create({
      data: {
        ...dto,
        taoBoi,
      },
    });
  }

  // Xóa phân quyền
  async xoaPhanQuyen(id: number) {
    const phanQuyen = await this.prisma.phanQuyenPhongBan.findUnique({ where: { id } });
    if (!phanQuyen) {
      throw new NotFoundException(`Không tìm thấy phân quyền với ID: ${id}`);
    }

    return this.prisma.phanQuyenPhongBan.delete({ where: { id } });
  }

  // Kiểm tra người dùng có quyền trên phòng ban không
  async kiemTraQuyen(nguoiDungId: number, phongBanId: number, quyen: string): Promise<boolean> {
    const phanQuyen = await this.prisma.phanQuyenPhongBan.findFirst({
      where: {
        nguoiDungId,
        phongBanId,
        quyen,
      },
    });
    return !!phanQuyen;
  }
}
