import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { ResponseCleanserPipe } from './shared/pipes/response-cleanser.pipe';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      expandVariables: true,
    }),
    UsersModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
    ResponseCleanserPipe,
  ],
})
export class AppModule {}
