// Quản lý Template KPI
import { useState, useEffect } from 'react'
import { templateKPIApi, TemplateKPI, ChiTieuKPI, LoaiChiTieuKPI } from '../services/kpiApi'
import { phongBanApi } from '../services/api'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
}

export default function QuanLyKPI() {
  const [templates, setTemplates] = useState<TemplateKPI[]>([])
  const [phongBans, setPhongBans] = useState<PhongBan[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKPI | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showChiTieuForm, setShowChiTieuForm] = useState(false)
  
  // Form template
  const [formData, setFormData] = useState({
    maTemplate: '',
    tenTemplate: '',
    phongBanId: '',
    moTa: '',
  })
  
  // Form chỉ tiêu
  const [chiTieuData, setChiTieuData] = useState({
    maChiTieu: '',
    tenChiTieu: '',
    donViTinh: '',
    trongSo: 0,
    loaiChiTieu: 'SO' as LoaiChiTieuKPI,
    chiTieuToiThieu: 0,
    chiTieuMucTieu: 0,
    chiTieuVuotMuc: 0,
  })
  
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = async () => {
    try {
      const [templatesData, phongBansData] = await Promise.all([
        templateKPIApi.layTatCa(),
        phongBanApi.layTatCa(),
      ])
      setTemplates(templatesData)
      setPhongBans(phongBansData)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmitTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await templateKPIApi.taoMoi({
        maTemplate: formData.maTemplate,
        tenTemplate: formData.tenTemplate,
        phongBanId: formData.phongBanId ? parseInt(formData.phongBanId) : undefined,
        moTa: formData.moTa || undefined,
      })
      setShowForm(false)
      setFormData({ maTemplate: '', tenTemplate: '', phongBanId: '', moTa: '' })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo template:', error)
    }
  }
  
  const handleSubmitChiTieu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTemplate) return
    
    try {
      await templateKPIApi.themChiTieu(selectedTemplate.id, {
        ...chiTieuData,
        thuTu: (selectedTemplate.chiTieuKPIs?.length || 0) + 1,
      })
      setShowChiTieuForm(false)
      setChiTieuData({
        maChiTieu: '',
        tenChiTieu: '',
        donViTinh: '',
        trongSo: 0,
        loaiChiTieu: 'SO',
        chiTieuToiThieu: 0,
        chiTieuMucTieu: 0,
        chiTieuVuotMuc: 0,
      })
      loadData()
      // Refresh selected template
      const updated = await templateKPIApi.layTheoId(selectedTemplate.id)
      setSelectedTemplate(updated)
    } catch (error) {
      console.error('Lỗi thêm chỉ tiêu:', error)
    }
  }
  
  const handleDeleteChiTieu = async (chiTieuId: number) => {
    if (!confirm('Xác nhận xóa chỉ tiêu này?')) return
    try {
      await templateKPIApi.xoaChiTieu(chiTieuId)
      loadData()
      if (selectedTemplate) {
        const updated = await templateKPIApi.layTheoId(selectedTemplate.id)
        setSelectedTemplate(updated)
      }
    } catch (error) {
      console.error('Lỗi xóa chỉ tiêu:', error)
    }
  }
  
  const getTongTrongSo = (chiTieus?: ChiTieuKPI[]) => {
    return chiTieus?.reduce((sum, ct) => sum + Number(ct.trongSo), 0) || 0
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Template KPI</h1>
          <p className="text-gray-500 mt-1">Thiết lập các chỉ tiêu đánh giá KPI</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Danh sách Template */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Danh sách Template</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {templates.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Chưa có template nào
              </div>
            ) : (
              templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedTemplate?.id === template.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{template.tenTemplate}</h3>
                      <p className="text-sm text-gray-500">{template.maTemplate}</p>
                      {template.phongBan && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {template.phongBan.tenPhongBan}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">
                        {template.chiTieuKPIs?.length || 0} chỉ tiêu
                      </span>
                      <div className={`text-xs mt-1 ${
                        getTongTrongSo(template.chiTieuKPIs) === 100 
                          ? 'text-green-600' 
                          : 'text-amber-600'
                      }`}>
                        Tổng: {getTongTrongSo(template.chiTieuKPIs)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Chi tiết Template */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">
              {selectedTemplate ? selectedTemplate.tenTemplate : 'Chi tiết Template'}
            </h2>
            {selectedTemplate && (
              <button
                onClick={() => setShowChiTieuForm(true)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm chỉ tiêu
              </button>
            )}
          </div>
          
          {!selectedTemplate ? (
            <div className="p-8 text-center text-gray-500">
              Chọn một template để xem chi tiết
            </div>
          ) : (
            <div className="p-4">
              {/* Thông tin chung */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm"><span className="font-medium">Mã:</span> {selectedTemplate.maTemplate}</p>
                {selectedTemplate.moTa && (
                  <p className="text-sm mt-1"><span className="font-medium">Mô tả:</span> {selectedTemplate.moTa}</p>
                )}
                <p className={`text-sm mt-1 ${
                  getTongTrongSo(selectedTemplate.chiTieuKPIs) === 100 
                    ? 'text-green-600' 
                    : 'text-amber-600'
                }`}>
                  <span className="font-medium">Tổng trọng số:</span> {getTongTrongSo(selectedTemplate.chiTieuKPIs)}%
                  {getTongTrongSo(selectedTemplate.chiTieuKPIs) !== 100 && ' (cần = 100%)'}
                </p>
              </div>
              
              {/* Danh sách chỉ tiêu */}
              <div className="space-y-3">
                {selectedTemplate.chiTieuKPIs?.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Chưa có chỉ tiêu</p>
                ) : (
                  selectedTemplate.chiTieuKPIs?.map((chiTieu) => (
                    <div key={chiTieu.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{chiTieu.tenChiTieu}</h4>
                          <p className="text-sm text-gray-500">{chiTieu.maChiTieu}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteChiTieu(chiTieu.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-500">Trọng số:</span> {chiTieu.trongSo}%</div>
                        <div><span className="text-gray-500">Đơn vị:</span> {chiTieu.donViTinh}</div>
                        <div><span className="text-gray-500">Loại:</span> {chiTieu.loaiChiTieu}</div>
                        <div><span className="text-gray-500">Mục tiêu:</span> {Number(chiTieu.chiTieuMucTieu).toLocaleString()}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal thêm Template */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Thêm Template KPI</h3>
            <form onSubmit={handleSubmitTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã template *</label>
                <input
                  type="text"
                  value={formData.maTemplate}
                  onChange={(e) => setFormData({ ...formData, maTemplate: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên template *</label>
                <input
                  type="text"
                  value={formData.tenTemplate}
                  onChange={(e) => setFormData({ ...formData, tenTemplate: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
                <select
                  value={formData.phongBanId}
                  onChange={(e) => setFormData({ ...formData, phongBanId: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">-- Áp dụng chung --</option>
                  {phongBans.map((pb) => (
                    <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal thêm Chỉ tiêu */}
      {showChiTieuForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Thêm Chỉ tiêu KPI</h3>
            <form onSubmit={handleSubmitChiTieu} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã chỉ tiêu *</label>
                  <input
                    type="text"
                    value={chiTieuData.maChiTieu}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, maChiTieu: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên chỉ tiêu *</label>
                  <input
                    type="text"
                    value={chiTieuData.tenChiTieu}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, tenChiTieu: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị *</label>
                  <input
                    type="text"
                    value={chiTieuData.donViTinh}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, donViTinh: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VNĐ, %, Số..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trọng số (%) *</label>
                  <input
                    type="number"
                    value={chiTieuData.trongSo}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, trongSo: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                    max={100}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại *</label>
                  <select
                    value={chiTieuData.loaiChiTieu}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, loaiChiTieu: e.target.value as LoaiChiTieuKPI })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="SO">Số lượng</option>
                    <option value="PHAN_TRAM">Phần trăm</option>
                    <option value="TIEN">Tiền</option>
                    <option value="DANH_GIA">Đánh giá (1-5)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tối thiểu</label>
                  <input
                    type="number"
                    value={chiTieuData.chiTieuToiThieu}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, chiTieuToiThieu: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu</label>
                  <input
                    type="number"
                    value={chiTieuData.chiTieuMucTieu}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, chiTieuMucTieu: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vượt mức</label>
                  <input
                    type="number"
                    value={chiTieuData.chiTieuVuotMuc}
                    onChange={(e) => setChiTieuData({ ...chiTieuData, chiTieuVuotMuc: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowChiTieuForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
