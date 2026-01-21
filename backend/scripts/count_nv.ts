
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const count = await prisma.nhanVien.count();
    console.log(`NV Count: ${count}`);
    const nvs = await prisma.nhanVien.findMany({ select: { maNhanVien: true } });
    console.log(nvs.map(n => n.maNhanVien));
}
main();
