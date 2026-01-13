// Controller Quy chế lương và Rule Engine
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { QuyCheService } from './quy-che.service';
import { QuyCheRuleService } from './quy-che-rule.service';
import { SuKienThuongPhatService } from './su-kien-thuong-phat.service';
import { RuleEngineExecutor } from './rule-engine-executor.service';
import {
  TaoQuyCheDto,
  CapNhatQuyCheDto,
  NhanBanQuyCheDto,
  LocQuyCheDto,
} from './dto/quy-che.dto';
import {
  TaoQuyCheRuleDto,
  CapNhatQuyCheRuleDto,
  ValidateRuleDto,
  PreviewRuleDto,
  SapXepRuleDto,
} from './dto/quy-che-rule.dto';
import {
  TaoSuKienDto,
  CapNhatSuKienDto,
  DuyetSuKienDto,
  DuyetNhieuSuKienDto,
  LocSuKienDto,
  TaoDanhMucSuKienDto,
} from './dto/su-kien.dto';
import { LoaiSuKien } from '@prisma/client';

@ApiTags('Quy chế lương')
@Controller('quy-che-luong')
export class QuyCheController {
  constructor(
    private readonly quyCheService: QuyCheService,
    private readonly quyCheRuleService: QuyCheRuleService,
  ) {}

