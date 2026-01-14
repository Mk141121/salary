import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
export declare class JwtAuthGuard implements CanActivate {
    private reflector;
    private prisma;
    constructor(reflector: Reflector, prisma: PrismaService);
    private hashToken;
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
