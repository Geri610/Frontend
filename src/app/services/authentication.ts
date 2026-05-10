import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor() { }

  login(): boolean {

    return true;
  }

  isLoggedIn() {
    return true;
  }

  logout() {
    
  }

  getUsername(): string | null {
    //const claims: any = this.oauthService.getIdentityClaims();
    //return claims ? claims.preferred_username : null;
    return "halo";
  }
}