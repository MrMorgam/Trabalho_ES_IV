import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { NotaModule } from './nota/nota.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    DisciplinaModule,
    NotaModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
