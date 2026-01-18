
const BASE_URL = 'http://localhost:3001/api';
export { };

async function runTest() {
    console.log('🚀 Starting Deep Test Sprint 11 & 12: Dashboard & Reports...');

    // ==========================================
    // 1. AUTHENTICATION (ADMIN)
    // ==========================================
    console.log('\n🔐 [1] Authenticating...');
    const loginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
    });

    if (!loginRes.ok) {
        console.error('❌ Authentication failed');
        process.exit(1);
    }
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✅ Admin Authenticated');

    const now = new Date();
    const thang = now.getMonth() + 1;
    const nam = now.getFullYear();

    // ==========================================
    // 2. SPRINT 11 & 12: DASHBOARD
    // ==========================================
    console.log('\n📊 [2] Testing Dashboard (Sprint 11)...');
    const dashRes = await fetch(`${BASE_URL}/reports/dashboard?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (dashRes.ok) {
        const data = await dashRes.json();
        console.log(`      ✅ Dashboard Retrieved for ${thang}/${nam}`);
        console.log(`      Headcount: ${data.headcount}`);
        console.log(`      Payroll Fund: ${data.quyLuongThang?.toLocaleString()} VND`);
        console.log(`      Alerts: ${data.alerts?.length || 0}`);
        if (data.kpis && data.kpis.length > 0) {
            console.log('      KPIs:');
            data.kpis.forEach((k: any) => console.log(`        - ${k.label}: ${k.value} ${k.unit}`));
        }
    } else {
        console.error('      ❌ Dashboard Failed:', dashRes.status);
    }

    // ==========================================
    // 3. SPRINT 12: REPORTS
    // ==========================================
    console.log('\npcl [3] Testing Reports (Sprint 12)...');

    // 3.1 Headcount Report
    console.log('   -> Headcount Report...');
    const hcRes = await fetch(`${BASE_URL}/reports/headcount?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (hcRes.ok) {
        const data = await hcRes.json();
        console.log(`      ✅ Headcount Report: ${data.summary.tongNhanVien} employees`);
        if (data.theoPhongBan && data.theoPhongBan.length > 0) {
            console.log(`         Dept Sample: ${data.theoPhongBan[0].tenPhongBan} - ${data.theoPhongBan[0].dangLam} Active`);
        }
    } else {
        console.error('      ❌ Headcount Report Failed:', hcRes.status);
    }

    // 3.2 Late/Early Report
    console.log('   -> Late/Early Report...');
    const diTreRes = await fetch(`${BASE_URL}/reports/di-tre-ve-som?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (diTreRes.ok) {
        const data = await diTreRes.json();
        console.log(`      ✅ Late/Early Report: ${data.summary.tongLuotDiTre} late, ${data.summary.tongLuotVeSom} early`);
    } else {
        console.error('      ❌ Late/Early Report Failed:', diTreRes.status);
    }

    // 3.3 OT Report
    console.log('   -> OT Report...');
    const otRes = await fetch(`${BASE_URL}/reports/ot?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (otRes.ok) {
        const data = await otRes.json();
        console.log(`      ✅ OT Report: ${data.summary.tongGioOT} hours`);
    } else {
        console.error('      ❌ OT Report Failed:', otRes.status);
    }

    // 3.4 Leave Report
    console.log('   -> Leave Report...');
    const leaveRes = await fetch(`${BASE_URL}/reports/nghi-phep?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (leaveRes.ok) {
        const data = await leaveRes.json();
        console.log(`      ✅ Leave Report: ${data.summary.tongDon} requests, ${data.summary.tongNgayNghi} days off`);
    } else {
        console.error('      ❌ Leave Report Failed:', leaveRes.status);
    }

    // 3.5 Payroll Fund Report
    console.log('   -> Payroll Fund Report...');
    const fundRes = await fetch(`${BASE_URL}/reports/quy-luong?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (fundRes.ok) {
        const data = await fundRes.json();
        console.log(`      ✅ Payroll Fund Report: ${data.summary.tongQuyLuong?.toLocaleString()} VND`);
        if (data.theoPhongBan && data.theoPhongBan.length > 0) {
            console.log(`         Dept Sample: ${data.theoPhongBan[0].tenPhongBan} - ${Number(data.theoPhongBan[0].tongThucLinh).toLocaleString()} VND`);
        }
    } else {
        console.error('      ❌ Payroll Fund Report Failed:', fundRes.status);
    }

    // 3.6 Attendance Summary Report
    console.log('   -> Attendance Summary Report...');
    const attRes = await fetch(`${BASE_URL}/reports/cham-cong?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (attRes.ok) {
        const data = await attRes.json();
        console.log(`      ✅ Attendance Report: ${data.summary.tongNhanVien} staff, Avg Workdays: ${data.summary.trungBinhNgayCong}`);
    } else {
        console.error('      ❌ Attendance Report Failed:', attRes.status);
    }

    console.log('\n🏁 Sprint 11 & 12 Test Completed.');
}

runTest();
