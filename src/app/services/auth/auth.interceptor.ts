import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        // tslint:disable-next-line: object-literal-key-quotes
        'Accept'       : 'application/json',
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': `Bearer ${this.authService.getIdToken()}`,
        'Access-Control-Allow-Origin' : 'http://localhost:8080',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers' : 'Origin, Content - type, x - Auth - Token' 
      },
    });

    return next.handle(req);
  }
}