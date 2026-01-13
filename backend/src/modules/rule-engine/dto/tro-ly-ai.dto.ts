// DTOs cho module Trợ lý AI gợi ý Rule
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsObject,
  IsArray,
} from 'class-validator';
import { LoaiRule, CheDoGop, TrangThaiAiAudit } from '@prisma/client';

// ============================================
// INPUT: YÊU CẦU GỢI Ý RULE
// ============================================
export class GoiYRuleDto {
  @ApiProperty({ description: 'ID phòng ban đang chọn' })
  @IsNumber()
  phongBanId: number;

  @ApiProperty({ description: 'ID quy chế lương đang chọn' })
  @IsNumber()
  quyCheId: number;

  @ApiProperty({ 
    description: 'Nội dung mô tả bằng tiếng Việt',
    example: 'Phạt đi trễ: 1-2 lần 50k/lần, từ lần 3 trở lên 100k/lần'
  })
  @IsString()
  noiDungTiengViet: string;
}

// ============================================
// OUTPUT: ĐIỀU KIỆN ÁP DỤNG
// ============================================
export class DieuKienApDungDeXuat {
  @ApiPropertyOptional({ description: 'Áp dụng cho tất cả' })
  tatCa?: boolean;

  @ApiPropertyOptional({ description: 'Danh sách vai trò áp dụng' })
  vaiTro?: string[];

  @ApiPropertyOptional({ description: 'Danh sách cấp trách nhiệm áp dụng' })
  capTrachNhiem?: number[];

  @ApiPropertyOptional({ description: 'Danh sách ID nhân viên áp dụng' })
  nhanVienIds?: number[];

  @ApiPropertyOptional({ description: 'Danh sách ID phòng ban áp dụng' })
  phongBanIds?: number[];
}

export class DieuKienJsonDeXuat {
  @ApiPropertyOptional({ description: 'Điều kiện áp dụng' })
  apDungCho?: DieuKienApDungDeXuat;
}

// ============================================
// OUTPUT: CÔNG THỨC TÍNH
// ============================================

// Bậc thang cho công thức
export class BacThangDeXuat {
  @ApiProperty({ description: 'Từ giá trị' })
  from: number;

  @ApiProperty({ description: 'Đến giá trị' })
  to: number;

  @ApiPropertyOptional({ description: 'Số tiền' })
  soTien?: number;

  @ApiPropertyOptional({ description: 'Số tiền mỗi lần (cho sự kiện)' })
  soTienMoiLan?: number;

  @ApiPropertyOptional({ description: 'Hệ số' })
  heSo?: number;
}

// Công thức cố định
export class CongThucCoDinhDeXuat {
  @ApiProperty({ description: 'Số tiền cố định' })
  soTien: number;
}

// Công thức theo hệ số
export class CongThucTheoHeSoDeXuat {
  @ApiProperty({ description: 'Nguồn base', example: 'LUONG_CO_BAN' })
  base: string;

  @ApiProperty({ description: 'Hệ số' })
  heSo: number;

  @ApiPropertyOptional({ description: 'Cộng thêm' })
  congThem?: number;
}

// Công thức bậc thang
export class CongThucBacThangDeXuat {
  @ApiProperty({ description: 'Trường dữ liệu để so sánh' })
  field: string;

  @ApiProperty({ description: 'Danh sách bậc thang' })
  bac: BacThangDeXuat[];
}

// Công thức theo sự kiện
export class CongThucTheoSuKienDeXuat {
  @ApiProperty({ description: 'Mã sự kiện' })
  maSuKien: string;

  @ApiProperty({ description: 'Cách tính' })
  cachTinh: 'CO_DINH' | 'BAC_THANG';

  @ApiPropertyOptional({ description: 'Số tiền mỗi lần' })
  soTienMoiLan?: number;

  @ApiPropertyOptional({ description: 'Bậc thang' })
  bac?: BacThangDeXuat[];
}

// Công thức biểu thức
export class CongThucBieuThucDeXuat {
  @ApiProperty({ description: 'Biểu thức công thức' })
  bieuThuc: string;
}

