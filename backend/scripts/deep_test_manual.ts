
import { Logger } from '@nestjs/common';

const BASE_URL = 'http://localhost:3001/api';

async function runTest() {
    console.log('🚀 Starting Deep Test Manual...');

    // 1. Test Login
    console.log('1️⃣ Testing Login...');
    try {
        const loginRes = await fetch(`${BASE_URL}/rbac/dang-nhap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tenDangNhap: 'admin',
                matKhau: 'admin123'
            })
        });

        if (!loginRes.ok) {
            console.error('❌ Login Failed:', loginRes.status, await loginRes.text());
            process.exit(1);
        }

        const loginData = await loginRes.json();
        console.log('✅ Login Successful!');
        const token = loginData.token;

        if (!token) {
            console.error('❌ No access token received');
            process.exit(1);
        }

        // 2. Test Get Profile (Check Token)
        console.log('2️⃣ Testing Token Verification...');
        const verifyRes = await fetch(`${BASE_URL}/rbac/kiem-tra-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!verifyRes.ok) {
            console.error('❌ Token Verification Failed:', verifyRes.status);
        } else {
            const verifyData = await verifyRes.json();
            console.log('✅ Token Verified:', verifyData.valid ? 'Valid' : 'Invalid');
        }

        // 3. Test Get Users (Admin Role Required)
        console.log('3️⃣ Testing Get Users List (RBAC Check)...');
        const usersRes = await fetch(`${BASE_URL}/rbac/nguoi-dung`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (usersRes.ok) {
            const users = await usersRes.json();
            console.log(`✅ Get Users Successful. Found ${users.length} users.`);
        } else {
            console.error('❌ Get Users Failed:', usersRes.status, await usersRes.text());
        }

        // 4. Test Get Phong Ban (Business Logic)
        console.log('4️⃣ Testing Get Departments...');
        const deptRes = await fetch(`${BASE_URL}/phong-ban`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (deptRes.ok) {
            const depts = await deptRes.json();
            console.log(`✅ Get Departments Successful. Found ${depts.length} departments.`);
        } else {
            console.error('❌ Get Departments Failed:', deptRes.status, await deptRes.text());
        }

        console.log('🏁 Deep Test Completed Successfully.');

    } catch (error) {
        console.error('❌ Unexpected Error:', error);
        process.exit(1);
    }
}

runTest();
