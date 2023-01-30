import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'secret key',
      signOptions: {
        expiresIn: '10d',
      },
    }),
  ],
  // Implementing Local strategy
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
