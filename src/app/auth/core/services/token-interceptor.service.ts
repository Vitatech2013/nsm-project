import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private jwtService: JwtService) { }

  intercept({ req, next }: { req: HttpRequest<any>; next: HttpHandler; }): Observable<HttpEvent<any>> {
    const headersConfig:any = {
      'Content-Type': 'application/json' ,
      'Accept': 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}
