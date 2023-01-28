import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// The guard will be injected any controller
@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Helper class for get the context
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Access granted: true - Access denied: false

    // Validate 'isPublic' metadata
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    // Get request
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === '123';
    if (!isAuth) {
      throw new UnauthorizedException(
        'not allow, auth header does not match expected',
      );
    }
    return isAuth;
  }
}