// Union type công thức
export type CongThucJsonDeXuat = 
  | CongThucCoDinhDeXuat 
  | CongThucTheoHeSoDeXuat 
  | CongThucBacThangDeXuat 
  | CongThucTheoSuKienDeXuat 
  | CongThucBieuThucDeXuat;

// ============================================
// OUTPUT: RULE ĐỀ XUẤT
// ============================================
export class RuleDeXuat {
  @ApiProperty({ description: 'Tên rule' })
  tenRule: string;

  @ApiProperty({ description: 'Mã khoản lương' })
  khoanLuongMa: string;

  @ApiPropertyOptional({ description: 'ID khoản lương (nếu đã map được)' })
  khoanLuongId?: number;

  @ApiProperty({ description: 'Loại rule', enum: LoaiRule })
  loaiRule: LoaiRule;

  @ApiProperty({ description: 'Thứ tự ưu tiên' })
  thuTuUuTien: number;

  @ApiProperty({ description: 'Chế độ gộp', enum: CheDoGop })
  cheDoGop: CheDoGop;

  @ApiProperty({ description: 'Cho phép chỉnh tay' })
  choPhepChinhTay: boolean;

  @ApiPropertyOptional({ description: 'Điều kiện JSON' })
  dieuKienJson?: DieuKienJsonDeXuat;

  @ApiProperty({ description: 'Công thức JSON' })
  congThucJson: CongThucJsonDeXuat;
}

// ============================================
// OUTPUT: RESPONSE TRỢ LÝ AI
// ============================================
export class GoiYRuleResponseDto {
  @ApiProperty({ description: 'Hợp lệ sơ bộ' })
  hopLeSoBo: boolean;

  @ApiProperty({ description: 'Danh sách câu hỏi cần làm rõ' })
  canLamRo: string[];

  @ApiPropertyOptional({ description: 'Tóm tắt rule' })
  tomTatRule?: string;

  @ApiPropertyOptional({ description: 'Rule đề xuất' })
  ruleDeXuat?: RuleDeXuat;

  @ApiPropertyOptional({ description: 'Giải thích cách AI xử lý' })
  giaiThich?: string[];

  @ApiPropertyOptional({ description: 'Cảnh báo' })
  canhBao?: string[];
}

// ============================================
// CONTEXT CHO AI
// ============================================
export class AiContextDto {
  @ApiProperty({ description: 'Thông tin phòng ban' })
  phongBan: {
    id: number;
    maPhongBan: string;
    tenPhongBan: string;
  };

  @ApiProperty({ description: 'Thông tin quy chế' })
  quyChe: {
    id: number;
    tenQuyChe: string;
    phienBan: number;
  };

  @ApiProperty({ description: 'Danh mục khoản lương' })
  khoanLuongs: Array<{
    id: number;
    maKhoan: string;
    tenKhoan: string;
    loai: string;
  }>;

  @ApiProperty({ description: 'Danh mục sự kiện thưởng/phạt' })
  danhMucSuKien: Array<{
    maSuKien: string;
    tenSuKien: string;
    loai: string;
    soTienMacDinh: number;
  }>;

  @ApiProperty({ description: 'Danh sách cấp trách nhiệm có trong hệ thống' })
  capTrachNhiems: number[];
}

// ============================================
// ÁP DỤNG RULE TỪ ĐỀ XUẤT AI
// ============================================
export class ApDungRuleDeXuatDto {
  @ApiProperty({ description: 'ID audit log của đề xuất AI' })
  @IsNumber()
  auditId: number;

  @ApiPropertyOptional({ description: 'Rule đề xuất (có thể đã được user chỉnh sửa)' })
  @IsOptional()
  @IsObject()
  ruleDeXuat?: RuleDeXuat;
}

// ============================================
// LỊCH SỬ AI AUDIT
// ============================================
export class AiRuleAuditDto {
  id: number;
  nguoiTaoId?: number;
  phongBanId?: number;
  quyCheId?: number;
  promptGoc: string;
  responseJson: string;
  trangThai: TrangThaiAiAudit;
  ruleApDungId?: number;
  taoLuc: Date;
}

