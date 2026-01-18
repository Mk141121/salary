"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_URL = 'http://localhost:3001/api';
async function myFetch(url, options = {}) {
    const res = await global.fetch(url, options);
    return res;
}
function log(step, success, msg = '') {
    console.log(`${success ? '✅' : '❌'} [${step}] ${msg}`);
}
async function runDeepTest() {
    console.log('\n🚀 STARTING DEEP TEST SUITE (REVISED)...\n');
    const thang = 1;
    const nam = 2026;
    try {
        console.log('🔹 1. AUTHENTICATION');
        const loginRes = await myFetch(`${API_URL}/rbac/dang-nhap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        log('Login', !!token, token ? 'Admin authenticated' : 'Login failed');
        if (!token)
            return;
        console.log('\n🔹 2. DATA VERIFICATION');
        const nvRes = await myFetch(`${API_URL}/nhan-vien`, { headers: { 'Authorization': `Bearer ${token}` } });
        const nvData = await nvRes.json();
        const nvs = Array.isArray(nvData) ? nvData : (nvData.data || []);
        console.log(`   Fetched ${nvs.length} employees.`);
        const dev = nvs.find((n) => n.maNhanVien === 'DEV01');
        const dir = nvs.find((n) => n.maNhanVien === 'DIR01');
        log('Seed Data', !!(dev && dir), 'Found Director and Developer profiles');
        if (!dev)
            return;
        console.log('\n🔹 3. TIMESHEET AGGREGATION');
        const tsUrl = `${API_URL}/timesheet?thang=${thang}&nam=${nam}`;
        console.log(`   Fetching TS from: ${tsUrl}`);
        const tsRes = await myFetch(tsUrl, { headers: { 'Authorization': `Bearer ${token}` } });
        const tsData = await tsRes.json();
        const summary = tsData.data || [];
        console.log(`   Found ${summary.length} records in data.`);
        const devTs = summary.find((s) => s.maNhanVien === 'DEV01');
        let otVal = 0, workDays = 0;
        if (devTs) {
            otVal = Number(devTs.tongKet?.soGioOT || 0);
            workDays = Number(devTs.tongKet?.soNgayDiLam || 0);
        }
        log('Timesheet Logic', otVal === 10 && workDays === 24, `Dev OT: ${otVal}h, WorkDays: ${workDays}`);
        console.log('\n🔹 4. PAYROLL CALCULATION & SYNC');
        const payrollRes = await myFetch(`${API_URL}/bang-luong`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ thang, nam, phongBanId: dev.phongBanId, tenBangLuong: 'Tech Payroll Jan 2026' })
        });
        const blData = await payrollRes.json();
        let blId = blData.id || (blData.data && blData.data.id);
        if (payrollRes.status === 409) {
            console.log('   Payroll already exists, fetching existing ID...');
            const listRes = await myFetch(`${API_URL}/bang-luong?thang=${thang}&nam=${nam}&phongBanId=${dev.phongBanId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            const listData = await listRes.json();
            const existing = (Array.isArray(listData) ? listData : (listData.data || [])).find((b) => b.phongBanId === dev.phongBanId);
            blId = existing?.id;
        }
        log('Create Payroll', !!blId, `Payroll ID: ${blId}`);
        if (!blId)
            throw new Error('Cannot proceed without Payroll ID');
        console.log('   Triggering System Sync...');
        await myFetch(`${API_URL}/payroll-sync/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ bangLuongId: blId })
        });
        console.log('   Triggering Rule Engine Calculation...');
        const ruleRes = await myFetch(`${API_URL}/bang-luong/${blId}/chay-rule-engine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ nguoiThucHien: 'admin' })
        });
        const ruleData = await ruleRes.json();
        const rulesExecuted = ruleData.soTraceGhi || ruleData.soDongTao || 0;
        log('Rule Engine', ruleRes.ok, `Engine completed: ${rulesExecuted} rules executed`);
        console.log('   Validating Calculated Values...');
        const detailRes = await myFetch(`${API_URL}/bang-luong/${blId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        const blDetails = await detailRes.json();
        const devData = (blDetails.danhSachNhanVien || []).find((nv) => nv.maNhanVien === 'DEV01');
        const details = devData?.cacKhoanLuong || [];
        console.log(`   Found ${details.length} details for DEV01.`);
        if (details.length > 0) {
            console.log('   Summary:');
            details.forEach((d) => console.log(`     - ${d.maKhoan}: ${Number(d.soTien).toLocaleString()}`));
        }
        const findVal = (ma) => {
            const d = details.find((det) => det.maKhoan === ma);
            return d ? Number(d.soTien) : 0;
        };
        const vBase = findVal('L_CB');
        const vOT = findVal('L_OT');
        const vBHXH = findVal('BHXH');
        const vMeal = findVal('PC_AN');
        const vNET = vBase + vOT + vMeal - vBHXH;
        log('Val Check - Base', Math.abs(vBase - 21818182) < 100, `Expected ~21.82M, Got ${vBase.toLocaleString()}`);
        log('Val Check - OT', Math.abs(vOT - 1704545) < 100, `Expected ~1.70M, Got ${vOT.toLocaleString()}`);
        log('Val Check - BHXH', vBHXH === 1600000, `Expected 1.6M, Got ${vBHXH.toLocaleString()}`);
        log('Val Check - Meal', vMeal === 720000, `Expected 720k, Got ${vMeal.toLocaleString()}`);
        log('Val Check - NET (Calc)', Math.abs(vNET - 22642727) < 100, `Calc: ${vNET.toLocaleString()}`);
        console.log('\n🔹 5. REPORTS');
        const reportUrl = `${API_URL}/reports/quy-luong?thang=${thang}&nam=${nam}`;
        const reportRes = await myFetch(reportUrl, { headers: { 'Authorization': `Bearer ${token}` } });
        const reportData = await reportRes.json();
        const reports = reportData.theoPhongBan || [];
        console.log(`   Found ${reports.length} department reports.`);
        if (reports.length > 0)
            console.log('   Depts:', reports.map((r) => r.tenPhongBan));
        const techReport = reports.find((r) => r.tenPhongBan?.toUpperCase().includes('TECH') ||
            r.tenPhongBan?.toUpperCase().includes('KỸ THUẬT'));
        log('Report Generation', !!techReport, techReport ? `TECH Total Thuc Linh: ${techReport.tongThucLinh.toLocaleString()}` : 'TECH report not found');
        if (techReport) {
            log('Report Accuracy', Math.abs(techReport.tongThucLinh - vNET) < 10, `Report: ${techReport.tongThucLinh}, Calc: ${vNET}`);
        }
    }
    catch (e) {
        console.log(`\n❌ [Execution] Critical Error: ${e.message}`);
    }
}
runDeepTest();
//# sourceMappingURL=deep_test_suite.js.map