import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add custom logic here
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Add custom error handling here
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