// ============================================
// TỪ ĐIỂN MAPPING ALIAS
// ============================================
export interface TuDienAlias {
  [key: string]: {
    maKhoan?: string;
    maSuKien?: string;
    loaiRule?: LoaiRule;
  };
}

// Từ điển mặc định
export const TU_DIEN_ALIAS: TuDienAlias = {
  // Khoản lương
  'trách nhiệm': { maKhoan: 'TRACH_NHIEM' },
  'tn': { maKhoan: 'TRACH_NHIEM' },
  'phụ cấp trách nhiệm': { maKhoan: 'TRACH_NHIEM' },
  'trách nhiệm kho': { maKhoan: 'TRACH_NHIEM_KHO' },
  'trách nhiệm kinh doanh': { maKhoan: 'TRACH_NHIEM_KD' },
  'lương cơ bản': { maKhoan: 'LUONG_CO_BAN' },
  'lcb': { maKhoan: 'LUONG_CO_BAN' },
  
  // Sự kiện thưởng
  'thưởng': { maSuKien: 'THUONG_KHAC', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'bonus': { maSuKien: 'THUONG_KHAC', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'chuyên cần': { maSuKien: 'CHUYEN_CAN', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'hoàn thành xuất sắc': { maSuKien: 'HOAN_THANH_XUAT_SAC', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'sáng kiến': { maSuKien: 'SANG_KIEN', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  
  // Sự kiện phạt
  'phạt': { maSuKien: 'PHAT_KHAC', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'trừ': { maSuKien: 'PHAT_KHAC', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'đi trễ': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'trễ giờ': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'muộn': { maSuKien: 'DI_TRE', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'về sớm': { maSuKien: 'VE_SOM', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'vắng mặt': { maSuKien: 'VANG_MAT_KHONG_PHEP', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'vắng mặt không phép': { maSuKien: 'VANG_MAT_KHONG_PHEP', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'sai quy trình': { maSuKien: 'SAI_QUY_TRINH', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'vi phạm quy trình': { maSuKien: 'SAI_QUY_TRINH', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
  'vi phạm nội quy': { maSuKien: 'VI_PHAM_NOI_QUY', loaiRule: 'THEO_SU_KIEN' as LoaiRule },
};

// ============================================
// PATTERN NHẬN DIỆN LOẠI RULE
// ============================================
export const PATTERN_LOAI_RULE = {
  // Patterns cho loại BẬC THANG
  BAC_THANG: [
    /cấp\s*\d+/i,
    /bậc\s*\d+/i,
    /từ\s*\d+\s*(đến|tới|-)\s*\d+/i,
    /\d+\s*(-|đến|tới)\s*\d+\s*(lần|ngày)/i,
    /mức\s*\d+/i,
  ],
  
  // Patterns cho loại CỐ ĐỊNH
  CO_DINH: [
    /^\s*\d+\s*(k|tr|triệu|nghìn|đồng|vnđ)?\s*$/i,
    /cố định\s*\d+/i,
    /mỗi tháng\s*\d+/i,
  ],
  
  // Patterns cho loại THEO HỆ SỐ
  THEO_HE_SO: [
    /\*\s*\d+(\.\d+)?/,
    /hệ số/i,
    /nhân\s*\d+/i,
    /x\s*\d+(\.\d+)?/i,
  ],
  
  // Patterns cho loại SỰ KIỆN
  THEO_SU_KIEN: [
    /phạt/i,
    /thưởng/i,
    /đi trễ/i,
    /về sớm/i,
    /vắng mặt/i,
    /mỗi lần/i,
    /số lần/i,
  ],
  
  // Patterns cho loại CÔNG THỨC
  CONG_THUC: [
    /\+\s*\d+/,
    /-\s*\d+/,
    /\*\s*[a-zA-Z_]+/,
    /\/\s*\d+/,
    /=\s*.+\s*[\+\-\*\/]/,
  ],
};
