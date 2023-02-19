import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/user/user.module';
import { SessionAuthService } from './session-auth.service';
import { SessionAuthController } from './session-auth.controller';
import { SessionSerializer } from './session.seriallizer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [SessionAuthService, LocalStrategy, SessionSerializer],
  exports: [],
  controllers: [SessionAuthController],
})
export class SessionAuth {}
