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
import { DatabaseModule } from './database.module';
import { IngredientModule } from './ingredients/ingredient.module';
import { RecipeModule } from './recipes/recipe.module';
import { UnitModule } from './units/unit.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      expandVariables: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: '/public',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RoleModule,
    IngredientModule,
    RecipeModule,
    UnitModule,
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
