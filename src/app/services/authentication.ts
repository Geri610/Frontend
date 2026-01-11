import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private oauthService: OAuthService) { }


  login(): boolean {
    this.oauthService.initCodeFlow();
    return true;
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken();
  }

  logout() {
    this.oauthService.logOut();
  }

  getClaims() {
    return this.oauthService.getIdentityClaims() as any;
  }

  getUsername(): string | null {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : null;
  }
  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }


}