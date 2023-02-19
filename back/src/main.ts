import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
// import * as passport from 'passport';

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
