import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.phongBan.findMany().then((r: any[]) => {
    console.log('All phong ban:', r.map(x => ({id: x.id, ten: x.tenPhongBan})));
}).finally(() => p.$disconnect());
