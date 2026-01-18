
const BASE_URL = 'http://localhost:3001/api';
export { };

async function runTest() {
    console.log('🚀 Starting Deep Test Sprint 10 & 11: Payroll Sync, KPI, Dashboard...');

    // ==========================================
    // 1. AUTHENTICATION (ADMIN)
    // ==========================================
    console.log('\n🔐 [1] Authenticating...');
    const loginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap: 'admin', matKhau: 'admin123' })
    });

    if (!loginRes.ok) process.exit(1);
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✅ Admin Authenticated');

    // ==========================================
    // 2. SPRINT 11: KPI MODULE
    // ==========================================
    console.log('\n📊 [2] Testing Sprint 11: KPI...');

    // 2.1 Templates
    console.log('   -> Checking KPI Templates...');
    let templateId: number | null = null;
    const tplRes = await fetch(`${BASE_URL}/kpi/template`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (tplRes.ok) {
        const tpls = await tplRes.json();
        console.log(`      Found ${tpls.length} templates.`);
        if (tpls.length > 0) templateId = tpls[0].id;
    }

    if (!templateId) {
        console.log('      Creating new KPI Template...');
        const createTpl = await fetch(`${BASE_URL}/kpi/template`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tenTemplate: 'KPI Template Test Script',
                moTa: 'Created by automation test',
                chiTieus: [
                    { tenChiTieu: 'Doanh số', trongSo: 50, kieuDuLieu: 'SO', mucTieuMacDinh: 100 },
                    { tenChiTieu: 'Chuyên cần', trongSo: 50, kieuDuLieu: 'SO', mucTieuMacDinh: 100 }
                ]
            })
        });
        if (createTpl.ok) {
            const newTpl = await createTpl.json();
            templateId = newTpl.id;
            console.log('      ✅ Created Template ID:', templateId);
        } else {
            console.error('      ❌ Create Template Failed');
        }
    }

    // 2.2 Cycles (Kỳ đánh giá)
    console.log('   -> Checking KPI Cycles...');
    const kyRes = await fetch(`${BASE_URL}/kpi/ky-danh-gia`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (kyRes.ok) {
        const kys = await kyRes.json();
        console.log(`      Found ${kys.length} cycles.`);
    }

    // ==========================================
    // 3. SPRINT 10: PAYROLL SYNC PIPELINE
    // ==========================================
    console.log('\n🔄 [3] Testing Sprint 10: Payroll Pipeline...');

    // 3.0 Get Department
    console.log('   -> Fetching Departments...');
    const pbRes = await fetch(`${BASE_URL}/phong-ban`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    let phongBanId = 1; // Fallback
    if (pbRes.ok) {
        const pbs = await pbRes.json();
        if (pbs.length > 0) {
            phongBanId = pbs[0].id;
            console.log(`      Using Department: ${pbs[0].tenPhongBan} (ID: ${phongBanId})`);
        }
    }

    // 3.1 Create Payroll (BangLuong)
    console.log('   -> Creating Payroll for Current Month...');
    const now = new Date();
    const thang = now.getMonth() + 1;
    const nam = now.getFullYear();

    const createPlRes = await fetch(`${BASE_URL}/bang-luong`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            thang,
            nam,
            phongBanId,
            tenBangLuong: `Bảng lương T${thang}/${nam} - PB ${phongBanId} (Test Script)`,
        })
    });

    let bangLuongId: number | null = null;
    if (createPlRes.ok) {
        const bl = await createPlRes.json();
        bangLuongId = bl.id;
        console.log('      ✅ Payroll Created ID:', bangLuongId);
    } else if (createPlRes.status === 409) {
        console.log('      ⚠️ Payroll already exists. Fetching existing...');
        const listPlRes = await fetch(`${BASE_URL}/bang-luong?thang=${thang}&nam=${nam}&phongBanId=${phongBanId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const list = await listPlRes.json();
        if (list.length > 0) {
            bangLuongId = list[0].id;
            console.log('      ✅ Found existing Payroll ID:', bangLuongId);
        }
    } else {
        console.error('      ❌ Create Payroll Failed:', await createPlRes.text());
    }

    // 3.2 Sync Pipeline
    if (bangLuongId) {
        console.log('   -> Triggering Sync Pipeline...');
        const syncRes = await fetch(`${BASE_URL}/payroll-sync/sync`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bangLuongId,
                forceRecalc: true
            })
        });

        if (syncRes.ok) {
            const result = await syncRes.json();
            console.log('      ✅ Sync Triggered/Completed. Summary:', result.summary ? 'Available' : 'Async started');

            // Check process
            const progressRes = await fetch(`${BASE_URL}/payroll-sync/progress/${bangLuongId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (progressRes.ok) {
                const prog = await progressRes.json();
                console.log('      ℹ️ Sync Status:', prog.currentStep, prog.steps ? `(${prog.steps.length} steps)` : '');
            }

        } else {
            console.error('      ❌ Sync Failed:', await syncRes.text());
        }

        // 3.3 Rule Trace
        console.log('   -> Fetching Rule Trace...');
        const traceRes = await fetch(`${BASE_URL}/payroll-sync/rule-trace?bangLuongId=${bangLuongId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (traceRes.ok) {
            const traces = await traceRes.json();
            console.log(`      ✅ Rule Trace Found: ${traces.length} records.`);
            if (traces.length > 0) {
                console.log('      Sample Trace Input:', JSON.stringify(traces[0].inputParsed).substring(0, 100) + '...');
            }
        }
    }

    // ==========================================
    // 4. SPRINT 11: DASHBOARD STATS
    // ==========================================
    console.log('\n📈 [4] Testing Sprint 11: Pipeline Dashboard...');
    const dashRes = await fetch(`${BASE_URL}/payroll-sync/status?thang=${thang}&nam=${nam}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (dashRes.ok) {
        const stats = await dashRes.json();
        console.log('      ✅ Pipeline Status Retrieved.');
        console.log('      Total Departments:', stats.phongBans?.length || 0);
        console.log('      Total Salary:', stats.tongLuongToanCongTy);
        if (stats.canhBao && stats.canhBao.length > 0) {
            console.log('      ⚠️ Warnings:', stats.canhBao.length);
            console.log('      First Warning:', stats.canhBao[0].moTa);
        } else {
            console.log('      ✅ No Warnings found.');
        }
    } else {
        console.error('      ❌ Fetch Dashboard Failed', dashRes.status);
    }

    console.log('\n🏁 Sprint 10 & 11 Test Completed.');
}

runTest();
