
import { PrismaClient } from '@prisma/client';

const API_URL = 'http://localhost:3001/api';

async function myFetch(url: string, options: any = {}) {
    const res = await (global as any).fetch(url, options);
    return res;
}

function log(step: string, success: boolean, msg: string = '') {
    console.log(`${success ? '✅' : '❌'} [${step}] ${msg}`);
}

async function runDeepTest() {
    console.log('\n🚀 STARTING DEEP TEST SUITE (REVISED)...\n');
    const thang = 1;
    const nam = 2026;

    try {
        // 1. AUTHENTICATION
        console.log('🔹 1. AUTHENTICATION');
        const loginRes = await myFetch(`${API_URL}/rbac/dang-nhap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        log('Login', !!token, token ? 'Admin authenticated' : 'Login failed');
        if (!token) return;

        // 2. DATA VERIFICATION
        console.log('\n🔹 2. DATA VERIFICATION');
        const nvRes = await myFetch(`${API_URL}/nhan-vien`, { headers: { 'Authorization': `Bearer ${token}` } });
        const nvData = await nvRes.json();
        const nvs = Array.isArray(nvData) ? nvData : (nvData.data || []);
        console.log(`   Fetched ${nvs.length} employees.`);
        // console.log('   Sample IDs:', nvs.slice(0, 5).map((n: any) => n.maNhanVien));
        
        // 3. TIMESHEET AGGREGATION
        console.log('\n🔹 3. TIMESHEET AGGREGATION');
        const tsUrl = `${API_URL}/timesheet?thang=${thang}&nam=${nam}`;
        console.log(`   Fetching TS from: ${tsUrl}`);
        const tsRes = await myFetch(tsUrl, { headers: { 'Authorization': `Bearer ${token}` } });
        const tsData = await tsRes.json();
        const summary = tsData.data || [];
        console.log(`   Found ${summary.length} records in data.`);

        // Find an employee with data
        let activeEmp = summary.find((s: any) => (s.tongKet?.soNgayDiLam || 0) > 0);
        if (!activeEmp) {
             console.log('   Note: No employee has attendance data > 0. Picking first available for structure check.');
             activeEmp = summary[0];
        }

        const dev = nvs.find((n: any) => n.maNhanVien === activeEmp?.maNhanVien);
        log('Seed Data', !!dev, `Selected Test Employee: ${dev?.maNhanVien || 'None'}`);
        if (!dev) return;

        const devTs = activeEmp;

        let otVal = 0, workDays = 0;
        if (devTs) {
            otVal = Number(devTs.tongKet?.soGioOT || 0);
            workDays = Number(devTs.tongKet?.soNgayDiLam || 0);
        }
        log('Timesheet Logic', workDays > 0, `Dev OT: ${otVal}h, WorkDays: ${workDays}`);

        // 4. PAYROLL CALCULATION & SYNC
        console.log('\n🔹 4. PAYROLL CALCULATION & SYNC');
        // 4.1 Sync Data
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
            const existing = (Array.isArray(listData) ? listData : (listData.data || [])).find((b: any) => b.phongBanId === dev.phongBanId);
            blId = existing?.id;
        }

        log('Create Payroll', !!blId, `Payroll ID: ${blId}`);
        if (!blId) throw new Error('Cannot proceed without Payroll ID');

        console.log('   Triggering System Sync...');
        await myFetch(`${API_URL}/payroll-sync/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ bangLuongId: blId })
        });

        // 4.2 Rule Engine
        console.log('   Triggering Rule Engine Calculation...');
        const ruleRes = await myFetch(`${API_URL}/bang-luong/${blId}/chay-rule-engine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ nguoiThucHien: 'admin' })
        });
        const ruleData = await ruleRes.json();
        const rulesExecuted = ruleData.soTraceGhi || ruleData.soDongTao || 0;
        log('Rule Engine', ruleRes.ok, `Engine completed: ${rulesExecuted} rules executed`);

        // 4.3 Validate Results
        console.log('   Validating Calculated Values...');
        const detailRes = await myFetch(`${API_URL}/bang-luong/${blId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        const blDetails = await detailRes.json();
        // console.log('DEBUG blDetails:', JSON.stringify(blDetails).substring(0, 500));
        const devData = (blDetails.danhSachNhanVien || []).find((nv: any) => nv.maNhanVien === dev.maNhanVien);
        const details = devData?.cacKhoanLuong || [];

        console.log(`   Found ${details.length} details for ${dev.maNhanVien}.`);
        if (details.length > 0) {
            console.log('   Summary:');
            details.forEach((d: any) => console.log(`     - ${d.maKhoan}: ${Number(d.soTien).toLocaleString()}`));
        }

        const findVal = (ma: string) => {
            const d = details.find((det: any) => det.maKhoan === ma);
            return d ? Number(d.soTien) : 0;
        };

        const vBase = findVal('L_CB');
        const vOT = findVal('L_OT');
        const vBHXH = findVal('BHXH');
        const vMeal = findVal('PC_AN');
        const vNET = vBase + vOT + vMeal - vBHXH;

        log('Val Check - Base', vBase > 0, `Base: ${vBase.toLocaleString()}`);
        log('Val Check - Derived', vNET > 0, `NET Calc: ${vNET.toLocaleString()}`);

        // 5. REPORTS
        console.log('\n🔹 5. REPORTS');
        const reportUrl = `${API_URL}/reports/quy-luong?thang=${thang}&nam=${nam}`;
        const reportRes = await myFetch(reportUrl, { headers: { 'Authorization': `Bearer ${token}` } });
        const reportData = await reportRes.json();
        const reports = reportData.theoPhongBan || [];
        console.log(`   Found ${reports.length} department reports.`);
        if (reports.length > 0) console.log('   Depts:', reports.map((r: any) => r.tenPhongBan));

        const techReport = reports.find((r: any) =>
            r.tenPhongBan?.toUpperCase().includes('TECH') ||
            r.tenPhongBan?.toUpperCase().includes('KỸ THUẬT')
        );

        log('Report Generation', !!techReport, techReport ? `TECH Total Thuc Linh: ${techReport.tongThucLinh.toLocaleString()}` : 'TECH report not found');
        if (techReport) {
            log('Report Accuracy', Math.abs(techReport.tongThucLinh - vNET) < 10, `Report: ${techReport.tongThucLinh}, Calc: ${vNET}`);
        }

    } catch (e: any) {
        console.log(`\n❌ [Execution] Critical Error: ${e.message}`);
    }
}

runDeepTest();
