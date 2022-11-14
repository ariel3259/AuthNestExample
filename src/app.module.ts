import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import Articles from './articles/articles.model';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArticlesModule,
    SequelizeModule.forRoot({
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: parseInt(process.env.HOST + ''),
      database: process.env.DATABASE,
      dialect: 'mysql',
      models: [Articles],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
