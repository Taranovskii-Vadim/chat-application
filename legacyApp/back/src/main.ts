// import * as passport from 'passport';
import { NestFactory } from '@nestjs/core';
// import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use only for sesion auth proccess
  // app.use(
  //   session({
  //     secret: 'cat',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
