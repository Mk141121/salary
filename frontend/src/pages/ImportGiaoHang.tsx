import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import {
  GiaoHangRow,
  PreviewResult,
  parseExcelToGiaoHang,
  previewGiaoHang,
  confirmGiaoHang,
  calculateFileHash,
} from '../services/sanLuongApi';

const ImportGiaoHang: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<GiaoHangRow[]>([]);
  const [preview, setPreview] = useState<PreviewResult<GiaoHangRow> | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());

  // Tải template Excel mẫu
  const handleDownloadTemplate = () => {
    // Dữ liệu mẫu
    const sampleData = [
      { 'Mã NV': 'NV001', 'Ngày': '01/01/2026', 'Khối lượng': 50, 'Đơn giá': 5000, 'Phạt trễ': 0, 'Phạt KL phiếu': 0 },
      { 'Mã NV': 'NV001', 'Ngày': '02/01/2026', 'Khối lượng': 45, 'Đơn giá': 5000, 'Phạt trễ': 10000, 'Phạt KL phiếu': 0 },
      { 'Mã NV': 'NV002', 'Ngày': '01/01/2026', 'Khối lượng': 60, 'Đơn giá': 5500, 'Phạt trễ': 0, 'Phạt KL phiếu': 5000 },
      { 'Mã NV': 'NV002', 'Ngày': '02/01/2026', 'Khối lượng': 55, 'Đơn giá': 5500, 'Phạt trễ': 0, 'Phạt KL phiếu': 0 },
    ];

    // Tạo workbook
    const ws = XLSX.utils.json_to_sheet(sampleData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 10 }, // Mã NV
      { wch: 12 }, // Ngày
      { wch: 12 }, // Khối lượng
      { wch: 12 }, // Đơn giá
      { wch: 12 }, // Phạt trễ
      { wch: 15 }, // Phạt KL phiếu
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Giao Hàng');

    // Thêm sheet hướng dẫn
    const guideData = [
      { 'Cột': 'Mã NV', 'Mô tả': 'Mã nhân viên (bắt buộc)', 'Ví dụ': 'NV001' },
      { 'Cột': 'Ngày', 'Mô tả': 'Ngày làm việc (dd/MM/yyyy)', 'Ví dụ': '01/01/2026' },
      { 'Cột': 'Khối lượng', 'Mô tả': 'Khối lượng giao hàng (kg)', 'Ví dụ': '50' },
      { 'Cột': 'Đơn giá', 'Mô tả': 'Đơn giá theo kg (VNĐ)', 'Ví dụ': '5000' },
      { 'Cột': 'Phạt trễ', 'Mô tả': 'Tiền phạt giao trễ (VNĐ)', 'Ví dụ': '10000' },
      { 'Cột': 'Phạt KL phiếu', 'Mô tả': 'Phạt không lấy phiếu (VNĐ)', 'Ví dụ': '5000' },
      { 'Cột': '', 'Mô tả': '', 'Ví dụ': '' },
      { 'Cột': 'Công thức', 'Mô tả': 'Tiền = Khối lượng × Đơn giá - Phạt trễ - Phạt KL phiếu', 'Ví dụ': '' },
    ];
    const wsGuide = XLSX.utils.json_to_sheet(guideData);
    wsGuide['!cols'] = [{ wch: 15 }, { wch: 50 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, wsGuide, 'Hướng dẫn');

    // Download
    XLSX.writeFile(wb, `Template_GiaoHang_${thang}_${nam}.xlsx`);
    toast.success('Đã tải template mẫu');
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setPreview(null);

    try {
      const parsedRows = await parseExcelToGiaoHang(selectedFile);
      setRows(parsedRows);
      toast.success(`Đã đọc ${parsedRows.length} dòng từ file`);
    } catch (error) {
      toast.error('Lỗi đọc file Excel');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  const handlePreview = async () => {
    if (rows.length === 0) {
      toast.error('Chưa có dữ liệu để preview');
      return;
    }

    setLoading(true);
    try {
      const result = await previewGiaoHang(rows, thang, nam);
      setPreview(result);
      if (result.tongKhongHopLe > 0) {
        toast.error(`Có ${result.tongKhongHopLe} dòng không hợp lệ`);
      } else {
        toast.success(`${result.tongHopLe} dòng hợp lệ, sẵn sàng import`);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Lỗi preview');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview || !file) return;
    if (preview.hopLe.length === 0) {
      toast.error('Không có dữ liệu hợp lệ để import');
      return;
    }

    setConfirming(true);
    try {
      const fileHash = await calculateFileHash(file);
      const result = await confirmGiaoHang(preview.hopLe, file.name, fileHash);
      toast.success(`Import thành công! Thêm mới: ${result.inserted}, Cập nhật: ${result.updated}`);

      // Reset form
      setFile(null);
      setRows([]);
      setPreview(null);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Lỗi import');
    } finally {
      setConfirming(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setRows([]);
    setPreview(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Import Sản Lượng Giao Hàng</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadTemplate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Tải Template Mẫu
          </button>
          {(file || rows.length > 0) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Chọn tháng/năm */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
          <select
            value={thang}
            onChange={(e) => setThang(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
          <select
            value={nam}
            onChange={(e) => setNam(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-gray-600">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {isDragActive ? (
            <p className="text-blue-600">Thả file vào đây...</p>
          ) : (
            <>
              <p>Kéo thả file Excel vào đây, hoặc click để chọn file</p>
              <p className="text-sm text-gray-400 mt-2">Hỗ trợ: .xlsx, .xls</p>
            </>
          )}
        </div>
      </div>

      {/* File info */}
      {file && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>File:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
          <p className="text-blue-600 text-sm mt-1">Đã đọc {rows.length} dòng dữ liệu</p>
        </div>
      )}

      {/* Preview button */}
      {rows.length > 0 && !preview && (
        <button
          onClick={handlePreview}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Đang xử lý...
            </>
          ) : (
            'Preview dữ liệu'
          )}
        </button>
      )}

      {/* Preview results */}
      {preview && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold text-lg">{preview.tongHopLe}</p>
              <p className="text-green-600 text-sm">Dòng hợp lệ</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold text-lg">{preview.tongKhongHopLe}</p>
              <p className="text-red-600 text-sm">Dòng không hợp lệ</p>
            </div>
          </div>

          {/* Valid rows table */}
          {preview.hopLe.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 bg-green-50 border-b border-green-200">
                <h3 className="font-semibold text-green-800">Dữ liệu hợp lệ ({preview.hopLe.length})</h3>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Mã NV
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Ngày
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Khối lượng
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Đơn giá
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Phạt trễ
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Phạt KLP
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preview.hopLe.slice(0, 100).map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{row.maNhanVien}</td>
                        <td className="px-4 py-2 text-sm">{row.ngay}</td>
                        <td className="px-4 py-2 text-sm text-right">{row.khoiLuong}</td>
                        <td className="px-4 py-2 text-sm text-right">{formatCurrency(row.donGia)}</td>
                        <td className="px-4 py-2 text-sm text-right text-red-600">
                          {formatCurrency(row.phatTre)}
                        </td>
                        <td className="px-4 py-2 text-sm text-right text-red-600">
                          {formatCurrency(row.phatKhongLayPhieu)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.hopLe.length > 100 && (
                  <p className="text-center text-gray-500 py-2">
                    ... và {preview.hopLe.length - 100} dòng nữa
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Invalid rows table */}
          {preview.khongHopLe.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 bg-red-50 border-b border-red-200">
                <h3 className="font-semibold text-red-800">
                  Dữ liệu không hợp lệ ({preview.khongHopLe.length})
                </h3>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Mã NV
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Ngày
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Lý do
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preview.khongHopLe.map((item, idx) => (
                      <tr key={idx} className="bg-red-50">
                        <td className="px-4 py-2 text-sm">{item.row.maNhanVien}</td>
                        <td className="px-4 py-2 text-sm">{item.row.ngay}</td>
                        <td className="px-4 py-2 text-sm text-red-600">{item.lyDo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Confirm button */}
          {preview.hopLe.length > 0 && (
            <div className="flex gap-4">
              <button
                onClick={handlePreview}
                disabled={loading}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Preview lại
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {confirming ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang import...
                  </>
                ) : (
                  `Import ${preview.hopLe.length} dòng`
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hướng dẫn */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Hướng dẫn</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>File Excel cần có các cột: Mã NV, Ngày, Khối lượng, Đơn giá, Phạt trễ, Phạt KL phiếu</li>
          <li>Ngày có thể ở định dạng dd/MM/yyyy hoặc yyyy-MM-dd</li>
          <li>Nếu dữ liệu đã tồn tại (cùng mã NV + ngày) sẽ được cập nhật</li>
          <li>
            Công thức: <strong>Tiền = Khối lượng × Đơn giá - Phạt trễ - Phạt không lấy phiếu</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportGiaoHang;
