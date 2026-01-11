import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private oauth: OAuthService, private router: Router) { }

  canActivate(): Promise<boolean> {
    // WICHTIG: erst TryLogin fertig machen, dann entscheiden
    return this.oauth.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauth.hasValidAccessToken() && this.oauth.hasValidIdToken()) {
        return true;
      }

      return false;
    });
  }
}
