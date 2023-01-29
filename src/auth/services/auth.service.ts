import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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
}
