import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Verificar si el usuario ya existe
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    // Crear Tenant automático para el nuevo dueño de negocio (ej: admin@barberia.com -> barberia)
    const slug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    const name = slug.charAt(0).toUpperCase() + slug.slice(1);

    const tenant = await this.prisma.tenant.create({
      data: {
        slug,
        name: `${name} Business`,
        businessHours: {
          createMany: {
            data: [1, 2, 3, 4, 5].map(day => ({
              dayOfWeek: day,
              openTime: '09:00',
              closeTime: '18:00'
            }))
          }
        }
      },
    });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario administrador asociado al Tenant
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN' as any,
        tenantId: tenant.id,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role, 
      tenantId: user.tenantId 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        tenantSlug: user.tenant.slug,
      },
    };
  }
}
