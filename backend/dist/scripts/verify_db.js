"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const count = await prisma.nhanVien.count();
    console.log(`DB Count NhanVien: ${count}`);
    const users = await prisma.nguoiDung.count();
    console.log(`DB Count NguoiDung: ${users}`);
    if (count > 0) {
        const emp = await prisma.nhanVien.findFirst();
        console.log('First Emp:', emp);
    }
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=verify_db.js.map