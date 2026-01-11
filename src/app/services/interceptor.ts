import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication';

@Injectable()
export class bearer_Interceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      const token = this.auth.getAccessToken();
  
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  
      return next.handle(req);
    }
}
