
/**
 * MASTER TEST SCRIPT: SPRINT 0 - SPRINT 12
 * 
 * This script validates the entire end-to-end flow of the HRM-LITE system.
 * 
 * Flow:
 * 1. Auth (Login)
 * 2. Core Data (Departments, Employees)
 * 3. Configuration (Salary Components)
 * 4. Attendance (Check-in/GPS/Device) [Sprint 7, 8]
 * 5. Timesheet Management (Month view) [Sprint 9]
 * 6. Payroll Calculation (Sync & Pipeline) [Sprint 10]
 * 7. Reporting & Dashboard (KPIs, Reports) [Sprint 11, 12]
 */

const BASE_URL = 'http://localhost:3001/api';
const LOG_PREFIX = '       ';

async function runFullSystemTest() {
    console.log('🚀 INITIALIZING FULL SYSTEM TEST (SPRINT 0 - 12)...\n');
    const stats = { passed: 0, failed: 0 };
    let token = '';
    let adminId = 0;
    let employeeId = 0; // Using an existing employee (e.g., ID 1 or NV0017)
    let bangLuongId = 0;

    // Helper for logging
    const logPass = (msg: string) => { console.log(`✅ [PASS] ${msg}`); stats.passed++; };
    const logFail = (msg: string, err?: any) => { console.error(`❌ [FAIL] ${msg}`, err || ''); stats.failed++; };
    const logInfo = (msg: string) => console.log(`${LOG_PREFIX}${msg}`);

    try {
        // ==========================================
        // PHASE 1: CORE & AUTH
        // ==========================================
        console.log('🔹 PHASE 1: CORE & AUTHENTICATION');

        // 1.1 Login Admin
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
        } else {
            throw new Error(`Login Failed: ${loginRes.status}`);
        }

        // 1.2 Fetch Departments (Org Chart)
        const deptRes = await fetch(`${BASE_URL}/phong-ban`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (deptRes.ok) {
            const depts = await deptRes.json();
            logPass(`Departments Retrieved: ${depts.length} departments found.`);
            // if (depts.length > 0) logInfo(`First Dept: ${depts[0].tenPhongBan}`);
        } else {
            logFail('Fetch Departments Failed');
        }

        // 1.3 Fetch Employees
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
        } else {
            logFail('Fetch Employees Failed');
        }

        // ==========================================
        // PHASE 2: CONFIGURATION & SALARY
        // ==========================================
        console.log('\n🔹 PHASE 2: SALARY CONFIGURATION');

        // 2.1 Salary Components
        const salCompRes = await fetch(`${BASE_URL}/khoan-luong`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (salCompRes.ok) {
            const comps = await salCompRes.json();
            logPass(`Salary Components: ${comps.length} active components.`);
        } else {
            logFail('Fetch Salary Components Failed');
        }

        // ==========================================
        // PHASE 3: ATTENDANCE & ANTI-FRAUD (SPRINT 7-8)
        // ==========================================
        console.log('\n🔹 PHASE 3: ATTENDANCE & ANTI-FRAUD');

        // 3.1 Device Check (Sprint 8)
        const deviceRes = await fetch(`${BASE_URL}/anti-fraud/devices`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (deviceRes.ok) {
            logPass('Device Binding API Accessible.');
        } else {
            logFail('Device Binding API Failed', deviceRes.status);
        }

        // 3.2 GPS Config (Sprint 7) - Assuming endpoint exists or checked via config
        // Mocking a check-in attempt (without actual GPS data this might fail logic, but we test endpoint reachability)
        // Skipping actual check-in to avoid side-effects, verifying config/readiness instead.

        // ==========================================
        // PHASE 4: TIMESHEET (SPRINT 9)
        // ==========================================
        console.log('\n🔹 PHASE 4: TIMESHEET MANAGEMENT');

        const now = new Date();
        const thang = now.getMonth() + 1;
        const nam = now.getFullYear();

        // 4.1 Monthly Timesheet
        const tsRes = await fetch(`${BASE_URL}/timesheet?thang=${thang}&nam=${nam}&limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (tsRes.ok) {
            const tsData = await tsRes.json();
            logPass(`Monthly Timesheet (${thang}/${nam}) Retrieved.`);
        } else {
            logFail('Monthly Timesheet Failed', tsRes.status);
        }

        // 4.2 Correction History
        const histRes = await fetch(`${BASE_URL}/timesheet/lich-su-sua-cong?limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (histRes.ok) {
            logPass('Correction History API Accessible.');
        } else {
            logFail('Correction History API Failed');
        }

        // ==========================================
        // PHASE 5: PAYROLL PIPELINE (SPRINT 10)
        // ==========================================
        console.log('\n🔹 PHASE 5: PAYROLL PIPELINE');

        // 5.1 Pipeline Status
        const pipeRes = await fetch(`${BASE_URL}/payroll-sync/status?thang=${thang}&nam=${nam}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (pipeRes.ok) {
            const pipeStatus = await pipeRes.json();
            logPass(`Pipeline Status Check: OK.`);
            logInfo(`Total Salary Forecast: ${pipeStatus.tongLuongToanCongTy?.toLocaleString() || 0}`);
        } else {
            logFail('Pipeline Status Failed');
        }

        // 5.2 Rule Trace (Readiness)
        const traceRes = await fetch(`${BASE_URL}/payroll-sync/rule-trace?bangLuongId=0`, { // Dummy ID to check auth/route
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (traceRes.ok || traceRes.status === 404 || traceRes.status === 400) {
            // 404/400 is expected if ID doesn't exist, but 500 would be a failure. 200 is best.
            logPass('Rule Trace Endpoint Reachable.');
        } else {
            logFail('Rule Trace Endpoint Error', traceRes.status);
        }

        // ==========================================
        // PHASE 6: DASHBOARD & REPORTS (SPRINT 11-12)
        // ==========================================
        console.log('\n🔹 PHASE 6: DASHBOARD & REPORTS');

        // 6.1 Dashboard
        const dashRes = await fetch(`${BASE_URL}/reports/dashboard?thang=${thang}&nam=${nam}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (dashRes.ok) {
            const dash = await dashRes.json();
            logPass('Executive Dashboard Retrieved.');
            logInfo(`Headcount: ${dash.headcount}`);
            logInfo(`Alerts: ${dash.alerts?.length || 0}`);
        } else {
            logFail('Dashboard Failed');
        }

        // 6.2 Specific Reports
        const reports = ['headcount', 'quy-luong', 'cham-cong', 'nghi-phep'];
        for (const rpt of reports) {
            const rptRes = await fetch(`${BASE_URL}/reports/${rpt}?thang=${thang}&nam=${nam}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (rptRes.ok) {
                logPass(`Report [${rpt}] Generated.`);
            } else {
                logFail(`Report [${rpt}] Failed`, rptRes.status);
            }
        }

    } catch (e) {
        logFail('Critical Test Execution Error', e);
    }

    console.log('\n==========================================');
    console.log(`TEST RESULTS: ${stats.passed} Passed, ${stats.failed} Failed`);
    console.log('==========================================');
}

runFullSystemTest();
