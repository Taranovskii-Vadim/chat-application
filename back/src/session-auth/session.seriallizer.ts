import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

// TODO maybe add types for session auth proccess

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }
}
