// Email Service - Gửi phiếu lương qua email
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface PhieuLuongData {
  hoTen: string;
  maNhanVien: string;
  email: string;
  phongBan: string;
  chucVu: string;
  thang: number;
  nam: number;
  ngayCongThucTe: number;
  ngayCongLyThuyet: number;
  cacKhoanLuong: Array<{
    tenKhoan: string;
    loai: 'THU_NHAP' | 'KHAU_TRU';
    soTien: number;
  }>;
  tongThuNhap: number;
  tongKhauTru: number;
  thucLinh: number;
  // Thông tin công ty
  congTy?: {
    tenCongTy: string;
    diaChi?: string;
    dienThoai?: string;
    email?: string;
    maSoThue?: string;
    logo?: string;
  };
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Cấu hình transporter (có thể dùng Gmail, SMTP, SendGrid, etc.)
    const host = this.configService.get('SMTP_HOST', 'smtp.gmail.com');
    const port = this.configService.get('SMTP_PORT', 587);
    const user = this.configService.get('SMTP_USER', '');
    const pass = this.configService.get('SMTP_PASS', '');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: user
        ? {
            user,
            pass,
          }
        : undefined,
    });

    this.logger.log(`Email service initialized with SMTP: ${host}:${port}`);
  }

  // Tạo HTML phiếu lương
  private generatePayslipHtml(data: PhieuLuongData): string {
    const thuNhapItems = data.cacKhoanLuong.filter((k) => k.loai === 'THU_NHAP');
    const khauTruItems = data.cacKhoanLuong.filter((k) => k.loai === 'KHAU_TRU');

    const formatMoney = (value: number) =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phiếu Lương Tháng ${data.thang}/${data.nam}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; }
    .payslip { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { font-size: 28px; margin-bottom: 5px; }
    .header p { opacity: 0.9; font-size: 16px; }
    .company-info { text-align: center; padding: 15px; border-bottom: 2px dashed #e0e0e0; background: #fafafa; }
    .company-info h2 { color: #333; font-size: 20px; }
    .company-info p { color: #666; font-size: 14px; }
    .employee-info { display: flex; flex-wrap: wrap; padding: 20px 30px; background: #f8f9fa; border-bottom: 1px solid #e0e0e0; }
    .employee-info .info-item { width: 50%; padding: 8px 0; }
    .employee-info .label { color: #888; font-size: 13px; }
    .employee-info .value { color: #333; font-size: 15px; font-weight: 500; }
    .section { padding: 20px 30px; }
    .section-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea; display: inline-block; }
    .section-title.income { border-color: #28a745; }
    .section-title.deduction { border-color: #dc3545; }
    .item-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .item-row:last-child { border-bottom: none; }
    .item-name { color: #555; }
    .item-value { font-weight: 500; color: #333; }
    .item-value.income { color: #28a745; }
    .item-value.deduction { color: #dc3545; }
    .summary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; margin-top: 10px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-row.total { font-size: 22px; font-weight: 700; padding-top: 15px; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 13px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="payslip">
    <div class="header">
      <h1>PHIẾU LƯƠNG</h1>
      <p>Tháng ${data.thang} / ${data.nam}</p>
    </div>
    
    <div class="company-info">
      ${data.congTy?.logo ? `<img src="${data.congTy.logo}" alt="Logo" style="height: 40px; margin-bottom: 8px;" />` : ''}
      <h2>${data.congTy?.tenCongTy || 'CÔNG TY'}</h2>
      ${data.congTy?.diaChi ? `<p>${data.congTy.diaChi}</p>` : ''}
      ${data.congTy?.dienThoai || data.congTy?.email ? `<p style="font-size: 12px; margin-top: 4px;">${data.congTy?.dienThoai ? `ĐT: ${data.congTy.dienThoai}` : ''}${data.congTy?.dienThoai && data.congTy?.email ? ' | ' : ''}${data.congTy?.email ? `Email: ${data.congTy.email}` : ''}</p>` : ''}
      ${data.congTy?.maSoThue ? `<p style="font-size: 12px;">MST: ${data.congTy.maSoThue}</p>` : ''}
    </div>
    
    <div class="employee-info">
      <div class="info-item">
        <div class="label">Họ và tên</div>
        <div class="value">${data.hoTen}</div>
      </div>
      <div class="info-item">
        <div class="label">Mã nhân viên</div>
        <div class="value">${data.maNhanVien}</div>
      </div>
      <div class="info-item">
        <div class="label">Phòng ban</div>
        <div class="value">${data.phongBan}</div>
      </div>
      <div class="info-item">
        <div class="label">Chức vụ</div>
        <div class="value">${data.chucVu || 'Nhân viên'}</div>
      </div>
      <div class="info-item">
        <div class="label">Ngày công thực tế</div>
        <div class="value">${data.ngayCongThucTe} / ${data.ngayCongLyThuyet} ngày</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title income">THU NHẬP</div>
      ${thuNhapItems.map((item) => `
        <div class="item-row">
          <span class="item-name">${item.tenKhoan}</span>
          <span class="item-value income">${formatMoney(item.soTien)}</span>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title deduction">KHẤU TRỪ</div>
      ${khauTruItems.map((item) => `
        <div class="item-row">
          <span class="item-name">${item.tenKhoan}</span>
          <span class="item-value deduction">-${formatMoney(item.soTien)}</span>
        </div>
      `).join('')}
    </div>

    <div class="summary">
      <div class="summary-row">
        <span>Tổng thu nhập:</span>
        <span>${formatMoney(data.tongThuNhap)}</span>
      </div>
      <div class="summary-row">
        <span>Tổng khấu trừ:</span>
        <span>-${formatMoney(data.tongKhauTru)}</span>
      </div>
      <div class="summary-row total">
        <span>THỰC LĨNH:</span>
        <span>${formatMoney(data.thucLinh)}</span>
      </div>
    </div>

    <div class="footer">
      <p>Phiếu lương được tạo tự động bởi hệ thống tính lương.</p>
      <p>Nếu có thắc mắc, vui lòng liên hệ phòng Nhân sự.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  // Gửi phiếu lương qua email
  async sendPayslip(data: PhieuLuongData): Promise<{ success: boolean; message: string }> {
    if (!data.email) {
      return { success: false, message: 'Nhân viên không có email' };
    }

    const fromEmail = this.configService.get('SMTP_FROM', 'noreply@company.vn');
    const companyName = this.configService.get('COMPANY_NAME', 'Công ty TNHH ABC');

    try {
      const html = this.generatePayslipHtml(data);

      await this.transporter.sendMail({
        from: `"${companyName}" <${fromEmail}>`,
        to: data.email,
        subject: `Phiếu lương tháng ${data.thang}/${data.nam} - ${data.hoTen}`,
        html,
      });

      this.logger.log(`Đã gửi phiếu lương cho ${data.hoTen} (${data.email})`);
      return { success: true, message: `Đã gửi phiếu lương cho ${data.hoTen}` };
    } catch (error) {
      this.logger.error(`Lỗi gửi email cho ${data.email}: ${error.message}`);
      return { success: false, message: `Lỗi gửi email: ${error.message}` };
    }
  }

  // Gửi phiếu lương cho nhiều nhân viên
  async sendPayslipBulk(
    dataList: PhieuLuongData[],
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    const results = { success: 0, failed: 0, errors: [] as string[] };

    for (const data of dataList) {
      const result = await this.sendPayslip(data);
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push(result.message);
      }
    }

    return results;
  }

  // Verify SMTP connection
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      this.logger.error(`SMTP connection failed: ${error.message}`);
      return false;
    }
  }

  // Lấy HTML phiếu lương (để render ở frontend)
  getPayslipHtml(data: PhieuLuongData): string {
    return this.generatePayslipHtml(data);
  }
}