  // ============================================
  // QUY CHẾ
  // ============================================

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách quy chế' })
  async layDanhSach(@Query() filter: LocQuyCheDto) {
    return this.quyCheService.layDanhSach(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết quy chế' })
  async layChiTiet(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheService.layChiTiet(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo quy chế mới' })
  async tao(@Body() dto: TaoQuyCheDto) {
    return this.quyCheService.tao(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật quy chế' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatQuyCheDto,
  ) {
    return this.quyCheService.capNhat(id, dto);
  }

  @Post(':id/nhan-ban')
  @ApiOperation({ summary: 'Nhân bản quy chế (tạo phiên bản mới)' })
  async nhanBan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: NhanBanQuyCheDto,
  ) {
    return this.quyCheService.nhanBan(id, dto);
  }

  @Post(':id/kich-hoat')
  @ApiOperation({ summary: 'Kích hoạt quy chế' })
  async kichHoat(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheService.kichHoat(id);
  }

  @Post(':id/ngung')
  @ApiOperation({ summary: 'Ngưng quy chế' })
  async ngung(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheService.ngung(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa quy chế (chỉ khi ở trạng thái Nháp)' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheService.xoa(id);
  }

  // ============================================
  // RULE
  // ============================================

  @Get(':quyCheId/rules')
  @ApiOperation({ summary: 'Lấy danh sách rule của quy chế' })
  async layDanhSachRule(@Param('quyCheId', ParseIntPipe) quyCheId: number) {
    return this.quyCheRuleService.layDanhSachTheoQuyChe(quyCheId);
  }

  @Post(':quyCheId/rule')
  @ApiOperation({ summary: 'Thêm rule vào quy chế' })
  async taoRule(
    @Param('quyCheId', ParseIntPipe) quyCheId: number,
    @Body() dto: Omit<TaoQuyCheRuleDto, 'quyCheId'>,
  ) {
    return this.quyCheRuleService.tao({ ...dto, quyCheId } as TaoQuyCheRuleDto);
  }

  @Put(':quyCheId/sap-xep-rule')
  @ApiOperation({ summary: 'Sắp xếp thứ tự rule (drag-drop)' })
  async sapXepRule(
    @Param('quyCheId', ParseIntPipe) quyCheId: number,
    @Body() dto: SapXepRuleDto,
  ) {
    return this.quyCheRuleService.sapXep(quyCheId, dto);
  }
}

@ApiTags('Quy chế Rule')
@Controller('quy-che-rule')
export class QuyCheRuleController {
  constructor(private readonly quyCheRuleService: QuyCheRuleService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết rule' })
  async layChiTiet(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheRuleService.layChiTiet(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật rule' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatQuyCheRuleDto,
  ) {
    return this.quyCheRuleService.capNhat(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa rule (soft delete)' })
  async xoa(@Param('id', ParseIntPipe) id: number) {
    return this.quyCheRuleService.xoa(id);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate rule JSON' })
  async validate(@Body() dto: ValidateRuleDto) {
    return this.quyCheRuleService.validate(dto);
  }

  @Post('preview')
  @ApiOperation({ summary: 'Preview/Chạy thử rule' })
  async preview(@Body() dto: PreviewRuleDto) {
    return this.quyCheRuleService.preview(dto);
  }
}

@ApiTags('Sự kiện thưởng/phạt')
@Controller('su-kien-thuong-phat')
export class SuKienThuongPhatController {
  constructor(private readonly suKienService: SuKienThuongPhatService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sự kiện' })
  async layDanhSach(@Query() filter: LocSuKienDto) {
    return this.suKienService.layDanhSach(filter);
  }

  @Get('danh-muc')
  @ApiOperation({ summary: 'Lấy danh mục sự kiện' })
  @ApiQuery({ name: 'loai', required: false, enum: LoaiSuKien })
  async layDanhMuc(@Query('loai') loai?: LoaiSuKien) {
    return this.suKienService.layDanhMuc(loai);
  }

  @Post('danh-muc')
  @ApiOperation({ summary: 'Tạo danh mục sự kiện' })
  async taoDanhMuc(@Body() dto: TaoDanhMucSuKienDto) {
    return this.suKienService.taoDanhMuc(dto);
  }

  @Post('khoi-tao-danh-muc-mau')
  @ApiOperation({ summary: 'Khởi tạo danh mục sự kiện mẫu' })
  async khoiTaoDanhMucMau() {
    return this.suKienService.khoiTaoDanhMucMau();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết sự kiện' })
  async layChiTiet(@Param('id', ParseIntPipe) id: number) {
    return this.suKienService.layChiTiet(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo sự kiện mới' })
  async tao(@Body() dto: TaoSuKienDto) {
    return this.suKienService.tao(dto);
  }

  @Post('tao-nhieu')
  @ApiOperation({ summary: 'Tạo nhiều sự kiện (import)' })
  async taoNhieu(@Body() dtos: TaoSuKienDto[]) {
    return this.suKienService.taoNhieu(dtos);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật sự kiện' })
  async capNhat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CapNhatSuKienDto,
  ) {
    return this.suKienService.capNhat(id, dto);
  }

  @Post(':id/duyet')
  @ApiOperation({ summary: 'Duyệt sự kiện' })
  async duyet(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DuyetSuKienDto,
  ) {
    return this.suKienService.duyet(id, dto);
  }

  @Post('duyet-nhieu')
  @ApiOperation({ summary: 'Duyệt nhiều sự kiện' })
  async duyetNhieu(@Body() dto: DuyetNhieuSuKienDto) {
    return this.suKienService.duyetNhieu(dto);
  }

  @Post(':id/huy')
  @ApiOperation({ summary: 'Hủy sự kiện' })
  async huy(@Param('id', ParseIntPipe) id: number) {
    return this.suKienService.huy(id);
  }

  @Get('thong-ke/:nhanVienId')
  @ApiOperation({ summary: 'Thống kê sự kiện theo nhân viên' })
  @ApiQuery({ name: 'thang', required: true })
  @ApiQuery({ name: 'nam', required: true })
  async thongKe(
    @Param('nhanVienId', ParseIntPipe) nhanVienId: number,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.suKienService.thongKeTheoNhanVien(nhanVienId, thang, nam);
  }
}

@ApiTags('Rule Engine Executor')
@Controller('bang-luong')
export class RuleEngineExecutorController {
  constructor(private readonly ruleEngineExecutor: RuleEngineExecutor) {}

  @Post(':id/chay-rule-engine')
  @ApiOperation({ summary: 'Chạy Rule Engine cho bảng lương' })
  async chayRuleEngine(
    @Param('id', ParseIntPipe) id: number,
    @Body('nguoiThucHien') nguoiThucHien?: string,
  ) {
    return this.ruleEngineExecutor.chayRuleEngine(id, nguoiThucHien);
  }

  @Get(':id/rule-trace')
  @ApiOperation({ summary: 'Xem trace giải trình' })
  @ApiQuery({ name: 'nhanVienId', required: false })
  async xemTrace(
    @Param('id', ParseIntPipe) id: number,
    @Query('nhanVienId') nhanVienId?: string,
  ) {
    return this.ruleEngineExecutor.xemTrace(
      id,
      nhanVienId ? parseInt(nhanVienId, 10) : undefined,
    );
  }
}
