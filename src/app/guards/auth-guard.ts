import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {

return true;
    }
    /*
    if (
      this.oauth.hasValidAccessToken() &&
      this.oauth.hasValidIdToken()
    ) {
      return true;
    }

    // optional: Redirect auf Login
    this.router.navigate(['/login']);
    return false;
    */
  }

