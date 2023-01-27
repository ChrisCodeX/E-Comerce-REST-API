import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
// The guard will be injected any controller
@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Helper class for get the context
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Access granted: true - Access denied: false

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
