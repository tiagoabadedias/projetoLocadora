import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';
import { RentModule } from './rent/rent.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
    FilmModule,
    RentModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
