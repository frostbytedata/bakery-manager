import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './base.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
})
export class ServicesModule {}
