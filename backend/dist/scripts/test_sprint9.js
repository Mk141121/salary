"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BASE_URL = 'http://localhost:3001/api';
async function runTest() {
    console.log('🚀 Starting Deep Test Sprint 9: Timesheet Management...');
    console.log('\n🔐 [1] Authenticating...');
    const loginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
    });
    if (!loginRes.ok)
        process.exit(1);
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✅ Admin Authenticated');
    const empLoginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap: 'huong.ttt', matKhau: '123456' })
    });
    let employeeToken = token;
    let employeeData = null;
    if (empLoginRes.ok) {
        const empData = await empLoginRes.json();
        employeeToken = empData.token;
        employeeData = empData;
        console.log('✅ Employee Authenticated (huong.ttt)');
    }
    else {
        console.log('⚠️ Could not auth as employee, creating/using admin as fallback');
    }
    console.log('\n📅 [2] Viewing Timesheet...');
    const date = new Date();
    const timesheetRes = await fetch(`${BASE_URL}/timesheet?thang=${date.getMonth() + 1}&nam=${date.getFullYear()}&limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (timesheetRes.ok) {
        const data = await timesheetRes.json();
        console.log(`✅ Timesheet Fetched. Total Users: ${data.total}`);
        if (data.data.length > 0) {
            console.log('   Sample User:', data.data[0].hoTen);
            console.log('   Sample Daily Status:', data.data[0].chiTietCong[0]?.trangThai || 'N/A');
        }
    }
    else {
        console.error('❌ Fetch Timesheet Failed:', timesheetRes.status);
    }
    console.log('\n📝 [3] Creating Correction Request (Employee)...');
    const meRes = await fetch(`${BASE_URL}/rbac/kiem-tra-token`, {
        headers: { 'Authorization': `Bearer ${employeeToken}` }
    });
    const me = await meRes.json();
    console.log('   Current User:', me.tenDangNhap, 'ID:', me.id, 'NhanVienID:', me.nhanVienId);
    let nhanVienId = me.nhanVienId;
    if (!nhanVienId) {
        console.log('⚠️ Employee token has no nhanVienId. Trying to find NV0017 manually...');
        const admNvRes = await fetch(`${BASE_URL}/nhan-vien/ma/NV0017`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (admNvRes.ok) {
            const nv = await admNvRes.json();
            console.log('   Found NV0017 ID:', nv.id);
            nhanVienId = nv.id;
        }
    }
    if (!nhanVienId) {
        console.log('❌ Still no NhanVienID. Cannot create request.');
    }
    else {
        const reqPayload = {
            nhanVienId: nhanVienId,
            ngayChamCong: new Date().toISOString().split('T')[0],
            gioVaoMoi: new Date().toISOString(),
            gioRaMoi: new Date().toISOString(),
            lyDo: 'Quên chấm công (Test Script)',
            bangChung: 'http://test-image.com/proof.jpg'
        };
        const createRes = await fetch(`${BASE_URL}/timesheet/yeu-cau-sua-cong`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${employeeToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqPayload)
        });
        const createData = await createRes.json();
        let requestId = null;
        if (createRes.ok) {
            console.log('✅ Correction Request Created. ID:', createData.id);
            requestId = createData.id;
        }
        else {
            console.error('❌ Create Request Failed:', createData);
        }
        if (requestId) {
            console.log('\n✅ [4] Approving Request (Admin)...');
            const approveRes = await fetch(`${BASE_URL}/timesheet/yeu-cau-sua-cong/${requestId}/duyet`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trangThaiDuyet: 'DA_DUYET',
                    lyDoTuChoi: null
                })
            });
            if (approveRes.ok) {
                console.log('✅ Request Approved.');
            }
            else {
                console.error('❌ Approve Failed:', await approveRes.text());
            }
        }
    }
    console.log('\n🛠️ [5] Direct Correction (HR)...');
    const usersRes = await fetch(`${BASE_URL}/nhan-vien?limit=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const users = await usersRes.json();
    const targetUser = users.data[0];
    if (targetUser) {
        const correctionPayload = {
            nhanVienId: targetUser.id,
            ngayChamCong: new Date().toISOString().split('T')[0],
            gioVao: new Date().toISOString(),
            gioRa: new Date().toISOString(),
            lyDo: 'HR Manual Fix',
            ghiChu: 'Test script fix'
        };
        const directRes = await fetch(`${BASE_URL}/timesheet/sua-cong-truc-tiep`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(correctionPayload)
        });
        if (directRes.ok) {
            console.log('✅ Direct Correction Successful.');
        }
        else {
            console.error('❌ Direct Correction Failed:', await directRes.text());
        }
    }
    console.log('\n📜 [6] Viewing Correction History...');
    const historyRes = await fetch(`${BASE_URL}/timesheet/lich-su-sua-cong?limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (historyRes.ok) {
        const histData = await historyRes.json();
        console.log(`✅ History Retrieved. Total records: ${histData.total}`);
        if (histData.data.length > 0) {
            console.log('   Latest Log:', histData.data[0].truongThayDoi, 'by', histData.data[0].nguoiThucHien?.hoTen);
        }
    }
    else {
        console.error('❌ History Fetch Failed');
    }
    console.log('\n🏁 Sprint 9 Test Completed.');
}
runTest();
//# sourceMappingURL=test_sprint9.js.map