import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { authConfig } from './auth.config';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [OAuthService, AuthenticationService, SessionService],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DeliFHery');

  constructor(
    private oauthService: OAuthService,
    public auth: AuthenticationService,
    private http: HttpClient,
    private session: SessionService
  ) {
    this.oauthService.configure(authConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => this.CompleteLogin());
  }

  private CompleteLogin() {
    if (!this.auth.isLoggedIn()) {
      console.log("Login nicht erfolgt");
      return;
    }

    console.log("Login erfolgreich");

    // Init-API Call nach dem Login (Init-Controller im Backend)
    this.http.get<any>(environment.api + '/init').subscribe({
      next: (res) => {
        console.log("Init-Return", res);

        if (res?.userId) {
          this.session.customerId = res.userId;
          console.log("Customer:", this.session.customerId);
        }
      },
      error: (err) => {
        console.error("Init nicht erfolgreich:", err);
      }
    });
  }
}
