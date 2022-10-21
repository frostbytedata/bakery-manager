import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  api: string = environment.apiUrl;
  token: string = '';
  headers: HttpHeaders = new HttpHeaders();
  jwtParser: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.updateHeaders();
  }

  get(path: string, ignoreDeleted?: boolean): Observable<any> {
    this.updateHeaders();
    if (ignoreDeleted) {
      this.headers = this.headers.append('LB-Ignore-Delete', 'true');
    }
    return this.http.get(this.api + path, { headers: this.headers });
  }

  post(path: string, data: any): Observable<any> {
    this.updateHeaders();
    return this.http.post(this.api + path, data, { headers: this.headers });
  }

  patch(path: string, data: any): Observable<any> {
    this.updateHeaders();
    return this.http.patch(this.api + path, data, { headers: this.headers });
  }

  delete(id: number, path: string): Observable<any> {
    this.updateHeaders();
    return this.http.delete(this.api + path + '/' + id, {
      headers: this.headers,
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.updateHeaders();
  }

  forgetToken() {
    this.token = '';
  }

  private updateHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const token = localStorage.getItem('token');
    if (token) {
      if (!this.jwtParser.isTokenExpired(token)) {
        this.token = token;
        this.headers = this.headers.append('Authorization', token);
      }
    }
  }
}

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        if (error.status === 401) {
          console.error(error.error.name);
          console.error(error.error.message);
        }
        throw error;
      }),
    );
  }
}
