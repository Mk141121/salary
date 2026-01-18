const BASE_URL = 'http://localhost:3001/api';
const LOG_PREFIX = '       ';
async function runFullSystemTest() {
    console.log('🚀 INITIALIZING FULL SYSTEM TEST (SPRINT 0 - 12)...\n');
    const stats = { passed: 0, failed: 0 };
    let token = '';
    let adminId = 0;
    let employeeId = 0;
    let bangLuongId = 0;
    const logPass = (msg) => { console.log(`✅ [PASS] ${msg}`); stats.passed++; };
    const logFail = (msg, err) => { console.error(`❌ [FAIL] ${msg}`, err || ''); stats.failed++; };
    const logInfo = (msg) => console.log(`${LOG_PREFIX}${msg}`);
    try {
        console.log('🔹 PHASE 1: CORE & AUTHENTICATION');
        const loginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
        });
        if (loginRes.ok) {
            const data = await loginRes.json();
            token = data.token;
            adminId = data.nguoiDung.id;
            logPass(`Admin Authenticated (ID: ${adminId})`);
        }
        else {
            throw new Error(`Login Failed: ${loginRes.status}`);
        }
        const deptRes = await fetch(`${BASE_URL}/phong-ban`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (deptRes.ok) {
            const depts = await deptRes.json();
            logPass(`Departments Retrieved: ${depts.length} departments found.`);
        }
        else {
            logFail('Fetch Departments Failed');
        }
        const empRes = await fetch(`${BASE_URL}/nhan-vien?limit=5`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (empRes.ok) {
            const emps = await empRes.json();
            logPass(`Employees Retrieved: ${emps.total} total.`);
            if (emps.data.length > 0) {
                employeeId = emps.data[0].id;
                logInfo(`Selected Test Employee: ${emps.data[0].hoTen} (ID: ${employeeId})`);
            }
        }
        else {
            logFail('Fetch Employees Failed');
        }
        console.log('\n🔹 PHASE 2: SALARY CONFIGURATION');
        const salCompRes = await fetch(`${BASE_URL}/khoan-luong`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (salCompRes.ok) {
            const comps = await salCompRes.json();
            logPass(`Salary Components: ${comps.length} active components.`);
        }
        else {
            logFail('Fetch Salary Components Failed');
        }
        console.log('\n🔹 PHASE 3: ATTENDANCE & ANTI-FRAUD');
        const deviceRes = await fetch(`${BASE_URL}/anti-fraud/devices`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (deviceRes.ok) {
            logPass('Device Binding API Accessible.');
        }
        else {
            logFail('Device Binding API Failed', deviceRes.status);
        }
        console.log('\n🔹 PHASE 4: TIMESHEET MANAGEMENT');
        const now = new Date();
        const thang = now.getMonth() + 1;
        const nam = now.getFullYear();
        const tsRes = await fetch(`${BASE_URL}/timesheet?thang=${thang}&nam=${nam}&limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (tsRes.ok) {
            const tsData = await tsRes.json();
            logPass(`Monthly Timesheet (${thang}/${nam}) Retrieved.`);
        }
        else {
            logFail('Monthly Timesheet Failed', tsRes.status);
        }
        const histRes = await fetch(`${BASE_URL}/timesheet/lich-su-sua-cong?limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (histRes.ok) {
            logPass('Correction History API Accessible.');
        }
        else {
            logFail('Correction History API Failed');
        }
        console.log('\n🔹 PHASE 5: PAYROLL PIPELINE');
        const pipeRes = await fetch(`${BASE_URL}/payroll-sync/status?thang=${thang}&nam=${nam}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (pipeRes.ok) {
            const pipeStatus = await pipeRes.json();
            logPass(`Pipeline Status Check: OK.`);
            logInfo(`Total Salary Forecast: ${pipeStatus.tongLuongToanCongTy?.toLocaleString() || 0}`);
        }
        else {
            logFail('Pipeline Status Failed');
        }
        const traceRes = await fetch(`${BASE_URL}/payroll-sync/rule-trace?bangLuongId=0`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (traceRes.ok || traceRes.status === 404 || traceRes.status === 400) {
            logPass('Rule Trace Endpoint Reachable.');
        }
        else {
            logFail('Rule Trace Endpoint Error', traceRes.status);
        }
        console.log('\n🔹 PHASE 6: DASHBOARD & REPORTS');
        const dashRes = await fetch(`${BASE_URL}/reports/dashboard?thang=${thang}&nam=${nam}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (dashRes.ok) {
            const dash = await dashRes.json();
            logPass('Executive Dashboard Retrieved.');
            logInfo(`Headcount: ${dash.headcount}`);
            logInfo(`Alerts: ${dash.alerts?.length || 0}`);
        }
        else {
            logFail('Dashboard Failed');
        }
        const reports = ['headcount', 'quy-luong', 'cham-cong', 'nghi-phep'];
        for (const rpt of reports) {
            const rptRes = await fetch(`${BASE_URL}/reports/${rpt}?thang=${thang}&nam=${nam}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (rptRes.ok) {
                logPass(`Report [${rpt}] Generated.`);
            }
            else {
                logFail(`Report [${rpt}] Failed`, rptRes.status);
            }
        }
    }
    catch (e) {
        logFail('Critical Test Execution Error', e);
    }
    console.log('\n==========================================');
    console.log(`TEST RESULTS: ${stats.passed} Passed, ${stats.failed} Failed`);
    console.log('==========================================');
}
runFullSystemTest();
//# sourceMappingURL=test_full_system.js.map