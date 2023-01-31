// Acces validation - Public decorator
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
// Import config file
import config from 'config';

// The guard will be injected any controller
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    // Reflector, helper class for get the context
    private reflector: Reflector,
    // Config injection
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  /* Methods */
  // Access granted: true - Access denied: false
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 'isPublic' metadata validation by context
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    // Auth header validation by apiKey in config
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) {
      throw new ForbiddenException(
        'not allow, auth header does not match expected',
      );
    }
    return isAuth;
  }
}
