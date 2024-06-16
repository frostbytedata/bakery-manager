import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserStore } from '../store/user.store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  api: string = environment.apiUrl;
  headers: HttpHeaders = new HttpHeaders();
  jwtParser: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private userStore: UserStore) {
    this.updateHeaders();
  }

  get(path: string): Observable<HttpResponse<any>> {
    this.updateHeaders();
    return this.http.get(this.api + path, {
      headers: this.headers,
      observe: 'response',
    });
  }

  post(path: string, data: any): Observable<HttpResponse<any>> {
    this.updateHeaders();
    return this.http.post(this.api + path, data, {
      headers: this.headers,
      observe: 'response',
    });
  }

  patch(path: string, data: any): Observable<HttpResponse<any>> {
    this.updateHeaders();
    return this.http.patch(this.api + path, data, {
      headers: this.headers,
      observe: 'response',
    });
  }

  delete(id: number, path: string): Observable<HttpResponse<any>> {
    this.updateHeaders();
    return this.http.delete(this.api + path + '/' + id, {
      headers: this.headers,
      observe: 'response',
    });
  }

  public retrieveToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  public tokenExpired(): boolean {
    const token = this.retrieveToken();
    if (token !== undefined && token !== null) {
      return this.jwtParser.isTokenExpired(token);
    } else {
      return true;
    }
  }

  private updateHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (!this.tokenExpired()) {
      this.headers = this.headers.append(
        'Authorization',
        'Bearer ' + this.retrieveToken(),
      );
    }
  }
}

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private baseService: BaseService,
    private sb: MatSnackBar,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        if (error.status === 401 && this.baseService.tokenExpired()) {
          console.error('HttpInterceptor Detected Expired Token');
          const sbRef = this.sb.open(
            'Your login session has expired',
            'Login',
            { duration: 30000 },
          );
          sbRef
            .onAction()
            .pipe(take(1))
            .subscribe((result: any) => {
              this.router.navigate(['login']);
            });
        }
        console.error(error.error.name);
        console.error(error.error.message);
        throw error;
      }),
    );
  }
}
