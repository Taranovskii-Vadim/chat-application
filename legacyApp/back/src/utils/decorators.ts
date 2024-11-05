import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'src/types';

export const User = createParamDecorator(
  (data: keyof Request['user'], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
