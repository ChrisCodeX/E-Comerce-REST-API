import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.models';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return null;
    }
    const { password, ...rta } = user.toJSON();
    return rta;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
